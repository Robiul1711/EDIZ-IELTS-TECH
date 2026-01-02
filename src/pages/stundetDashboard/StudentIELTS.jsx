import React, { useState } from "react";
import StudentIeltsSection from "./studentIelts/StudentIeltsSection";

const StudentIELTS = () => {
  const [activeTab, setActiveTab] = useState("Academic");

  return (
    <div className="w-full space-y-6">
      {/* Tab Switcher Container */}
      <div className="flex justify-center items-center">
        <div className="relative flex items-center  bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-slate-100 shadow-sm w-[280px]">
          {/* Animated Background Slider */}
          <div 
            className={`absolute h-[85%] w-[48%] bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out border border-slate-50 ${
              activeTab === "Academic" ? "translate-x-0" : "translate-x-[104%]"
            }`}
          />
          
          {/* Academic Button */}
          <button
            onClick={() => setActiveTab("Academic")}
            className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === "Academic" ? "text-[#604CDF]" : "text-slate-500"
            }`}
          >
            Academic
          </button>

          {/* General Button */}
          <button
            onClick={() => setActiveTab("General")}
            className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === "General" ? "text-[#604CDF]" : "text-slate-500"
            }`}
          >
            General
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <StudentIeltsSection type={activeTab} />
      </div>
    </div>
  );
};

export default StudentIELTS;