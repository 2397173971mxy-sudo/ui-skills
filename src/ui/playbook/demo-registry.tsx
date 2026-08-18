import { lazy, type ComponentType } from "react";
import { playbookDemoSlugs } from "../../data/playbook-demos";

const demo = (loader: () => Promise<{ default: ComponentType }>) =>
  lazy(loader);

export const demos = {
  "reserve-space-with-aspect-ratio": demo(() => import("./aspect-ratio-demo")),
  "use-text-balance": demo(() => import("./text-balance-demo")),
  "use-tabular-nums-for-data": demo(() => import("./tabular-nums-demo")),
  "use-large-touch-targets": demo(() => import("./touch-target-demo")),
  "use-concentric-border-radius": demo(
    () => import("./concentric-radius-demo"),
  ),
  "add-scale-on-press": demo(() => import("./scale-on-press-demo")),
  "anchor-popovers-to-triggers": demo(() => import("./popover-origin-demo")),
  "group-with-space-not-lines": demo(() => import("./space-not-lines-demo")),
  "peek-the-next-scroll-item": demo(() => import("./scroll-peek-demo")),
  "outline-images-neutrally": demo(() => import("./image-outline-demo")),
  "clamp-overflowing-titles": demo(() => import("./line-clamp-demo")),
  "keep-secondary-text-readable": demo(() => import("./text-contrast-demo")),
  "avoid-entering-from-scale-zero": demo(() => import("./scale-enter-demo")),
  "use-structural-skeletons": demo(() => import("./skeleton-loading-demo")),
  "limit-accent-color-usage": demo(() => import("./one-accent-demo")),
  "cap-line-length": demo(() => import("./line-measure-demo")),
  "use-shadow-for-elevation": demo(() => import("./shadow-elevation-demo")),
  "show-visible-focus-rings": demo(() => import("./focus-ring-demo")),
  "show-errors-beside-fields": demo(() => import("./inline-error-demo")),
  "label-every-form-field": demo(() => import("./label-form-fields-demo")),
  "give-empty-states-one-action": demo(() => import("./empty-state-cta-demo")),
  "use-sentence-case-labels": demo(() => import("./sentence-case-labels-demo")),
  "pair-status-with-labels": demo(
    () => import("./status-not-color-alone-demo"),
  ),
  "use-ease-out-on-enter": demo(() => import("./ease-out-enter-demo")),
  "align-icons-optically": demo(() => import("./optical-alignment-demo")),
  "match-icon-stroke-weight": demo(() => import("./icon-stroke-weight-demo")),
  "use-outline-icons-by-default": demo(
    () => import("./outline-icons-default-demo"),
  ),
  "avoid-glow-primary-actions": demo(() => import("./no-glow-cta-demo")),
  "animate-icon-state-changes": demo(
    () => import("./icon-state-crossfade-demo"),
  ),
  "give-targets-breathing-room": demo(() => import("./breathing-room-demo")),
  "inset-primary-actions": demo(() => import("./inset-cta-demo")),
  "tighten-heading-line-height": demo(
    () => import("./heading-line-height-demo"),
  ),
  "tune-tracking-by-size": demo(() => import("./tracking-by-size-demo")),
  "confirm-destructive-actions": demo(
    () => import("./destructive-dialog-demo"),
  ),
  "fade-scroll-edges": demo(() => import("./scroll-edge-fade-demo")),
  "stagger-infrequent-entrances": demo(() => import("./stagger-enter-demo")),
  "keep-exits-subtle": demo(() => import("./subtle-exit-demo")),
  "warm-toolbar-tooltips": demo(() => import("./tooltip-warm-demo")),
  "use-interruptible-transitions": demo(
    () => import("./interruptible-transition-demo"),
  ),
  "restrain-high-frequency-motion": demo(
    () => import("./motion-restraint-demo"),
  ),
  "use-ease-not-spring-for-feedback": demo(
    () => import("./spring-vs-ease-demo"),
  ),
  "fade-menus-out": demo(() => import("./menu-exit-demo")),
  "reserve-brand-color-for-links": demo(
    () => import("./color-means-link-demo"),
  ),
  "use-solid-modal-scrims": demo(() => import("./modal-scrim-demo")),
  "fade-truncated-text": demo(() => import("./soft-truncate-demo")),
  "enter-and-exit-on-the-same-path": demo(
    () => import("./same-path-motion-demo"),
  ),
  "blur-imperfect-label-morphs": demo(() => import("./label-morph-demo")),
} as const;

export const registeredDemoSlugs = Object.keys(demos);

if (registeredDemoSlugs.join("\n") !== playbookDemoSlugs.join("\n")) {
  throw new Error("Playbook demo registry and data slugs are out of sync");
}
