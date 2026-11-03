import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { followApi } from "../../api/services";
import { openModal } from "../../store/uiSlice";
import Logo from "../brand/Logo";
import Icon from "../ui/Icon";
import PremiumCard from "./PremiumCard";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { data: requests = [] } = useQuery({ queryKey: ["followRequests"], queryFn: followApi.requests });

  return (
    <aside className="side flex flex-col gap-6 px-5 py-5">
      <Logo />
      <nav className="flex flex-1 flex-col gap-1">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="home" /> Home
        </NavLink>
        <NavLink to="/people" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="compass" /> Explore
        </NavLink>
        <NavLink to="/liked" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="reels" /> Reels
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="mail" /> Messages
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="heart" /> Notifications
          {requests.length > 0 && <span className="badge">{requests.length}</span>}
        </NavLink>
        <button className="nav-item" onClick={() => dispatch(openModal({ name: "createPost" }))}>
          <Icon name="plus" /> Create
        </button>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Icon name="user" /> Profile
        </NavLink>
      </nav>
      <PremiumCard />
      <ThemeToggle />
    </aside>
  );
}
