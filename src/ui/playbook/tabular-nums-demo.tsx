import { PlaybookDemoCard } from "./demo-card";

export default function TabularNumsDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Default nums"
      withLabel="Tabular nums"
      without={
        <div className="text-parchment-900 space-y-2 text-right text-2xl font-medium">
          <p>8.4%</p>
          <p>12.8%</p>
          <p>104.2%</p>
        </div>
      }
      with={
        <div
          className="text-parchment-900 space-y-2 text-right text-2xl font-medium tabular-nums"
        >
          <p>8.4%</p>
          <p>12.8%</p>
          <p>104.2%</p>
        </div>
      }
    />
  );
}
