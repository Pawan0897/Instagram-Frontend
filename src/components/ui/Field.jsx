import { forwardRef, useId } from "react";

const base =
  "w-full rounded-lg border border-line bg-card px-3 text-[15px] text-ink placeholder:text-mute/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export const Input = forwardRef(function Input({ label, hint, className = "", ...rest }, ref) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input id={id} ref={ref} className={`${base} h-11 ${className}`} {...rest} />
      {hint && <p className="text-xs text-mute">{hint}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea({ label, className = "", ...rest }, ref) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea id={id} ref={ref} className={`${base} resize-none py-2.5 ${className}`} {...rest} />
    </div>
  );
});

export function Select({ label, children, className = "", ...rest }) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select id={id} className={`${base} h-11 ${className}`} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function FormError({ error }) {
  if (!error) return null;
  return (
    <p role="alert" className="rounded-lg bg-heart/10 px-3 py-2 text-sm text-heart">
      {error.message || String(error)}
    </p>
  );
}
