import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-parchment-700 inline-flex h-8 shrink-0 items-center rounded-lg border border-neutral-200 bg-transparent px-2.5 text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
