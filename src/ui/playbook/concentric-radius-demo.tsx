import { useId } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const OUTER_RADIUS_PX = 16;
const INNER_CONCENTRIC_RADIUS_PX = 12;
const INNER_MATCHED_RADIUS_PX = OUTER_RADIUS_PX;

function SubscribeField({ concentric = false }: { concentric?: boolean }) {
  const inputId = useId();
  const innerRadiusPx = concentric
    ? INNER_CONCENTRIC_RADIUS_PX
    : INNER_MATCHED_RADIUS_PX;

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="focus-within:ring-parchment-900 relative flex w-96 items-center bg-white p-1 shadow-2xs ring-1 ring-black/10 transition-shadow focus-within:ring-2"
        style={{ borderRadius: OUTER_RADIUS_PX }}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          placeholder="Enter your email"
          className="text-parchment-900 placeholder:text-parchment-400 min-w-0 flex-1 bg-transparent pr-2 pl-3 text-sm outline-none"
        />

        <Button
          shape="round"
          className="shrink-0"
          style={{
            borderRadius: innerRadiusPx,
          }}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default function ConcentricRadiusDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Same radius"
      withLabel="Concentric"
      contentClassName="h-full w-full"
      without={<SubscribeField />}
      with={<SubscribeField concentric />}
    />
  );
}
