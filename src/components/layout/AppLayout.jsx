import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import RightRail from "./RightRail";
import MobileNav from "./MobileNav";
import ModalHost from "./ModalHost";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <TopBar />
      <main className="main-col px-4 py-4 md:px-6">
        <Outlet />
      </main>
      <RightRail />
      <MobileNav />
      <ModalHost />
    </div>
  );
}
