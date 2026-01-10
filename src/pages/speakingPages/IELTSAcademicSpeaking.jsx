import NavigationButton from "@/components/common/NavigationButton";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicSpeaking = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Title Section */}
      <div className="flex items-center justify-start w-full max-w-5xl mb-8">
        <NavigationButton href="/ielts" label="Back" />
      </div>

      <div className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight font-poppins">
          IELTS Academic Speaking Test
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 mb-8 md:mb-12 font-poppins">
          You will have approximately 30 minutes to do the Speaking test.
        </p>
      </div>

      {/* Instructions Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl mb-12 md:mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 font-poppins">
            Instructions
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins">
                Answer all the questions naturally and clearly.
              </span>
            </li>
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins">
                Make sure to provide detailed answers within the given time
                limits.
              </span>
            </li>
            <li className="flex items-start md:items-center">
              <span className="h-2 w-2 min-w-[8px] bg-purple-600 rounded-full mt-2 md:mt-0 mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400 text-sm md:text-base font-poppins">
                Ensure you are in a quiet environment similar to a testing
                centre.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm transition-all">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6 font-poppins">
            Test Details
          </h2>
          <ul className="space-y-4">
            {[
              "There are 3 parts in this test.",
              "You will be asked between 19 and 22 questions.",
              "Ensure your recording device is functional.",
              "No external noise disrupts your test.",
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
        to="/speaking/part1"
        className="bg-gray-900 dark:bg-slate-800 text-white font-bold py-4 px-10 md:py-5 md:px-16 gap-3 rounded-xl flex items-center justify-center text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg dark:hover:bg-slate-700"
      >
        <span>Start Test</span>
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicSpeaking;
