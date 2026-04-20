import NavigationButton from "@/components/common/NavigationButton";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicReading = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Title Section */}
      <div className="flex items-center justify-start w-full  mb-4">
        <NavigationButton href="/ielts" label="Back" />
      </div>
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Instructions to Test Takers
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 md:mb-12">
          You will have approximately 30 minutes to do the Reading test.
        </p>
      </div>

      {/* Instructions Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full max-w-5xl mb-12 md:mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Instructions to Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                Answer all questions
              </span>
            </li>
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                You can change answers any time
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Test Format
          </h2>
          <ul className="space-y-4">
            {[
              "40 questions",
              "1 mark per question",
              "4 parts total",
              "Time to review questions",
              "You can take notes",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start md:items-center">
                <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
                <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/reading/part1"
        className="bg-gray-900   text-white font-bold py-4 px-10 md:py-5 md:px-16 gap-2 rounded-xl flex items-center text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
      >
        Start Test
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicReading;
