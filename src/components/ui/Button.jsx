const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark disabled:bg-brand/50",
  secondary: "bg-ink/[0.06] text-ink hover:bg-ink/10 disabled:opacity-50",
  outline: "border border-line bg-card text-ink hover:bg-paper disabled:opacity-50",
  danger: "bg-heart text-white hover:bg-heart/90 disabled:bg-heart/50",
  ghost: "text-brand hover:bg-brand/10 disabled:opacity-50",
};
const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-11 px-5 text-[15px]" };

export default function Button({
  variant = "primary", size = "md", loading = false, full = false, className = "", children, disabled, ...rest
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
