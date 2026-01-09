import React from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTESylluabusSW = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Header Area */}
      <div className="text-center mt-6 md:mt-12 space-y-4 px-2">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Part 1 : Speaking & Writing
        </h1>

        <div className="flex flex-col items-center gap-3 text-gray-600 dark:text-slate-400 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full shrink-0"></div>
            <p>Part 1 is approximately 73 minutes long.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full shrink-0"></div>
            <p>Click the "Next" button when you're ready.</p>
          </div>
        </div>
      </div>

      {/* Syllabus Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl w-full max-w-5xl border border-gray-100 dark:border-slate-800 p-4 md:p-12">
        
        {/* Mobile Scroll Hint (Visible only on small screens) */}
        <p className="text-[10px] text-gray-400 mb-2 md:hidden text-center">
          ← Swipe horizontally to view full table →
        </p>

        <div className="border border-gray-300 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-300 dark:border-slate-700">
                  <th className="py-4 px-6 font-bold text-base md:text-lg border-r border-gray-300 dark:border-slate-700 w-1/4 dark:text-slate-100">
                    Section
                  </th>
                  <th className="py-4 px-6 font-bold text-base md:text-lg border-r border-gray-300 dark:border-slate-700 w-2/4 dark:text-slate-100">
                    Content
                  </th>
                  <th className="py-4 px-6 font-bold text-base md:text-lg w-1/4 dark:text-slate-100">
                    Time Allowed
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {/* Section 01 */}
                <tr className="border-b border-gray-300 dark:border-slate-700">
                  <td
                    className="py-4 px-6 font-bold text-gray-700 dark:text-slate-300 border-r border-gray-300 dark:border-slate-700 align-top bg-gray-50/30 dark:bg-slate-800/20"
                    rowSpan={8}
                  >
                    Section-01
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                    Personal introduction
                  </td>
                  <td
                    className="py-4 px-6 align-middle text-center md:text-left dark:text-slate-400 font-medium"
                    rowSpan={8}
                  >
                    43 minutes
                  </td>
                </tr>
                {["Read aloud", "Repeat sentence", "Describe image", "Re-tell lecture", "Answer short question", "Summarize group discussion", "Respond to a situation"].map((item, idx, arr) => (
                  <tr key={item} className={idx === arr.length - 1 ? "border-b border-gray-300 dark:border-slate-700" : ""}>
                    <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors dark:text-slate-400">
                      {item}
                    </td>
                  </tr>
                ))}

                {/* Section 02 */}
                <tr>
                  <td
                    className="py-8 px-6 font-bold text-gray-700 dark:text-slate-300 border-r border-gray-300 dark:border-slate-700 align-top bg-gray-50/30 dark:bg-slate-800/20"
                    rowSpan={2}
                  >
                    Section-02
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 dark:border-slate-700 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                    Summarize written text
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 dark:border-slate-700 dark:text-slate-400 font-medium">
                    10 minutes
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                    Write essay
                  </td>
                  <td className="py-4 px-6 dark:text-slate-400 font-medium">20 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-6 px-4">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link to="/pte/test-start" className="w-full md:w-auto">
          <button className="bg-[#A22BDE] hover:bg-[#8e24c5] text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-slate-400 font-medium mt-4 text-xs md:text-sm px-4 text-center">
        <div className="flex gap-1 shrink-0">
          <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
          <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
        </div>
        <p>In the actual test, you will use a QWERTY keyboard.</p>
      </div>
    </div>
  );
};

export default PTESylluabusSW;