import React, { useState } from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import StudentExamRow from "./StudentExamRow";

const ExamSkeleton = () => (
  <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-slate-800 rounded-2xl px-6 py-6 flex flex-wrap items-center gap-4 animate-pulse mb-4">
    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4"></div>
    </div>
    <div className="flex gap-4">
        <div className="h-10 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-10 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
    </div>
    <div className="h-10 w-32 bg-slate-100 dark:bg-slate-800 rounded-xl ml-auto"></div>
  </div>
);

const ExamDashboard = () => {
  const [activeTab, setActiveTab] = useState("ielts"); // 'ielts' or 'pte'
  
  const { data: studentExamData, isLoading } = useApiQuery({
    queryKey: ["student_exam"],
    url: "/student/exam",
    secure: true,
    refetchInterval: 3000, // Refetch from server every 10 seconds
  });

  const filteredOngoing = studentExamData?.data?.ongoing?.filter(
    (exam) => exam.test_type === activeTab
  );
  const filteredSubmitted = studentExamData?.data?.submitted?.filter(
    (exam) => exam.test_type === activeTab
  );

  return (
    <div className="min-h-screen">
      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit mb-8">
        <button
          onClick={() => setActiveTab("ielts")}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "ielts"
              ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
          }`}
        >
          IELTS Exams
        </button>
        <button
          onClick={() => setActiveTab("pte")}
          className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "pte"
              ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
          }`}
        >
          
          PTE Exams
        </button>
      </div>

      {/* Active Exam Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
            Active Exam
          </h2>
          <span className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black px-2.5 py-1 rounded-lg">
            {filteredOngoing?.length || 0}
          </span>
        </div>
        
        <div>
          {isLoading ? (
            Array(2).fill(0).map((_, idx) => <ExamSkeleton key={idx} />)
          ) : (
            filteredOngoing?.map((exam, idx) => (
              <StudentExamRow key={exam.id} index={idx + 1} data={exam} />
            ))
          )}
          {!isLoading && filteredOngoing?.length === 0 && (
            <div className="bg-white dark:bg-slate-900/40 border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center">
              <p className="text-slate-400 text-sm font-medium italic">
                No active {activeTab.toUpperCase()} exams assigned to you.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Previous Exam Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
            Previous Exam
          </h2>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black px-2.5 py-1 rounded-lg">
            {filteredSubmitted?.length || 0}
          </span>
        </div>

        <div>
          {isLoading ? (
            Array(3).fill(0).map((_, idx) => <ExamSkeleton key={idx} />)
          ) : (
            filteredSubmitted?.map((exam, idx) => (
              <StudentExamRow key={exam.id} index={idx + 1} data={exam} />
            ))
          )}
          {!isLoading && filteredSubmitted?.length === 0 && (
            <div className="bg-white dark:bg-slate-900/40 border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center">
              <p className="text-slate-400 text-sm font-medium italic">
                You haven't completed any {activeTab.toUpperCase()} exams yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExamDashboard;