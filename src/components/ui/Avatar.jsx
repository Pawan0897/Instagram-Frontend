import { initialOf } from "../../utils";

const sizes = {
  xs: "h-7 w-7 text-[11px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-28 w-28 text-3xl md:h-36 md:w-36 md:text-4xl",
};

export default function Avatar({ src, name = "", size = "md", ring = false }) {
  const inner = src ? (
    <img src={src} alt="" className="h-full w-full rounded-full object-cover" />
  ) : (
    <span className="grid h-full w-full place-items-center rounded-full bg-ink font-semibold text-white">
      {initialOf(name)}
    </span>
  );

  if (!ring) return <div className={`${sizes[size]} shrink-0`}>{inner}</div>;

  return (
    <div className={`${sizes[size]} ring-story shrink-0 rounded-full p-[2.5px]`}>
      <div className="h-full w-full rounded-full bg-card p-[2px]">{inner}</div>
    </div>
  );
}
