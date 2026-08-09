import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export type DiscoveredSkill = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
};

type ViteImportMeta = ImportMeta & {
  glob?: (
    pattern: string,
    options: {
      query: string;
      import: string;
      eager: boolean;
    },
  ) => Record<string, string>;
};

function loadSkillsFromFs(): Record<string, string> {
  const root = join(process.cwd(), "skills");
  const modules: Record<string, string> = {};
  if (!existsSync(root)) return modules;

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(root, entry.name, "SKILL.md");
    if (!existsSync(path)) continue;
    modules[`/skills/${entry.name}/SKILL.md`] = readFileSync(path, "utf8");
  }
  return modules;
}

function loadSkillModules(): Record<string, string> {
  const glob = (import.meta as ViteImportMeta).glob;
  if (typeof glob === "function") {
    return glob("../../skills/*/SKILL.md", {
      query: "?raw",
      import: "default",
      eager: true,
    });
  }
  return loadSkillsFromFs();
}

const skillModules = loadSkillModules();

function slugFromModulePath(path: string): string | null {
  const match = /\/skills\/([^/]+)\/SKILL\.md$/.exec(path.replaceAll("\\", "/"));
  return match?.[1] ?? null;
}

function parseFrontmatterDescription(markdown: string): string {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown);
  if (!match) return "UI Skills agent skill.";
  const block = match[1] ?? "";
  const description = /^description:\s*(?:>-?\s*)?(.*)$/m.exec(block);
  if (!description) return "UI Skills agent skill.";
  let value = (description[1] ?? "").trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value || "UI Skills agent skill.";
}

async function sha256Digest(content: string): Promise<string> {
  const bytes = new TextEncoder().encode(content);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hex}`;
}

export function listLocalSkillSlugs(): string[] {
  return Object.keys(skillModules)
    .map(slugFromModulePath)
    .filter((slug): slug is string => Boolean(slug))
    .sort();
}

export function readLocalSkillMarkdown(slug: string): string | null {
  const entry = Object.entries(skillModules).find(
    ([path]) => slugFromModulePath(path) === slug,
  );
  return entry?.[1] ?? null;
}

export async function buildAgentSkillsIndex(origin: string): Promise<{
  $schema: string;
  skills: DiscoveredSkill[];
}> {
  const skills: DiscoveredSkill[] = [];

  for (const name of listLocalSkillSlugs()) {
    const markdown = readLocalSkillMarkdown(name);
    if (!markdown) continue;
    skills.push({
      name,
      type: "skill-md",
      description: parseFrontmatterDescription(markdown),
      url: `${origin}/.well-known/agent-skills/${name}/SKILL.md`,
      digest: await sha256Digest(markdown),
    });
  }

  return {
    $schema: SCHEMA,
    skills,
  };
}

export function buildMcpServerCard(origin: string) {
  return {
    serverInfo: {
      name: "UI Skills",
      version: "0.2.4",
    },
    description:
      "Browse and fetch design-engineering UI skills from the UI Skills catalog.",
    url: `${origin}/mcp`,
    transport: {
      type: "streamable-http",
      endpoint: `${origin}/mcp`,
    },
    capabilities: {
      tools: true,
    },
    tools: [
      {
        name: "list_skills",
        description:
          "List locally published UI Skills with name and description.",
      },
      {
        name: "get_skill",
        description: "Fetch a UI skill SKILL.md by skill name/slug.",
      },
    ],
  };
}

export const discoveryJsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300",
  "Access-Control-Allow-Origin": "*",
} as const;
