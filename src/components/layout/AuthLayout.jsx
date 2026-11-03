import { Outlet } from "react-router-dom";
import Logo from "../brand/Logo";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-[380px] space-y-4">
        <div className="vs-card px-8 pb-8 pt-8">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
