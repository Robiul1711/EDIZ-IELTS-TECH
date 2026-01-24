import React, { useState } from "react";
import { Edit3, Clock } from "lucide-react";
import ExamDateModal from "../modals/ExamDateModal";
import TargetScoreModal from "../modals/TargetScoreModal";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const StudentDashboardInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [examDate, setExamDate] = useState(new Date("2025-12-22"));

  const [scores, setScores] = useState([
    { label: "Listening", value: "0/9" },
    { label: "Reading", value: "0/9" },
    { label: "Speaking", value: "0/9" },
    { label: "Writing", value: "0/9" },
  ]);

  const daysRemaining = dayjs(examDate).diff(dayjs(), "day");

  return (
    <div className="w-full relative">
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        Hello, Fahim <span className="animate-bounce">👋</span>
      </h1>

      {/* Stats Section */}
      <div className="flex flex-col xlg:flex-row gap-6 mb-8">
        {/* Main Card */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 overflow-hidden">
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                Target Score
              </span>
              <button
                onClick={() => setIsScoreModalOpen(true)}
                className="text-sm font-semibold text-slate-500 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50 hover:border-[#635BFF] hover:text-[#635BFF] transition-all"
              >
                Change
              </button>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
              {scores.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-[#604CDF]/5 border border-indigo-100 dark:border-indigo-900/30 rounded-xl py-3 mb-2 text-[#604CDF] dark:text-[#8370FF] font-bold text-lg">
                    {item.value}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                Set Exam Date
              </span>
              <Edit3
                size={18}
                className="text-[#635BFF] cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
              {dayjs(examDate).format("MMM DD, YYYY (ddd)")}
            </h2>
            <p className="text-sm mt-2 text-slate-400">
              <span className="text-[#635BFF] font-bold">
                {Math.max(0, daysRemaining)} Days
              </span>{" "}
              Remaining
            </p>
          </div>
        </div>

        {/* Band Score Card */}
        <div className="w-full xlg:w-[350px] bg-[#0A0B1A] rounded-[2rem] p-6 md:p-8 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6">
            Band Score (Avg)
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {scores.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-white/5 border border-white/10 rounded-xl py-3 mb-2 text-white font-bold text-sm">
                  {item.value}
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  {item.label.substring(0, 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mock Test Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {[
          {
            title: "IELTS Full Mock Test",
            color: "#635BFF",
            shadow: "shadow-indigo-100",
            link: "/student-dashboard/ielts",
          },
          {
            title: "PTE Full Mock Test",
            color: "#00A3FF",
            shadow: "shadow-blue-100",
            link: "/student-dashboard/pte",
          },
        ].map((test, i) => (
          <div
            key={i}
            className="bg-indigo-50/30 dark:bg-slate-900/50 rounded-[2rem] p-6 md:p-8 border border-white dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8 text-center sm:text-left">
              <div
                className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg ${test.shadow}`}
                style={{ backgroundColor: test.color }}
              >
                <Clock size={32} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                  {test.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Take real-test like mocks and know your potential.
                </p>
              </div>
            </div>
            <Link
              to={test.link}
              className="w-full inline-block text-center bg-white dark:bg-slate-800 dark:text-white  border border-slate-100 dark:border-slate-700 py-4 rounded-2xl text-[#635BFF] dark:text-[#8370FF] font-bold text-sm uppercase tracking-widest hover:bg-[#635BFF] hover:dark:bg-[#8370FF] hover:text-white transition-all"
            >
              Show full test
            </Link>
          </div>
        ))}
      </div>

      <ExamDateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={examDate}
        onSelect={(date) => setExamDate(date)}
      />

      <TargetScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        currentScores={scores}
        onSave={(newScores) => setScores(newScores)}
      />
    </div>
  );
};

export default StudentDashboardInfo;
