import { ImageAssets } from "@/lib/ImageProvider";
import React, { useState, useEffect } from "react"; // 1. Import hooks
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false); // 2. State to track scroll
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 3. Effect to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        // Trigger effect after 20px of scrolling
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-all duration-300 section-padding-x 
        ${
          isScrolled
            ? "bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between py-3">
          <Link to="/">
            <img src={ImageAssets.logo} alt="Logo" className="dark:invert w-24 sm:w-28 md:w-auto" />
          </Link>

          <div className="flex gap-5 items-center">
            {/* Theme Toggle Button - Slider Style */}
            <button
              onClick={toggleTheme}
              className="relative w-20 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 p-1 transition-all duration-300 hover:shadow-lg flex items-center"
              aria-label="Toggle theme"
            >
              {/* Sliding Circle Indicator */}
              <div
                className={`absolute w-8 h-8 rounded-full bg-white shadow-md transform transition-all duration-300 flex items-center justify-center ${
                  theme === "light" ? "translate-x-0" : "translate-x-10"
                }`}
              >
                {/* Active Icon inside the circle */}
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-indigo-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>

              {/* Background Icons */}
              <div className="w-full flex items-center justify-between px-2 relative z-0">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
            </button>

            <div className="hidden md:flex gap-4 items-center">
              <button className="px-8 py-3 dark:text-white bg-custom text-primary-foreground  rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md">
                Purchase
              </button>
              <Link
                to="/auth"
                className="px-8 py-3 dark:text-white hover:opacity-90 duration-300  dark:bg-Primary   bg-primary font-semibold  text-white hover:text-black  border rounded-full hover:bg-accent transition-colors"
              >
                Sign up
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
