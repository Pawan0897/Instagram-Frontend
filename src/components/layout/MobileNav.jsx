import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/uiSlice";
import Icon from "../ui/Icon";

export default function MobileNav() {
  const dispatch = useDispatch();
  const item = ({ isActive }) => `p-2 ${isActive ? "text-[var(--color-brand)]" : "text-[var(--muted)]"}`;

  return (
    <nav className="mobile-bar">
      <NavLink to="/" end aria-label="Home" className={item}><Icon name="home" /></NavLink>
      <NavLink to="/people" aria-label="Explore" className={item}><Icon name="compass" /></NavLink>
      <button aria-label="Create" className="p-2 text-[var(--muted)]" onClick={() => dispatch(openModal({ name: "createPost" }))}>
        <Icon name="plus" />
      </button>
      <NavLink to="/liked" aria-label="Reels" className={item}><Icon name="reels" /></NavLink>
      <NavLink to="/profile" aria-label="Profile" className={item}><Icon name="user" /></NavLink>
    </nav>
  );
}
