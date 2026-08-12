import { PlaybookDemoCard } from "./demo-card";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Claude_Monet_-_Regnv%C3%A6r%2C_Etretat_-_Google_Art_Project.jpg/1920px-Claude_Monet_-_Regnv%C3%A6r%2C_Etretat_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20131124234031";

function PhotoCard({ cleanOutline = false }: { cleanOutline?: boolean }) {
  return (
    <div className="w-48">
      <div
        className={`overflow-hidden rounded-lg ${cleanOutline ? "outline-parchment-300 outline outline-1" : "ring-parchment-400 ring-2"}`}
      >
        <img
          src={imageUrl}
          alt="Rainy Weather, Étretat by Claude Monet, showing a rainy coastal cliff and sea."
          className="aspect-4/3 w-full object-cover"
        />
      </div>
      <p className="text-parchment-900 mt-2 text-sm font-medium">
        Rainy Weather, Étretat
      </p>
    </div>
  );
}

export default function ImageOutlineDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Tinted"
      withLabel="Neutral"
      contentClassName="flex w-full justify-center"
      without={<PhotoCard />}
      with={<PhotoCard cleanOutline />}
    />
  );
}
