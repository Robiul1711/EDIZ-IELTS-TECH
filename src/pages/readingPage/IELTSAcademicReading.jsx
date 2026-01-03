import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicReading = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Instructions to Test Takers
      </h1>
      <p className="text-lg text-gray-700 mb-12">
        You will have approximately 30 minutes to do the Reading test.
      </p>

      {/* Instructions Cards Section */}
      <div className="flex gap-8 w-full max-w-5xl mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Instructions to Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">Answer all questions</span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">
                You can change answers any time
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Instructions to Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">40 questions</span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">1 mark per question</span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">4 parts total</span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700">Time to review questions</span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700"> You can take notes</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/reading/part1"
        className="bg-gray-900 text-white font-bold py-5 px-16 gap-2 rounded-xl flex items-center text-xl transition-colors hover:bg-gray-800"
      >
        Start Test
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicReading;
