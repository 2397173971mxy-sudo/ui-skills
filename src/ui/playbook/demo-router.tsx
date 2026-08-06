import type { PlaybookDemoId } from "../../data/playbook.ts";
import ConcentricRadiusDemo from "./concentric-radius-demo";
import EmptyStateCtaDemo from "./empty-state-cta-demo";
import EaseOutEnterDemo from "./ease-out-enter-demo";
import FocusRingDemo from "./focus-ring-demo";
import IconStrokeWeightDemo from "./icon-stroke-weight-demo";
import ImageOutlineDemo from "./image-outline-demo";
import InlineErrorDemo from "./inline-error-demo";
import LabelFormFieldsDemo from "./label-form-fields-demo";
import LineClampDemo from "./line-clamp-demo";
import LineMeasureDemo from "./line-measure-demo";
import NoGlowCtaDemo from "./no-glow-cta-demo";
import OneAccentDemo from "./one-accent-demo";
import OpticalAlignmentDemo from "./optical-alignment-demo";
import OutlineIconsDefaultDemo from "./outline-icons-default-demo";
import PopoverOriginDemo from "./popover-origin-demo";
import ScaleEnterDemo from "./scale-enter-demo";
import ScaleOnPressDemo from "./scale-on-press-demo";
import ScrollPeekDemo from "./scroll-peek-demo";
import SentenceCaseLabelsDemo from "./sentence-case-labels-demo";
import ShadowElevationDemo from "./shadow-elevation-demo";
import SkeletonLoadingDemo from "./skeleton-loading-demo";
import SpaceNotLinesDemo from "./space-not-lines-demo";
import StatusNotColorAloneDemo from "./status-not-color-alone-demo";
import TabularNumsDemo from "./tabular-nums-demo";
import TextBalanceDemo from "./text-balance-demo";
import TextContrastDemo from "./text-contrast-demo";
import TouchTargetDemo from "./touch-target-demo";

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
} as const;

type PlaybookDemoRouterProps = {
  demoId: PlaybookDemoId;
};

export function PlaybookDemoRouter({ demoId }: PlaybookDemoRouterProps) {
  const Demo = demos[demoId];
  return <Demo />;
}
