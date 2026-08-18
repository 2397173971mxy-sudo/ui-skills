import { PlaybookDemoCard } from "./demo-card";

const linkClass = "text-sm text-blue-600 hover:underline";

function SettingsCard({ linksOnly = false }: { linksOnly?: boolean }) {
  const titleClass = linksOnly
    ? "text-parchment-900 text-sm font-medium"
    : "text-sm font-medium text-blue-600";

  return (
    <div className="w-56 overflow-hidden rounded-lg bg-white text-left ring-1 ring-black/10">
      <div className="px-4 py-3">
        <p className={titleClass}>Billing</p>
        <p className="text-parchment-600 mt-1 text-sm">Invoice #1042 · $49.00 due Apr 12</p>
        <a href="#" className={`${linkClass} mt-2 inline-block`} onClick={(event) => event.preventDefault()}>
          View invoice
        </a>
      </div>

      <div className="border-parchment-200 border-t px-4 py-3">
        <p className={titleClass}>Payment method</p>
        <p className="text-parchment-600 mt-1 text-sm">Visa ending in 4242</p>
        <a href="#" className={`${linkClass} mt-2 inline-block`} onClick={(event) => event.preventDefault()}>
          Update card
        </a>
      </div>
    </div>
  );
}

export default function ColorMeansLinkDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Accent labels"
      withLabel="Links only"
      contentClassName="flex w-full justify-center"
      without={<SettingsCard />}
      with={<SettingsCard linksOnly />}
    />
  );
}
