import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function ActionRow({ singleAccent = false }: { singleAccent?: boolean }) {
  if (singleAccent) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="accent">Save</Button>
        <Button variant="outline">Publish</Button>
        <Button variant="ghost">Share</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
      >
        Save
      </button>
      <button
        type="button"
        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white"
      >
        Publish
      </button>
      <button
        type="button"
        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white"
      >
        Share
      </button>
    </div>
  );
}

export default function OneAccentDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Rainbow"
      withLabel="One accent"
      contentClassName="flex w-full justify-center"
      without={<ActionRow />}
      with={<ActionRow singleAccent />}
    />
  );
}
