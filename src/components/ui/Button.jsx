// Uiverse-style button (CSS: .uv-btn in index.css)
export default function Button({ loading, light, danger, full, children, className = "", ...rest }) {
  const cls = [
    "uv-btn",
    light && "uv-btn-light",
    danger && "uv-btn-danger",
    full && "uv-btn-full",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading && <span className="uv-loader uv-loader-sm" />}
      {children}
    </button>
  );
}
