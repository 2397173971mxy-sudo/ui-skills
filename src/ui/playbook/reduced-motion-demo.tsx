import { PlaybookDemoCard } from "./demo-card";

export default function ReducedMotionDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Full motion"
      withLabel="Reduced"
      without={
        <div className="w-full space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-parchment-900 text-base font-medium">
                Open the panel
              </p>
              <p className="text-parchment-500 text-sm">
                The arrow slides on hover.
              </p>
            </div>
            <button
              type="button"
              aria-label="Open details"
              className="border-parchment-200 bg-parchment-50 text-parchment-900 focus-visible:outline-parchment-900 inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ease-out hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="text-xl">→</span>
            </button>
          </div>
          <div
            className="border-parchment-200 bg-parchment-50 text-parchment-600 rounded-lg border p-4 text-sm"
          >
            Movement uses transform for the hover cue.
          </div>
        </div>
      }
      with={
        <div className="w-full space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-parchment-900 text-base font-medium">
                Open the panel
              </p>
              <p className="text-parchment-500 text-sm">
                Movement becomes a short opacity transition instead.
              </p>
            </div>
            <button
              type="button"
              aria-label="Open details"
              className="border-parchment-200 bg-parchment-50 text-parchment-900 focus-visible:outline-parchment-900 inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-opacity duration-200 ease-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span aria-hidden="true" className="text-xl">→</span>
            </button>
          </div>
          <div
            className="border-parchment-200 bg-parchment-50 text-parchment-600 rounded-lg border p-4 text-sm"
          >
            The content remains visible and usable without motion.
          </div>
        </div>
      }
    />
  );
}
