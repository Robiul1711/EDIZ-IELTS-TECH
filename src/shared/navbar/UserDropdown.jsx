import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative user-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 group p-1 pr-3"
      >
        {/* {console.log(user)} */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <User className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm font-semibold dark:text-white truncate max-w-[100px]">
            {user.name || "User"}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 capitalize opacity-80">
            {user.role || "Student"}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 group-hover:text-primary ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right z-50">
          <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/5">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              Signed in as
            </p>
            <p className="text-sm font-semibold dark:text-white truncate">
              {user.email || "No email"}
            </p>
          </div>
          <div className="p-2">
            <Link
              to={`/${user.role || "student"}-dashboard`}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 group"
              onClick={() => setIsDropdownOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={`/student-dashboard/profile`}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 group"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>
          <div className="p-2 border-t border-gray-100 dark:border-white/5">
            <button
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200 group text-left"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
