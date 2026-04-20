import React from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ReadingSyllubus = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10  pb-10 font-poppins ">
      {/* Header Area */}
      <div className="text-center mt-6 md:mt-12 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
          Part 2 : Reading
        </h1>

        <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
            <p>Part 1 is approximately 73 minutes long.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
            <p>Click the "Next" button when you're ready.</p>
          </div>
        </div>
      </div>

      {/* Syllabus Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <div className="min-w-[600px] border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
                  <th className="py-4 px-6 font-bold text-sm md:text-lg border-r border-gray-200 dark:border-slate-700 w-1/4 dark:text-slate-200 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="py-4 px-6 font-bold text-sm md:text-lg border-r border-gray-200 dark:border-slate-700 w-2/4 dark:text-slate-200 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="py-4 px-6 font-bold text-sm md:text-lg w-1/4 dark:text-slate-200 uppercase tracking-wider">
                    Time Allowed
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Section 01 */}
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <td
                    className="py-6 px-6 font-bold text-slate-700 dark:text-slate-300 border-r border-gray-200 dark:border-slate-700 align-top bg-slate-50/30 dark:bg-slate-800/20"
                    rowSpan={5}
                  >
                    Section-01
                  </td>
                  <td className="py-4 px-6 border-b border-gray-100 dark:border-slate-800 border-r border-gray-200 dark:border-slate-700 dark:text-slate-400 font-medium">
                    Reading and writing; fill in the blanks
                  </td>
                  <td
                    className="py-6 px-6 align-middle text-center dark:text-slate-400 font-bold"
                    rowSpan={5}
                  >
                    29 - 30 minutes
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800/50">
                  <td className="py-4 px-6 border-r border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
                    Multiple-choice, choose multiple answers
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800/50">
                  <td className="py-4 px-6 border-r border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
                    Re-order paragraphs
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800/50">
                  <td className="py-4 px-6 border-r border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
                    Reading: fill in the blanks
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-r border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors">
                    Multiple-choice, choose single answer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-6">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link
          to="/pte-examination-reading/fill-in-blanks"
          className="w-full md:w-auto"
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg shadow-indigo-200 dark:shadow-none rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-95 active:scale-95 group">
            Next{" "}
            <MdDoubleArrow
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 dark:text-slate-500 font-medium mt-8 text-center md:text-left">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
        <p className="text-sm md:text-base">
          In the actual test, you will use a QWERTY keyboard.
        </p>
      </div>
    </div>
  );
};

export default ReadingSyllubus;
