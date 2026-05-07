import React, { useState } from "react";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { Plus } from "lucide-react";
import TakeExamModal from "./TakeExamModal";
import ExamRow from "./ExamRow";

const Exams = () => {
  const [activeTab, setActiveTab] = useState("ielts"); // 'ielts' or 'pte'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: teacherExamData, isLoading } = useApiQuery({
    queryKey: ["instructor_exam", activeTab],
    url: activeTab === "pte" ? "/instructor/pte-exam" : "/instructor/exam",
    secure: true,
  });

  const { mutate: updateStatus } = useApiMutation({
    url: (data) =>
      activeTab === "pte"
        ? `/instructor/pte-exam/${data.id}/status`
        : `/instructor/exam/${data.id}/status`,
    method: "PATCH",
    secure: true,
    invalidateKeys: ["instructor_exam"],
  });

  const handleStatusUpdate = (id, status) => {
    updateStatus({ id, status });
  };

  const { mutate: deleteExam } = useApiMutation({
    url: (id) =>
      activeTab === "pte"
        ? `/instructor/pte-exam/${id}`
        : `/instructor/exam/${id}`,
    method: "DELETE",
    secure: true,
    invalidateKeys: ["instructor_exam"],
    successMessage: "Exam deleted successfully",
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      deleteExam(id);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("ielts")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "ielts"
                ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            IELTS Exams
          </button>
          <button
            onClick={() => setActiveTab("pte")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "pte"
                ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            PTE Exams
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all group"
        >
          <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
          Take New Exam
        </button>
      </div>

      {/* Ongoing Exams Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Ongoing Exams
          </h2>
          <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-lg">
            {teacherExamData?.data?.ongoing?.length || 0}
          </span>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-20 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 animate-pulse" />
            ))
          ) : (
            teacherExamData?.data?.ongoing?.map((exam, idx) => (
              <ExamRow
                key={exam.id}
                index={idx + 1}
                data={exam}
                active
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
          {!isLoading && teacherExamData?.data?.ongoing?.length === 0 && (
            <div className="bg-white dark:bg-slate-900/50 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-10 text-center">
                <p className="text-slate-400 text-sm italic">No active exams currently running.</p>
            </div>
          )}
        </div>
      </section>

      {/* Completed Exams Section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Completed Exams
          </h2>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-2.5 py-1 rounded-lg">
            {teacherExamData?.data?.completed?.length || 0}
          </span>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-20 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 animate-pulse" />
            ))
          ) : (
            teacherExamData?.data?.completed?.map((exam, idx) => (
              <ExamRow
                key={exam.id}
                index={idx + 1}
                data={exam}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
          {!isLoading && teacherExamData?.data?.completed?.length === 0 && (
            <div className="bg-white dark:bg-slate-900/50 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-10 text-center">
                <p className="text-slate-400 text-sm italic">No previous exams found.</p>
            </div>
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
