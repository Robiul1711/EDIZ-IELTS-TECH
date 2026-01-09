import React, { useState, useEffect } from "react";
import { File, Mic, Clock } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const CircularProgress = ({ value, maxValue, size = 120 }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F0F0F0"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#A22BDE"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[#A22BDE]">{value}</span>
      </div>
    </div>
  );
};

const PTEPersonalInterdiction = () => {
  const [prepTimer, setPrepTimer] = useState(25);
  const [recordTimer, setRecordTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval = null;

    if (prepTimer > 0 && !isRecording) {
      interval = setInterval(() => {
        setPrepTimer((prev) => prev - 1);
      }, 1000);
    } else if (prepTimer === 0 && !isRecording) {
      setIsRecording(true);
    }

    if (isRecording && recordTimer < 30) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else if (recordTimer === 30) {
      setIsRecording(false);
      setIsFinished(true);
    }

    return () => clearInterval(interval);
  }, [prepTimer, isRecording, recordTimer]);

  return (
    <div className="w-full flex flex-col items-center transition-colors duration-300">
      {/* Main Content: Dual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full mb-8 md:mb-12 max-w-7xl">
        {/* Left Card: Instructions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-10 flex flex-col gap-6 border border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-left duration-500">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Personal Introductions
          </h2>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-2xl p-4">
            <p className="text-sm md:text-base font-semibold text-amber-900 dark:text-amber-200">
              You have{" "}
              <span className="font-bold underline">25 seconds to prepare</span>{" "}
              and{" "}
              <span className="font-bold underline">30 seconds to record.</span>
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Read the prompt below and record your response. This is a chance to
            introduce yourself to institutions you are applying to.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              You Should Include:
            </h3>
            <ul className="space-y-3">
              {[
                "Your name and where you are from",
                "Your current educational background or work experience",
                "Why you are taking the PTE Academic test",
                "Your future plans and goals",
                "Any relevant hobbies or interests",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-sm md:text-base text-slate-600 dark:text-slate-400"
                >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-slate-500 dark:text-slate-500 text-sm italic mt-2">
            Speak clearly and naturally. Your response will be sent to the
            institutions you select.
          </p>
        </div>

        {/* Right Card: Audio Recorder */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-12 flex flex-col items-center justify-center border border-gray-100 dark:border-slate-800 min-h-[400px] animate-in fade-in slide-in-from-right duration-500">
          <div className="w-full flex flex-col items-center gap-6 md:gap-8 py-8 md:py-10 px-4 md:px-8 border border-gray-100 dark:border-slate-800 rounded-[2rem] bg-gray-50/50 dark:bg-slate-800/30">
            {/* Prep Timer Circle */}
            {!isFinished ? (
              <CircularProgress
                value={isRecording ? 30 - recordTimer : prepTimer}
                maxValue={isRecording ? 30 : 25}
              />
            ) : (
              <div className="h-32 flex flex-col items-center justify-center gap-2">
                <span className="text-2xl font-bold text-green-500">
                  Completed
                </span>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                  <File size={24} />
                </div>
              </div>
            )}

            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                Audio Recorder
              </h3>
              <p
                className={`text-sm md:text-base font-medium ${
                  isRecording
                    ? "text-rose-500 animate-pulse"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {isRecording
                  ? "• Recording..."
                  : isFinished
                  ? "Recording finished"
                  : "Recording will begin automatically"}
              </p>
            </div>

            {/* Bottom Wave/Progress */}
            <div className="w-full flex items-center gap-4 mt-2 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div
                className={`p-3 rounded-full transition-all duration-300 ${
                  isRecording
                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-500 scale-110"
                    : "bg-gray-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                <Mic size={24} />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums uppercase">
                  <span>Time</span>
                  <span>
                    {`00:${recordTimer < 10 ? "0" + recordTimer : recordTimer}`}{" "}
                    / 00:30
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-linear`}
                    style={{ width: `${(recordTimer / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base shadow-lg hover:bg-black transition-all active:scale-95 w-full md:w-auto">
            <File size={22} /> Save & Exist
          </button>

          <Link
            to="/pte-examination/repeat-sentence"
            className="w-full md:w-auto"
          >
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none transition-all active:scale-95 w-full group">
              Next{" "}
              <MdDoubleArrow
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PTEPersonalInterdiction;
