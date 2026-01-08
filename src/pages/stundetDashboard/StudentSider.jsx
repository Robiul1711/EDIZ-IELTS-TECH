import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import DashboardImage from "@/assets/images/d.png";
import IeltsImage from "@/assets/images/I.png";
import PTEImage from "@/assets/images/P.png";
import ClassRoomImage from "@/assets/images/C.png";
import ScoreImage from "@/assets/images/score.png";

const StudentSider = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: DashboardImage, path: "/student-dashboard" },
    { name: "IELTS", icon: IeltsImage, path: "/student-dashboard/ielts" },
    { name: "PTE", icon: PTEImage, path: "/student-dashboard/pte" },
    {
      name: "CLASSROOM",
      icon: ClassRoomImage,
      path: "/student-dashboard/classroom",
    },
    { name: "Score", icon: ScoreImage, path: "/student-dashboard/score" },
  ];

  return (
    <>
      {/* Overlay for Mobile - only visible below xmd */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] xmd:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        /* Mobile Styles */
        fixed top-0 left-0 h-full w-72 z-[70] rounded-r-[2.5rem]
        
        /* Desktop Styles (xmd: 992px+) */
        xmd:sticky xmd:top-10 xmd:h-[calc(100vh-100px)] xmd:z-10 xmd:rounded-[2.5rem]
        
        /* Shared Styles */
        bg-[#604CDF] p-6 
        transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full xmd:translate-x-0"}
      `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end xmd:hidden mb-6">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items Container */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/student-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-[1.2rem] px-5 py-4 transition-all duration-300 border-2 ${
                  isActive
                    ? "bg-white dark:bg-slate-800 border-white dark:border-slate-700 shadow-xl shadow-black/10 scale-[1.03]"
                    : "bg-transparent border-white/10 hover:bg-white/5 text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="h-9 w-9 shrink-0">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-full w-full object-contain drop-shadow-md"
                    />
                  </div>
                  <span
                    className={`text-[15px] font-bold tracking-wider uppercase ${
                      isActive ? "text-[#333] dark:text-white" : "text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentSider;
