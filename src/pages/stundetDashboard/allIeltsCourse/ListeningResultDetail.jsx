import React from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { ChevronLeft, Clock, CheckCircle, Info, Headphones } from "lucide-react";

const ListeningResultDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { test_no } = useParams();
  const book_no = searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const { data: resultData, isLoading } = useApiQuery({
    queryKey: ["ielts-listening-result", test_no, book_no, type],
    url: "/ielts/listening/results",
    params: { book_no, test_no, type },
    secure: true,
  });

  if (isLoading) {
    return (
            <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
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
    <div className="p-4 md:p-8 rounded-2xl md:rounded-4xl space-y-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              Listening Results <Headphones size={20} className="text-[#604CDF]" />
            </h1>
            <p className="text-sm text-slate-500">Review your performance and detailed feedback</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
            <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              {formatTime(data.time_spent || 0)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {data.correct_answers}/{data.total_questions} Correct
            </span>
          </div>
          <div className="bg-[#604CDF] text-white px-6 py-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold">
            Overall Score: {data.overall_score || data.band_score}
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
      case "fill_gap":
      case "fill_gap_options":
        return <FillGapView group={group} />;
      case "choice":
        return <ChoiceView group={group} />;
      case "multiple_choice_group":
      case "multiple_question":
        return <MultipleQuestionView group={group} />;
      case "identify_info":
      case "identify_info_yn":
        return <IdentifyInfoView group={group} />;
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
        {group.instruction && !/\d+\[blank\]/.test(group.instruction) && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: group.instruction }} />
          </div>
        )}
      </div>

      <div className="mt-4">{renderQuestionType()}</div>
    </div>
  );
};

const FillGapView = ({ group }) => {
  // Build a lookup map from serial_number -> question data
  const questionMap = {};
  (group.questions || []).forEach((q) => {
    questionMap[q.serial_number] = q;
  });

  // Use passage_text first, fall back to instruction
  const sourceText = group.passage_text || group.instruction || "";
  const hasBlankPattern = /\d+\[blank\]/.test(sourceText);

  if (hasBlankPattern) {
    const processedHtml = sourceText.replace(
      /(\d+)\[blank\]/g,
      (match, num) => {
        const q = questionMap[parseInt(num)];
        if (!q) return match;
        const userAns = q.user_answer || "";
        const correctAns = q.correct_answer || "";
        const isCorrect = q.is_correct;

        if (isCorrect) {
          return `<span style="display:inline-flex;align-items:center;gap:4px;margin:0 2px;padding:2px 10px;border-radius:9999px;background:#dcfce7;border:1.5px solid #86efac;color:#16a34a;font-weight:700;font-size:0.85em;vertical-align:middle;">
              <span style="width:16px;height:16px;border-radius:50%;background:#16a34a;color:#fff;font-size:0.65em;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">${num}</span>
              ${userAns}
            </span>`;
        } else {
          return `<span style="display:inline-flex;align-items:center;gap:4px;margin:0 2px;vertical-align:middle;">
              ${userAns
                ? `<span style="padding:2px 10px;border-radius:9999px;background:#fee2e2;border:1.5px solid #fca5a5;color:#dc2626;font-weight:700;font-size:0.85em;text-decoration:line-through;display:inline-flex;align-items:center;gap:4px;">
                    <span style="width:16px;height:16px;border-radius:50%;background:#dc2626;color:#fff;font-size:0.65em;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">${num}</span>
                    ${userAns}
                  </span>`
                : `<span style="padding:2px 10px;border-radius:9999px;background:#fee2e2;border:1.5px dashed #fca5a5;color:#dc2626;font-weight:700;font-size:0.85em;display:inline-flex;align-items:center;gap:4px;">
                    <span style="width:16px;height:16px;border-radius:50%;background:#dc2626;color:#fff;font-size:0.65em;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">${num}</span>
                    empty
                  </span>`
              }
              <span style="padding:2px 10px;border-radius:9999px;background:#dcfce7;border:1.5px solid #86efac;color:#16a34a;font-weight:700;font-size:0.85em;display:inline-flex;align-items:center;gap:4px;">
                ✓ ${correctAns}
              </span>
            </span>`;
        }
      }
    );

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold px-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-600">Correct Answer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-red-400"></span>
            <span className="text-red-500">Your Answer (wrong)</span>
          </div>
        </div>
        <div
          className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm leading-[2.2] text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>
    );
  }

  // Fallback: grid view (for listening without passage_text)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {group.questions.map((q) => (
        <div
          key={q.serial_number}
          className={`p-4 rounded-xl border flex flex-col gap-3 ${
            q.is_correct ? "bg-emerald-50/30 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30" : "bg-red-50/30 border-red-100 dark:bg-red-900/10 dark:border-red-800/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                {q.serial_number}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Your Answer</span>
                <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
                  {q.user_answer || "Empty"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end border-l pl-4 border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">Correct</span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{q.correct_answer}</span>
            </div>
          </div>
          {q.explanation && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-800">
              <Info size={12} className="inline mr-1" />
              <span dangerouslySetInnerHTML={{ __html: q.explanation }} />
            </div>
          )}
        </div>
      ))}
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
            <p className="text-slate-800 dark:text-white font-bold leading-relaxed pt-1" dangerouslySetInnerHTML={{ __html: q.question_text }} />
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

const MultipleQuestionView = ({ group }) => {
  const commonQuestionText = group.questions[0]?.question_text;

  return (
    <div className="space-y-6">
      {commonQuestionText && (
        <div 
          className="text-slate-700 dark:text-slate-200 font-bold text-sm leading-relaxed p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-700/50"
          dangerouslySetInnerHTML={{ __html: commonQuestionText }} 
        />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {group.questions.map((q) => (
          <div
            key={q.serial_number}
            className={`p-4 rounded-2xl border transition-all ${
              q.is_correct
                ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/30"
                : "bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl font-bold text-base ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                {q.serial_number}
              </span>
              
              <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Your Answer</span>
                  <span className={`text-sm font-bold uppercase ${q.is_correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {q.user_answer || "Empty"}
                  </span>
                </div>
                
                {!q.is_correct && (
                  <div className="flex flex-col gap-1 pl-4 border-l border-red-200/50 dark:border-red-800/30">
                    <span className="text-[10px] uppercase font-bold text-emerald-500">Correct</span>
                    <span className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-400">
                      {q.correct_answer}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {q.explanation && (
              <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 italic pt-3 border-t border-slate-100 dark:border-slate-800/50">
                <span dangerouslySetInnerHTML={{ __html: q.explanation }} />
              </div>
            )}
          </div>
        ))}
      </div>
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
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1" dangerouslySetInnerHTML={{ __html: q.question_text }} />
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
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 italic">
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
            <span className="text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: q.question_text || "Question" }} />
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
              {q.user_answer || "Empty"}
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

export default ListeningResultDetail;
