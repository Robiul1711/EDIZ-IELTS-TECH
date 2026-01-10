import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

/**
 * ScrollToTop Component
 *
 * A premium, floating button that appears on the bottom-right corner
 * when the user scrolls down, allowing them to smoothly return to the top.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-12 h-12  bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full shadow-lg shadow-indigo-500/30 dark:shadow-indigo-900/50 hover:shadow-xl hover:shadow-indigo-500/40 dark:hover:shadow-indigo-900/60 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-5 hover:scale-110 active:scale-95 ring-4 ring-white/10 dark:ring-slate-800/50"
          aria-label="Scroll to top"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

          <ChevronUp
            size={24}
            className="group-hover:-translate-y-1 transition-transform duration-300"
          />

          {/* Tooltip (Hidden on small screens) */}
          <span className="absolute right-full mr-4 px-3 py-1 bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md translate-x-2 group-hover:translate-x-0 hidden md:block">
            Scroll to Top
          </span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
