import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/queries";
import { displayName } from "../../utils";
import CreatePostModal from "../post/CreatePostModal";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";

const links = [
  { to: "/", icon: "home", label: "Home", end: true },
  { to: "/liked", icon: "heart", label: "Liked" },
  { to: "/connections", icon: "users", label: "People" },
  { to: "/profile", icon: "user", label: "Profile" },
  { to: "/settings", icon: "settings", label: "Settings" },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-4 rounded-xl px-3 py-2.5 text-[15px] transition-colors hover:bg-ink/5 ${
    isActive ? "font-bold" : "font-medium text-ink/80"
  }`;

export default function AppShell() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const logout = useLogout();

  const doLogout = async () => {
    try { await logout.mutateAsync(); } catch { /* token pehle hi invalid ho sakta hai */ }
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-card px-3 py-6 md:flex">
        <span className="mb-8 px-3 font-display text-3xl italic">Frame</span>
        <nav className="flex-1 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {({ isActive }) => (
                <>
                  <Icon name={l.icon} filled={isActive && l.icon === "heart"} strokeWidth={isActive ? 2.3 : 1.8} />
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
          <button onClick={() => setCreating(true)} className={`${linkClass({ isActive: false })} w-full`}>
            <Icon name="plus" /> Create
          </button>
        </nav>

        <div className="space-y-1 border-t border-line pt-4">
          <button onClick={() => navigate("/profile")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-ink/5">
            <Avatar src={user?.image} name={displayName(user)} size="sm" />
            <span className="min-w-0 truncate text-sm font-semibold">{displayName(user)}</span>
          </button>
          <button onClick={doLogout} className={`${linkClass({ isActive: false })} w-full text-mute`}>
            <Icon name="logout" /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile top + bottom bars */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-card/90 px-4 py-3 backdrop-blur md:hidden">
        <span className="font-display text-2xl italic">Frame</span>
        <button onClick={() => setCreating(true)} aria-label="Create post" className="rounded-full bg-brand p-1.5 text-white">
          <Icon name="plus" className="h-5 w-5" strokeWidth={2.4} />
        </button>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            aria-label={l.label}
            className={({ isActive }) => `rounded-xl p-2 ${isActive ? "text-ink" : "text-mute"}`}
          >
            {({ isActive }) => <Icon name={l.icon} filled={isActive && l.icon === "heart"} strokeWidth={isActive ? 2.3 : 1.8} />}
          </NavLink>
        ))}
      </nav>

      <main className="px-4 pb-24 pt-5 md:ml-60 md:pb-12 md:pt-8">
        <Outlet />
      </main>

      <CreatePostModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}
