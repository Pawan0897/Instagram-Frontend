import Icon from "./Icon";

export function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function PostSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-center gap-3 p-3">
        <Skeleton className="h-9 w-9 !rounded-full" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="aspect-square w-full !rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

export function EmptyState({ icon = "image", title, text, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink text-ink">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      {text && <p className="max-w-xs text-sm text-mute">{text}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="rounded-2xl border border-heart/30 bg-heart/5 p-5 text-center">
      <p className="text-sm font-medium text-heart">{error?.message || "Could not load this."}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 text-sm font-semibold text-brand hover:underline">
          Try again
        </button>
      )}
    </div>
  );
}
