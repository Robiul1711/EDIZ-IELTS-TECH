import React from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { ChevronLeft, Clock, CheckCircle, XCircle, Info, HelpCircle } from "lucide-react";

const ReadingResultDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { test_no } = useParams();
  const book_no = searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const { data: resultData, isLoading } = useApiQuery({
    queryKey: ["ielts-reading-result", test_no, book_no, type],
    url: "/ielts/reading/results",
    params: { book_no, test_no, type },
    secure: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#604CDF]"></div>
      </div>
    );
  }

  const data = resultData?.data || {};
  const results = data.results || [];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className=" p-4 md:p-8 rounded-2xl md:rounded-4xl space-y-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Test Results</h1>
            <p className="text-sm text-slate-500">Review your performance and explanations</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
            <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              {formatTime(data.time_spent)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {data.correct_answers}/{data.total_questions} Correct
            </span>
          </div>
          <div className="bg-[#604CDF] text-white px-6 py-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold">
            Band Score: {data.overall_score}
          </div>
        </div>
      </div>

      {/* Parts Rendering */}
      <div className="space-y-12">
        {results.map((part, pIdx) => (
          <div key={pIdx} className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-slate-800 text-white px-6 py-2.5 rounded-2xl shadow-md">
              <span className="bg-[#604CDF] w-8 h-8 flex items-center justify-center rounded-lg font-bold">
                {part.part_no}
              </span>
              <h2 className="text-lg font-bold uppercase tracking-wide">{part.title}</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {part.question_groups.map((group, gIdx) => (
                <QuestionGroupRenderer key={gIdx} group={group} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestionGroupRenderer = ({ group }) => {
  const renderQuestionType = () => {
    switch (group.type) {
      case "identify_info":
        return <IdentifyInfoView group={group} />;
      case "fill_gap":
        return <FillGapView group={group} />;
      case "choice":
        return <ChoiceView group={group} />;
      default:
        return <DefaultQuestionView group={group} />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
           <span className="text-xs font-black uppercase tracking-[0.2em] text-[#604CDF] bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
            Questions {group.question_range}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {group.type.replace("_", " ")}
          </span>
        </div>
        {group.instruction && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
             <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: group.instruction }} />
          </div>
        )}
      </div>

      <div className="mt-4">{renderQuestionType()}</div>
    </div>
  );
};

const IdentifyInfoView = ({ group }) => {
  return (
    <div className="space-y-4">
      {group.questions.map((q) => (
        <div
          key={q.serial_number}
          className={`p-5 rounded-2xl border transition-all ${
            q.is_correct
              ? "bg-emerald-50/30 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30"
              : "bg-red-50/30 border-red-100 dark:bg-red-900/10 dark:border-red-800/30"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                {q.serial_number}
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1">
                {q.question_text}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 shrink-0 md:min-w-[200px]">
              <div className="flex items-center justify-between text-xs px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <span className="text-slate-500">Your Answer:</span>
                <span className={`font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
                  {q.user_answer || "N/A"}
                </span>
              </div>
              {!q.is_correct && (
                <div className="flex items-center justify-between text-xs px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <span className="text-emerald-600">Correct:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {q.correct_answer}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {q.explanation && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs italic">
                <Info size={14} className="mt-0.5 shrink-0" />
                <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FillGapView = ({ group }) => {
  return (
    <div className="space-y-6">
      {group.passage_text && (
        <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 prose dark:prose-invert max-w-none text-sm leading-loose">
          <div dangerouslySetInnerHTML={{ __html: group.passage_text }} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {group.questions.map((q) => (
          <div
            key={q.serial_number}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
              q.is_correct ? "bg-emerald-50/50 border-emerald-100" : "bg-red-50/50 border-red-100"
            }`}
          >
            <div className="flex items-center gap-3">
               <span className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold text-xs ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                {q.serial_number}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Answer</span>
                <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
                  {q.user_answer || "Empty"}
                </span>
              </div>
            </div>
            {!q.is_correct && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-emerald-500 uppercase font-bold">Correct</span>
                <span className="text-sm font-bold text-emerald-700">
                  {q.correct_answer}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChoiceView = ({ group }) => {
  return (
    <div className="space-y-6">
      {group.questions.map((q) => (
        <div key={q.serial_number} className="space-y-4">
          <div className="flex items-start gap-4">
             <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                {q.serial_number}
              </span>
              <p className="text-slate-800 dark:text-white font-bold leading-relaxed pt-1">
                {q.question_text}
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
            <div className={`p-4 rounded-xl border flex flex-col gap-1 ${
              q.is_correct ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-400">Your Answer</span>
              <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-700" : "text-red-700"}`}>
                {q.user_answer || "No selection"}
              </span>
            </div>
            {!q.is_correct && (
               <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Correct Answer</span>
                <span className="text-sm font-bold text-emerald-700">
                  {q.correct_answer}
                </span>
              </div>
            )}
          </div>
           {q.explanation && (
            <div className="ml-12 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-xs text-slate-500">
               <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DefaultQuestionView = ({ group }) => {
  return (
    <div className="space-y-4">
      {group.questions.map((q) => (
        <div key={q.serial_number} className="p-4 border rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-400">{q.serial_number}.</span>
            <span className="text-sm text-slate-700">{q.question_text || "Question"}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
              {q.user_answer}
            </span>
            {!q.is_correct && (
              <span className="text-sm font-bold text-emerald-600">
                {q.correct_answer}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingResultDetail;
