"use client";

import { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Page load hone ke baad localStorage read karo
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Theme apply karo jab change ho
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    debugger
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      onClick={toggleTheme}
      className="
        cursor-pointer
        rounded-full
        p-2
        bg-gray-200 dark:bg-gray-800
        text-gray-800 dark:text-white
        transition-all duration-300
      "
    >
      <WiMoonAltWaningCrescent4 className="w-6 h-6" />
    </div>
  );
};

export default Themetoggle;
