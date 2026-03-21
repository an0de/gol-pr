import Controls from "./Controls.tsx";
import Grid from "./Grid.tsx";
import ShareTools from "./ShareTools.tsx";

export default function Game() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Controls
        onRunToggle={() => {}}
        onRandomize={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        onSelectPreset={() => {}}
        onSpeed={() => {}}
        onSize={() => {}}
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
