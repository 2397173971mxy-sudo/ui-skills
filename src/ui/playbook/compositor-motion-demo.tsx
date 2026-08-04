import { PlaybookDemoCard } from "./demo-card";

export default function CompositorMotionDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Layout"
      withLabel="Compositor"
      without={
        <div className="w-full max-w-md space-y-3">
          <div
            className="border-parchment-200 bg-parchment-50 relative h-28 overflow-hidden rounded-lg border"
          >
            <div
              className="bg-parchment-800 absolute top-8 left-4 h-12 w-28 rounded-lg transition-[left] duration-200 ease-out hover:left-16"
            />
          </div>
          <p className="text-parchment-500 text-sm">
            Moves with <code>left</code>
          </p>
        </div>
      }
      with={
        <div className="w-full max-w-md space-y-3">
          <div
            className="border-parchment-200 bg-parchment-50 relative h-28 overflow-hidden rounded-lg border"
          >
            <div
              className="bg-parchment-800 absolute top-8 left-4 h-12 w-28 rounded-lg transition-opacity transition-transform duration-200 ease-out hover:translate-x-12 hover:opacity-80"
            />
          </div>
          <p className="text-parchment-500 text-sm">
            Moves with <code>transform</code> and <code>opacity</code>
          </p>
        </div>
      }
    />
  );
}
