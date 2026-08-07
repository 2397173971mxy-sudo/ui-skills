import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const enterTransition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };
const subtleExitTransition = { duration: 0.15, ease: "easeOut" as const };
const dramaticExitTransition = { duration: 0.4, ease: "easeOut" as const };
const TOAST_VISIBLE_MS = 2000;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}

function SaveToastDemo({ subtleExit = false }: { subtleExit?: boolean }) {
  const [toastKey, setToastKey] = useState<number | null>(null);
  const dismissTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) window.clearTimeout(dismissTimerRef.current);
    };
  }, []);

  const showToast = () => {
    if (toastKey !== null) return;

    const key = Date.now();
    setToastKey(key);
    dismissTimerRef.current = window.setTimeout(() => {
      setToastKey(null);
      dismissTimerRef.current = null;
    }, TOAST_VISIBLE_MS);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Button shape="round" onClick={showToast} disabled={toastKey !== null}>
        Save
      </Button>

      <div className="relative mt-3 h-9 w-full">
        <AnimatePresence>
          {toastKey !== null ? (
            <motion.div
              key={toastKey}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: enterTransition }}
              exit={
                subtleExit
                  ? {
                      opacity: 0,
                      y: -12,
                      filter: "blur(4px)",
                      transition: subtleExitTransition,
                    }
                  : {
                      opacity: 0,
                      y: "-100%",
                      scale: 0.5,
                      transition: dramaticExitTransition,
                    }
              }
              style={{ transformOrigin: "top center" }}
              className="bg-parchment-900 absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg px-3.5 py-2 text-sm whitespace-nowrap text-white shadow-lg"
            >
              <CheckIcon />
              Saved to library
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SubtleExitDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Dramatic"
      withLabel="Subtle exit"
      contentClassName="absolute inset-0"
      without={<SaveToastDemo />}
      with={<SaveToastDemo subtleExit />}
    />
  );
}
