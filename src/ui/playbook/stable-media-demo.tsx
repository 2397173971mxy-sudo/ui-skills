import { PlaybookDemoCard } from "./demo-card";

export default function StableMediaDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Unreserved"
      withLabel="Reserved"
      without={
        <div
          className="border-parchment-300 bg-parchment-50 w-full max-w-sm rounded-lg border border-dashed p-4"
        >
          <div
            className="bg-parchment-200 text-parchment-500 flex h-16 items-center justify-center rounded-md text-sm"
          >
            Image loads here
          </div>
          <p className="text-parchment-700 mt-3 text-base">
            Content moves when media arrives.
          </p>
        </div>
      }
      with={
        <div
          className="border-parchment-200 bg-parchment-50 w-full max-w-sm rounded-lg border p-4"
        >
          <div
            className="bg-parchment-200 text-parchment-500 flex aspect-video items-center justify-center rounded-md text-sm"
          >
            Image loads here
          </div>
          <p className="text-parchment-700 mt-3 text-base">
            Content stays in place while media loads.
          </p>
        </div>
      }
    />
  );
}
