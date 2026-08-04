import { PlaybookDemoCard } from "./demo-card";

export default function InlineValidationDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Detached"
      withLabel="Inline"
      without={
        <div aria-hidden="true" className="w-full max-w-sm space-y-3">
          <label
            htmlFor="playbook-email-bad"
            className="text-parchment-700 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="playbook-email-bad"
            value="hello"
            readOnly
            className="border-parchment-300 text-parchment-900 w-full rounded-lg border bg-white px-3 py-2 text-base"
          />
          <p className="text-parchment-500 text-sm">
            Something went wrong with this form.
          </p>
        </div>
      }
      with={
        <div className="w-full max-w-sm space-y-3">
          <label
            htmlFor="playbook-email-good"
            className="text-parchment-700 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="playbook-email-good"
            value="hello"
            readOnly
            aria-invalid="true"
            aria-describedby="playbook-email-error"
            className="border-parchment-500 text-parchment-900 focus-visible:outline-parchment-900 w-full rounded-lg border bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2"
          />
          <p id="playbook-email-error" className="text-parchment-600 text-sm">
            Enter a valid email address.
          </p>
        </div>
      }
    />
  );
}
