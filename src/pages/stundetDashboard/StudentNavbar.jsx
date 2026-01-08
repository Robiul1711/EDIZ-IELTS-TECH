import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { User, Key, LogOut, Sun, Moon, Menu } from "lucide-react";
import Logo from "@/assets/images/Navlogo.png";
import { Link } from "react-router-dom";

const StudentNavbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative flex items-center justify-between pt-8 bg-transparent">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Visible only below xmd (992px) */}
        <button
          onClick={onMenuClick}
          className="xmd:hidden p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#604CDF] dark:text-[#8370FF] shadow-sm active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>

        <Link to={`/`} className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 md:h-12 w-auto object-contain dark:invert"
          />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Toggle Button */}
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

        {/* Profile Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border-2 border-[#5E4FD7] bg-white"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="h-full w-full object-cover"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-4 w-56 md:w-64 origin-top-right rounded-2xl bg-white py-2 shadow-2xl z-50 ring-1 ring-black/5">
              <button className="flex w-full items-center gap-4 px-5 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
                <User size={18} strokeWidth={1.5} />{" "}
                <span className="font-medium">Profile</span>
              </button>
              <div className="mx-5 border-t border-slate-100"></div>
              <button className="flex w-full items-center gap-4 px-5 py-3 text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={18} strokeWidth={1.5} />{" "}
                <span className="font-medium">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
