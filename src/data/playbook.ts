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
    relatedSkills: ["better-typography", "make-interfaces-feel-better"],
    topics: ["typography", "visual", "craft"],
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
    relatedSkills: ["better-typography", "make-interfaces-feel-better"],
    topics: ["typography", "systems", "craft"],
  },
  {
    slug: "use-large-touch-targets",
    skillSlug: "better-accessibility",
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
    relatedSkills: ["fixing-accessibility", "better-ui"],
    topics: ["interaction", "accessibility", "frontend"],
  },
  {
    slug: "use-concentric-border-radius",
    skillSlug: "better-ui",
    demo: "concentric-radius",
    title: "Nest corners concentrically",
    direct:
      "Set the outer radius to inner radius plus padding on nested surfaces: outer = inner + padding (e.g. 24px = 16px + 8px).",
    rule: "SHOULD keep nested border radii concentric: outer = inner + padding.",
    why: "Matched radii on nested elements make corners look pinched and off.",
    goodExample: `<div className="rounded-2xl p-2"><div className="rounded-lg">...</div></div>`,
    badExample: `<div className="rounded-xl p-2"><div className="rounded-xl">...</div></div>`,
    prompt:
      "Fix nested border radii so outer corners follow inner radius plus padding.",
    relatedSkills: ["make-interfaces-feel-better", "better-interface"],
    topics: ["visual", "craft", "systems"],
  },
  {
    slug: "add-scale-on-press",
    skillSlug: "emil-design-eng",
    demo: "scale-on-press",
    title: "Give buttons press feedback",
    direct: "Scale pressable controls to about `0.96` on `:active`.",
    rule: "SHOULD use a subtle `scale(0.96)` press state on interactive controls.",
    why: "A tiny scale-down confirms the interface heard the tap.",
    goodExample: `<button className="transition-transform active:scale-[0.96]">Save</button>`,
    badExample: `<button>Save</button>`,
    prompt: "Add subtle press feedback with `active:scale-[0.96]`.",
    relatedSkills: ["better-ui", "improve-animations"],
    topics: ["interaction", "motion", "craft"],
  },
  {
    slug: "anchor-popovers-to-triggers",
    skillSlug: "emil-design-eng",
    demo: "popover-origin",
    title: "Grow popovers from their trigger",
    direct:
      "Set `transform-origin` to the trigger edge instead of the panel center.",
    rule: "SHOULD animate popovers from their trigger, not from center.",
    why: "Origin-aware motion keeps the relationship between trigger and surface clear.",
    goodExample: `.popover { transform-origin: var(--transform-origin); }`,
    badExample: `.popover { transform-origin: center; }`,
    prompt:
      "Make this popover scale from its trigger instead of from its center.",
    relatedSkills: ["better-ui", "improve-animations"],
    topics: ["motion", "interaction", "craft"],
  },
  {
    slug: "group-with-space-not-lines",
    skillSlug: "better-layout",
    demo: "space-not-lines",
    title: "Group with space, not lines",
    direct: "Separate groups with spacing at least 2× the gap inside a group.",
    rule: "SHOULD group related content with space before adding separator lines.",
    why: "Whitespace communicates structure with less visual noise than rules everywhere.",
    goodExample: `<section className="space-y-8"><div className="space-y-2">...</div></section>`,
    badExample: `<div className="divide-y border-b">...</div>`,
    prompt:
      "Replace repeated divider lines with spacing between content groups.",
    relatedSkills: ["better-interface", "baseline-ui"],
    topics: ["systems", "visual", "craft"],
  },
  {
    slug: "peek-the-next-scroll-item",
    skillSlug: "better-layout",
    demo: "scroll-peek",
    title: "Peek the next scroll item",
    direct:
      "Let the next item show 16–32px past the scroll edge as a scroll cue.",
    rule: "SHOULD reveal a sliver of the next item in horizontal scrollers.",
    why: "A hidden edge makes carousels and chip rows feel finished too early.",
    goodExample: `<div className="overflow-x-auto pr-6">...</div>`,
    badExample: `<div className="overflow-x-auto">...</div>`,
    prompt: "Adjust this scroller so the next item peeks past the edge.",
    relatedSkills: ["better-interface", "better-ui"],
    topics: ["interaction", "systems", "frontend"],
  },
  {
    slug: "outline-images-neutrally",
    skillSlug: "better-ui",
    demo: "image-outline",
    title: "Outline images with neutral hairlines",
    direct:
      "Use a low-opacity neutral outline on images instead of a tinted ring.",
    rule: "SHOULD use a pure black or white hairline outline on images, not tinted borders.",
    why: "Tinted outlines pick up the surface color and read as dirt on the edge.",
    goodExample: `<img className="outline outline-1 outline-black/10" />`,
    badExample: `<img className="ring-1 ring-zinc-300" />`,
    prompt:
      "Replace the tinted image border with a neutral low-opacity outline.",
    relatedSkills: ["make-interfaces-feel-better", "better-colors"],
    topics: ["visual", "craft", "color"],
  },
  {
    slug: "clamp-overflowing-titles",
    skillSlug: "better-typography",
    demo: "line-clamp",
    title: "Clamp overflowing titles",
    direct:
      "Use `line-clamp` or `truncate` when dense UI cannot grow with copy.",
    rule: "SHOULD use `truncate` or `line-clamp` for dense UI.",
    why: "Long titles should not blow up card height in lists and tables.",
    goodExample: `<h3 className="line-clamp-2">...</h3>`,
    badExample: `<h3>...</h3>`,
    prompt: "Clamp this title so the card keeps a stable height.",
    relatedSkills: ["baseline-ui", "better-interface"],
    topics: ["typography", "systems", "frontend"],
  },
  {
    slug: "keep-secondary-text-readable",
    skillSlug: "better-accessibility",
    demo: "text-contrast",
    title: "Keep secondary text readable",
    direct: "Ensure body and helper text meet contrast on their background.",
    rule: "MUST keep text contrast sufficient for reading on its surface.",
    why: "Washed-out secondary copy is hard to scan and fails accessibility checks.",
    goodExample: `<p className="text-parchment-700">...</p>`,
    badExample: `<p className="text-parchment-300">...</p>`,
    prompt: "Increase contrast for this secondary text on a white surface.",
    relatedSkills: ["fixing-accessibility", "better-colors"],
    topics: ["accessibility", "typography", "color"],
  },
  {
    slug: "avoid-entering-from-scale-zero",
    skillSlug: "emil-design-eng",
    demo: "scale-enter",
    title: "Avoid entering from scale zero",
    direct:
      "Start entrances around `scale(0.95)` with opacity, not `scale(0)`.",
    rule: "SHOULD not animate elements from `scale(0)`.",
    why: "Nothing in the real world pops into existence from a single point.",
    goodExample: `{ opacity: 0, scale: 0.95 }`,
    badExample: `{ opacity: 0, scale: 0 }`,
    prompt:
      "Change this entrance animation to start from `scale(0.95)` instead of `scale(0)`.",
    relatedSkills: ["improve-animations", "better-ui"],
    topics: ["motion", "craft", "interaction"],
  },
  {
    slug: "use-structural-skeletons",
    skillSlug: "baseline-ui",
    demo: "skeleton-loading",
    title: "Use structural skeletons",
    direct:
      "Prefer skeleton placeholders that match content shape over spinners.",
    rule: "SHOULD use structural skeletons for loading states.",
    why: "Skeletons preserve layout and preview what is coming.",
    goodExample: `<div className="h-3 w-24 animate-pulse rounded-full bg-parchment-200" />`,
    badExample: `<Spinner />`,
    prompt: "Replace this loading spinner with a structural skeleton.",
    relatedSkills: ["better-ui", "better-interface"],
    topics: ["interaction", "systems", "frontend"],
  },
  {
    slug: "limit-accent-color-usage",
    skillSlug: "baseline-ui",
    demo: "one-accent",
    title: "Limit accent color usage",
    direct: "Use one accent per view and keep secondary actions neutral.",
    rule: "SHOULD limit accent color usage to one per view.",
    why: "Multiple loud accents compete and make the hierarchy unclear.",
    goodExample: `<button className="bg-parchment-900">Save</button>`,
    badExample: `<button className="bg-blue-600">Save</button><button className="bg-emerald-600">Publish</button>`,
    prompt: "Reduce this screen to one accent color and neutralize the rest.",
    relatedSkills: ["better-colors", "better-ui"],
    topics: ["visual", "color", "taste"],
  },
  {
    slug: "cap-line-length",
    skillSlug: "better-typography",
    demo: "line-measure",
    title: "Cap line length",
    direct: "Keep long-form copy around 60–75 characters per line.",
    rule: "SHOULD cap paragraph measure for comfortable reading.",
    why: "Full-width paragraphs are harder to track across long lines.",
    goodExample: `<p className="max-w-prose">...</p>`,
    badExample: `<p className="w-full">...</p>`,
    prompt: "Cap this paragraph to a comfortable reading measure.",
    relatedSkills: ["baseline-ui", "better-interface"],
    topics: ["typography", "visual", "craft"],
  },
  {
    slug: "use-shadow-for-elevation",
    skillSlug: "better-ui",
    demo: "shadow-elevation",
    title: "Use shadow for elevation",
    direct:
      "Prefer layered transparent shadows for depth; keep borders for structure.",
    rule: "SHOULD use shadow for elevation instead of heavy decorative borders.",
    why: "Borders used only for depth feel harsh; shadows lift surfaces more naturally.",
    goodExample: `<div className="shadow-lg ring-1 ring-black/5" />`,
    badExample: `<div className="border-2 border-parchment-200" />`,
    prompt:
      "Replace this decorative border with a subtle layered shadow treatment.",
    relatedSkills: ["make-interfaces-feel-better", "better-interface"],
    topics: ["visual", "craft", "systems"],
  },
  {
    slug: "show-visible-focus-rings",
    skillSlug: "better-accessibility",
    demo: "focus-ring",
    title: "Show visible focus rings",
    direct:
      "Style `:focus-visible` with a clear ring instead of removing outlines.",
    rule: "MUST not remove focus outlines without a visible replacement.",
    why: "Keyboard users need to see which control is active.",
    goodExample: `<button className="focus-visible:ring-2 focus-visible:ring-offset-2">...</button>`,
    badExample: `<button className="outline-none">...</button>`,
    prompt: "Add a visible `focus-visible` ring to this control.",
    relatedSkills: ["fixing-accessibility", "baseline-ui"],
    topics: ["accessibility", "interaction", "frontend"],
  },
  {
    slug: "show-errors-beside-fields",
    skillSlug: "baseline-ui",
    demo: "inline-error",
    title: "Show errors beside fields",
    direct: "Place validation errors directly under the field they describe.",
    rule: "MUST show errors next to where the action happens.",
    why: "Distant error text forces users to hunt for what failed.",
    goodExample: `<input aria-invalid /><p id="email-error">Invalid email</p>`,
    badExample: `<input /><p className="mt-8">Invalid email</p>`,
    prompt: "Move this validation error next to the input it belongs to.",
    relatedSkills: ["better-accessibility", "fixing-accessibility"],
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
