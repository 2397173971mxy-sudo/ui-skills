import { PlaybookDemoCard } from "./demo-card";

const body =
  "Long paragraphs are harder to scan when every line stretches across the full width of the card. A comfortable measure keeps the eye moving down the page.";

function MeasureText({ capped = false }: { capped?: boolean }) {
  return (
    <p
      className={`text-parchment-700 text-left text-base leading-relaxed ${capped ? "max-w-prose" : "w-full max-w-xl"}`}
    >
      {body}
    </p>
  );
}

export default function LineMeasureDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Full width"
      withLabel="Capped"
      contentClassName="flex w-full justify-center px-4"
      without={<MeasureText />}
      with={<MeasureText capped />}
    />
  );
}
