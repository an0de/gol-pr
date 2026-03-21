import { useRef, useEffect, useState, useCallback } from "react";
import Controls from "./Controls.tsx";
import ShareTools from "./ShareTools.tsx";
import Grid from "./Grid.ts";
import presets from "./presets.ts";

interface ConfigProps {
  gridWidth: number;
  gridHeight: number;
  randomLiveCellsProb: number;
  speed: number;
  cellSize: number;
}

export default function Game(props: ConfigProps) {
  const [width, setWidth] = useState(props.gridWidth);
  const [height, setHeight] = useState(props.gridHeight);
  const [speed, setSpeed] = useState(props.speed);
  const [isRunning, setIsRunning] = useState(false);
  const randomLiveCellsProb = props.randomLiveCellsProb;
  const gridRef = useRef(
    new Grid(Array.from({ length: height }, () => Array(width).fill(0))),
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellSize = props.cellSize;
  const maxSpeed = 100;
  const stampRef = useRef(presets.CELL);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gridRef.current.current.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillStyle = "#444";
          ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
        }
      });
    });
  }, [cellSize]);

  useEffect(() => {
    let intervalId = -1;
    if (isRunning) {
      intervalId = setInterval(() => {
        gridRef.current.forward();
        draw();
      }, maxSpeed - speed);
    }
    return () => {
      if (intervalId > 0) {
        clearInterval(intervalId);
      }
    };
  }, [draw, isRunning, speed]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Controls
        width={width}
        height={height}
        onRunToggle={(isRunning) => {
          setIsRunning(!isRunning);
          console.log(isRunning && "running");
        }}
        onSetCleanGrid={() => {
          // setGrid(Array.from({ length: height }, () => Array(width).fill(0)));
          gridRef.current = new Grid(
            Array.from({ length: height }, () => Array(width).fill(0)),
          );
          draw();
        }}
        onSetRandomGrid={() => {
          gridRef.current = new Grid(
            Array.from({ length: height }, () =>
              Array(width)
                .fill(0)
                .map(() => (Math.random() > randomLiveCellsProb ? 0 : 1)),
            ),
          );
          draw();
        }}
        onPrev={() => {
          gridRef.current.back();
          draw();
          console.log("next", gridRef.current);
        }}
        onNext={() => {
          gridRef.current.forward();
          draw();
          console.log("next", gridRef.current);
          console.log(gridRef.current.getLiveCells());
        }}
        onSelectPreset={(name: string) => {
          stampRef.current = presets[name];
          console.log("preset", stampRef.current, name);
        }}
        onChangeSpeed={(value) => {
          if (Number.isInteger(value)) {
            setSpeed(Number(value));
          }
          console.log("speed", value);
        }}
        onResize={(width: number, height: number) => {
          setWidth(width);
          setHeight(height);
          console.log("size", width, height);
        }}
      />

      <div className="rounded-lg bg-muted mx-20">
        <canvas
          ref={canvasRef}
          width={width * cellSize}
          height={height * cellSize}
          className="bg-transparent cursor-pointer"
          onClick={(e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = Math.floor((e.clientX - rect.left) / cellSize);
            const y = Math.floor((e.clientY - rect.top) / cellSize);
            console.log(x, y, rect);
            console.log(gridRef);

            stampRef.current.forEach(([xOffset, yOffset]) => {
              const yTarget = (y + yOffset + height) % height;
              const xTarget = (x + xOffset + width) % width;
              gridRef.current.current[yTarget][xTarget] = 1;
            });
            draw();
          }}
        />
      </div>
    </div>
  );
}
