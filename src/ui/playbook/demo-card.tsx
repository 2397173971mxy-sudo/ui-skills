import { useState, type ReactNode } from "react";
import { PlaybookSwitch } from "./switch";

type PlaybookDemoCardProps = {
  withoutLabel?: string;
  withLabel?: string;
  contentClassName?: string;
  without: ReactNode;
  with: ReactNode;
};

export function PlaybookDemoCard({
  withoutLabel = "Without",
  withLabel = "With tip",
  contentClassName = "w-full max-w-2xl",
  without,
  with: withContent,
}: PlaybookDemoCardProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-2xs ring-1 ring-black/10 sm:p-8">
      <div
        className="absolute top-5 right-5 z-10 flex items-center gap-2.5 sm:top-6 sm:right-6"
      >
        <span
          className={`text-xs transition-colors ${showTip ? "text-parchment-400" : "text-parchment-700"}`}
        >
          {withoutLabel}
        </span>
        <PlaybookSwitch
          checked={showTip}
          onCheckedChange={setShowTip}
          aria-label={`${withoutLabel} or ${withLabel}`}
        />
        <span
          className={`text-xs transition-colors ${showTip ? "text-parchment-700" : "text-parchment-400"}`}
        >
          {withLabel}
        </span>
      </div>
      <div className="relative z-0 h-72">
        <div
          className={`absolute inset-0 flex items-center justify-center ${showTip ? "hidden" : ""}`}
        >
          <div className={contentClassName}>{without}</div>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center ${showTip ? "" : "hidden"}`}
        >
          <div className={contentClassName}>{withContent}</div>
        </div>
      </div>
    </div>
  );
}
