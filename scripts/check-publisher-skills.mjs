/**
 * Check whether curated ui-skills publishers have new SKILL.md files
 * in the repos we already track for them.
 *
 * This is a delta check for known publishers (/skills/{user}), not a
 * broad discovery crawl. Repos we only cherry-pick from (large monorepos)
 * are skipped — those are added manually, not via this report.
 *
 * Usage:
 *   npm run check:publisher-skills
 *   npm run check:publisher-skills -- --json
 *
 * Env:
 *   GITHUB_TOKEN or GH_TOKEN — recommended for higher GitHub API limits.
 */
import { registry } from "../src/data/registry.ts";

const GITHUB_API = "https://api.github.com";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const jsonOutput = process.argv.includes("--json");

/** Repos we partially index; new skills here are not auto-reported. */
const SKIP_REPOS = new Set([
  "wshobson/agents",
  "MengTo/Skills",
  "cursor/plugins",
  "anthropics/skills",
  "bencium/bencium-marketplace",
  "millionco/react-doctor",
  "addyosmani/agent-skills",
  "vercel-labs/agent-browser",
  "mattpocock/skills",
  "mrstev3n/balise-skills",
]);

const AGENT_FOLDERS = new Set([
  "skills",
  ".claude",
  ".cursor",
  ".codex",
  ".agents",
  ".agent",
  ".gemini",
  ".github",
  ".grok",
  ".hermes",
  ".kiro",
  ".opencode",
  ".pi",
  ".qoder",
  ".rovodev",
  ".trae-cn",
  ".trae",
  ".vibe",
  "plugin",
]);

const knownRawUrls = new Set(
  registry.map((skill) => skill.rawUrl.toLowerCase()),
);
const knownSlugsByRepo = new Map();

for (const skill of registry) {
  const repoKey = `${skill.user}/${skill.repo}`;
  if (!knownSlugsByRepo.has(repoKey)) {
    knownSlugsByRepo.set(repoKey, new Set());
  }
  knownSlugsByRepo.get(repoKey).add(skill.slug);
}

const publishers = new Set(registry.map((skill) => skill.user));
const trackedRepos = new Map();

for (const skill of registry) {
  const key = `${skill.user}/${skill.repo}`;
  if (!trackedRepos.has(key)) {
    trackedRepos.set(key, { user: skill.user, repo: skill.repo });
  }
}

function skillSlugFromPath(path) {
  const parts = path.split("/");
  const idx = parts.lastIndexOf("SKILL.md");
  if (idx <= 0) return parts.at(-2) ?? "unknown";
  const parent = parts[idx - 1];
  if (parent && !AGENT_FOLDERS.has(parent)) {
    return parent;
  }
  return parts[idx - 1]?.replace(/\.md$/i, "") ?? "unknown";
}

function pathScore(path) {
  if (path.includes("/skills/")) return 0;
  if (path.includes("/plugin/skills/")) return 1;
  return 2;
}

function isKnownSkill(user, repo, slug, rawUrl) {
  if (knownRawUrls.has(rawUrl.toLowerCase())) return true;
  return knownSlugsByRepo.get(`${user}/${repo}`)?.has(slug) ?? false;
}

function dedupeSkills(skills) {
  const map = new Map();
  for (const skill of skills) {
    const key = `${skill.user}/${skill.repo}/${skill.slug}`;
    const existing = map.get(key);
    if (!existing || pathScore(skill.path) < pathScore(existing.path)) {
      map.set(key, skill);
    }
  }
  return [...map.values()];
}

async function githubFetch(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ui-skills-check-publisher-skills",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!response.ok) {
    return { ok: false, status: response.status, data: null };
  }
  return { ok: true, status: response.status, data: await response.json() };
}

async function listSkillPaths(user, repo, defaultBranch = "main") {
  for (const branch of [defaultBranch, "main", "master"]) {
    const result = await githubFetch(
      `/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
    );
    if (!result.ok) continue;

    const paths = result.data.tree
      .filter(
        (item) => item.type === "blob" && /(^|\/)SKILL\.md$/i.test(item.path),
      )
      .map((item) => item.path);

    if (paths.length > 0) {
      return { branch, paths };
    }
  }

  return { branch: defaultBranch, paths: [] };
}

async function scanRepo(user, repo, defaultBranch) {
  const { branch, paths } = await listSkillPaths(user, repo, defaultBranch);
  const newSkills = [];

  for (const path of paths) {
    const slug = skillSlugFromPath(path);
    const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    if (isKnownSkill(user, repo, slug, rawUrl)) continue;

    newSkills.push({
      user,
      repo,
      slug,
      path,
      rawUrl,
      githubUrl: `https://github.com/${user}/${repo}/blob/${branch}/${path}`,
    });
  }

  return newSkills;
}

function toMarkdown(summary, skills) {
  const lines = [
    "# New skills from curated publishers",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Curated publishers: ${summary.publishers}`,
    `Tracked repos scanned: ${summary.reposScanned}`,
    `Cherry-pick repos skipped: ${summary.reposSkipped}`,
    `New skills found: ${summary.newSkills}`,
    "",
    "| Publisher | Skill | Repo |",
    "| --- | --- | --- |",
  ];

  for (const skill of skills.sort((a, b) =>
    `${a.user}/${a.slug}`.localeCompare(`${b.user}/${b.slug}`),
  )) {
    lines.push(
      `| ${skill.user} | ${skill.slug} | [${skill.repo}](https://github.com/${skill.user}/${skill.repo}) |`,
    );
  }

  if (skills.length === 0) {
    lines.push("| — | — | All curated publishers are up to date |");
  }

  return `${lines.join("\n")}\n`;
}

function shouldScanRepo(user, repo) {
  const key = `${user}/${repo}`;
  if (SKIP_REPOS.has(key)) return false;
  if (/agent-skills$/i.test(repo)) return false;

  const indexedCount = knownSlugsByRepo.get(key)?.size ?? 0;
  if (indexedCount === 0) return false;

  // Actively tracked: several skills already indexed from this repo.
  if (indexedCount >= 3) return true;

  // Dedicated skill repos we publish from, with at least a small foothold.
  if (repo === "skills" && indexedCount >= 2) return true;
  if (/-skills$/i.test(repo) && indexedCount >= 1) return true;
  if (/-skill$/i.test(repo) && indexedCount >= 1) return true;

  return false;
}

const reposToScan = [];
const reposSkipped = [];

for (const { user, repo } of trackedRepos.values()) {
  const key = `${user}/${repo}`;
  if (shouldScanRepo(user, repo)) {
    reposToScan.push({ user, repo });
  } else {
    reposSkipped.push(key);
  }
}

console.error(
  `[check:publisher-skills] ${publishers.size} publishers, scanning ${reposToScan.length} tracked repos (${reposSkipped.length} skipped)`,
);

const allNewSkills = [];

for (const { user, repo } of reposToScan) {
  const meta = await githubFetch(
    `/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`,
  );
  const defaultBranch = meta.ok ? meta.data.default_branch : "main";
  const found = await scanRepo(user, repo, defaultBranch);
  allNewSkills.push(...found);
  if (found.length > 0) {
    console.error(`[check:publisher-skills] + ${user}/${repo}: ${found.length}`);
  }
}

const newSkills = dedupeSkills(allNewSkills);

const summary = {
  publishers: publishers.size,
  reposScanned: reposToScan.length,
  reposSkipped: reposSkipped.length,
  registrySkills: registry.length,
  newSkills: newSkills.length,
  publishersWithNewSkills: new Set(newSkills.map((skill) => skill.user)).size,
  skippedRepos: reposSkipped.sort(),
};

console.error(
  `[check:publisher-skills] ${summary.newSkills} new across ${summary.publishersWithNewSkills} publishers`,
);

if (jsonOutput) {
  console.log(JSON.stringify({ summary, skills: newSkills }, null, 2));
} else {
  process.stdout.write(toMarkdown(summary, newSkills));
}
