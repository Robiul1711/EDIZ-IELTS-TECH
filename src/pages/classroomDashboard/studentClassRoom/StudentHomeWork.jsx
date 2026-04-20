import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  BookOpen,
  Monitor,
  PieChart,
  Calendar,
  ClipboardCheck,
  FileText,
  X,
} from "lucide-react";
import HomeWorkResultModal from "../../../components/modals/HomeWorkResultModal";

const HomeworkCard = ({ data, onViewResult }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
      {/* Title and Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
          {data.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            {data.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${data.submitted === "Ongoing" ? "bg-indigo-600" : "bg-green-500"} text-white text-xs font-semibold`}
          >
            {data.submitted}
          </span>
        </div>
      </div>

      {/* Meta Info with Icons */}
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5">
          <BookOpen
            size={14}
            className="text-indigo-600 dark:text-indigo-400"
          />
          <span>{data.book}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Monitor size={14} className="text-green-500" />
          <span>{data.test}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PieChart size={14} className="text-slate-500 dark:text-slate-400" />
          <span>{data.part}</span>
        </div>
      </div>

      {/* Numerical Details */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          HW time:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.time}</b>
        </span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span>
          Score:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.score}</b>
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          Due: <b className="text-slate-700 dark:text-slate-200">{data.due}</b>
        </span>
      </div>

      {data.submitted === "Ongoing" ? (
        <Link
          to={`/classroom/register-as-student/start-homework/${data.id}`}
          className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
        >
          Start Homework
        </Link>
      ) : (
        <div className="flex  gap-2">
          <button
            onClick={() => onViewResult(data)}
            className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
          >
            View Details
          </button>
          <Link
            to={`/classroom/register-as-student/view-results/${data.id}`}
            className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
          >
            View Result
          </Link>
        </div>
      )}
    </div>
  );
};

const StudentHomeWork = () => {
  const activeHomework = [
    {
      id: 1,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Ongoing",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
    {
      id: 2,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Ongoing",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
    {
      id: 3,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Ongoing",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
  ];

  const homeworkHistory = [
    {
      id: 4,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Comleted",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
    {
      id: 5,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Comleted",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
    {
      id: 6,
      title: "IELTS Writing Task - 1",
      category: "Cambridge A",
      submitted: "Comleted",
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
  ];

  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewResult = (hw) => {
    setSelectedHomework(hw);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Homework
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View your assigned homework, track deadlines, and submit your work
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Ongoing Exams */}
        <StatCard
          value="3"
          label="Pending Homework"
          bg="bg-[#4f7f3a]"
          icon={<ClipboardCheck size={22} />}
        />

        {/* Total Exam Taken */}
        <StatCard
          value="2"
          label="Submitted"
          bg="bg-[#3e7a86]"
          icon={<FileText size={22} />}
        />
      </div>
      <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-6  space-y-12 shadow-sm">
        {/* Active Homework Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold">
            Active homework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeHomework.map((hw, idx) => (
              <HomeworkCard
                key={idx}
                data={hw}
                onViewResult={handleViewResult}
              />
            ))}
          </div>
        </section>

        {/* Homework History Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Submitted
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeworkHistory.map((hw, idx) => (
              <HomeworkCard
                key={idx}
                data={hw}
                onViewResult={handleViewResult}
              />
            ))}
          </div>
        </section>

        <HomeWorkResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedHomework}
        />
      </div>
    </div>
  );
};

const StatCard = ({ value, label, bg, icon }) => {
  return (
    <div className={`relative ${bg} rounded-xl p-5 text-white overflow-hidden`}>
      {/* Floating Icon Bubble */}
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-white/15 rounded-full flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
        {value}
      </h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-2xl opacity-90">
        {label}
      </p>
    </div>
  );
};

export default StudentHomeWork;
