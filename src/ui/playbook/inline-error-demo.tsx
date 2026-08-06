import { PlaybookDemoCard } from "./demo-card";

function EmailField({ inlineError = false }: { inlineError?: boolean }) {
  return (
    <div className="w-56 text-left">
      <label htmlFor="email-demo" className="text-parchment-900 text-sm font-medium">
        Email
      </label>
      <input
        id="email-demo"
        type="email"
        defaultValue="hello@"
        className="border-parchment-300 text-parchment-900 mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm"
        aria-invalid={inlineError}
      />
      {inlineError ? (
        <p className="text-red-600 mt-1.5 text-xs">Enter a valid email address</p>
      ) : null}
      {!inlineError ? (
        <p className="text-red-600 mt-6 text-xs">Enter a valid email address</p>
      ) : null}
    </div>
  );
}

export default function InlineErrorDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Far away"
      withLabel="Inline"
      contentClassName="flex w-full justify-center"
      without={<EmailField />}
      with={<EmailField inlineError />}
    />
  );
}
