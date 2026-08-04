import { PlaybookDemoCard } from "./demo-card";

export default function FocusVisibleDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Hidden focus"
      withLabel="Visible focus"
      without={
        <button
          type="button"
          className="border-parchment-200 bg-parchment-50 text-parchment-900 rounded-lg border px-4 py-3 text-base focus:outline-none"
        >
          Tab to this button
        </button>
      }
      with={
        <button
          type="button"
          className="border-parchment-200 bg-parchment-50 text-parchment-900 focus-visible:outline-parchment-900 rounded-lg border px-4 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Tab to this button
        </button>
      }
    />
  );
}
