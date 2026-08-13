import { skills } from "./skills.ts";
import { playbookDemoSlugs } from "./playbook-demos";

export type PlaybookEntry = {
  slug: string;
  skill: string;
  title: string;
  description: string;
  related: string[];
};

const rawPlaybook: PlaybookEntry[] = [
  {
    slug: "reserve-space-with-aspect-ratio",
    skill: "better-layout",
    title: "Reserve space for media",
    description:
      "Use `aspect-ratio` to prevent images from shifting nearby content while they load.",
    related: ["improve-ui", "better-interface", "better-ui", "better-layout"],
  },
  {
    slug: "use-text-balance",
    skill: "baseline-ui",
    title: "Balance headings, prettify body copy",
    description:
      "Use `text-balance` on headings and `text-pretty` on body copy.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "frontend-design",
    ],
  },
  {
    slug: "use-tabular-nums-for-data",
    skill: "baseline-ui",
    title: "Align numeric UI",
    description: "Use `tabular-nums` when numbers need to line up.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "use-large-touch-targets",
    skill: "better-accessibility",
    title: "Make touch targets easy to hit",
    description: "Give interactive controls at least a 44×44px touch target.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "use-concentric-border-radius",
    skill: "better-ui",
    title: "Nest corners concentrically",
    description: "Nested corners: outer radius = inner radius + padding.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "emil-design-eng",
    ],
  },
  {
    slug: "add-scale-on-press",
    skill: "emil-design-eng",
    title: "Give buttons press feedback",
    description: "Scale pressable controls to ~0.96 on `:active`.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "anchor-popovers-to-triggers",
    skill: "emil-design-eng",
    title: "Grow popovers from their trigger",
    description: "Animate popovers from the trigger edge, not the center.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "interaction-design",
    ],
  },
  {
    slug: "group-with-space-not-lines",
    skill: "better-layout",
    title: "Group with space, not lines",
    description: "Separate groups with spacing before adding divider lines.",
    related: ["improve-ui", "better-interface", "baseline-ui", "better-ui"],
  },
  {
    slug: "peek-the-next-scroll-item",
    skill: "better-layout",
    title: "Peek the next scroll item",
    description: "Let 16–32px of the next item peek past the scroll edge.",
    related: [
      "improve-ui",
      "better-interface",
      "better-ui",
      "interaction-design",
    ],
  },
  {
    slug: "outline-images-neutrally",
    skill: "better-ui",
    title: "Outline images with neutral hairlines",
    description: "Use a neutral hairline outline on images, not a tinted ring.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-colors",
      "better-interface",
    ],
  },
  {
    slug: "clamp-overflowing-titles",
    skill: "better-typography",
    title: "Clamp overflowing titles",
    description: "Use `line-clamp` or `truncate` in dense UI.",
    related: ["improve-ui", "baseline-ui", "better-interface", "better-ui"],
  },
  {
    slug: "keep-secondary-text-readable",
    skill: "better-accessibility",
    title: "Keep secondary text readable",
    description: "Keep secondary text readable on its background.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-colors",
      "baseline-ui",
    ],
  },
  {
    slug: "avoid-entering-from-scale-zero",
    skill: "emil-design-eng",
    title: "Avoid entering from scale zero",
    description: "Start entrances at ~`scale(0.95)`, not `scale(0)`.",
    related: [
      "improve-ui",
      "improve-animations",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-structural-skeletons",
    skill: "baseline-ui",
    title: "Use structural skeletons",
    description: "Match loading placeholders to content shape, not spinners.",
    related: ["improve-ui", "better-ui", "better-interface", "baseline-ui"],
  },
  {
    slug: "limit-accent-color-usage",
    skill: "baseline-ui",
    title: "Limit accent color usage",
    description: "One accent per view; keep secondary actions neutral.",
    related: [
      "improve-ui",
      "better-colors",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "cap-line-length",
    skill: "better-typography",
    title: "Cap line length",
    description: "Cap long-form copy around 60–75 characters per line.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-interface",
      "better-writing",
    ],
  },
  {
    slug: "use-shadow-for-elevation",
    skill: "better-ui",
    title: "Use shadow for elevation",
    description: "Use shadow for depth; reserve borders for structure.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "beautiful-shadows",
    ],
  },
  {
    slug: "show-visible-focus-rings",
    skill: "better-accessibility",
    title: "Show visible focus rings",
    description:
      "Style `:focus-visible`. Never remove outlines without a replacement.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "baseline-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "show-errors-beside-fields",
    skill: "baseline-ui",
    title: "Show errors beside fields",
    description: "Put validation errors directly under the field.",
    related: [
      "improve-ui",
      "better-accessibility",
      "fixing-accessibility",
      "web-design-guidelines",
    ],
  },
  {
    slug: "label-every-form-field",
    skill: "fixing-accessibility",
    title: "Label every form field",
    description: "Use a visible label; never rely on placeholder text alone.",
    related: [
      "improve-ui",
      "better-accessibility",
      "baseline-ui",
      "wcag-audit-patterns",
    ],
  },
  {
    slug: "give-empty-states-one-action",
    skill: "baseline-ui",
    title: "Give empty states one action",
    description: "Empty states need one clear next step, not just explanation.",
    related: ["improve-ui", "better-ui", "better-interface", "better-layout"],
  },
  {
    slug: "use-sentence-case-labels",
    skill: "better-typography",
    title: "Use sentence case labels",
    description: "Write labels in sentence case, not ALL CAPS.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-interface",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "pair-status-with-labels",
    skill: "better-accessibility",
    title: "Pair status with labels",
    description:
      "Never rely on color alone. Add text or an icon beside status.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "wcag-audit-patterns",
      "baseline-ui",
    ],
  },
  {
    slug: "use-ease-out-on-enter",
    skill: "emil-design-eng",
    title: "Use ease-out on enter",
    description:
      "Entrances should use `ease-out`. `ease-in` feels sluggish on open.",
    related: ["improve-ui", "apple-design", "improve-animations", "better-ui"],
  },
  {
    slug: "align-icons-optically",
    skill: "better-ui",
    title: "Align icons optically",
    description:
      "When geometric centering looks off, nudge icons so they align with the eye.",
    related: [
      "improve-ui",
      "emil-design-eng",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "match-icon-stroke-weight",
    skill: "better-ui",
    title: "Match icon stroke to text",
    description:
      "Use 2px icon stroke beside semibold text; 1.5px beside regular.",
    related: [
      "improve-ui",
      "better-typography",
      "make-interfaces-feel-better",
      "better-interface",
    ],
  },
  {
    slug: "use-outline-icons-by-default",
    skill: "better-ui",
    title: "Use outline icons by default",
    description:
      "Outline icons are default. Reserve fill for the active state.",
    related: [
      "improve-ui",
      "make-interfaces-feel-better",
      "better-interface",
      "apple-design",
    ],
  },
  {
    slug: "avoid-glow-primary-actions",
    skill: "baseline-ui",
    title: "Avoid glow on primary actions",
    description: "Do not use glow effects as the main call to action.",
    related: [
      "improve-ui",
      "better-ui",
      "make-interfaces-feel-better",
      "frontend-design",
    ],
  },
  {
    slug: "animate-icon-state-changes",
    skill: "better-ui",
    title: "Animate icon state changes",
    description: "Cross-fade contextual icons with opacity, scale, and blur.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "give-targets-breathing-room",
    skill: "better-layout",
    title: "Give targets breathing room",
    description: "Leave ~12px between adjacent bordered controls.",
    related: [
      "improve-ui",
      "better-accessibility",
      "better-interface",
      "baseline-ui",
    ],
  },
  {
    slug: "inset-primary-actions",
    skill: "better-layout",
    title: "Inset primary actions",
    description:
      "Keep full-width buttons inside layout margins, not edge to edge.",
    related: ["improve-ui", "better-interface", "better-ui", "ui-ux-pro-max"],
  },
  {
    slug: "tighten-heading-line-height",
    skill: "better-typography",
    title: "Tighten heading line-height",
    description: "Use tighter line-height on short headings (~1.1).",
    related: ["improve-ui", "baseline-ui", "apple-design", "better-interface"],
  },
  {
    slug: "tune-tracking-by-size",
    skill: "better-typography",
    title: "Tune tracking by size",
    description:
      "Large display text often needs slightly negative letter-spacing.",
    related: ["improve-ui", "apple-design", "baseline-ui", "better-interface"],
  },
  {
    slug: "confirm-destructive-actions",
    skill: "baseline-ui",
    title: "Confirm destructive actions",
    description: "Use a dialog before irreversible or destructive actions.",
    related: [
      "improve-ui",
      "fixing-accessibility",
      "better-accessibility",
      "interaction-design",
    ],
  },
  {
    slug: "fade-scroll-edges",
    skill: "apple-design",
    title: "Fade scroll edges",
    description:
      "Use a `mask-image` scroll fade on the list so edges dissolve as you scroll.",
    related: [
      "improve-ui",
      "better-layout",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "stagger-infrequent-entrances",
    skill: "better-ui",
    title: "Stagger infrequent entrances",
    description: "Stagger hero chunks by ~100ms on first load, not routine UI.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "keep-exits-subtle",
    skill: "better-ui",
    title: "Keep exits subtle",
    description:
      "Use a small fixed translateY on exit. Softer than the enter, not full-height travel.",
    related: [
      "improve-ui",
      "improve-animations",
      "emil-design-eng",
      "fixing-motion-performance",
    ],
  },
  {
    slug: "warm-toolbar-tooltips",
    skill: "emil-design-eng",
    title: "Warm toolbar tooltips",
    description: "Skip tooltip delay after the first one in a toolbar opens.",
    related: [
      "improve-ui",
      "better-ui",
      "interaction-design",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-interruptible-transitions",
    skill: "better-ui",
    title: "Use interruptible transitions",
    description:
      "Prefer CSS transitions over keyframes for interactive open/close.",
    related: [
      "improve-ui",
      "emil-design-eng",
      "fixing-motion-performance",
      "improve-animations",
    ],
  },
  {
    slug: "restrain-high-frequency-motion",
    skill: "better-ui",
    title: "Restrain high-frequency motion",
    description:
      "Reserve enter animations for first load. Tab switches need instant feedback, not a replayed entrance.",
    related: [
      "improve-ui",
      "fixing-motion-performance",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "use-ease-not-spring-for-feedback",
    skill: "to-spring-or-not-to-spring",
    title: "Use ease-out for system feedback",
    description:
      "System state changes should ease out. Springs wobble on toggles and toasts.",
    related: [
      "improve-ui",
      "better-ui",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "fade-menus-out",
    skill: "mastering-animate-presence",
    title: "Fade menus out",
    description:
      "Let menus exit with a short fade. Don't yank them off screen.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "emil-design-eng",
    ],
  },
  {
    slug: "reserve-brand-color-for-links",
    skill: "better-colors",
    title: "Reserve brand color for links",
    description: "Keep headings neutral. Reserve link color for actions.",
    related: [
      "improve-ui",
      "baseline-ui",
      "better-ui",
      "make-interfaces-feel-better",
    ],
  },
  {
    slug: "use-solid-modal-scrims",
    skill: "fixing-motion-performance",
    title: "Use solid modal scrims",
    description: "Backdrop blur repaints the whole screen.",
    related: ["improve-ui", "60fps-animation", "better-ui", "apple-design"],
  },
  {
    slug: "fade-truncated-text",
    skill: "better-typography",
    title: "Fade truncated text",
    description: "Soft-fade overflowing labels. A hard ellipsis feels abrupt.",
    related: ["improve-ui", "baseline-ui", "better-ui", "apple-design"],
  },
  {
    slug: "enter-and-exit-on-the-same-path",
    skill: "apple-design",
    title: "Enter and exit on the same path",
    description: "Dismiss along the same path the surface arrived on.",
    related: [
      "improve-ui",
      "better-ui",
      "emil-design-eng",
      "improve-animations",
    ],
  },
  {
    slug: "blur-imperfect-label-morphs",
    skill: "emil-design-eng",
    title: "Blur imperfect label morphs",
    description:
      "Soften label swaps with a short blur so two states don't flash mid-fade.",
    related: [
      "improve-ui",
      "better-ui",
      "improve-animations",
      "interaction-design",
    ],
  },
];

const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));

const relatedSkillPool = [
  "impeccable",
  "layout",
  "harden",
  "web-quality-audit",
  "frontend-ui-engineering",
  "react-best-practices",
  "web-design-guidelines",
  "ui-ux-pro-max",
  "interaction-design",
  "frontend-design",
  "design-first-ui-prompting",
  "high-end-visual-design",
  "minimalist-ui",
  "design-lab",
  "prototype",
  "better-interface",
  "better-layout",
  "better-accessibility",
  "better-typography",
  "better-colors",
  "better-writing",
  "fixing-accessibility",
  "fixing-motion-performance",
  "beautiful-shadows",
  "12-principles-of-animation",
  "apple-design",
  "improve-animations",
  "review-animations",
  "accessible-animation",
  "better-ui",
];

for (const skillSlug of relatedSkillPool) {
  if (!skillBySlug.has(skillSlug)) {
    throw new Error(`Unknown related skill pool slug: ${skillSlug}`);
  }
}

const playbook = rawPlaybook.map((entry) => {
  const sourceKeys = new Set<string>();
  const related: string[] = [];

  for (const skillSlug of [
    "improve-ui",
    ...entry.related,
    ...relatedSkillPool,
  ]) {
    const skill = skillBySlug.get(skillSlug);
    if (
      !skill ||
      related.includes(skillSlug) ||
      sourceKeys.has(skill.sourceKey ?? "")
    ) {
      continue;
    }

    related.push(skillSlug);
    sourceKeys.add(skill.sourceKey ?? "");
    if (related.length === 4) break;
  }

  return { ...entry, related };
});

const seenSlugs = new Set<string>();
for (const entry of rawPlaybook) {
  if (seenSlugs.has(entry.slug)) {
    throw new Error(`Duplicate playbook slug: ${entry.slug}`);
  }

  seenSlugs.add(entry.slug);

  if (!playbookDemoSlugs.includes(entry.slug)) {
    throw new Error(`Missing playbook demo for entry: ${entry.slug}`);
  }

  if (!skillBySlug.has(entry.skill)) {
    throw new Error(`Unknown skill slug for playbook entry: ${entry.skill}`);
  }

  for (const relatedSkillSlug of entry.related) {
    if (!skillBySlug.has(relatedSkillSlug)) {
      throw new Error(
        `Unknown related skill slug for playbook entry ${entry.slug}: ${relatedSkillSlug}`,
      );
    }
  }
}

for (const entry of playbook) {
  const authors = entry.related.map((slug) => skillBySlug.get(slug)?.sourceKey);
  if (
    entry.related.length !== 4 ||
    entry.related[0] !== "improve-ui" ||
    authors.some((sourceKey) => !sourceKey) ||
    new Set(authors).size !== 4
  ) {
    throw new Error(
      `Playbook entry ${entry.slug} must have 4 related skills from distinct authors with improve-ui first`,
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
    playbook.filter((entry) => entry.skill === skill.slug),
  ]),
);
