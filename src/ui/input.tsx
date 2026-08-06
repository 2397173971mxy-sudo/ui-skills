import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  size?: "default" | "sm";
};

export function Input({ size = "default", className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "text-parchment-900 placeholder:text-parchment-400 w-full bg-white outline-none transition-shadow duration-150 ease-out",
        "ring-1 ring-black/10",
        "focus-visible:ring-parchment-900 focus-visible:ring-2 focus-visible:ring-offset-2",
        "aria-invalid:ring-red-500 aria-invalid:focus-visible:ring-red-500",
        size === "sm" ? "rounded-lg px-3.5 py-1.5 text-xs" : "rounded-lg px-3 py-2.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
