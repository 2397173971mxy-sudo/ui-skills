import { Badge } from "../badge";
import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

const topics = ["Visual", "Motion", "Systems", "Interaction", "Performance", "Craft"];

const badgeClass = "w-[calc((18.5rem-2rem-1rem)/3)] shrink-0 justify-center text-xs";

function Phone({ peek = false }: { peek?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center">
      <div className="flex h-48 w-[18.5rem] flex-col overflow-hidden rounded-t-[2rem] border border-b-0 border-neutral-200 bg-white">
        <div aria-hidden className="flex-1" />
        <div className="px-4 pb-5">
          <div
            className={cn(
              "overflow-x-auto scrollbar-none",
              peek && "-mr-4 w-[calc(100%+1rem)]",
            )}
          >
            <div className="flex w-max gap-2 pr-4">
              {topics.map((topic) => (
                <Badge key={topic} className={badgeClass}>
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScrollPeekDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Flush"
      withLabel="Peek"
      contentClassName="absolute inset-0"
      without={<Phone />}
      with={<Phone peek />}
    />
  );
}
