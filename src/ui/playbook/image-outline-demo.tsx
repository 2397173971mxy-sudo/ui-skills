import { PlaybookDemoCard } from "./demo-card";

function PhotoCard({ cleanOutline = false }: { cleanOutline?: boolean }) {
  return (
    <div className="w-48">
      <div
        className={`aspect-4/3 rounded-lg bg-linear-to-br from-parchment-200 via-parchment-100 to-parchment-300 ${cleanOutline ? "outline outline-1 outline-black/10" : "ring-1 ring-parchment-300"}`}
      />
      <p className="text-parchment-900 mt-2 text-sm font-medium">Studio portrait</p>
    </div>
  );
}

export default function ImageOutlineDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Tinted"
      withLabel="Neutral"
      contentClassName="flex w-full justify-center"
      without={<PhotoCard />}
      with={<PhotoCard cleanOutline />}
    />
  );
}
