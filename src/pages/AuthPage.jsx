import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import OtpFlow from "../components/auth/OtpFlow";
import { useToast } from "../context/ToastContext";

// Decorative stack: sirf CSS, koi remote image nahi
function FrameStack() {
  const tiles = [
    ["from-[#ffb23e] to-[#ff3d6e]", "-rotate-6 -translate-x-10 translate-y-4"],
    ["from-[#3a4bff] to-[#b13bff]", "rotate-3 translate-x-8 -translate-y-2"],
    ["from-[#14161b] to-[#3a4bff]", "-rotate-1 translate-y-10 translate-x-1"],
  ];
  return (
    <div className="relative mx-auto h-72 w-64" aria-hidden="true">
      {tiles.map(([bg, pos], i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${bg} ${pos} border-[10px] border-white shadow-xl`}
        />
      ))}
    </div>
  );
}

export default function AuthPage() {
  const toast = useToast();
  const [view, setView] = useState("login"); // login | signup | otp | forgot

  const tab = (v, label) => (
    <button
      onClick={() => setView(v)}
      className={`flex-1 border-b-2 pb-3 text-sm font-semibold transition-colors ${
        view === v ? "border-ink text-ink" : "border-transparent text-mute hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-card p-12 lg:flex">
        <span className="font-display text-3xl italic">Frame</span>
        <div className="space-y-12">
          <FrameStack />
          <p className="mx-auto max-w-sm text-center text-lg text-mute">
            Share the pictures worth keeping with the people who care to see them.
          </p>
        </div>
        <span className="text-xs text-mute">Made with React, Tailwind and TanStack Query.</span>
      </section>

      <section className="grid place-items-center px-5 py-10">
        <div className="w-full max-w-sm">
          <span className="mb-8 block text-center font-display text-4xl italic lg:hidden">Frame</span>

          {(view === "login" || view === "signup") && (
            <>
              <div className="mb-6 flex">{tab("login", "Log in")}{tab("signup", "Sign up")}</div>
              {view === "login" ? (
                <LoginForm onForgot={() => setView("forgot")} onOtp={() => setView("otp")} />
              ) : (
                <SignupForm />
              )}
            </>
          )}

          {view === "otp" && <OtpFlow mode="login" onBack={() => setView("login")} />}
          {view === "forgot" && (
            <OtpFlow
              mode="forgot"
              onBack={() => setView("login")}
              onDone={() => {
                toast.success("Password updated. Log in with your new password.");
                setView("login");
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
