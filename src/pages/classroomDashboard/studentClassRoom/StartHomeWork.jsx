import React, { useState, useEffect } from "react";
import { ChevronLeft, Clock, Send, FileText, Info } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const StartHomeWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [answer, setAnswer] = useState("");

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ":" : ""}${mins < 10 ? "0" + mins : mins}:${
      secs < 10 ? "0" + secs : secs
    }`;
  };

  const handleSubmit = () => {
    // In a real app, you'd send the answer and time to the server
    alert(`Homework submitted!\nTime taken: ${formatTime(seconds)}`);
    navigate("/classroom/register-as-student/student-home-work");
  };

  return (
    <div className=" bg-gray-50 dark:bg-slate-950 ">
      {/* Sticky Header with Timer and Submit */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className=" px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/classroom/register-as-student/student-home-work"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft
                size={24}
                className="text-slate-600 dark:text-slate-400"
              />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                IELTS Writing Task - 1
              </h1>
              <p className="text-xs text-slate-500">Cambridge A | Book 20</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 md:px-5 md:py-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-800 transition-all">
              <Clock size={18} className="text-[#635BFF] animate-pulse" />
              <span className="text-sm md:text-xl font-mono font-bold text-[#635BFF]">
                {formatTime(seconds)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[#635BFF] hover:bg-[#5046e5] text-white px-4 py-2 md:px-8 md:py-3 rounded-2xl font-bold text-sm md:text-base shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
            >
              <Send size={18} />
              <span>Submit Work</span>
            </button>
          </div>
        </div>
      </div>

      <main className=" px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Instructions/Prompt */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FileText className="text-blue-600 w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Question Prompt
              </h2>
            </div>

            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                You should spend about 20 minutes on this task.
              </p>
              <p className="mb-4">
                The chart below shows the percentage of households in a European
                country that had access to the internet between 2010 and 2024.
              </p>
              <p className="mb-4 italic bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border-l-4 border-indigo-500">
                Summarise the information by selecting and reporting the main
                features, and make comparisons where relevant.
              </p>
              <p>Write at least 150 words.</p>
            </div>

            {/* Placeholder for Task Image */}
            <div className="mt-8 relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-dashed border-slate-300 dark:border-slate-700">
              <div className="text-center p-6">
                <Info size={40} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-400 text-sm font-medium">
                  Data visualization chart would appear here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Answer Area */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Your Answer
              </h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {answer.split(/\s+/).filter((x) => x).length} Words
              </span>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Start typing your response here..."
              className="flex-1 min-h-[400px] w-full p-6 text-lg rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all resize-none dark:text-white"
            />

            <div className="mt-6 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400 font-medium bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
              <Info size={16} />
              <span>Your work is automatically saved as you type.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartHomeWork;
