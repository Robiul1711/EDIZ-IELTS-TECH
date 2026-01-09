import React from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningSyllubus = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins animate-in fade-in duration-700 transition-colors duration-300 dark:bg-slate-950">
      {/* Header Area */}
      <div className="text-center mt-6 md:mt-12 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Part 3: Listening
        </h1>

        <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)]"></div>
            <p>The Listening part is approximately 45 minutes long.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)]"></div>
            <p>Click the "Next" button when you're ready.</p>
          </div>
        </div>
      </div>

      {/* Syllabus Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 relative transition-all duration-300">
        {/* Visual Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>

        <div className="border border-slate-100 dark:border-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-0">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="py-4 md:py-6 px-4 md:px-8 font-bold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800 w-[20%] uppercase tracking-wider text-xs md:text-base">
                  Section
                </th>
                <th className="py-4 md:py-6 px-4 md:px-8 font-bold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800 w-[55%] uppercase tracking-wider text-xs md:text-base">
                  Content
                </th>
                <th className="py-4 md:py-6 px-4 md:px-8 font-bold text-slate-700 dark:text-slate-300 w-[25%] uppercase tracking-wider text-xs md:text-base">
                  Time Allowed
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-lg">
              {/* Section 01 */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-8 px-4 md:px-8 font-bold text-slate-800 dark:text-white border-r border-slate-100 dark:border-slate-800 align-top">
                  Section-01
                </td>
                <td className="py-4 md:py-8 px-4 md:px-8 border-r border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  Summarize spoken text
                </td>
                <td className="py-4 md:py-8 px-4 md:px-8 text-indigo-600 dark:text-indigo-400 font-bold">
                  10 minutes
                </td>
              </tr>

              {/* Section 02 Group */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td
                  className="py-4 md:py-8 px-4 md:px-8 font-bold text-slate-800 dark:text-white border-r border-slate-100 dark:border-slate-800 align-top"
                  rowSpan={7}
                >
                  Section-02
                </td>
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Multiple-choice, choose multiple answers
                </td>
                <td
                  className="py-4 md:py-8 px-4 md:px-8 align-top text-indigo-600 dark:text-indigo-400 font-bold"
                  rowSpan={7}
                >
                  25 minutes
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Fill in the blanks
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Highlight correct summary
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Multiple-choice, choose single answer
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Select missing word
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-4 md:py-6 px-4 md:px-8 border-b border-slate-50 dark:border-slate-800/50 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Highlight incorrect words
                </td>
              </tr>
              <tr>
                <td className="py-4 md:py-6 px-4 md:px-8 border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                  Write from dictation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto  md:mt-10">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link to="/pte-examination-listening" className="w-full md:w-auto">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg shadow-indigo-200 dark:shadow-none rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-95 active:scale-95 group">
            Next{" "}
            <MdDoubleArrow
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex flex-col md:flex-row items-center gap-3 text-slate-500 dark:text-slate-400 font-medium mt-4 text-center">
        <div className="flex gap-1.5 order-2 md:order-1">
          <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        </div>
        <p className="text-sm order-1 md:order-2">
          In the actual test, you will use a QWERTY keyboard.
        </p>
      </div>
    </div>
  );
};

export default ListeningSyllubus;
