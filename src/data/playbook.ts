import { skills } from "./skills.ts";
import type { TopicSlug } from "./registry.ts";

export type PlaybookDemoId =
  | "text-balance"
  | "tabular-nums"
  | "accessible-icon-button"
  | "focus-visible"
  | "touch-target"
  | "compositor-motion"
  | "reduced-motion"
  | "inline-validation"
  | "stable-media";

export type PlaybookEntry = {
  slug: string;
  skillSlug: string;
  demo: PlaybookDemoId;
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
    demo: "text-balance",
    title: "Balance headings, prettify body copy",
    direct: "Use `text-balance` for headings and `text-pretty` for body copy.",
    rule: "MUST use `text-balance` for headings and `text-pretty` for body copy.",
    why: "It keeps headline wraps elegant and paragraphs easier to scan.",
    goodExample: `<h1 className="text-3xl font-medium text-balance">Ship cleaner UI</h1>\n<p className="text-base text-pretty">Longer body copy wraps naturally without awkward rivers.</p>`,
    badExample: `<h1 className="text-3xl font-medium">Ship cleaner UI</h1>\n<p className="text-base">Longer body copy wraps naturally without any typographic tuning.</p>`,
    prompt:
      "Update this layout so headings use `text-balance` and body copy uses `text-pretty`.",
    relatedSkills: [
      "frontend-design",
      "fixing-metadata",
      "web-design-guidelines",
    ],
    topics: ["typography", "visual", "craft"],
  },
  {
    slug: "use-aria-labels-for-icon-buttons",
    skillSlug: "fixing-accessibility",
    demo: "accessible-icon-button",
    title: "Name every icon-only control",
    direct: "Give every icon-only button a clear accessible name.",
    rule: "MUST add `aria-label` to icon-only buttons.",
    why: "Assistive tech needs a clear accessible name when no visible text exists.",
    goodExample: `<button aria-label="Close dialog">\n  <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>\n</button>`,
    badExample: `<button>\n  <svg viewBox="0 0 24 24">...</svg>\n</button>`,
    prompt:
      "Audit every icon-only control in this view and add a clear `aria-label`.",
    relatedSkills: ["baseline-ui", "web-design-guidelines", "frontend-design"],
    topics: ["accessibility", "frontend", "interaction"],
  },
  {
    slug: "use-visible-focus-states",
    skillSlug: "fixing-accessibility",
    demo: "focus-visible",
    title: "Keep keyboard focus visible",
    direct:
      "Give keyboard users a clear focus state on every interactive control.",
    rule: "MUST keep a visible focus indicator for keyboard users.",
    why: "A visible focus state shows where keyboard input will go.",
    goodExample: `<button className="focus-visible:outline-2 focus-visible:outline-offset-2">Save</button>`,
    badExample: `<button className="focus:outline-none">Save</button>`,
    prompt:
      "Add a visible focus state to every interactive control without hiding keyboard focus.",
    relatedSkills: ["baseline-ui", "web-design-guidelines"],
    topics: ["accessibility", "interaction", "frontend"],
  },
  {
    slug: "animate-transform-and-opacity-only",
    skillSlug: "fixing-motion-performance",
    demo: "compositor-motion",
    title: "Keep motion on the compositor",
    direct:
      "Animate `transform` and `opacity`, not layout properties like `width` or `left`.",
    rule: "MUST animate only `transform` and `opacity`.",
    why: "Those properties avoid layout thrash and usually stay smooth.",
    goodExample: `motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}`,
    badExample: `motion.div animate={{ width: 320, left: 24 }} transition={{ duration: 0.18 }}`,
    prompt:
      "Replace layout-based animation with transform/opacity-only motion.",
    relatedSkills: [
      "baseline-ui",
      "frontend-design",
      "remotion-best-practices",
    ],
    topics: ["motion", "performance", "frontend"],
  },
  {
    slug: "respect-reduced-motion",
    skillSlug: "fixing-motion-performance",
    demo: "reduced-motion",
    title: "Respect reduced motion",
    direct:
      "Reduce movement when the user prefers less motion, without hiding useful feedback.",
    rule: "MUST provide a reduced-motion alternative for non-essential movement.",
    why: "Users should be able to understand state changes without triggering motion sensitivity.",
    goodExample: `.panel { transition: transform 200ms ease-out; }\n@media (prefers-reduced-motion: reduce) {\n  .panel { transition: opacity 150ms ease-out; }\n}`,
    badExample: `.panel { animation: slide-in 700ms ease-out; }`,
    prompt:
      "Add a prefers-reduced-motion alternative while preserving the state change.",
    relatedSkills: ["baseline-ui", "frontend-design", "web-design-guidelines"],
    topics: ["motion", "accessibility", "performance"],
  },
  {
    slug: "use-tabular-nums-for-data",
    skillSlug: "baseline-ui",
    demo: "tabular-nums",
    title: "Align numeric UI",
    direct: "Use `tabular-nums` when numeric values need to line up.",
    rule: "MUST use `tabular-nums` for numeric values that need alignment.",
    why: "Fixed-width digits keep tables, stats, and counters stable.",
    goodExample: `<span className="tabular-nums">98.4%</span>`,
    badExample: `<span>98.4%</span>`,
    prompt: "Apply `tabular-nums` anywhere numbers need to line up.",
    relatedSkills: ["frontend-design", "web-design-guidelines"],
    topics: ["typography", "systems", "craft"],
  },
  {
    slug: "use-large-touch-targets",
    skillSlug: "ui-ux-pro-max",
    demo: "touch-target",
    title: "Make touch targets easy to hit",
    direct:
      "Give interactive controls a touch target of at least 44 by 44 pixels.",
    rule: "SHOULD use a minimum `44px` touch target for interactive controls.",
    why: "Larger targets reduce missed taps without requiring visual clutter.",
    goodExample: `<button className="size-11" aria-label="Close">×</button>`,
    badExample: `<button className="size-6" aria-label="Close">×</button>`,
    prompt:
      "Increase small interactive controls to a minimum 44px touch target.",
    relatedSkills: ["fixing-accessibility", "adapt", "web-design-guidelines"],
    topics: ["interaction", "accessibility", "frontend"],
  },
  {
    slug: "show-inline-validation-errors",
    skillSlug: "fixing-accessibility",
    demo: "inline-validation",
    title: "Put errors beside the field",
    direct:
      "Place form errors beside the field and connect them with `aria-describedby`.",
    rule: "MUST associate field errors with the invalid input.",
    why: "People can understand and fix an error without searching the page.",
    goodExample: `<input aria-invalid="true" aria-describedby="email-error" />\n<p id="email-error">Enter a valid email.</p>`,
    badExample: `<input />\n<div className="alert">Invalid email.</div>`,
    prompt:
      "Move form errors beside their fields and link them with aria-describedby.",
    relatedSkills: ["web-design-guidelines", "ui-ux-pro-max"],
    topics: ["accessibility", "interaction", "frontend"],
  },
  {
    slug: "reserve-space-for-media",
    skillSlug: "ui-ux-pro-max",
    demo: "stable-media",
    title: "Reserve space for media",
    direct: "Reserve an image's space before it loads to prevent layout shift.",
    rule: "MUST reserve the rendered dimensions of media before loading it.",
    why: "Stable geometry keeps content from jumping while images load.",
    goodExample: `<img width="640" height="360" src="hero.webp" alt="..." />`,
    badExample: `<img src="hero.webp" alt="..." />`,
    prompt:
      "Reserve space for images and media so content does not shift while loading.",
    relatedSkills: ["fixing-motion-performance", "web-design-guidelines"],
    topics: ["performance", "visual", "frontend"],
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
    throw new Error(
      `Unknown skill slug for playbook entry: ${entry.skillSlug}`,
    );
  }
}

export { playbook };

export const playbookBySlug = new Map(
  playbook.map((entry) => [entry.slug, entry]),
);

export const playbookBySkillSlug = new Map(
  skills.map((skill) => [
    skill.slug,
    playbook.filter((entry) => entry.skillSlug === skill.slug),
  ]),
);

export const playbookTopicSlugs = Array.from(
  new Set(playbook.flatMap((entry) => entry.topics ?? [])),
).sort();
