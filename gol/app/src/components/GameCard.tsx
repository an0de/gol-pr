import type { IGrid } from "../types.ts";
import Rating from "./Rating.tsx";

interface GameCardProps {
  grid: IGrid;
}
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GameCard({ grid }: GameCardProps) {
  const cellSize = 8;
  const canvas = document.createElement("canvas");
  canvas.width = grid.width * cellSize;
  canvas.height = grid.height * cellSize;
  const ctx = canvas.getContext("2d");
  if (ctx !== null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.live_cells.forEach(([i, j]) => {
      ctx.fillStyle = "#444";
      ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
    });
  }

  const imageURL = canvas.toDataURL("image/png");
  const date = new Date(grid.created_at);
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <a href={`/grids/${grid.id}`}>
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={imageURL}
          alt="Grid cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Rating rating={grid.avg_rating} />
          </CardAction>
          <CardTitle>{grid.title}</CardTitle>
          <CardDescription>{`${grid.owner} at ${date.toLocaleString()}`}</CardDescription>
        </CardHeader>
      </a>
    </Card>
  );
}
