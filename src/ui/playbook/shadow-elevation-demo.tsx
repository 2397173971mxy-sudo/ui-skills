import { PlaybookDemoCard } from "./demo-card";

const elevatedShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.06)";

function ElevationPanel({ elevated = false }: { elevated?: boolean }) {
  return (
    <div className="relative w-60 text-left">
      <div className="space-y-2.5 py-1">
        <div className="bg-parchment-100 h-2 w-full rounded-full" />
        <div className="bg-parchment-100 h-2 w-4/5 rounded-full" />
        <div className="bg-parchment-100 h-2 w-full rounded-full" />
        <div className="bg-parchment-100 h-2 w-3/5 rounded-full" />
      </div>

      <div
        className={`absolute top-5 left-3 w-48 rounded-lg bg-white px-3 py-2.5 ${
          elevated ? "" : "border-parchment-300 border-2"
        }`}
        style={elevated ? { boxShadow: elevatedShadow } : undefined}
      >
        <p className="text-parchment-900 text-sm font-medium">Weekly summary</p>
        <p className="text-parchment-500 mt-0.5 text-xs">12 tasks completed</p>
      </div>
    </div>
  );
}

export default function ShadowElevationDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Border"
      withLabel="Shadow"
      contentClassName="flex w-full justify-center"
      without={<ElevationPanel />}
      with={<ElevationPanel elevated />}
    />
  );
}
