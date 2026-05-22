import React from "react";
import { Calendar, Clock, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const StudentExamRow = ({ index, data }) => {
  const isPte = data.test_type === "pte";
  const isCompleted = data.status === "complete";
  const isInactive = data.status === "inactive";

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const startPteMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.post(`/student/pte-exam/${data.id}/start`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("PTE Exam started successfully!");
      navigate(`/classroom/register-as-student/start-pte-exam/${data.id}`);
    },
    onError: (err) => {
      console.error("Error starting PTE exam:", err);
      toast.error(err?.response?.data?.message || "Failed to start the PTE exam.");
    }
  });

  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-slate-800 rounded-2xl px-6 py-5 flex flex-wrap items-center gap-4 hover:shadow-md transition-all mb-4 last:mb-0 group">
      {/* Index & Type Badge */}
      <div className="flex flex-col items-center gap-1 min-w-[40px]">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
          #{index}
        </span>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase ${
            isPte
              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
          }`}
        >
          {data.test_type}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
          {data.instructor} •{" "}
          <span className="capitalize">{data.skill.replace("_", " ")}</span>
          {data.book_no && ` • Book ${data.book_no} Test ${data.test_no}`}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Date</span>
          <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 font-medium">
            <Calendar size={14} className="text-slate-400" />
            {data.created_at?.split(",")[0] || data.date}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Duration</span>
          <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 font-medium">
            <Clock size={14} className="text-slate-400" />
            {data.time || data.duration} mins
          </div>
        </div>

        {data.score !== null && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Score</span>
            <div className="text-sm font-black text-green-600 dark:text-green-400">
              {data.score}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="ml-auto">
        {data.status === "active" ? (
          isPte ? (
            <button
              onClick={() => startPteMutation.mutate()}
              disabled={startPteMutation.isPending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {startPteMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  Start Exam
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          ) : (
            <Link
              to={`/classroom/register-as-student/start-exam/${data.id}`}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Start Exam
              <ChevronRight size={16} />
            </Link>
          )
        ) : isInactive ? (
          <button
            disabled
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold cursor-not-allowed border border-gray-200 dark:border-slate-700"
          >
            Starting Soon
          </button>
        ) : isCompleted ? (
          <Link
                to={`/classroom/register-as-student/view-exam-results/${data.submission_id}`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm font-bold shadow-lg hover:opacity-90 transition-all"
          >
            View Results
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default StudentExamRow;
