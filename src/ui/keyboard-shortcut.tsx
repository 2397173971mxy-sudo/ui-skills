import { useEffect, useState } from "react";
import { Command } from "lucide-react";

const shortcutClass =
  "inline-flex h-[18px] select-none items-center gap-0.5 bg-transparent font-mono text-[10px]";

function CommandIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

export function CommandKShortcut({ className = "" }: { className?: string }) {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <kbd className={`${shortcutClass} ${className}`}>
      {isMac ? (
        <>
          <Command aria-hidden="true" size={10} strokeWidth={2.5} />K
        </>
      ) : (
        <>Ctrl K</>
      )}
    </kbd>
  );
}
