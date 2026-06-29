import { skills } from "./skills.ts";
import type { TopicSlug } from "./registry.ts";

export type PlaybookEntry = {
  slug: string;
  skillSlug: string;
  title: string;
  direct: string;
  rule: string;
  why: string;
  goodExample?: string;
  badExample?: string;
  prompt?: string;
  relatedSkills?: string[];
  topics?: TopicSlug[];
};

const playbook: PlaybookEntry[] = [
  {
    slug: "use-text-balance",
    skillSlug: "baseline-ui",
    title: "Balance headings, prettify body copy",
    direct: "Really useful direct: balance headings and prettify body copy before you touch spacing.",
    rule: "MUST use `text-balance` for headings and `text-pretty` for body copy.",
    why: "It keeps headline wraps elegant and paragraphs easier to scan.",
    goodExample: `<h1 className="text-3xl font-medium text-balance">Ship cleaner UI</h1>\n<p className="text-base text-pretty">Longer body copy wraps naturally without awkward rivers.</p>`,
    badExample: `<h1 className="text-3xl font-medium">Ship cleaner UI</h1>\n<p className="text-base">Longer body copy wraps naturally without any typographic tuning.</p>`,
    prompt: "Update this layout so headings use `text-balance` and body copy uses `text-pretty`.",
    relatedSkills: ["frontend-design", "fixing-metadata", "web-design-guidelines"],
    topics: ["typography", "visual", "craft"],
  },
  {
    slug: "use-aria-labels-for-icon-buttons",
    skillSlug: "fixing-accessibility",
    title: "Name every icon-only control",
    direct: "Really useful direct: every icon-only control needs a clear accessible name.",
    rule: "MUST add `aria-label` to icon-only buttons.",
    why: "Assistive tech needs a clear accessible name when no visible text exists.",
    goodExample: `<button aria-label="Close dialog">\n  <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>\n</button>`,
    badExample: `<button>\n  <svg viewBox="0 0 24 24">...</svg>\n</button>`,
    prompt: "Audit every icon-only control in this view and add a clear `aria-label`.",
    relatedSkills: ["baseline-ui", "web-design-guidelines", "frontend-design"],
    topics: ["accessibility", "frontend", "interaction"],
  },
  {
    slug: "animate-transform-and-opacity-only",
    skillSlug: "fixing-motion-performance",
    title: "Keep motion on the compositor",
    direct: "Really useful direct: keep motion on transform and opacity so it stays smooth.",
    rule: "MUST animate only `transform` and `opacity`.",
    why: "Those properties avoid layout thrash and usually stay smooth.",
    goodExample: `motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}`,
    badExample: `motion.div animate={{ width: 320, left: 24 }} transition={{ duration: 0.18 }}`,
    prompt: "Replace layout-based animation with transform/opacity-only motion.",
    relatedSkills: ["baseline-ui", "frontend-design", "remotion-best-practices"],
    topics: ["motion", "performance", "frontend"],
  },
  {
    slug: "set-canonical-and-social-metadata",
    skillSlug: "fixing-metadata",
    title: "Ship complete page metadata",
    direct: "Really useful direct: ship canonical, Open Graph, and Twitter metadata every time.",
    rule: "MUST set canonical, Open Graph, and Twitter metadata on every page.",
    why: "It keeps sharing, indexing, and duplicate URLs consistent.",
    goodExample: `<Layout\n  title="Playbook"\n  description="Distilled UI lessons"\n  ogImage="https://example.com/playbook-og.png"\n/>`,
    badExample: `<Layout>\n  <Page />\n</Layout>`,
    prompt: "Add page metadata for title, description, canonical, OG, and Twitter cards.",
    relatedSkills: ["web-design-guidelines", "frontend-design", "baseline-ui"],
    topics: ["architecture", "frontend", "tooling"],
  },
  {
    slug: "use-tabular-nums-for-data",
    skillSlug: "baseline-ui",
    title: "Align numeric UI",
    direct: "Really useful direct: use tabular numbers anywhere alignment matters.",
    rule: "MUST use `tabular-nums` for numeric values that need alignment.",
    why: "Fixed-width digits keep tables, stats, and counters stable.",
    goodExample: `<span className="tabular-nums">98.4%</span>`,
    badExample: `<span>98.4%</span>`,
    prompt: "Apply `tabular-nums` anywhere numbers need to line up.",
    relatedSkills: ["frontend-design", "web-design-guidelines"],
    topics: ["typography", "systems", "craft"],
  },
];

const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

const seenSlugs = new Set<string>();
for (const entry of playbook) {
  if (seenSlugs.has(entry.slug)) {
    throw new Error(`Duplicate playbook slug: ${entry.slug}`);
  }

  seenSlugs.add(entry.slug);

  if (!skillBySlug.has(entry.skillSlug)) {
    throw new Error(`Unknown skill slug for playbook entry: ${entry.skillSlug}`);
  }
}

export { playbook };

export const playbookBySlug = new Map(playbook.map((entry) => [entry.slug, entry]));

export const playbookBySkillSlug = new Map(
  skills.map((skill) => [
    skill.slug,
    playbook.filter((entry) => entry.skillSlug === skill.slug),
  ]),
);

export const playbookTopicSlugs = Array.from(
  new Set(playbook.flatMap((entry) => entry.topics ?? [])),
).sort();
