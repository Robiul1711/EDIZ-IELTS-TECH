import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicSpeaking = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 md:p-8">
      {/* Title Section */}
      <div className="text-center max-w-3xl mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          IELTS Academic Speaking Test
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-400">
          You will have approximately 30 minutes to do the Speaking test.
        </p>
      </div>

      {/* Instructions Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl mb-12 md:mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
            Instructions
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Answer all the questions naturally and clearly.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Make sure to provide detailed answers within the given time
                limits.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Ensure you are in a quiet environment similar to a testing
                centre for accurate grading.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
            Test Structure
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                There are 3 parts in this test. You will be asked between 19 and
                22 questions.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Ensure your recording device is functional and no external noise
                disrupts your test.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/speaking/part1"
        className="w-full sm:w-auto bg-gray-900 dark:bg-slate-800 text-white font-bold py-4 md:py-5 px-10 md:px-16 gap-3 rounded-2xl flex items-center justify-center text-lg md:text-xl transition-all hover:bg-gray-800 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 shadow-lg group"
      >
        <span>Start Test</span>
        <FaAnglesRight className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default IELTSAcademicSpeaking;
