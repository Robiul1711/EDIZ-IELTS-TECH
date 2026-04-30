import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useApiQuery } from "@/hooks/apiQuery";
import { Link } from "react-router-dom";

const ExamRow = ({ index, data, active }) => {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-slate-800 rounded-xl px-6 py-4 flex flex-wrap items-center gap-4 hover:shadow-sm transition-all mb-3 last:mb-0">
      {/* Index */}
      <span className="text-sm text-slate-400 dark:text-slate-500 w-8 font-medium">#{index}</span>

      {/* Title */}
      <span className="text-sm font-semibold text-slate-800 dark:text-white flex-1 min-w-[200px]">
        {data.title}
      </span>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 min-w-[220px]">
        <Calendar size={16} className="text-slate-400" />
        {data.created_at || data.date}
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 w-24">
        <Clock size={16} className="text-slate-400" />
        {data.time || data.duration} {data.time ? 'mins' : ''}
      </div>

      {/* Action Button */}
      {active ? (
        <Link 
          to={`/classroom/register-as-student/start-exam/${data.id}`}
          className="h-11 px-8 rounded-2xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all ml-auto flex items-center justify-center"
        >
          Join Exam
        </Link>
      ) : (
        <Link
          to={`/classroom/register-as-student/view-results/${data.id}`}
          className="h-11 px-8 rounded-2xl bg-[#0f172a] text-white text-sm font-bold shadow-lg shadow-slate-900/30 hover:bg-slate-900 transition-all ml-auto flex items-center justify-center"
        >
          See Results
        </Link>
      )}
    </div>
  );
};

const ExamDashboard = () => {
  const { data: studentExamData, isLoading } = useApiQuery({
    queryKey: ["student_exam"],
    url: "/student/exam",
    secure: true,
  });

  return (
    <div className="space-y-10 min-h-screen">
      {/* Active Exam Section */}
      <section>
        <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-5 ml-1">Active Exam</h2>
        <div>
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-16 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-100 animate-pulse mb-3" />
            ))
          ) : (
            studentExamData?.data?.ongoing?.map((exam, idx) => (
              <ExamRow key={exam.id} index={idx + 1} data={exam} active />
            ))
          )}
          {!isLoading && studentExamData?.data?.ongoing?.length === 0 && (
            <p className="text-slate-400 text-sm italic ml-1">No active exams.</p>
          )}
        </div>
      </section>

      {/* Previous Exam Section */}
      <section>
        <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-5 ml-1">Previous Exam</h2>
        <div>
          {isLoading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-16 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-100 animate-pulse mb-3" />
            ))
          ) : (
            studentExamData?.data?.submitted?.map((exam, idx) => (
              <ExamRow key={exam.id} index={idx + 1} data={exam} />
            ))
          )}
          {!isLoading && studentExamData?.data?.submitted?.length === 0 && (
            <p className="text-slate-400 text-sm italic ml-1">No previous exams.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExamDashboard;