import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Monitor, PieChart, Calendar } from "lucide-react";
import AssignHomeworkModal from "./AssignHomeworkModal";
import HomeWorkResultModal from "../../../components/modals/HomeWorkResultModal";

const HomeworkCard = ({ data, onView }) => {
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
          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">
            submitted: {data.submitted}/{data.total}
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

      {/* Action Button */}
      <button
        onClick={() => onView(data)}
        className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
      >
        View
      </button>
    </div>
  );
};

const HomeWork = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Assign Modal state
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // View Modal state
  const [selectedHw, setSelectedHw] = useState(null);

  const [activeHomework, setActiveHomework] = useState([
    {
      id: 1,
      title: "IELTS Writing Task - 1",
      category: "Academic",
      submitted: 9,
      total: 24,
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
    {
      id: 2,
      title: "IELTS Writing Task - 2",
      category: "General Training",
      submitted: 15,
      total: 30,
      book: "Book 19",
      test: "Test 2",
      part: "Part 1",
      time: "60 min",
      score: "8",
      due: "15 Jan 2026",
    },
  ]);

  const [homeworkHistory, setHomeworkHistory] = useState([
    {
      id: 4,
      title: "IELTS Reading Mock",
      category: "Academic",
      submitted: 24,
      total: 24,
      book: "Book 20",
      test: "Test 1",
      part: "Part 2",
      time: "40 min",
      score: "7",
      due: "12 Jan 2026",
    },
  ]);

  const handleAssign = (newHw) => {
    setActiveHomework((prev) => [newHw, ...prev]);
  };

  const handleView = (hw) => {
    setSelectedHw(hw);
    setIsResultModalOpen(true);
  };

  return (
    <div className="min-h-screen ">
      {/* Top Banner: Assign Homework */}
      <div className="max-w-xs mb-8">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <Plus size={24} strokeWidth={3} />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-slate-800 dark:text-white text-base md:text-lg">
              Assign Homework
            </h2>
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 space-y-12 shadow-sm">
        {/* Active Homework Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold">
            Active homework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeHomework.map((hw, idx) => (
              <HomeworkCard key={hw.id} data={hw} onView={handleView} />
            ))}
          </div>
        </section>

        {/* Homework History Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Homework history
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeworkHistory.map((hw, idx) => (
              <HomeworkCard key={hw.id} data={hw} onView={handleView} />
            ))}
          </div>
        </section>
      </div>
      {/* Assign Homework Modal */}
      <AssignHomeworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={handleAssign}
      />

      {/* View Homework Details Modal */}
      <HomeWorkResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        data={selectedHw}
      />
    </div>
  );
};

export default HomeWork;
