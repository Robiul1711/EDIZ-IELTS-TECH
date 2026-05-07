import React from "react";
import { Calendar, Clock, Trash2 } from "lucide-react";

const ExamRow = ({ index, data, active, onStatusUpdate, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl px-6 py-4 flex flex-wrap items-center gap-4 hover:shadow-sm transition-all mb-3 last:mb-0">
      {/* Index */}
      <span className="text-sm text-slate-400 dark:text-slate-500 w-8 font-medium">
        #{index}
      </span>

      {/* Title & Info */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
          {data.title}
        </h3>
        {data.pte_test_title && (
           <p className="text-xs text-slate-400 mt-0.5">
             {data.pte_test_title} • {data.batch}
           </p>
        )}
        {data.skill && (
           <p className="text-xs text-slate-400 mt-0.5 capitalize">
             {data.skill} • {data.batch || "Classroom"}
           </p>
        )}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 min-w-[220px]">
        <Calendar size={16} className="text-slate-400" />
        {data.created_at || data.due_date}
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 w-24">
        <Clock size={16} className="text-slate-400" />
        {data.time} mins
      </div>

      {/* Action Button */}
      {data?.status === "inactive" && (
        <button
          onClick={() => onStatusUpdate(data.id, "active")}
          className="h-11 px-8 rounded-2xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all"
        >
          Start Exam
        </button>
      )}
      {data?.status === "active" && (
        <button
          onClick={() => onStatusUpdate(data.id, "completed")}
          className="h-11 px-8 rounded-2xl bg-green-600 text-white text-sm font-bold shadow-lg shadow-green-500/30 hover:bg-green-700 transition-all"
        >
          Mark as Completed
        </button>
      )}

      {/* Delete Button */}
      <button
        onClick={() => onDelete(data.id)}
        className="h-11 w-11 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 transition-all"
        title="Delete Exam"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ExamRow;
