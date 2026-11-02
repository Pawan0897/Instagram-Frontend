import { useEffect } from "react";
import Icon from "./Icon";

export default function Modal({ open, onClose, title, children, wide = false, bare = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-3 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-in relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ${
          wide ? "max-w-5xl" : "max-w-md"
        }`}
      >
        {!bare && (
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-[15px] font-semibold">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-1 text-mute hover:bg-paper hover:text-ink">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </header>
        )}
        {bare && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-1.5 text-ink shadow hover:bg-card"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
