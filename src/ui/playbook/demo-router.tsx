import type { PlaybookDemoId } from "../../data/playbook.ts";
import BreathingRoomDemo from "./breathing-room-demo";
import ColorMeansLinkDemo from "./color-means-link-demo";
import ConcentricRadiusDemo from "./concentric-radius-demo";
import DestructiveDialogDemo from "./destructive-dialog-demo";
import EaseOutEnterDemo from "./ease-out-enter-demo";
import EmptyStateCtaDemo from "./empty-state-cta-demo";
import FocusRingDemo from "./focus-ring-demo";
import HeadingLineHeightDemo from "./heading-line-height-demo";
import IconStateCrossfadeDemo from "./icon-state-crossfade-demo";
import IconStrokeWeightDemo from "./icon-stroke-weight-demo";
import ImageOutlineDemo from "./image-outline-demo";
import InlineErrorDemo from "./inline-error-demo";
import InsetCtaDemo from "./inset-cta-demo";
import InterruptibleTransitionDemo from "./interruptible-transition-demo";
import LabelFormFieldsDemo from "./label-form-fields-demo";
import LabelMorphDemo from "./label-morph-demo";
import LineClampDemo from "./line-clamp-demo";
import LineMeasureDemo from "./line-measure-demo";
import MenuExitDemo from "./menu-exit-demo";
import ModalScrimDemo from "./modal-scrim-demo";
import MotionRestraintDemo from "./motion-restraint-demo";
import NoGlowCtaDemo from "./no-glow-cta-demo";
import OneAccentDemo from "./one-accent-demo";
import OpticalAlignmentDemo from "./optical-alignment-demo";
import OutlineIconsDefaultDemo from "./outline-icons-default-demo";
import PopoverOriginDemo from "./popover-origin-demo";
import SamePathMotionDemo from "./same-path-motion-demo";
import ScaleEnterDemo from "./scale-enter-demo";
import ScaleOnPressDemo from "./scale-on-press-demo";
import ScrollEdgeFadeDemo from "./scroll-edge-fade-demo";
import ScrollPeekDemo from "./scroll-peek-demo";
import SentenceCaseLabelsDemo from "./sentence-case-labels-demo";
import ShadowElevationDemo from "./shadow-elevation-demo";
import SkeletonLoadingDemo from "./skeleton-loading-demo";
import SoftTruncateDemo from "./soft-truncate-demo";
import SpaceNotLinesDemo from "./space-not-lines-demo";
import SpringVsEaseDemo from "./spring-vs-ease-demo";
import StaggerEnterDemo from "./stagger-enter-demo";
import StatusNotColorAloneDemo from "./status-not-color-alone-demo";
import SubtleExitDemo from "./subtle-exit-demo";
import TabularNumsDemo from "./tabular-nums-demo";
import TextBalanceDemo from "./text-balance-demo";
import TextContrastDemo from "./text-contrast-demo";
import TooltipWarmDemo from "./tooltip-warm-demo";
import TouchTargetDemo from "./touch-target-demo";
import TrackingBySizeDemo from "./tracking-by-size-demo";

const demos = {
  "text-balance": TextBalanceDemo,
  "tabular-nums": TabularNumsDemo,
  "touch-target": TouchTargetDemo,
  "concentric-radius": ConcentricRadiusDemo,
  "scale-on-press": ScaleOnPressDemo,
  "popover-origin": PopoverOriginDemo,
  "space-not-lines": SpaceNotLinesDemo,
  "scroll-peek": ScrollPeekDemo,
  "image-outline": ImageOutlineDemo,
  "line-clamp": LineClampDemo,
  "text-contrast": TextContrastDemo,
  "scale-enter": ScaleEnterDemo,
  "skeleton-loading": SkeletonLoadingDemo,
  "one-accent": OneAccentDemo,
  "line-measure": LineMeasureDemo,
  "shadow-elevation": ShadowElevationDemo,
  "focus-ring": FocusRingDemo,
  "inline-error": InlineErrorDemo,
  "label-form-fields": LabelFormFieldsDemo,
  "empty-state-cta": EmptyStateCtaDemo,
  "sentence-case-labels": SentenceCaseLabelsDemo,
  "status-not-color-alone": StatusNotColorAloneDemo,
  "ease-out-enter": EaseOutEnterDemo,
  "optical-alignment": OpticalAlignmentDemo,
  "icon-stroke-weight": IconStrokeWeightDemo,
  "outline-icons-default": OutlineIconsDefaultDemo,
  "no-glow-cta": NoGlowCtaDemo,
  "icon-state-crossfade": IconStateCrossfadeDemo,
  "breathing-room": BreathingRoomDemo,
  "inset-cta": InsetCtaDemo,
  "heading-line-height": HeadingLineHeightDemo,
  "tracking-by-size": TrackingBySizeDemo,
  "destructive-dialog": DestructiveDialogDemo,
  "scroll-edge-fade": ScrollEdgeFadeDemo,
  "stagger-enter": StaggerEnterDemo,
  "subtle-exit": SubtleExitDemo,
  "tooltip-warm": TooltipWarmDemo,
  "interruptible-transition": InterruptibleTransitionDemo,
  "motion-restraint": MotionRestraintDemo,
  "spring-vs-ease": SpringVsEaseDemo,
  "menu-exit": MenuExitDemo,
  "color-means-link": ColorMeansLinkDemo,
  "modal-scrim": ModalScrimDemo,
  "soft-truncate": SoftTruncateDemo,
  "same-path-motion": SamePathMotionDemo,
  "label-morph": LabelMorphDemo,
} as const;

type PlaybookDemoRouterProps = {
  demoId: PlaybookDemoId;
};

export function PlaybookDemoRouter({ demoId }: PlaybookDemoRouterProps) {
  const Demo = demos[demoId];
  return <Demo />;
}
