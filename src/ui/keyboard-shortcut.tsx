import { useEffect, useState } from "react";

const shortcutClass =
  "inline-flex h-[18px] select-none items-center gap-0.5 bg-transparent font-mono text-[10px]";

export function CommandKShortcut({ className = "" }: { className?: string }) {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <kbd className={`${shortcutClass} ${className}`}>
      {isMac ? (
        <>
          <span className="text-[13px] leading-none">⌘</span> K
        </>
      ) : (
        <>Ctrl K</>
      )}
    </kbd>
  );
}
