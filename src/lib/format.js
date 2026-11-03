export function timeAgo(date) {
  if (!date) return "";
  const s = Math.max(1, Math.floor((Date.now() - new Date(date)) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(date).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export function formatCount(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
}

/** Feed/comments me poora user nahi milta, isliye fallback naam */
export function displayName(user, id) {
  if (user?.userName) return user.userName;
  const full = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  if (full) return full;
  if (user?.email) return user.email.split("@")[0];
  return id ? `member_${String(id).slice(-4)}` : "member";
}

/** Backend ki Joi empty string reject karti hai, isliye khaali fields hata do */
export function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v != null));
}

export const countText = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
