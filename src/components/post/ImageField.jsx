import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import Icon from "../ui/Icon";

// Formik field: `file` ko form ki value me rakhta hai. current = edit me purani image ka URL.
export default function ImageField({ name, current }) {
  const [, meta, helpers] = useField(name);
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!meta.value) return setPreview(null);
    const url = URL.createObjectURL(meta.value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [meta.value]);

  const src = preview || current;

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-lg border border-dashed border-line bg-paper text-mute hover:border-mute"
      >
        {src ? (
          <img src={src} alt="Selected" className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-2 text-sm">
            <Icon name="image" className="h-10 w-10" /> Select a photo
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => helpers.setValue(e.target.files[0] || null)}
      />
      {meta.touched && meta.error && <p className="mt-1 text-xs text-heart">{meta.error}</p>}
    </div>
  );
}
