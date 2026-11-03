import { useDispatch } from "react-redux";
import { closeModal } from "../../store/uiSlice";
import Icon from "./Icon";

/** Shell only. Open/close Redux (uiSlice) se hota hai, isliye onClose prop nahi chahiye. */
export default function Modal({ title, wide, bare, children }) {
  const dispatch = useDispatch();
  const close = () => dispatch(closeModal());

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-3"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-box relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-[22px] bg-[var(--card)] shadow-2xl ${wide ? "max-w-5xl" : "max-w-md"}`}
      >
        {bare ? (
          <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 shadow hover:bg-white">
            <Icon name="close" className="h-5 w-5" />
          </button>
        ) : (
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="mx-auto text-base font-semibold">{title}</h2>
            <button onClick={close} aria-label="Close" className="absolute right-3 top-3 text-mute hover:text-ink">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </header>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
