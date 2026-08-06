import { skills } from "./skills.ts";
import type { TopicSlug } from "./registry.ts";

export type PlaybookDemoId =
  | "text-balance"
  | "tabular-nums"
  | "touch-target"
  | "concentric-radius"
  | "scale-on-press"
  | "popover-origin"
  | "space-not-lines"
  | "scroll-peek"
  | "image-outline"
  | "line-clamp"
  | "text-contrast"
  | "scale-enter"
  | "skeleton-loading"
  | "one-accent"
  | "line-measure"
  | "shadow-elevation"
  | "focus-ring"
  | "inline-error";

export type PlaybookEntry = {
  slug: string;
  skillSlug: string;
  demo: PlaybookDemoId;
  title: string;
  description: string;
  relatedSkills: string[];
  topics?: TopicSlug[];
};

const playbook: PlaybookEntry[] = [
  {
    slug: "use-text-balance",
    skillSlug: "baseline-ui",
    demo: "text-balance",
    title: "Balance headings, prettify body copy",
    description: "Use `text-balance` on headings and `text-pretty` on body copy.",
    relatedSkills: [
      "better-typography",
      "make-interfaces-feel-better",
      "frontend-design",
      "web-design-guidelines",
      "design-lab",
    ],
    topics: ["typography", "visual", "craft"],
  },
  {
    slug: "use-tabular-nums-for-data",
    skillSlug: "baseline-ui",
    demo: "tabular-nums",
    title: "Align numeric UI",
    description: "Use `tabular-nums` when numbers need to line up.",
    relatedSkills: [
      "better-typography",
      "make-interfaces-feel-better",
      "better-interface",
      "ui-ux-pro-max",
      "improve-ui",
    ],
    topics: ["typography", "systems", "craft"],
  },
  {
    slug: "use-large-touch-targets",
    skillSlug: "better-accessibility",
    demo: "touch-target",
    title: "Make touch targets easy to hit",
    description: "Give interactive controls at least a 44×44px touch target.",
    relatedSkills: [
      "fixing-accessibility",
      "better-ui",
      "wcag-audit-patterns",
      "web-design-guidelines",
      "interaction-design",
    ],
    topics: ["interaction", "accessibility", "frontend"],
  },
  {
    slug: "use-concentric-border-radius",
    skillSlug: "better-ui",
    demo: "concentric-radius",
    title: "Nest corners concentrically",
    description: "Nested corners: outer radius = inner radius + padding.",
    relatedSkills: [
      "make-interfaces-feel-better",
      "better-interface",
      "emil-design-eng",
      "design-lab",
      "frontend-design",
    ],
    topics: ["visual", "craft", "systems"],
  },
  {
    slug: "add-scale-on-press",
    skillSlug: "emil-design-eng",
    demo: "scale-on-press",
    title: "Give buttons press feedback",
    description: "Scale pressable controls to ~0.96 on `:active`.",
    relatedSkills: [
      "better-ui",
      "improve-animations",
      "make-interfaces-feel-better",
      "interaction-design",
      "fixing-motion-performance",
    ],
    topics: ["interaction", "motion", "craft"],
  },
  {
    slug: "anchor-popovers-to-triggers",
    skillSlug: "emil-design-eng",
    demo: "popover-origin",
    title: "Grow popovers from their trigger",
    description: "Animate popovers from the trigger edge, not the center.",
    relatedSkills: [
      "better-ui",
      "improve-animations",
      "interaction-design",
      "make-interfaces-feel-better",
      "fixing-motion-performance",
    ],
    topics: ["motion", "interaction", "craft"],
  },
  {
    slug: "group-with-space-not-lines",
    skillSlug: "better-layout",
    demo: "space-not-lines",
    title: "Group with space, not lines",
    description: "Separate groups with spacing before adding divider lines.",
    relatedSkills: [
      "better-interface",
      "baseline-ui",
      "better-ui",
      "make-interfaces-feel-better",
      "web-design-guidelines",
    ],
    topics: ["systems", "visual", "craft"],
  },
  {
    slug: "peek-the-next-scroll-item",
    skillSlug: "better-layout",
    demo: "scroll-peek",
    title: "Peek the next scroll item",
    description: "Let 16–32px of the next item peek past the scroll edge.",
    relatedSkills: [
      "better-interface",
      "better-ui",
      "interaction-design",
      "emil-design-eng",
      "ui-ux-pro-max",
    ],
    topics: ["interaction", "systems", "frontend"],
  },
  {
    slug: "outline-images-neutrally",
    skillSlug: "better-ui",
    demo: "image-outline",
    title: "Outline images with neutral hairlines",
    description: "Use a neutral hairline outline on images, not a tinted ring.",
    relatedSkills: [
      "make-interfaces-feel-better",
      "better-colors",
      "better-interface",
      "frontend-design",
      "design-lab",
    ],
    topics: ["visual", "craft", "color"],
  },
  {
    slug: "clamp-overflowing-titles",
    skillSlug: "better-typography",
    demo: "line-clamp",
    title: "Clamp overflowing titles",
    description: "Use `line-clamp` or `truncate` in dense UI.",
    relatedSkills: [
      "baseline-ui",
      "better-interface",
      "better-ui",
      "better-layout",
      "improve-ui",
    ],
    topics: ["typography", "systems", "frontend"],
  },
  {
    slug: "keep-secondary-text-readable",
    skillSlug: "better-accessibility",
    demo: "text-contrast",
    title: "Keep secondary text readable",
    description: "Keep secondary text readable on its background.",
    relatedSkills: [
      "fixing-accessibility",
      "better-colors",
      "baseline-ui",
      "better-typography",
      "wcag-audit-patterns",
    ],
    topics: ["accessibility", "typography", "color"],
  },
  {
    slug: "avoid-entering-from-scale-zero",
    skillSlug: "emil-design-eng",
    demo: "scale-enter",
    title: "Avoid entering from scale zero",
    description: "Start entrances at ~`scale(0.95)`, not `scale(0)`.",
    relatedSkills: [
      "improve-animations",
      "better-ui",
      "make-interfaces-feel-better",
      "fixing-motion-performance",
      "interaction-design",
    ],
    topics: ["motion", "craft", "interaction"],
  },
  {
    slug: "use-structural-skeletons",
    skillSlug: "baseline-ui",
    demo: "skeleton-loading",
    title: "Use structural skeletons",
    description: "Match loading placeholders to content shape, not spinners.",
    relatedSkills: [
      "better-ui",
      "better-interface",
      "improve-ui",
      "ui-ux-pro-max",
      "interaction-design",
    ],
    topics: ["interaction", "systems", "frontend"],
  },
  {
    slug: "limit-accent-color-usage",
    skillSlug: "baseline-ui",
    demo: "one-accent",
    title: "Limit accent color usage",
    description: "One accent per view; keep secondary actions neutral.",
    relatedSkills: [
      "better-colors",
      "better-ui",
      "make-interfaces-feel-better",
      "frontend-design",
      "design-lab",
    ],
    topics: ["visual", "color", "taste"],
  },
  {
    slug: "cap-line-length",
    skillSlug: "better-typography",
    demo: "line-measure",
    title: "Cap line length",
    description: "Cap long-form copy around 60–75 characters per line.",
    relatedSkills: [
      "baseline-ui",
      "better-interface",
      "better-writing",
      "web-design-guidelines",
      "make-interfaces-feel-better",
    ],
    topics: ["typography", "visual", "craft"],
  },
  {
    slug: "use-shadow-for-elevation",
    skillSlug: "better-ui",
    demo: "shadow-elevation",
    title: "Use shadow for elevation",
    description: "Use shadow for depth; reserve borders for structure.",
    relatedSkills: [
      "make-interfaces-feel-better",
      "better-interface",
      "beautiful-shadows",
      "frontend-design",
      "design-lab",
    ],
    topics: ["visual", "craft", "systems"],
  },
  {
    slug: "show-visible-focus-rings",
    skillSlug: "better-accessibility",
    demo: "focus-ring",
    title: "Show visible focus rings",
    description: "Style `:focus-visible`. Never remove outlines without a replacement.",
    relatedSkills: [
      "fixing-accessibility",
      "baseline-ui",
      "wcag-audit-patterns",
      "web-design-guidelines",
      "interaction-design",
    ],
    topics: ["accessibility", "interaction", "frontend"],
  },
  {
    slug: "show-errors-beside-fields",
    skillSlug: "baseline-ui",
    demo: "inline-error",
    title: "Show errors beside fields",
    description: "Put validation errors directly under the field.",
    relatedSkills: [
      "better-accessibility",
      "fixing-accessibility",
      "web-design-guidelines",
      "interaction-design",
      "wcag-audit-patterns",
    ],
    topics: ["interaction", "accessibility", "frontend"],
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

  for (const relatedSkillSlug of entry.relatedSkills) {
    if (!skillBySlug.has(relatedSkillSlug)) {
      throw new Error(
        `Unknown related skill slug for playbook entry ${entry.slug}: ${relatedSkillSlug}`,
      );
    }
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
