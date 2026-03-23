import { useLoaderData } from "react-router-dom";
import Game from "./components/Game.tsx";
import Header from "./components/Header.tsx";
import type { IGrid } from "./types.ts";

function App() {
  const defaultGrid: IGrid = {
    url: "",
    id: -1,
    owner: "Guest",
    title: "",
    live_cells: [],
    width: 100,
    height: 60,
    created_at: "",
    avg_rating: -1,
  };
  const grid = useLoaderData() || defaultGrid;
  const config = {
    randomLiveCellsProb: 0.2,
    speed: 25,
    cellSize: 8,
  };
  return (
    <>
      <Header />
      <Game grid={grid} config={config} />
    </>
  );
}

export default App;
