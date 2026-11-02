import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";

export default function ImagePicker({ file, onChange, currentSrc }) {
  const input = useRef(null);
  const [preview, setPreview] = useState(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (f) => f && f.type.startsWith("image/") && onChange(f);
  const src = preview || currentSrc;

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
      className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
        drag ? "border-brand bg-brand/5" : "border-line bg-paper"
      }`}
    >
      {src ? (
        <>
          <img src={src} alt="Selected" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => input.current?.click()}
            className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink"
          >
            {preview ? "Change photo" : "Replace photo"}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center gap-2 text-mute hover:text-ink"
        >
          <Icon name="image" className="h-10 w-10" />
          <span className="text-sm font-medium">Drag a photo here or click to browse</span>
        </button>
      )}
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
    </div>
  );
}
