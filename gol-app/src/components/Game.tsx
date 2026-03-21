import Controls from "./Controls.tsx";
import Grid from "./Grid.tsx";
import ShareTools from "./ShareTools.tsx";

const WIDTH = 100;
const HEIGHT = 100;

export default function Game() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Controls
        width={WIDTH}
        height={HEIGHT}
        onRunToggle={(isRunning) => {
          console.log(isRunning);
        }}
        onSetCleanGrid={() => {}}
        onSetRandomGrid={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        onSelectPreset={(name: string) => {
          console.log(name);
        }}
        onChangeSpeed={(value) => {
          console.log("speed", value);
        }}
        onResize={(width: number, height: number) => {
          console.log(width, height);
        }}
      />
      <Grid width={100} height={100} fillColor="#a0a" grid={[[]]} />
      <ShareTools
        onExport={() => {}}
        onImport={() => {}}
        onSaveAsPng={() => {}}
      />
    </div>
  );
}
