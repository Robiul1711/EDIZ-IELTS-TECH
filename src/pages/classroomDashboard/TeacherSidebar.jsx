import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import {
  DashboardIcon,
  ExamIcon,
  StudentListIcon,
} from "@/components/svg/TeacherClassRoom";

const TeacherSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: DashboardIcon, path: "/classroom/register-as-teacher" },
    { name: "Exam", icon: ExamIcon, path: "/classroom/register-as-teacher/exams" },
    { name: "Student list", icon: StudentListIcon, path: "/classroom/register-as-teacher/student-list" },
  ];

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] xmd:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-72 z-[70] rounded-r-[2.5rem]
        xmd:sticky xmd:top-10 xmd:h-[calc(100vh-100px)] xmd:z-10 xmd:rounded-[2.5rem]
        bg-[#604CDF] p-6 
        transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full xmd:translate-x-0"}
      `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end xmd:hidden mb-6">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-[1.2rem] px-5 py-4 transition-all duration-300 border-2 ${
                  isActive
                    ? "bg-white border-white shadow-xl shadow-black/10 scale-[1.03]"
                    : "bg-transparent border-white/10 hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* ✅ ICON FIX */}
                  <div className=" shrink-0 flex items-center justify-center">
                    <item.icon
                      className={` ${
                        isActive ? "text-[#333] " : "text-white"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[15px] font-bold tracking-wider uppercase ${
                      isActive ? "text-[#333]" : "text-white"
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

export default TeacherSidebar;
