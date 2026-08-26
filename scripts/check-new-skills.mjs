/**
 * Find SKILL.md files in indexed publisher repos that are not yet in registry.
 *
 * Usage:
 *   npm run check:new-skills
 *   npm run check:new-skills -- --json
 *   npm run check:new-skills -- --all
 *
 * Workflow: run this weekly, review output, curate skills that fit ui-skills
 * (design, UI, motion, accessibility, craft), add to registry.ts, then run
 * `npm run digests` and `npm run check:skills`.
 *
 * Env:
 *   GITHUB_TOKEN or GH_TOKEN — recommended for higher GitHub API limits.
 */
import { registry } from "../src/data/registry.ts";

const GITHUB_API = "https://api.github.com";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const args = new Set(process.argv.slice(2));
const jsonOutput = args.has("--json");
const includeMonorepos = args.has("--all");

const knownRawUrls = new Set(
  registry.map((skill) => normalizeRawUrl(skill.rawUrl)),
);
const knownSlugsByRepo = new Map();

for (const skill of registry) {
  const repoKey = `${skill.user}/${skill.repo}`;
  if (!knownSlugsByRepo.has(repoKey)) {
    knownSlugsByRepo.set(repoKey, new Set());
  }
  knownSlugsByRepo.get(repoKey).add(skill.slug);
}

const indexedRepos = new Map();
for (const skill of registry) {
  indexedRepos.set(`${skill.user}/${skill.repo}`, {
    user: skill.user,
    repo: skill.repo,
  });
}

const MONOREPO_REPOS = new Set([
  "wshobson/agents",
  "MengTo/Skills",
  "cursor/plugins",
  "anthropics/skills",
  "bencium/bencium-marketplace",
  "millionco/react-doctor",
  "addyosmani/agent-skills",
  "vercel-labs/agent-browser",
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

function normalizeRawUrl(url) {
  return url.toLowerCase();
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

function buildRawUrl(user, repo, branch, path) {
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
}

function isKnownSkill(user, repo, slug, rawUrl) {
  if (knownRawUrls.has(normalizeRawUrl(rawUrl))) return true;
  const repoSlugs = knownSlugsByRepo.get(`${user}/${repo}`);
  return repoSlugs?.has(slug) ?? false;
}

function isFocusRepo(user, repo) {
  return !MONOREPO_REPOS.has(`${user}/${repo}`);
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
    "User-Agent": "ui-skills-check-new-skills",
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
    const rawUrl = buildRawUrl(user, repo, branch, path);
    if (isKnownSkill(user, repo, slug, rawUrl)) continue;

    newSkills.push({
      user,
      repo,
      slug,
      path,
      rawUrl,
      githubUrl: `https://github.com/${user}/${repo}/blob/${branch}/${path}`,
      focus: isFocusRepo(user, repo),
    });
  }

  return newSkills;
}

function groupByUserRepo(skills) {
  const groups = new Map();
  for (const skill of skills) {
    const key = `${skill.user}/${skill.repo}`;
    if (!groups.has(key)) {
      groups.set(key, {
        user: skill.user,
        repo: skill.repo,
        focus: skill.focus,
        skills: [],
      });
    }
    groups.get(key).skills.push(skill);
  }
  return [...groups.values()].sort((a, b) => {
    if (a.focus !== b.focus) return a.focus ? -1 : 1;
    return `${a.user}/${a.repo}`.localeCompare(`${b.user}/${b.repo}`);
  });
}

function toMarkdown(focusSkills, monorepoGroups) {
  const lines = [
    "# New skills in indexed publisher repos",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Skill-focused repos",
    "",
    "| User | Skill | Repo |",
    "| --- | --- | --- |",
  ];

  for (const skill of focusSkills.sort((a, b) =>
    `${a.user}/${a.slug}`.localeCompare(`${b.user}/${b.slug}`),
  )) {
    lines.push(
      `| ${skill.user} | ${skill.slug} | [${skill.repo}](https://github.com/${skill.user}/${skill.repo}) |`,
    );
  }

  if (monorepoGroups.length > 0) {
    lines.push("", "## Large monorepos (not listed individually)", "", "| User | Repo | New skills |", "| --- | --- | --- |");
    for (const group of monorepoGroups) {
      lines.push(
        `| ${group.user} | [${group.repo}](https://github.com/${group.user}/${group.repo}) | ${group.skills.length} |`,
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

const allNewSkills = [];

console.error(`[check:new-skills] scanning ${indexedRepos.size} indexed repos...`);

for (const { user, repo } of indexedRepos.values()) {
  const meta = await githubFetch(
    `/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`,
  );
  const defaultBranch = meta.ok ? meta.data.default_branch : "main";
  const found = await scanRepo(user, repo, defaultBranch);
  allNewSkills.push(...found);
  if (found.length > 0) {
    console.error(`[check:new-skills] + ${user}/${repo}: ${found.length}`);
  }
}

const deduped = dedupeSkills(allNewSkills);
const groups = groupByUserRepo(deduped);
const focusSkills = deduped.filter((skill) => skill.focus);
const monorepoGroups = groups.filter((group) => !group.focus);

const summary = {
  indexedRepos: indexedRepos.size,
  registrySkills: registry.length,
  newSkills: deduped.length,
  focusSkills: focusSkills.length,
  monorepoSkills: deduped.length - focusSkills.length,
  usersWithNewSkills: new Set(deduped.map((skill) => skill.user)).size,
};

console.error(
  `[check:new-skills] ${summary.newSkills} new (${summary.focusSkills} focused, ${summary.monorepoSkills} monorepo) across ${summary.usersWithNewSkills} users`,
);

if (jsonOutput) {
  console.log(
    JSON.stringify(
      {
        summary,
        focus: focusSkills,
        monorepos: monorepoGroups.map((group) => ({
          user: group.user,
          repo: group.repo,
          count: group.skills.length,
          slugs: group.skills.map((skill) => skill.slug),
        })),
      },
      null,
      2,
    ),
  );
} else {
  const outputGroups = includeMonorepos ? monorepoGroups : [];
  process.stdout.write(toMarkdown(focusSkills, outputGroups));
}
