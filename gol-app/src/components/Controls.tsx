import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";

import presets from "./presets.ts";

const MAX_WIDTH = 300;
const MAX_HEIGHT = 300;

interface ControlsProps {
  width: number;
  height: number;
  onRunToggle: (isRunning: boolean) => void;
  onSetCleanGrid: () => void;
  onSetRandomGrid: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectPreset: (name: string) => void;
  onChangeSpeed: (value: number) => void;
  onResize: (width: number, height: number) => void;
}

export default function Controls(props: ControlsProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [presetValue, setPresetValue] = useState("CELL");
  const [width, setWidth] = useState(`${props.width}`);
  const [height, setHeight] = useState(`${props.height}`);
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <Card className="mx-20 my-5">
      <CardContent>
        <div className="flex gap-4">
          <Field>
            <FieldLabel htmlFor="run-toggle">Run simulation</FieldLabel>
            <Toggle
              id="run-toggle"
              size="lg"
              variant="outline"
              onClick={() => {
                setIsRunning(!isRunning);
                props.onRunToggle(isRunning);
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </Toggle>
          </Field>

          <Field>
            <FieldLabel htmlFor="grid-layout-group">Set grid layout</FieldLabel>
            <ButtonGroup id="grid-layout-group">
              <Button
                id="randomize-btn"
                variant="secondary"
                onClick={() => {
                  setIsRunning(false);
                  props.onSetRandomGrid();
                }}
              >
                Random
              </Button>
              <ButtonGroupSeparator />
              <Button
                id="randomize-btn"
                variant="secondary"
                onClick={() => {
                  setIsRunning(false);
                  props.onSetCleanGrid();
                }}
              >
                Clean
              </Button>
            </ButtonGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="history-nav">Browse history</FieldLabel>
            <ButtonGroup id="history-nav">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsRunning(false);
                  props.onPrev();
                }}
              >
                {"<-"}
              </Button>
              <ButtonGroupSeparator />
              <Button
                variant="secondary"
                onClick={() => {
                  setIsRunning(false);
                  props.onNext();
                }}
              >
                {"->"}
              </Button>
            </ButtonGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="preset-sel">Select Preset</FieldLabel>
            <ToggleGroup
              id="preset-sel"
              type="single"
              defaultValue="CELL"
              value={presetValue}
              onValueChange={(newValue) => {
                if (newValue) {
                  setPresetValue(newValue);
                }
              }}
            >
              {Object.keys(presets).map((name, i) => (
                <ToggleGroupItem
                  variant="outline"
                  key={i}
                  value={name}
                  onClick={() => props.onSelectPreset(name)}
                >
                  {name.replace("_", " ")}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="size-input">Set Size</FieldLabel>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const widthNumber = Number(width);
                const heightNumber = Number(height);
                if (
                  Number.isInteger(widthNumber) &&
                  Number.isInteger(heightNumber) &&
                  widthNumber <= MAX_WIDTH &&
                  heightNumber <= MAX_HEIGHT
                ) {
                  setIsRunning(false);
                  props.onResize(widthNumber, heightNumber);
                  setErrors([]);
                } else {
                  setErrors([
                    `Size should be less than or equal to ${MAX_WIDTH}x${MAX_HEIGHT}`,
                  ]);
                }
              }}
            >
              <ButtonGroup id="size-input">
                <Input
                  placeholder={`${props.width}`}
                  id="width-input"
                  onChange={(e) => setWidth(e.currentTarget.value)}
                  value={width}
                />
                <Input
                  placeholder={`${props.height}`}
                  id="height-input"
                  onChange={(e) => setHeight(e.currentTarget.value)}
                  value={height}
                />
                <Button variant="outline" type="submit">
                  Set
                </Button>
              </ButtonGroup>
              {errors.map((error, i) => (
                <FieldError key={i}>{error}</FieldError>
              ))}
            </form>
          </Field>

          <Field>
            <FieldLabel htmlFor="speed-slider">Set Speed</FieldLabel>
            <Slider
              id="speed-slider"
              defaultValue={[25]}
              max={100}
              step={1}
              className="mx-auto w-40"
              onValueChange={(value) => props.onChangeSpeed(value[0])}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
