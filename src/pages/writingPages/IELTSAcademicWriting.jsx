import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicWriting = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        IELTS Academic Writing
      </h1>
      <p className="text-lg text-gray-700 dark:text-slate-400 mb-12">
        You will have approximately 30 minutes to do the Writing test.
      </p>

      {/* Instructions Cards Section */}
      <div className="flex gap-8 w-full max-w-5xl mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6">
            Instructions To Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                Answer both parts.
              </span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                {" "}
                You can change your answers at any time during the test.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6">
            Information for Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                There are two parts in this test.
              </span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                Part 2 contributes twice as much as Part 1 to the writing score.
              </span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                The clock will show when 10 and 5 minutes remain.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/writing/part1"
        className="bg-gray-900 dark:bg-slate-800 text-white font-bold py-5 px-16 gap-2 rounded-xl flex items-center text-xl transition-colors hover:bg-gray-800 dark:hover:bg-slate-700"
      >
        Start Test
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicWriting;
