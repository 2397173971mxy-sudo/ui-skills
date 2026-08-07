import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function ToastDismiss({ subtle = false }: { subtle?: boolean }) {
  const [visible, setVisible] = useState(true);
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        type="button"
        variant="outline"
        shape="round"
        size="sm"
        onClick={() => {
          setVisible(true);
          setKey((k) => k + 1);
        }}
      >
        Show toast
      </Button>
      <div className="relative h-10 w-full">
        <AnimatePresence>
          {visible ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
              exit={
                subtle
                  ? { opacity: 0, y: -6, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }
                  : { opacity: 0, y: -32, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }
              }
              className="bg-parchment-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-lg px-3.5 py-2 text-sm whitespace-nowrap text-white shadow-lg"
            >
              Saved to library
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {visible ? (
        <Button type="button" variant="ghost" size="sm" onClick={() => setVisible(false)}>
          Dismiss
        </Button>
      ) : null}
    </div>
  );
}

export default function SubtleExitDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Big exit"
      withLabel="Subtle exit"
      contentClassName="flex w-full justify-center"
      without={<ToastDismiss />}
      with={<ToastDismiss subtle />}
    />
  );
}
