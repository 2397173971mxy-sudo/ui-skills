import { motion } from "motion/react";
import { PlaybookDemoCard } from "./demo-card";

const rows = ["Inbox", "Drafts", "Archive", "Trash"];

function ListRows({ restrained = false }: { restrained?: boolean }) {
  return (
    <ul className="w-48 overflow-hidden rounded-lg ring-1 ring-black/10">
      {rows.map((row) => (
        <li key={row}>
          {restrained ? (
            <button
              type="button"
              className="text-parchment-900 hover:bg-parchment-50 block w-full px-3 py-2 text-left text-sm transition-colors duration-150"
            >
              {row}
            </button>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, x: 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="text-parchment-900 block w-full px-3 py-2 text-left text-sm"
            >
              {row}
            </motion.button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function MotionRestraintDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Bouncy rows"
      withLabel="Color only"
      contentClassName="flex w-full justify-center"
      without={<ListRows />}
      with={<ListRows restrained />}
    />
  );
}
