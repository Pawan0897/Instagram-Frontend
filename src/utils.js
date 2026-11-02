export function timeAgo(date) {
  if (!date) return "";
  const s = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(date).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

/** Feed/comments me sirf userName ya id milta hai, isliye graceful fallback */
export function displayName(user, fallbackId) {
  if (user?.userName) return user.userName;
  const full = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  if (full) return full;
  if (user?.email) return user.email.split("@")[0];
  if (fallbackId) return `member_${String(fallbackId).slice(-4)}`;
  return "member";
}

export const initialOf = (name = "") => (name.trim()[0] || "?").toUpperCase();

export const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
