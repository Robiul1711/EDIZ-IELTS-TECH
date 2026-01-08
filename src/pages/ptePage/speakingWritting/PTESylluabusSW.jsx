import React from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTESylluabusSW = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins">
      {/* Header Area */}
      <div className="text-center mt-6 md:mt-12 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
          Part 1 : Speaking & Writing
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
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-100 dark:border-slate-800 p-8 md:p-12">
        <div className="border border-gray-300 dark:border-slate-700 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-700">
                <th className="py-4 px-6 font-bold text-lg border-r border-gray-300 dark:border-slate-700 w-1/4 dark:text-slate-200">
                  Section
                </th>
                <th className="py-4 px-6 font-bold text-lg border-r border-gray-300 dark:border-slate-700 w-2/4 dark:text-slate-200">
                  Content
                </th>
                <th className="py-4 px-6 font-bold text-lg w-1/4 dark:text-slate-200">
                  Time Allowed
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Section 01 */}
              <tr className="border-b border-gray-300 dark:border-slate-700">
                <td
                  className="py-4 px-6 font-bold text-gray-700 dark:text-slate-300 border-r border-gray-300 dark:border-slate-700 align-top dark:bg-slate-900/50"
                  rowSpan={8}
                >
                  Section-01
                </td>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                  Personal introduction
                </td>
                <td
                  className="py-4 px-6 align-middle text-center md:text-left dark:text-slate-400"
                  rowSpan={8}
                >
                  43 minutes
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Read aloud
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Repeat sentence
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Describe image
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Re-tell lecture
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Answer short question
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-b border-gray-200 dark:border-slate-800 border-r dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500 dark:text-slate-400">
                  Summarize group discussion
                </td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-slate-700">
                <td className="py-4 px-6 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                  Resond to a situation
                </td>
              </tr>

              {/* Section 02 */}
              <tr>
                <td
                  className="py-8 px-6 font-bold text-gray-700 dark:text-slate-300 border-r border-gray-300 dark:border-slate-700 align-top dark:bg-slate-900/50"
                  rowSpan={2}
                >
                  Section-02
                </td>
                <td className="py-4 px-6 border-b border-gray-300 dark:border-slate-700 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                  Summarize written text
                </td>
                <td className="py-4 px-6 border-b border-gray-300 dark:border-slate-700 dark:text-slate-400">
                  10 minutes
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 border-r border-gray-300 dark:border-slate-700 dark:text-slate-400">
                  Write essay
                </td>
                <td className="py-4 px-6 dark:text-slate-400">20 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-6">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95">
          <File size={20} /> Save & Exist
        </button>

        <Link to="/pte/test-start">
          <button className="bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400 font-medium mt-4">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
          <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
        </div>
        <p>In the actual test, you will use a QWERTY keyboard.</p>
      </div>
    </div>
  );
};

export default PTESylluabusSW;
