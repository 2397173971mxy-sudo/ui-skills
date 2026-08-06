import { PlaybookDemoCard } from "./demo-card";

function SurfaceCard({ shadow = false }: { shadow?: boolean }) {
  return (
    <div
      className={`w-48 rounded-xl bg-white p-4 ${shadow ? "shadow-lg ring-1 ring-black/5" : "border-parchment-200 border-2"}`}
    >
      <p className="text-parchment-900 text-sm font-medium">Weekly summary</p>
      <p className="text-parchment-500 mt-1 text-xs">12 tasks completed</p>
    </div>
  );
}

export default function ShadowElevationDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Border"
      withLabel="Shadow"
      contentClassName="flex w-full justify-center"
      without={<SurfaceCard />}
      with={<SurfaceCard shadow />}
    />
  );
}
