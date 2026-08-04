import { PlaybookDemoCard } from "./demo-card";

export default function TouchTargetDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Too small"
      withLabel="44px target"
      without={
        <div
          className="border-parchment-300 flex items-center gap-3 rounded-lg border border-dashed p-5"
        >
          <button
            type="button"
            aria-label="Close"
            className="border-parchment-300 text-parchment-700 inline-flex size-6 items-center justify-center rounded border"
          >
            ×
          </button>
          <span className="text-parchment-500 text-sm">Easy to miss</span>
        </div>
      }
      with={
        <div
          className="border-parchment-200 bg-parchment-50 flex items-center gap-3 rounded-lg border p-5"
        >
          <button
            type="button"
            aria-label="Close"
            className="border-parchment-300 text-parchment-900 inline-flex size-11 items-center justify-center rounded-lg border bg-white text-xl"
          >
            ×
          </button>
          <span className="text-parchment-600 text-sm">Easy to hit</span>
        </div>
      }
    />
  );
}
