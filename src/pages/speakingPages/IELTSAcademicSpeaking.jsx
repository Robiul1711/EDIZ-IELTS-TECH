import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const IELTSAcademicSpeaking = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        IELTS Academic Speaking Test
      </h1>
      <p className="text-lg text-gray-700 dark:text-slate-400 mb-12">
        You will have approximately 30 minutes to do the Writing test.
      </p>

      {/* Instructions Cards Section */}
      <div className="flex gap-8 w-full max-w-5xl mb-16">
        {/* Left Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6">
            Instructions to Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                Answer all the questions.
              </span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                {" "}
                Make sure to answer the most you can within the even time limit.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                {" "}
                For accurate grading, make sure you are in an environment that
                is similar to an IELTS testing centre. Your score might be
                affected if the audio includes any sound other than the voice of
                the speaker.
              </span>
            </li>
          </ul>
        </div>

        {/* Right Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-6">
            Instructions to Test Takers
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                There are 3 parts in this test. You will be asked to answer 19 -
                22 questions total.
              </span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
              <span className="text-gray-700 dark:text-slate-400">
                I made sure no external factors could potentially affect the
                quality of my recording (dog barking, traffic noises, people
                talking, etc.)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Test Button */}
      <Link
        to="/speaking/part1"
        className="bg-gray-900 dark:bg-slate-800 text-white font-bold py-5 px-16 gap-2 rounded-xl flex items-center text-xl transition-colors hover:bg-gray-800 dark:hover:bg-slate-700"
      >
        Start Test
        <FaAnglesRight />
      </Link>
    </div>
  );
};

export default IELTSAcademicSpeaking;
