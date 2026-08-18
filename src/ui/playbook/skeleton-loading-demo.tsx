import { PlaybookDemoCard } from "./demo-card";

const cardClassName =
  "flex h-[7.75rem] w-56 flex-col rounded-xl bg-white p-4 ring-1 ring-black/10";

function SpinnerCard() {
  return (
    <div className={`${cardClassName} items-center justify-center`}>
      <div
        className="border-parchment-200 border-t-parchment-900 size-6 animate-spin rounded-full border-2"
        aria-hidden="true"
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={`${cardClassName} space-y-3`}>
      <div className="bg-parchment-200 h-3 w-28 rounded-full" />
      <div className="bg-parchment-100 h-2 w-full rounded-full" />
      <div className="bg-parchment-100 h-2 w-4/5 rounded-full" />
      <div className="bg-parchment-100 mt-2 h-8 w-full rounded-lg" />
    </div>
  );
}

export default function SkeletonLoadingDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Spinner"
      withLabel="Skeleton"
      contentClassName="flex w-full justify-center"
      without={<SpinnerCard />}
      with={<SkeletonCard />}
    />
  );
}
