import NavigationButton from "@/components/common/NavigationButton";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const IELTSAcademicWriting = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Title Section */}
      <div className="flex items-center justify-start w-full max-w-5xl mb-8">
        <NavigationButton href="/ielts" label="Back" />
      </div>

      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          IELTS Academic Writing
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-slate-400 mb-8 md:mb-12">
          You will have approximately 30 minutes to do the Writing test.
        </p>
      </div>

      {/* Instructions Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full max-w-5xl mb-12 md:mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 font-poppins">
            Instructions To Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins font-medium">
                Answer both parts.
              </span>
            </li>
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins">
                You can change your answers any time during the test.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 font-poppins">
            Information for Test Takers
          </h2>
          <ul className="space-y-4">
            {[
              "There are two parts in this test.",
              "Part 2 contributes twice as much as Part 1 to the writing score.",
              "The clock will show when 10 and 5 minutes remain.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start md:items-center">
                <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
                <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/writing/part1"
        className="bg-gray-900 dark:bg-purple-700 text-white font-bold py-4 px-10 md:py-5 md:px-16 gap-3 rounded-xl flex items-center justify-center text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg hover:bg-gray-800 dark:hover:bg-purple-600"
      >
        <span>Start Test</span>
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicWriting;
