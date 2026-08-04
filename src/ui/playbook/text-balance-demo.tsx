import { PlaybookDemoCard } from "./demo-card";

export default function TextBalanceDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Without balance"
      withLabel="With balance"
      without={
        <div className="space-y-3">
          <h2
            className="text-parchment-900 max-w-[14ch] text-3xl font-medium tracking-tight"
          >
            Design with fewer awkward line breaks
          </h2>
          <p className="text-parchment-600 max-w-xl text-base leading-snug">
            Body copy can also create uneven lines that make a short paragraph
            harder to scan.
          </p>
        </div>
      }
      with={
        <div className="space-y-3">
          <h2
            className="text-parchment-900 max-w-[14ch] text-3xl font-medium tracking-tight text-balance"
          >
            Design with fewer awkward line breaks
          </h2>
          <p className="text-parchment-600 max-w-xl text-base leading-snug text-pretty">
            Body copy can also create uneven lines that make a short paragraph
            easier to scan.
          </p>
        </div>
      }
    />
  );
}
