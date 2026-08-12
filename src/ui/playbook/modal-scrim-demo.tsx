import { useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { PlaybookSwitchRow } from "./demo-card";

function SettingsPanel({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <p className="text-parchment-600 text-center text-sm">
        Workspace settings
      </p>
      <Button
        type="button"
        shape="round"
        size="sm"
        variant="outline"
        className="mt-3"
        onClick={onOpen}
      >
        Delete workspace
      </Button>
    </div>
  );
}

export default function ModalScrimDemo() {
  const [showTip, setShowTip] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xs ring-1 ring-black/10">
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2 sm:top-5 sm:right-5">
        <PlaybookSwitchRow
          offLabel="Blur scrim"
          onLabel="Solid scrim"
          checked={showTip}
          onCheckedChange={setShowTip}
          aria-label="Blur scrim or Solid scrim"
        />
      </div>

      <div className="relative h-72">
        <SettingsPanel onOpen={() => setOpen(true)} />
      </div>

      {open ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
          <div
            className={cn(
              "absolute inset-0",
              showTip ? "bg-black/20" : "bg-black/10 backdrop-blur-sm",
            )}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-xs rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/10">
            <p className="text-parchment-900 text-sm font-medium">
              Delete workspace?
            </p>
            <p className="text-parchment-600 mt-1 text-xs">
              This cannot be undone.
            </p>
            <div className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                shape="round"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                shape="round"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setOpen(false)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
