export function Loader() {
  return (
    <div className="grid place-items-center py-16">
      <span className="uv-loader" />
    </div>
  );
}

export function Empty({ title, text }) {
  return (
    <div className="px-6 py-16 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {text && <p className="mx-auto mt-1 max-w-xs text-sm text-mute">{text}</p>}
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="vs-card overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <div className="skeleton h-8 w-8 !rounded-full" />
        <div className="skeleton h-3 w-28" />
      </div>
      <div className="skeleton aspect-square w-full !rounded-none" />
      <div className="space-y-2 p-3">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-3 w-44" />
      </div>
    </div>
  );
}
