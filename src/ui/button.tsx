import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape?: "default" | "round";
  variant?: "primary" | "secondary" | "ghost" | "accent" | "outline";
  icon?: boolean;
};

const variantStyles = {
  primary: "bg-parchment-900 text-parchment-50 hover:bg-parchment-800",
  secondary: "bg-parchment-100 text-parchment-900 hover:bg-parchment-200 ring-1 ring-black/10",
  ghost: "bg-transparent text-parchment-900 hover:bg-parchment-100",
  accent: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "bg-white text-parchment-900 ring-1 ring-black/10 hover:bg-parchment-50",
};

export function Button({
  shape = "default",
  variant = "primary",
  icon = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex select-none items-center justify-center text-sm font-medium transition-[background-color,transform] duration-150 ease-out",
        variantStyles[variant],
        icon
          ? "size-9 p-0"
          : shape === "round"
            ? "rounded-full px-5 py-2.5"
            : "rounded-lg px-5 py-2.5",
        shape === "round" && icon && "rounded-full",
        className,
      )}
      {...props}
    />
  );
}
