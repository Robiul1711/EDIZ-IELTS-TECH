import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import React from "react";

const DarkLightToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      onClick={toggleTheme}
      className="group relative flex h-8 w-14 md:w-16 cursor-pointer items-center rounded-full bg-[#5E4FD7] p-1 shadow-inner transition-all duration-300"
    >
      <div
        className={`absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDarkMode ? "translate-x-6 md:translate-x-8" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <Moon size={12} className="text-[#5E4FD7]" />
        ) : (
          <Sun size={12} className="text-[#5E4FD7]" />
        )}
      </div>
      <div className="flex w-full items-center justify-around px-1 text-white/40">
        <Sun size={12} />
        <Moon size={12} />
      </div>
    </div>
  );
};

export default DarkLightToggle;
