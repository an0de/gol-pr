import { useRef, useEffect, useState, useCallback } from "react";
import Controls from "./Controls.tsx";
import Grid from "./Grid.ts";
import presets from "./presets.ts";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";

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
        }}
        onSetCleanGrid={() => {
          gridRef.current = new Grid(
            Array.from({ length: height }, () => Array(width).fill(0)),
          );
          draw();
          setIsRunning(false);
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
          setIsRunning(false);
        }}
        onPrev={() => {
          gridRef.current.back();
          draw();
        }}
        onNext={() => {
          gridRef.current.forward();
          draw();
        }}
        onSelectPreset={(name: string) => {
          stampRef.current = presets[name];
        }}
        onChangeSpeed={(value) => {
          if (Number.isInteger(value)) {
            setSpeed(Number(value));
          }
        }}
        onResize={(width: number, height: number) => {
          setWidth(width);
          setHeight(height);
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

            stampRef.current.forEach(([xOffset, yOffset]) => {
              const yTarget = (y + yOffset + height) % height;
              const xTarget = (x + xOffset + width) % width;
              gridRef.current.current[yTarget][xTarget] = 1;
            });
            draw();
          }}
        />
      </div>

      <Card className="mx-20 my-5">
        <CardContent>
          <div className="flex gap-4">
            <Field>
              <FieldLabel>Share</FieldLabel>
              <ButtonGroup>
                <Button
                  variant="outline"
                  onClick={() => {
                    const imageURL = canvasRef.current?.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = `${imageURL}`;
                    link.download = "grid.png";
                    link.click();
                  }}
                >
                  Save as png
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const encoded = btoa(
                      JSON.stringify(gridRef.current.getLiveCells()),
                    );
                    const link = document.createElement("a");
                    link.href = `data:application/json;base64,${encoded}`;
                    link.download = "grid.json";
                    link.click();
                  }}
                >
                  Export
                </Button>
              </ButtonGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="import-input">Import</FieldLabel>
              <Input
                id="import-input"
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      const text = e.target?.result;
                      const liveCells = JSON.parse(String(text));
                      gridRef.current = new Grid(
                        Array.from({ length: height }, () =>
                          Array(width).fill(0),
                        ),
                      );
                      gridRef.current.setFromLiveCells(liveCells);
                      draw();
                    };

                    reader.readAsText(file);
                  }
                }}
              />
            </Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
