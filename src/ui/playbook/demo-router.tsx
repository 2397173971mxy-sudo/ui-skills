import type { PlaybookDemoId } from "../../data/playbook.ts";
import AccessibleIconButtonDemo from "./accessible-icon-button-demo";
import CompositorMotionDemo from "./compositor-motion-demo";
import FocusVisibleDemo from "./focus-visible-demo";
import InlineValidationDemo from "./inline-validation-demo";
import ReducedMotionDemo from "./reduced-motion-demo";
import StableMediaDemo from "./stable-media-demo";
import TabularNumsDemo from "./tabular-nums-demo";
import TextBalanceDemo from "./text-balance-demo";
import TouchTargetDemo from "./touch-target-demo";

const demos = {
  "text-balance": TextBalanceDemo,
  "tabular-nums": TabularNumsDemo,
  "accessible-icon-button": AccessibleIconButtonDemo,
  "focus-visible": FocusVisibleDemo,
  "touch-target": TouchTargetDemo,
  "compositor-motion": CompositorMotionDemo,
  "reduced-motion": ReducedMotionDemo,
  "inline-validation": InlineValidationDemo,
  "stable-media": StableMediaDemo,
} as const;

type PlaybookDemoRouterProps = {
  demoId: PlaybookDemoId;
};

export function PlaybookDemoRouter({ demoId }: PlaybookDemoRouterProps) {
  const Demo = demos[demoId];
  return <Demo />;
}
