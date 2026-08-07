import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { PlaybookSwitch } from "./switch";

type PlaybookSwitchRowProps = {
  offLabel: string;
  onLabel: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  "aria-label"?: string;
  layout?: "row" | "grid";
};

const labelButtonClass =
  "text-xs transition-colors hover:text-parchment-900 whitespace-nowrap";

export function PlaybookSwitchRow({
  offLabel,
  onLabel,
  checked,
  onCheckedChange,
  id,
  "aria-label": ariaLabel,
  layout = "row",
}: PlaybookSwitchRowProps) {
  const isGrid = layout === "grid";

  return (
    <div
      className={cn(isGrid ? "contents" : "flex items-center gap-2.5")}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onCheckedChange(false)}
        aria-pressed={!checked}
        className={cn(
          labelButtonClass,
          isGrid && "justify-self-end",
          checked ? "text-parchment-400" : "text-parchment-900",
        )}
      >
        {offLabel}
      </button>
      <PlaybookSwitch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={ariaLabel ?? `${offLabel} or ${onLabel}`}
        className={isGrid ? "justify-self-center" : undefined}
      />
      <button
        type="button"
        onClick={() => onCheckedChange(true)}
        aria-pressed={checked}
        className={cn(
          labelButtonClass,
          isGrid && "justify-self-start",
          checked ? "text-parchment-900" : "text-parchment-400",
        )}
      >
        {onLabel}
      </button>
    </div>
  );
}

type PlaybookDemoCardProps = {
  withoutLabel?: string;
  withLabel?: string;
  contentClassName?: string;
  headerExtra?: ReactNode;
  belowControls?: ReactNode;
  controlsLayout?: "row" | "stack";
  flush?: boolean;
  without: ReactNode;
  with: ReactNode;
};

export function PlaybookDemoCard({
  withoutLabel = "Without",
  withLabel = "With tip",
  contentClassName,
  headerExtra,
  belowControls,
  controlsLayout = "row",
  flush = false,
  without,
  with: withContent,
}: PlaybookDemoCardProps) {
  const [showTip, setShowTip] = useState(false);
  const resolvedContentClassName = contentClassName ?? (flush ? "h-full w-full" : "w-full max-w-2xl");

  const compareControls = (
    <PlaybookSwitchRow
      layout={controlsLayout === "stack" ? "grid" : "row"}
      offLabel={withoutLabel}
      onLabel={withLabel}
      checked={showTip}
      onCheckedChange={setShowTip}
      aria-label={`${withoutLabel} or ${withLabel}`}
    />
  );

  const controls =
    controlsLayout === "stack" ? (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2.5 gap-y-2.5">
        {headerExtra}
        {compareControls}
      </div>
    ) : (
      <div className="flex items-center gap-3">
        {headerExtra ? (
          <div className="border-parchment-200 flex items-center gap-2 border-r pr-3">
            {headerExtra}
          </div>
        ) : null}
        {compareControls}
      </div>
    );

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white shadow-2xs ring-1 ring-black/10",
        flush ? "overflow-hidden" : "p-6 sm:p-8",
      )}
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2 sm:top-5 sm:right-5">
        {controls}
        {belowControls}
      </div>
      <div className="relative z-0 h-72">
        <div
          className={cn(
            "absolute inset-0",
            !flush && "flex items-center justify-center",
            showTip ? "hidden" : "",
          )}
        >
          <div className={resolvedContentClassName}>{without}</div>
        </div>
        <div
          className={cn(
            "absolute inset-0",
            !flush && "flex items-center justify-center",
            showTip ? "" : "hidden",
          )}
        >
          <div className={resolvedContentClassName}>{withContent}</div>
        </div>
      </div>
    </div>
  );
}
