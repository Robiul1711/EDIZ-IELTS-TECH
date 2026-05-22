import React from "react";
import {
  ChevronLeft,
  BookOpen,
  Monitor,
  User,
  Clock,
  Award,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Sparkles,
  MessageSquare,
  BadgeAlert,
  XCircle,
  HelpCircle
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";

// Helper function to format time spent
const formatTimeSpent = (timeSpent) => {
  if (timeSpent === null || timeSpent === undefined) return "N/A";
  const num = Number(timeSpent);
  if (isNaN(num)) return String(timeSpent);
  if (num < 60) return `${num}s`;
  const mins = Math.floor(num / 60);
  const secs = num % 60;
  return `${mins}m ${secs}s`;
};

// Scoped styles for rendering IELTS HTML contents (like tables, bold text, etc.)
const HTMLStyles = () => (
  <style>{`
    .ielts-html-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: 0.875rem;
    }
    .ielts-html-content th, 
    .ielts-html-content td {
      border: 1px solid #e2e8f0;
      padding: 0.75rem 1rem;
      text-align: left;
    }
    .dark .ielts-html-content th,
    .dark .ielts-html-content td {
      border-color: #334155;
    }
    .ielts-html-content tr:nth-child(even) {
      background-color: rgba(248, 250, 252, 0.5);
    }
    .dark .ielts-html-content tr:nth-child(even) {
      background-color: rgba(30, 41, 59, 0.2);
    }
    .ielts-html-content b, 
    .ielts-html-content strong {
      font-weight: 700;
      color: inherit;
    }
  `}</style>
);

// Safe HTML Renderer component
const SafeHtml = ({ content, className = "" }) => {
  if (!content) return null;
  const contentStr = String(content);
  const hasHtml = /<[a-z][\s\S]*>/i.test(contentStr);

  if (hasHtml) {
    return (
      <div
        className={`ielts-html-content ${className}`}
        dangerouslySetInnerHTML={{ __html: contentStr }}
      />
    );
  }

  return <span className={className}>{contentStr}</span>;
};

const ViewPteResultsStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the submission result dynamically from the student homework submissions API
  const { data: responseData, isLoading, isError, error } = useApiQuery({
    queryKey: ["my-submission", id],
    url: `/student/my-submissions/${id}`,
    secure: true,
    enabled: !!id,
  });

  const submission = responseData?.data;

  // Render a skeleton loader that perfectly matches our rich design aesthetic
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />

        {/* Summary Card Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
          </div>
          <div className="flex gap-4 border-b border-gray-100 dark:border-slate-800 pb-6">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-28" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-28" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-28" />
          </div>
          <div className="flex gap-6 h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
        </div>

        {/* Detail Card Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm h-64" />
      </div>
    );
  }

  // Render a premium, styled error state
  if (isError || !submission) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center mx-auto mb-6">
            <BadgeAlert size={36} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
            Failed to Load Results
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
            {error?.response?.data?.message || "We encountered an issue fetching your submission details. Please verify your connection or try again later."}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all"
            >
              Go Back
            </button>
            <Link
              to="/classroom/register-as-student/report"
              className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all text-sm block"
            >
              View Report History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = submission.status === "complete";
  const skillName = submission.skill ? submission.skill.replace(/_/g, " ") : "N/A";
  const homeworkModel = submission.homework_model || "PTE";
  const isPte = homeworkModel.toLowerCase().includes("pte");
  const isIelts = homeworkModel.toLowerCase().includes("ielts");

  // Safely parse evaluations_payload for IELTS or PTE structured reviews
  let evaluationsPayload = submission.evaluations_payload;
  if (typeof evaluationsPayload === "string") {
    try {
      evaluationsPayload = JSON.parse(evaluationsPayload);
    } catch (e) {
      evaluationsPayload = {};
    }
  }
  if (!evaluationsPayload) {
    evaluationsPayload = {};
  }

  // PTE metrics
  const questions = submission.questions_summary || [];
  const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
  const totalMaxScore = questions.reduce((sum, q) => sum + (q.max_score || 0), 0);

  // IELTS metrics
  const totalCorrect = evaluationsPayload.correct_answers || 0;
  const totalQuestionsCount = evaluationsPayload.total_questions || 0;
  const bandScore = submission.mark || evaluationsPayload.overall_score || "N/A";

  return (
    <div className="pb-12">
      <HTMLStyles />
      {/* Back Button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#604CDF] flex items-center justify-center text-white hover:bg-[#503dc7] transition-colors shadow-lg active:scale-95"
          title="Back"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Submission ID: #{submission.submission_id}
        </span>
      </div>

      {/* Summary Card Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm mb-8 transition-all relative overflow-hidden group">
        {/* Glow overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${isComplete
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              }`}
          >
            {isComplete && <CheckCircle2 size={12} />}
            {submission.status || "Submitted"}
          </span>
        </div>

        {/* Title and Category */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
            {submission.homework_title || "Classroom Homework"}
          </h1>
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${isPte
                ? "border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 bg-amber-500/5"
                : "border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5"
              }`}
          >
            {homeworkModel}
          </span>
        </div>

        {/* Detailed Info row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-500 dark:text-slate-400 text-sm mb-6 pb-6 border-b border-gray-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2 group/item">
            <BookOpen
              size={16}
              className="text-indigo-600 dark:text-indigo-400 group-hover/item:scale-110 transition-transform"
            />
            <span className="font-semibold capitalize text-slate-700 dark:text-slate-300">
              {skillName}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 group/item">
            <User size={16} className="text-emerald-500 group-hover/item:scale-110 transition-transform" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {submission.instructor || "Instructor"}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 group/item">
            <Calendar size={16} className="text-indigo-500 group-hover/item:scale-110 transition-transform" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {submission.submitted_at || "N/A"}
            </span>
          </div>
        </div>

        {/* Metric Details */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-slate-500 dark:text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <span>Time Spent:</span>
            <b className="text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1">
              <Clock size={14} className="text-slate-400" />
              {formatTimeSpent(submission.time_spent)}
            </b>
          </div>
          <span className="hidden md:block text-slate-200 dark:text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span>Overall Score:</span>
            <b className="text-indigo-600 dark:text-indigo-400 font-extrabold text-base flex items-center gap-1">
              <Award size={16} />
              {isIelts 
                ? `Band ${bandScore} (${totalCorrect} / ${totalQuestionsCount} Correct)` 
                : (submission.mark !== null && submission.mark !== undefined ? `${submission.mark} / ${totalMaxScore}` : `${totalScore} / ${totalMaxScore}`)}
            </b>
          </div>
          <span className="hidden md:block text-slate-200 dark:text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span>Status Color:</span>
            <span className={`font-semibold ${isComplete ? "text-emerald-500" : "text-amber-500"}`}>
              {isComplete ? "Evaluated & Finalized" : "Pending Grading"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Results Showcase Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-all overflow-hidden relative mb-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column: Premium Score Ring & Visual Metrics */}
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] border border-gray-50 dark:border-slate-800/40 text-center relative overflow-hidden">
            {/* Visual background element */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl" />

            <Award className="text-indigo-500 dark:text-indigo-400 w-12 h-12 mb-4 animate-bounce duration-1000" />

            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Obtained Score
            </h3>

            <div className="relative flex items-center justify-center mb-6">
              {/* Score Circular Glow */}
              <div className="absolute w-36 h-36 rounded-full bg-indigo-500/5 blur-xl animate-pulse" />

              <div className="w-32 h-32 rounded-full border-4 border-indigo-600/10 dark:border-indigo-400/15 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-md">
                <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                  {isIelts ? bandScore : (submission.mark !== null && submission.mark !== undefined ? submission.mark : totalScore)}
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                  {isIelts ? "Band Score" : `/ ${totalMaxScore} Points`}
                </span>
              </div>
            </div>

            <div className="w-full space-y-3.5">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-sm flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Assessment</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">
                  {homeworkModel} ({skillName})
                </span>
              </div>

              {isIelts && (
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Accuracy</span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {totalCorrect} / {totalQuestionsCount} Correct
                  </span>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-sm flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                <span className={`text-sm font-extrabold ${isComplete ? "text-emerald-500" : "text-amber-500"} capitalize`}>
                  {submission.status}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Instructor Review / Evaluations / Performance Breakdown */}
          <div className="w-full lg:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-indigo-500 dark:text-indigo-400" size={20} />
                <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                  Evaluations & Feedback
                </h2>
              </div>

              {/* Render either array of evaluations for IELTS or generic string/object feedback */}
              {isIelts && Array.isArray(evaluationsPayload.evaluations) && evaluationsPayload.evaluations.length > 0 ? (
                <div className="space-y-4">
                  {evaluationsPayload.evaluations.map((evalItem, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/60 flex flex-col gap-2 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all"
                    >
                      <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                        Part {evalItem.part_no} Evaluation
                      </span>
                      <p className="text-sm text-slate-705 dark:text-slate-350 leading-relaxed font-semibold">
                        {evalItem.feedback_text}
                      </p>
                      <div className="flex gap-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1">
                        <span>Score: Band {evalItem.overall_score}</span>
                        <span>Correct: {evalItem.correct_answers} / {evalItem.total_questions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : submission.evaluations_payload ? (
                <div className="space-y-4">
                  {typeof evaluationsPayload === "object" ? (
                    Object.entries(evaluationsPayload)
                      .filter(([key]) => key !== "results" && key !== "evaluations" && key !== "total_questions" && key !== "correct_answers" && key !== "answered" && key !== "overall_score")
                      .map(([key, val], idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/60 flex flex-col gap-2 hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all group"
                        >
                          <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider capitalize">
                            {key.replace(/_/g, " ")}
                          </span>
                          <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                            {String(val)}
                          </p>
                        </div>
                      ))
                  ) : (
                    // Simple text format
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-sm relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#604CDF] flex items-center justify-center text-white text-xs font-bold">
                          {submission.instructor ? submission.instructor.charAt(0) : "I"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-205">
                            {submission.instructor || "Instructor Feedback"}
                          </h4>
                          <p className="text-[10px] text-slate-400">Class Instructor</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-semibold">
                        {String(submission.evaluations_payload)}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Elegant Empty state/Placeholder for evaluations
                <div className="bg-slate-50/30 dark:bg-slate-800/10 border-2 border-dashed border-gray-100 dark:border-slate-800/80 p-8 rounded-3xl text-center space-y-4 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-12 h-12 bg-indigo-50/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-sm">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                      {isComplete ? "Submission Graded Successfully" : "Submission Under Review"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {isComplete
                        ? `Your submission has been graded and finalized with a score of ${submission.mark || (isIelts ? bandScore : totalScore)}. Detailed criteria-wise breakdowns will be visible here once available.`
                        : "Your homework submission has been recorded. It is currently being evaluated by the instructor. Scores and feedback will update here once complete."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Premium action button / guidance footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 dark:text-slate-500">
                <Activity size={14} className="text-emerald-500 animate-pulse" />
                <span className="font-semibold">
                  Homework Session Verified by edizphactory
                </span>
              </div>
              <button
                onClick={() => navigate("/classroom/register-as-student/report")}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#604CDF] hover:bg-[#503dc7] active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-indigo-500/20"
              >
                View Full Reports
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Questions Performance Breakdown */}
      {isIelts ? (
        Array.isArray(evaluationsPayload.results) && evaluationsPayload.results.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#604CDF] dark:text-indigo-400" size={22} />
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Academic IELTS Breakdown
              </h2>
            </div>
            <IeltsPartBreakdown results={evaluationsPayload.results} />
          </div>
        )
      ) : (
        questions.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#604CDF] dark:text-indigo-400" size={22} />
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Question-by-Question Breakdown
              </h2>
            </div>
            <div className="space-y-6">
              {questions.map((question, idx) => (
                <QuestionSummaryCard key={idx} question={question} index={idx + 1} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

/* ---------------- Helper Sub-Components ---------------- */

const IeltsPartBreakdown = ({ results }) => {
  return (
    <div className="space-y-8">
      {results.map((part, partIdx) => (
        <div key={partIdx} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          {/* Part Header */}
          <div className="border-b border-gray-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#604CDF] uppercase tracking-widest">Part {part.part_no}</span>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mt-1 leading-tight">
                {part.title || "Academic Reading Passage"}
              </h3>
            </div>
            <div className="flex gap-3 text-xs font-black uppercase tracking-wider text-slate-400 self-start sm:self-center">
              <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                Correct: {part.correct_answers}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-305 px-3 py-1.5 rounded-xl border border-gray-150 dark:border-slate-800">
                Total: {part.total_questions}
              </span>
            </div>
          </div>

          {/* Question Groups */}
          <div className="space-y-8">
            {part.question_groups?.map((group, groupIdx) => (
              <IeltsQuestionGroup key={groupIdx} group={group} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const IeltsQuestionGroup = ({ group }) => {
  const { type, instruction, question_range, passage_text, questions } = group;
  const [isPassageExpanded, setIsPassageExpanded] = React.useState(false);

  const formattedType = type ? type.replace(/_/g, " ") : "Question Group";

  return (
    <div className="space-y-4">
      {/* Group Header */}
      <div className="flex flex-col gap-3 bg-slate-50/50 dark:bg-slate-800/30 px-5 py-4 rounded-2xl border border-gray-100/50 dark:border-slate-800/60">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#604CDF] dark:text-indigo-400 bg-[#604CDF]/10 px-2.5 py-1 rounded-lg">
              {formattedType}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Questions {question_range}
            </span>
          </div>
        </div>
        {instruction && (
          <SafeHtml
            content={instruction}
            className="text-xs text-slate-600 dark:text-slate-350 font-medium leading-relaxed"
          />
        )}
      </div>

      {/* Passage Text if present */}
      {passage_text && (
        <div className="border border-amber-100/70 dark:border-slate-800 rounded-2xl overflow-hidden bg-[#FAF9F5] dark:bg-slate-900/40">
          <div className="flex items-center justify-between px-5 py-3 bg-[#F4F1E6] dark:bg-slate-900/80 border-b border-amber-100/50 dark:border-slate-800/50">
            <span className="text-xs font-black uppercase tracking-wider text-amber-850 dark:text-amber-300 flex items-center gap-1.5">
              <BookOpen size={14} />
              Passage text
            </span>
            <button
              onClick={() => setIsPassageExpanded(!isPassageExpanded)}
              className="text-xs font-bold text-[#604CDF] hover:underline"
            >
              {isPassageExpanded ? "Collapse Passage" : "Expand Passage"}
            </button>
          </div>
          <div 
            className={`p-5 overflow-y-auto text-sm leading-relaxed font-serif text-slate-805 dark:text-slate-205 custom-scrollbar ielts-html-content ${
              isPassageExpanded ? "max-h-[600px]" : "max-h-[200px]"
            }`}
            dangerouslySetInnerHTML={{ __html: passage_text }}
          />
        </div>
      )}

      {/* Group Questions Table */}
      <div className="overflow-x-auto border border-gray-100 dark:border-slate-800 rounded-2xl bg-slate-50/20 dark:bg-slate-800/10">
        <table className="w-full text-left border-collapse text-xs min-w-[500px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-gray-100 dark:border-slate-800">
              <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 text-center">No</th>
              <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Question / Instruction</th>
              <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Answer</th>
              <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Correct Answer</th>
              <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-24 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-850">
            {questions?.map((q, idx) => {
              const isCorrect = q.is_correct;
              const hasExplanation = q.explanation && q.explanation.replace(/<[^>]*>/g, '').trim() !== '';
              
              return (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50/20 dark:hover:bg-white/[0.01]">
                    <td className="px-4 py-4 font-mono font-bold text-slate-400 text-center">{q.serial_number}</td>
                    <td className="px-4 py-4 text-slate-705 dark:text-slate-200 font-medium leading-relaxed max-w-sm">
                      {q.question_text ? (
                        <SafeHtml content={q.question_text} />
                      ) : (
                        <span className="italic opacity-60 text-slate-400">Fill in the blank</span>
                      )}
                    </td>
                    <td className={`px-4 py-4 font-bold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-455"}`}>
                      {q.user_answer || <span className="italic opacity-65 text-slate-400">Empty / No Answer</span>}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-705 dark:text-slate-200">{q.correct_answer}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[9px] border ${
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      }`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Render inline explanation if present */}
                  {hasExplanation && (
                    <tr>
                      <td colSpan="5" className="bg-[#FFFCE5]/20 dark:bg-amber-955/5 px-4 py-3 border-t border-gray-100 dark:border-slate-850">
                        <div className="flex items-start gap-2 pl-4 text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                          <Sparkles size={12} className="mt-0.5 text-amber-500 flex-shrink-0" />
                          <div className="w-full">
                            <span className="font-bold uppercase tracking-wider mr-1 text-[10px]">Explanation:</span>
                            <SafeHtml content={q.explanation} className="inline-block" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const QuestionSummaryCard = ({ question, index }) => {
  const { title, task_type, score, max_score, details } = question;

  const formattedTaskType = task_type ? task_type.replace(/_/g, " ") : "General Task";

  const isPerfect = score === max_score && max_score > 0;
  const isZero = score === 0;
  const scoreColorClass = isPerfect
    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    : isZero
      ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
      : "text-amber-650 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Glow on hover */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/2 to-purple-500/2 rounded-full blur-2xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />

      {/* Question Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800/80 pb-4 mb-5 relative z-10">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-[#604CDF] dark:text-indigo-400 flex items-center justify-center font-black text-sm flex-shrink-0">
            {index}
          </span>
          <div>
            <h3 className="text-base font-black text-slate-800 dark:text-white capitalize leading-snug">
              {title || "PTE Question"}
            </h3>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
              Task Type: <span className="text-[#604CDF] dark:text-indigo-400">{formattedTaskType}</span>
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider self-start sm:self-center ${scoreColorClass}`}>
          Score: {score} / {max_score}
        </div>
      </div>

      {/* Question Details / Answers Comparison */}
      {details && (
        <div className="space-y-5 relative z-10">
          {details.blanks && renderBlanks(details.blanks)}
          {details.correct_sequence && renderSequence(details.correct_sequence, details.student_sequence)}
          {(details.correct_indices || details.student_indices) && renderMultipleChoice(details.correct_indices, details.student_indices)}

          {/* Explanation panel */}
          {details.explanation && (
            <div className="bg-[#FFFCE5]/40 dark:bg-amber-955/5 border border-yellow-100/70 dark:border-amber-900/10 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                Explanation
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-355 leading-relaxed font-medium whitespace-pre-line">
                {details.explanation}
              </p>
            </div>
          )}

          {/* Feedback panel */}
          {details.feedback && details.feedback !== details.explanation && (
            <div className="bg-indigo-50/20 dark:bg-indigo-950/5 border border-indigo-100/40 dark:border-indigo-900/10 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-[#604CDF] dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-[#604CDF]" />
                Feedback
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-355 leading-relaxed font-medium whitespace-pre-line">
                {details.feedback}
              </p>
            </div>
          )}

          {/* Components panel */}
          {details.components && (
            <div className="flex flex-wrap gap-3 mt-4 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 border-t border-gray-100 dark:border-slate-800/80 pt-3">
              <span>Scoring Components:</span>
              {Object.entries(details.components).map(([cKey, cVal]) => (
                <span key={cKey} className="bg-slate-55/70 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-355 capitalize border border-gray-100 dark:border-slate-850">
                  {cKey.replace(/_/g, " ")}: {cVal}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const renderBlanks = (blanks) => {
  if (!blanks || typeof blanks !== "object") return null;
  return (
    <div className="overflow-x-auto border border-gray-100 dark:border-slate-800 rounded-2xl bg-slate-50/30 dark:bg-slate-800/10">
      <table className="w-full text-left border-collapse text-xs min-w-[400px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-gray-100 dark:border-slate-800">
            <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-16 text-center">Blank</th>
            <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Your Answer</th>
            <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Correct Answer</th>
            <th className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-24 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
          {Object.entries(blanks).map(([key, item]) => {
            if (!item) return null;
            const isCorrect = item.is_correct;
            return (
              <tr key={key} className="hover:bg-slate-50/20 dark:hover:bg-white/[0.01]">
                <td className="px-4 py-3 font-mono font-bold text-slate-400 text-center">{key}</td>
                <td className={`px-4 py-3 font-semibold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-455"}`}>
                  {item.student === "\"" || item.student === "" || item.student === null ? (
                    <span className="italic opacity-60 text-slate-400">Empty / No Answer</span>
                  ) : (
                    item.student
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-205">{item.correct}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[9px] border ${
                    isCorrect
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                  }`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const renderSequence = (correctSeq, studentSeq) => {
  if (!Array.isArray(correctSeq)) return null;
  const hasStudentSeq = Array.isArray(studentSeq) && studentSeq.length > 0;

  return (
    <div className="space-y-4 p-5 bg-slate-50/30 dark:bg-slate-800/10 border border-gray-100 dark:border-slate-800 rounded-2xl">
      <div className="space-y-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct Sequence</h4>
        <div className="flex flex-wrap items-center gap-2">
          {correctSeq.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300 dark:text-slate-600 font-bold">→</span>}
              <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-[#604CDF] dark:text-indigo-400 font-extrabold text-xs border border-indigo-100/50 dark:border-indigo-900/30">
                Para {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Sequence</h4>
        {hasStudentSeq ? (
          <div className="flex flex-wrap items-center gap-2">
            {studentSeq.map((item, idx) => {
              const isMatch = correctSeq[idx] === item;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-350 font-bold">→</span>}
                  <span className={`px-3 py-1.5 rounded-lg font-extrabold text-xs border ${
                    isMatch
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                  }`}>
                    Para {item}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <span className="text-xs italic text-slate-400 dark:text-slate-500 font-medium">No order submitted</span>
        )}
      </div>
    </div>
  );
};

const renderMultipleChoice = (correctIndices, studentIndices) => {
  const sanitizeList = (list) => {
    if (!list) return [];
    if (typeof list === 'string') {
      try {
        const parsed = JSON.parse(list);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch(e) {}
      return [list];
    }
    if (Array.isArray(list)) {
      return list.flatMap(item => {
        if (typeof item === 'string') {
          try {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) return parsed.map(String);
          } catch(e) {}
        }
        return String(item);
      });
    }
    return [String(list)];
  };

  const cleanStudent = sanitizeList(studentIndices);
  const cleanCorrect = sanitizeList(correctIndices);

  const formatIndices = (list) => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return list.map(item => {
      const num = Number(item);
      if (!isNaN(num) && num >= 0 && num < letters.length) {
        return letters[num];
      }
      return String(item).toUpperCase();
    });
  };

  const studentLetters = formatIndices(cleanStudent);
  const correctLetters = formatIndices(cleanCorrect);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50/30 dark:bg-slate-800/10 border border-gray-100 dark:border-slate-800 rounded-2xl text-xs">
      <div className="space-y-1.5">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Selection</h4>
        <div className="flex flex-wrap gap-1.5">
          {studentLetters.length > 0 ? (
            studentLetters.map((choice, idx) => {
              const isCorrect = correctLetters.includes(choice);
              return (
                <span key={idx} className={`px-3 py-1.5 rounded-lg font-bold border ${
                  isCorrect
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                }`}>
                  Option {choice}
                </span>
              );
            })
          ) : (
            <span className="italic text-slate-400 dark:text-slate-500 font-medium">No options selected</span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct Options</h4>
        <div className="flex flex-wrap gap-1.5">
          {correctLetters.map((choice, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-[#604CDF] dark:text-indigo-400 font-bold border border-indigo-100/50 dark:border-indigo-900/30">
              Option {choice}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPteResultsStudents;
