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
    title: "Keep image space stable",
    description:
      "Set `aspect-ratio` so nearby content does not jump while an image loads.",
    related: ["improve-ui", "better-interface", "better-ui", "better-layout"],
  },
  {
    slug: "use-text-balance",
    skill: "baseline-ui",
    title: "Make text easier to scan",
    description:
      "Use `text-balance` for headings and `text-pretty` for body copy.",
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
    title: "Line up numbers",
    description: "Use `tabular-nums` when numbers should line up.",
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
    title: "Make controls easy to tap",
    description:
      "Give every interactive control a target of at least 44 x 44px.",
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
    title: "Make nested corners match",
    description: "Set the outer radius to the inner radius plus the padding.",
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
    title: "Shrink buttons when pressed",
    description: "Scale pressed controls to about 0.96 with `:active`.",
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
    title: "Open popovers from their control",
    description:
      "Animate a popover from the edge of the control that opened it.",
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
    title: "Use space to group content",
    description: "Add spacing between groups before adding divider lines.",
    related: ["improve-ui", "better-interface", "baseline-ui", "better-ui"],
  },
  {
    slug: "peek-the-next-scroll-item",
    skill: "better-layout",
    title: "Show the next scroll item",
    description: "Let 16 to 32px of the next item show at the scroll edge.",
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
    title: "Keep image outlines neutral",
    description: "Use a thin neutral outline instead of a tinted ring.",
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
    title: "Keep long titles tidy",
    description: "Use `line-clamp` or `truncate` when space is tight.",
    related: ["improve-ui", "baseline-ui", "better-interface", "better-ui"],
  },
  {
    slug: "keep-secondary-text-readable",
    skill: "better-accessibility",
    title: "Keep muted text readable",
    description:
      "Check that muted text has enough contrast with its background.",
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
    title: "Start motion near full size",
    description: "Start entrances around `scale(0.95)`, not `scale(0)`.",
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
    title: "Match loading placeholders",
    description:
      "Make loading shapes match the content they replace. Skip spinners when possible.",
    related: ["improve-ui", "better-ui", "better-interface", "baseline-ui"],
  },
  {
    slug: "limit-accent-color-usage",
    skill: "baseline-ui",
    title: "Use one accent color",
    description: "Use one accent per view. Keep secondary actions neutral.",
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
    title: "Keep text lines short",
    description: "Keep long-form text around 60 to 75 characters per line.",
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
    title: "Use shadow for depth",
    description: "Use shadows to show depth. Use borders to show structure.",
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
    title: "Keep focus visible",
    description:
      "Style `:focus-visible`. Never remove the focus outline without a replacement.",
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
    title: "Show errors next to fields",
    description: "Put each validation error directly below its field.",
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
    title: "Label every field",
    description:
      "Use a visible label. Do not use placeholder text as the only label.",
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
    title: "Give empty states one next step",
    description:
      "Give an empty state one clear action, not just an explanation.",
    related: ["improve-ui", "better-ui", "better-interface", "better-layout"],
  },
  {
    slug: "use-sentence-case-labels",
    skill: "better-typography",
    title: "Use sentence case",
    description: "Write labels in sentence case, not all caps.",
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
    title: "Do not use color alone",
    description: "Add text or an icon next to every color-based status.",
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
    title: "Use ease-out when things open",
    description:
      "Use `ease-out` for entrances. `ease-in` feels slow when something opens.",
    related: ["improve-ui", "apple-design", "improve-animations", "better-ui"],
  },
  {
    slug: "align-icons-optically",
    skill: "better-ui",
    title: "Align icons by eye",
    description:
      "If geometric centering looks wrong, nudge the icon until it looks aligned.",
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
    title: "Match icon weight to text",
    description:
      "Use a 2px stroke beside semibold text and a 1.5px stroke beside regular text.",
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
    title: "Use outline icons first",
    description:
      "Use outline icons by default. Use a fill for the active state.",
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
    title: "Skip glow on primary actions",
    description: "Do not use a glow to make the main action stand out.",
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
    title: "Animate icon changes",
    description: "Cross-fade changing icons with opacity, scale, and blur.",
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
    title: "Leave controls room",
    description: "Leave about 12px between nearby bordered controls.",
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
    title: "Keep main buttons inside the margins",
    description:
      "Keep full-width buttons inside the page margins, not edge to edge.",
    related: ["improve-ui", "better-interface", "better-ui", "ui-ux-pro-max"],
  },
  {
    slug: "tighten-heading-line-height",
    skill: "better-typography",
    title: "Tighten heading line height",
    description: "Use a line height near 1.1 for short headings.",
    related: ["improve-ui", "baseline-ui", "apple-design", "better-interface"],
  },
  {
    slug: "tune-tracking-by-size",
    skill: "better-typography",
    title: "Adjust letter spacing by size",
    description:
      "Large display text often needs slightly tighter letter spacing.",
    related: ["improve-ui", "apple-design", "baseline-ui", "better-interface"],
  },
  {
    slug: "confirm-destructive-actions",
    skill: "baseline-ui",
    title: "Confirm destructive actions",
    description: "Ask for confirmation before an irreversible action.",
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
    title: "Fade the scroll edges",
    description:
      "Use a `mask-image` fade so the list edges soften while you scroll.",
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
    title: "Stagger rare entrances",
    description:
      "Stagger hero sections by about 100ms on first load. Do not use it for routine UI.",
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
    title: "Keep exits short",
    description:
      "Use a small fixed `translateY` on exit. Keep it softer than the entrance.",
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
    title: "Open the next tooltip faster",
    description:
      "After one tooltip opens, open the next one without the full delay.",
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
    title: "Keep transitions interruptible",
    description: "Use CSS transitions for interactive open and close states.",
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
    title: "Keep repeated motion instant",
    description:
      "Use entrance animations on first load only. Keep tab switches instant.",
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
    title: "Use ease-out for feedback",
    description:
      "Use `ease-out` for state changes. Springs can wobble on toggles and toasts.",
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
      "Close menus with a short fade. Do not move them far off screen.",
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
    title: "Save brand color for links",
    description:
      "Keep headings neutral. Use the brand color for links and actions.",
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
    title: "Use a solid modal backdrop",
    description: "Use a solid backdrop. Blur can repaint the whole screen.",
    related: ["improve-ui", "60fps-animation", "better-ui", "apple-design"],
  },
  {
    slug: "fade-truncated-text",
    skill: "better-typography",
    title: "Fade clipped text",
    description:
      "Soft-fade overflowing labels instead of ending them with a hard ellipsis.",
    related: ["improve-ui", "baseline-ui", "better-ui", "apple-design"],
  },
  {
    slug: "enter-and-exit-on-the-same-path",
    skill: "apple-design",
    title: "Use the same path in and out",
    description: "Close a surface along the same path it used to open.",
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
    title: "Soften label changes",
    description:
      "Add a short blur when labels change so the two states do not flash together.",
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
