import { useState } from "react";
import Icon from "../ui/Icon";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="vs-card flex items-center gap-3 p-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4eefc] text-[var(--color-brand)]">
        <Icon name="wave" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">Better Together</p>
        <p className="truncate text-[11px] text-[var(--muted)]">Arijit Singh</p>
      </div>
      <button onClick={() => setPlaying(false)} aria-label="Previous"><Icon name="skipback" className="h-4 w-4" /></button>
      <button onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
        <Icon name={playing ? "pause" : "play"} className="h-5 w-5" filled />
      </button>
      <button onClick={() => setPlaying(true)} aria-label="Next"><Icon name="skip" className="h-4 w-4" /></button>
    </section>
  );
}
