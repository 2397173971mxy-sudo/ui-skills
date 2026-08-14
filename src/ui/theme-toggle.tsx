import type { MouseEvent } from "react";

const STORAGE_KEY = "ui-skills-theme";

export function ThemeToggle() {
  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.add("theme-switching");
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-switching"));
    });
    event.currentTarget.setAttribute(
      "aria-label",
      nextIsDark ? "Switch to light mode" : "Switch to dark mode",
    );
    event.currentTarget.setAttribute(
      "title",
      nextIsDark ? "Switch to light mode" : "Switch to dark mode",
    );
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggleTheme}
      className="border-parchment-200 text-parchment-900 hover:border-parchment-300 hover:bg-parchment-100 focus-visible:outline-primary inline-flex h-7 w-7 items-center justify-center rounded-[6px] border bg-transparent transition-colors focus-visible:outline-1 focus-visible:outline-offset-2"
    >
      <svg
        aria-hidden="true"
        className="theme-toggle__sun hidden size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
      <svg
        aria-hidden="true"
        className="theme-toggle__moon size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}
