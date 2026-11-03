import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, followApi } from "../../api/services";
import { logout } from "../../store/authSlice";
import { openModal } from "../../store/uiSlice";
import { confirmBox } from "../../lib/alert";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import Logo from "../brand/Logo";

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((s) => s.auth.user);
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { data: requests = [] } = useQuery({ queryKey: ["followRequests"], queryFn: followApi.requests });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });

  async function handleLogout() {
    const ok = await confirmBox({ title: "Log out?", text: "You'll need to log in again.", confirmText: "Log out" });
    if (ok) logoutMutation.mutate();
  }

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSearch(e) {
    e.preventDefault();
    navigate("/people");
  }

  return (
    <header className="topbar flex items-center justify-between gap-4 px-4 py-3 md:px-6">
      <div className="show-mobile">
        <Logo />
      </div>

      <form onSubmit={onSearch} className="search-box hide-mobile mx-auto w-full max-w-xl">
        <Icon name="search" className="h-4 w-4 text-[var(--muted)]" />
        <input ref={searchRef} placeholder="Search people, posts, or anything..." />
        <span className="search-kbd">Ctrl K</span>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button className="icon-btn show-mobile" onClick={() => navigate("/people")} aria-label="Search">
          <Icon name="search" />
        </button>
        <button className="icon-btn" onClick={() => dispatch(openModal({ name: "createPost" }))} aria-label="New post">
          <Icon name="plus" className="h-5 w-5" />
        </button>
        <button className="icon-btn" onClick={() => navigate("/notifications")} aria-label="Notifications">
          <Icon name="bell" />
          {requests.length > 0 && <span className="dot" />}
        </button>
        <div className="relative">
          <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1">
            <Avatar src={user?.image} name={displayName(user)} size="sm" />
          </button>
          {open && (
            <div className="vs-card absolute right-0 z-40 mt-2 w-44 overflow-hidden py-1 text-sm">
              <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-black/5">Profile</Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-black/5">Settings</Link>
              <button onClick={handleLogout} className="block w-full px-3 py-2 text-left text-[var(--color-heart)] hover:bg-black/5">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
