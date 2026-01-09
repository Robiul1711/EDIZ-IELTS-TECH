import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const IELTSAcademicWriting = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Title Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          IELTS Academic Writing
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-slate-400 max-w-2xl">
          You will have approximately 30 minutes to do the Writing test.
        </p>
      </div>

      {/* Instructions Cards Section */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full max-w-6xl mb-12 md:mb-16">
        
        {/* Left Card: Instructions */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 flex items-center">
            Instructions To Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Answer both parts.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                You can change your answers at any time during the test.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card: Information */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 flex items-center">
            Information for Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                There are two parts in this test.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                Part 2 contributes twice as much as Part 1 to the writing score.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base">
                The clock will show when 10 and 5 minutes remain.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <div className="w-full flex justify-center px-4">
        <Link
          to="/writing/part1"
          className="w-full sm:w-auto bg-gray-900 dark:bg-purple-700 text-white font-bold py-4 md:py-5 px-8 md:px-16 gap-3 rounded-xl flex items-center justify-center text-lg md:text-xl transition-all hover:bg-gray-800 dark:hover:bg-purple-600 active:scale-95 shadow-lg"
        >
          Start Test
          <FaAnglesRight className="text-base md:text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default IELTSAcademicWriting;
