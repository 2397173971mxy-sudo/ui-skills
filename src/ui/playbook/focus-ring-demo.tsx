import { PlaybookDemoCard } from "./demo-card";

function FocusButton({ focused = false }: { focused?: boolean }) {
  return (
    <button
      type="button"
      className={`bg-parchment-100 text-parchment-900 rounded-lg px-4 py-2 text-sm font-medium ring-1 ring-black/10 ${focused ? "ring-parchment-900 ring-2 ring-offset-2" : "outline-none"}`}
    >
      Continue
    </button>
  );
}

export default function FocusRingDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="No ring"
      withLabel="Visible"
      contentClassName="flex w-full justify-center"
      without={<FocusButton />}
      with={<FocusButton focused />}
    />
  );
}
