import type { PlaybookDemoId } from "../../data/playbook.ts";
import ConcentricRadiusDemo from "./concentric-radius-demo";
import FocusRingDemo from "./focus-ring-demo";
import ImageOutlineDemo from "./image-outline-demo";
import InlineErrorDemo from "./inline-error-demo";
import LineClampDemo from "./line-clamp-demo";
import LineMeasureDemo from "./line-measure-demo";
import OneAccentDemo from "./one-accent-demo";
import PopoverOriginDemo from "./popover-origin-demo";
import ScaleEnterDemo from "./scale-enter-demo";
import ScaleOnPressDemo from "./scale-on-press-demo";
import ScrollPeekDemo from "./scroll-peek-demo";
import ShadowElevationDemo from "./shadow-elevation-demo";
import SkeletonLoadingDemo from "./skeleton-loading-demo";
import SpaceNotLinesDemo from "./space-not-lines-demo";
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
} as const;

type PlaybookDemoRouterProps = {
  demoId: PlaybookDemoId;
};

export function PlaybookDemoRouter({ demoId }: PlaybookDemoRouterProps) {
  const Demo = demos[demoId];
  return <Demo />;
}
