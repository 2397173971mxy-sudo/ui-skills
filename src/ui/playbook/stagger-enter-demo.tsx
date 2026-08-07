import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const item = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ReplayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function HeroEnter({
  staggered = false,
  animationKey = 0,
}: {
  staggered?: boolean;
  animationKey?: number;
}) {
  return (
    <motion.div
      key={animationKey}
      initial="hidden"
      animate="visible"
      variants={
        staggered
          ? { visible: { transition: { staggerChildren: 0.1 } } }
          : { visible: { transition: { staggerChildren: 0 } } }
      }
      className="max-w-xs space-y-2 text-center"
    >
      <motion.h3 variants={item} className="text-parchment-900 text-xl font-medium tracking-tight">
        Welcome back
      </motion.h3>
      <motion.p variants={item} className="text-parchment-600 text-sm">
        Pick up where you left off with your latest drafts.
      </motion.p>
      <motion.div variants={item} className="pt-1">
        <Button shape="round" size="sm">
          Open library
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function StaggerEnterDemo() {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <PlaybookDemoCard
      withoutLabel="All at once"
      withLabel="Staggered"
      contentClassName="flex w-full justify-center"
      belowControls={
        <Button
          type="button"
          variant="outline"
          shape="round"
          icon
          aria-label="Replay animation"
          onClick={() => setAnimationKey((key) => key + 1)}
        >
          <ReplayIcon />
        </Button>
      }
      without={<HeroEnter animationKey={animationKey} />}
      with={<HeroEnter staggered animationKey={animationKey} />}
    />
  );
}
