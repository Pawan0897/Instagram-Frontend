import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);
let uid = 0;

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const push = useCallback((type, message) => {
    if (!message) return;
    const id = ++uid;
    setItems((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3600);
  }, []);

  const api = useMemo(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4 md:bottom-8"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={`modal-in pointer-events-auto max-w-sm rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
              t.type === "error" ? "bg-heart" : "bg-ink"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
