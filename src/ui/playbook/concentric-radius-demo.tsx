import { useId } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const OUTER_HEIGHT_PX = 48;
const INNER_HEIGHT_PX = 32;
const OUTER_RADIUS_PX = OUTER_HEIGHT_PX / 2;
const INNER_CONCENTRIC_RADIUS_PX = INNER_HEIGHT_PX / 2;
const INNER_MATCHED_RADIUS_PX = 12;

function SubscribeField({ concentric = false }: { concentric?: boolean }) {
  const inputId = useId();
  const innerRadiusPx = concentric ? INNER_CONCENTRIC_RADIUS_PX : INNER_MATCHED_RADIUS_PX;

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="relative flex w-80 items-center bg-white p-2 shadow-2xs ring-1 ring-black/10 transition-shadow focus-within:ring-2 focus-within:ring-parchment-900"
        style={{
          height: OUTER_HEIGHT_PX,
          borderRadius: OUTER_RADIUS_PX,
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          placeholder="Enter your email"
          className="text-parchment-900 placeholder:text-parchment-400 min-w-0 flex-1 bg-transparent pl-3 pr-2 text-sm outline-none"
        />

        <Button
          shape="round"
          className="shrink-0 px-4 text-xs"
          style={{
            height: INNER_HEIGHT_PX,
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
