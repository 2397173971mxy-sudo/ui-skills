import { PlaybookDemoCard } from "./demo-card";

const groups = [
  { title: "Account", items: ["Profile", "Security", "Notifications"] },
  { title: "Billing", items: ["Plan", "Invoices", "Payment method"] },
];

function SettingsList({ spaced = false }: { spaced?: boolean }) {
  return (
    <div className="w-56 text-left">
      <div className={spaced ? "space-y-8" : ""}>
        {groups.map((group) => (
          <div key={group.title} className={spaced ? "space-y-1" : ""}>
            <p className="text-parchment-900 text-sm font-medium">{group.title}</p>
            {group.items.map((item) => (
              <p
                key={item}
                className={`text-parchment-600 text-sm ${
                  spaced ? "py-1" : "border-parchment-200 border-b py-2.5"
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpaceNotLinesDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Lines"
      withLabel="Spacing"
      contentClassName="flex h-full w-full items-center justify-center px-10 py-8"
      without={<SettingsList />}
      with={<SettingsList spaced />}
    />
  );
}
