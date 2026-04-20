import React from "react";
import { Menu } from "lucide-react";
import Logo from "@/assets/images/Navlogo.png";
import { Link } from "react-router-dom";
import DarkLightToggle from "@/components/common/DarkLightToggle";
import UserDropdown from "@/shared/navbar/UserDropdown";

const StudentNavbar = ({ onMenuClick }) => {
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
        <DarkLightToggle />
        {/* Toggle Button */}

        <UserDropdown />
      </div>
    </nav>
  );
};

export default StudentNavbar;
