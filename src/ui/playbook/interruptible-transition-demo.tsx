import { useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function DrawerPanel({
  open,
  interruptible = false,
}: {
  open: boolean;
  interruptible?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-parchment-50 absolute inset-y-0 left-0 w-40 px-4 py-4 shadow-lg ring-1 ring-black/10",
        interruptible
          ? "transition-transform duration-300 ease-out"
          : open
            ? "animate-[playbook-drawer-in_300ms_ease-out_forwards]"
            : "-translate-x-full",
      )}
      style={interruptible ? { transform: open ? "translateX(0)" : "translateX(-100%)" } : undefined}
    >
      <p className="text-parchment-900 text-sm font-medium">Filters</p>
      <p className="text-parchment-600 mt-2 text-sm">Status, owner, date</p>
    </div>
  );
}

function DrawerToggle({ interruptible = false }: { interruptible?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes playbook-drawer-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div className="relative h-36 w-56 overflow-hidden rounded-xl ring-1 ring-black/10">
        <DrawerPanel open={open} interruptible={interruptible} />
        <div className="absolute right-3 bottom-3">
          <Button type="button" variant="outline" shape="round" size="sm" onClick={() => setOpen((v) => !v)}>
            {open ? "Close" : "Open"}
          </Button>
        </div>
      </div>
      <p className="text-parchment-500 mt-2 max-w-56 text-center text-xs">
        Tap open, then close mid-animation.
      </p>
    </>
  );
}

export default function InterruptibleTransitionDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Keyframes"
      withLabel="Transition"
      contentClassName="flex w-full flex-col items-center justify-center"
      without={<DrawerToggle />}
      with={<DrawerToggle interruptible />}
    />
  );
}
