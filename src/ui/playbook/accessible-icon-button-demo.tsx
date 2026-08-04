import { PlaybookDemoCard } from "./demo-card";

export default function AccessibleIconButtonDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Unnamed"
      withLabel="Named"
      without={
        <div aria-hidden="true">
          <button
            type="button"
            className="border-parchment-200 bg-parchment-50 text-parchment-900 inline-flex size-11 items-center justify-center rounded-full border"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      }
      with={
        <button
          type="button"
          aria-label="Close panel"
          className="border-parchment-200 bg-parchment-50 text-parchment-900 hover:bg-parchment-100 focus-visible:outline-parchment-900 inline-flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      }
    />
  );
}
