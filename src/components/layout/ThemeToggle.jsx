import { useState } from "react";
import Icon from "../ui/Icon";

function currentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  function setMode(mode) {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
    setTheme(mode);
  }

  return (
    <div className="theme-switch">
      <button className={`${theme === "light" ? "on" : "" } flex items-center justify-center`} onClick={() => setMode("light")} aria-label="Light mode">
        <Icon name="sun" className="h-4 w-4" />
      </button>
      <button className={`${theme === "dark" ? "on" : ""} flex items-center justify-center`} onClick={() => setMode("dark")} aria-label="Dark mode">
        <Icon name="moon" className="h-4 w-3" />
      </button>
    </div>
  );
}
