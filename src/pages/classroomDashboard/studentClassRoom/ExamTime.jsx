import { useState, useEffect } from "react";
import examtime from "../../../assets/images/examtime.png";
import Report from "./Report";

const ExamTime = () => {
  // 'waiting' shows the initial image, 'counting' shows the number
  const [view, setView] = useState("waiting");
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // Timer 1: Wait 5 seconds then switch to counting view
    const switchTimer = setTimeout(() => {
      setView("counting");
    }, 2000);

    return () => clearTimeout(switchTimer);
  }, []);

  useEffect(() => {
    // Timer 2: Actual countdown logic (starts when view is 'counting')
    if (view === "counting" && timeLeft > 0) {
      const countdownInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [view, timeLeft]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 transition-all duration-500">
      
      {view === "waiting" ? (
        /* --- Initial Waiting State --- */
        <div className="flex flex-col items-center animate-in fade-in duration-700">
          <div className="mb-8 transform hover:scale-105 transition-transform">
            <img src={examtime} alt="Exam prep" className="w-64 h-auto" />
          </div>
          <p className="text-lg sm:text-xl text-gray-500 text-center max-w-md mb-12 leading-relaxed">
            The exam hasn’t started yet. Hang tight – your teacher will begin
            shortly!
          </p>
        </div>
      ) : (
        /* --- Countdown State --- */
        <div className="flex flex-col items-center animate-in zoom-in-95 fade-in duration-500">
          <div className="relative mb-8">
            {/* Outer Glow effect for pixel perfection */}
            <div className="absolute inset-0 rounded-full bg-indigo-50 blur-xl opacity-50 scale-110"></div>
            
            <div className="relative w-44 h-44 rounded-full border-[10px] border-[#e7edff] flex items-center justify-center bg-white shadow-sm">
              <span className="text-6xl font-bold text-[#8b5cf6] tabular-nums">
                {timeLeft}
              </span>
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-medium text-gray-600 text-center max-w-md mb-12">
            The exam will start in…
          </p>
          {/* <Report /> */}
        </div>
      )}
    </div>
  );
};

export default ExamTime;