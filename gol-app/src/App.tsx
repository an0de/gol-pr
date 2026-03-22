import Game from "./components/Game.tsx";

function App() {
  return (
    <>
      <h1>App</h1>
      <Game
        gridWidth={100}
        gridHeight={60}
        randomLiveCellsProb={0.2}
        speed={25}
        cellSize={8}
      />
    </>
  );
}

export default App;
