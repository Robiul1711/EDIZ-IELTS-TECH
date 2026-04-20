import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTEStartTest = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col gap-6 w-full max-w-md bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Ready to begin?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Your check-up is complete. Click "Start Test" to begin your PTE
            examination.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <Link to="/pte-examination" className="w-full">
            <button className="bg-[#A22BDE] hover:bg-[#8e24c5] text-white w-full py-4 text-base md:text-lg shadow-lg shadow-purple-200 dark:shadow-none rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group">
              Start Test{" "}
              <MdDoubleArrow className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-gray-100 dark:bg-slate-800 flex-1" />
            <span className="text-xs font-bold text-gray-400 dark:text-slate-600 uppercase">
              or
            </span>
            <div className="h-px bg-gray-100 dark:bg-slate-800 flex-1" />
          </div>

          <Link to="/pte" className="w-full">
            <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 w-full py-4 text-base md:text-lg rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              Exit Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PTEStartTest;
