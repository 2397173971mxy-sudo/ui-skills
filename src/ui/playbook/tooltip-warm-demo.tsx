import { useRef, useState, type FocusEvent } from "react";
import { PlaybookDemoCard } from "./demo-card";

const TOOLTIP_DELAY_MS = 500;

function ToolbarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TooltipToolbar({ warm = false }: { warm?: boolean }) {
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const warmedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const labels = ["Bold", "Italic", "Link"];

  const showTip = (label: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    const delay = warm && warmedRef.current ? 0 : TOOLTIP_DELAY_MS;

    if (delay === 0) {
      setActiveTip(label);
      warmedRef.current = true;
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setActiveTip(label);
      if (warm) warmedRef.current = true;
    }, delay);
  };

  const hideTip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveTip(null);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      hideTip();
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={warm ? hideTip : undefined}
      onBlur={warm ? handleBlur : undefined}
    >
      <div className="flex gap-1 rounded-lg bg-white p-1 ring-1 ring-black/10">
        {labels.map((label) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onMouseEnter={() => showTip(label)}
            onMouseLeave={warm ? undefined : hideTip}
            onFocus={() => showTip(label)}
            onBlur={warm ? undefined : hideTip}
            className="text-parchment-700 hover:bg-parchment-50 inline-flex size-8 items-center justify-center rounded-md"
          >
            <ToolbarIcon />
          </button>
        ))}
      </div>
      {activeTip ? (
        <div className="bg-parchment-900 absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white">
          {activeTip}
        </div>
      ) : null}
    </div>
  );
}

export default function TooltipWarmDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Always delayed"
      withLabel="Warm toolbar"
      contentClassName="flex w-full justify-center"
      without={<TooltipToolbar />}
      with={<TooltipToolbar warm />}
    />
  );
}
