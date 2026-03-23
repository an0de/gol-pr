import { useLoaderData } from "react-router-dom";
import GameCard from "./GameCard.tsx";
import Header from "./Header.tsx";
import type { IGrid } from "../types.ts";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

function setNavUrl(url: string) {
  const { search } = new URL(url);
  return `/grids/${search}`;
}

export default function Gallery() {
  const data = useLoaderData();
  const grids: IGrid[] = data.results;

  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center gap-6 m-4">
        {grids.map((grid, i) => (
          <GameCard grid={grid} key={i} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6 m-4">
        <ButtonGroup id="prev-next-btn">
          <Button id="prev-btn">
            <a href={setNavUrl(data.previous || "")}>Previous</a>
          </Button>
          <ButtonGroupSeparator />
          <Button id="next-btn">
            <a href={setNavUrl(data.next || "")}>Next</a>
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
