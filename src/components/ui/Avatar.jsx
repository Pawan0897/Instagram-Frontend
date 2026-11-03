const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-3xl md:h-36 md:w-36 md:text-5xl",
};

export default function Avatar({ src, name = "", size = "md", ring = false }) {
  const face = src ? (
    <img src={src} alt="" className="h-full w-full rounded-full object-cover" />
  ) : (
    <span className="grid h-full w-full place-items-center rounded-full bg-[#c7c7c7] font-semibold text-white">
      {(name[0] || "?").toUpperCase()}
    </span>
  );

  if (!ring) return <div className={`${sizes[size]} shrink-0`}>{face}</div>;

  return (
    <div className={`${sizes[size]} story-ring shrink-0 rounded-full p-[2px]`}>
      <div className="h-full w-full rounded-full bg-white p-[2px]">{face}</div>
    </div>
  );
}
