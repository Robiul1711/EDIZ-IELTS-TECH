import React, { useState } from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import { Plus, Calendar, Clock } from "lucide-react";
import TakeExamModal from "./TakeExamModal";

const ExamRow = ({ index, data, active }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl px-6 py-4 flex flex-wrap items-center gap-4 hover:shadow-sm transition-all mb-3 last:mb-0">
      {/* Index */}
      <span className="text-sm text-slate-400 dark:text-slate-500 w-8 font-medium">#{index}</span>

      {/* Title */}
      <span className="text-sm font-semibold text-slate-800 dark:text-white flex-1 min-w-[200px]">
        {data.title}
      </span>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 min-w-[220px]">
        <Calendar size={16} className="text-slate-400" />
        {data.created_at}
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 w-24">
        <Clock size={16} className="text-slate-400" />
        {data.time} mins
      </div>

      {/* Action Button */}
      {active ? (
        <button className="h-11 px-8 rounded-2xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">
          Start Exam
        </button>
      ) : (
        <button className="h-11 px-8 rounded-2xl bg-[#0f172a] text-white text-sm font-bold shadow-lg shadow-slate-900/30 hover:bg-slate-900 transition-all">
          Student Results
        </button>
      )}
    </div>
  );
};

const Exams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: teacherExamData, isLoading } = useApiQuery({
    queryKey: ["instructor_exam"],
    url: "/instructor/exam",
    secure: true,
  });

  return (
    <div className="min-h-screen">
      {/* Top Banner: Take Exam */}
      <div className="max-w-xs mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <Plus size={24} strokeWidth={3} />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-slate-800 dark:text-white text-base md:text-lg">
              Take Exam
            </h2>
          </div>
        </button>
      </div>

      {/* Ongoing Exams Section */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-5 ml-1">
          Active Exam
        </h2>
        <div>
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-16 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 animate-pulse mb-3" />
            ))
          ) : (
            teacherExamData?.data?.ongoing?.map((exam, idx) => (
              <ExamRow key={exam.id} index={idx + 1} data={exam} active />
            ))
          )}
          {!isLoading && teacherExamData?.data?.ongoing?.length === 0 && (
            <p className="text-slate-400 text-sm italic ml-1">No active exams.</p>
          )}
        </div>
      </section>

      {/* Completed Exams Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-5 ml-1">
          Previous exam
        </h2>
        <div>
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-16 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 animate-pulse mb-3" />
            ))
          ) : (
            teacherExamData?.data?.completed?.map((exam, idx) => (
              <ExamRow key={exam.id} index={idx + 1} data={exam} />
            ))
          )}
          {!isLoading && teacherExamData?.data?.completed?.length === 0 && (
            <p className="text-slate-400 text-sm italic ml-1">No previous exams.</p>
          )}
        </div>
      </section>

      <TakeExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Exams;
