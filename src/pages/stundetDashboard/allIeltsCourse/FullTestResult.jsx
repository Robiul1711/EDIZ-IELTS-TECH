import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApiMutation } from "@/hooks/apiMutation";
import {
  ChevronLeft,
  Clock,
  CheckCircle,
  Info,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Loader2,
} from "lucide-react";

const SKILLS = [
  { id: "listening", label: "Listening", icon: Headphones, color: "text-[#604CDF]", bg: "bg-indigo-50" },
  { id: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "writing", label: "Writing", icon: PenTool, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "speaking", label: "Speaking", icon: Mic, color: "text-rose-600", bg: "bg-rose-50" },
];

const FullTestResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [activeSkill, setActiveSkill] = useState("listening");
  const [resultData, setResultData] = useState(null);

  const { mutate: fetchResults, isPending: isLoading } = useApiMutation({
    url: "/ielts/full-test/result",
    method: "POST", // using POST as body was requested
    secure: true,
    toast: false,
    onSuccess: (response) => {
      setResultData(response.data);
    },
  });

  useEffect(() => {
    if (session_id && activeSkill) {
      setResultData(null);
      const formData = new FormData();
      formData.append("session_id", session_id);
      formData.append("skill", activeSkill);
      fetchResults(formData);
    }
  }, [session_id, activeSkill, fetchResults]);

  if (!session_id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Invalid session ID.</p>
      </div>
    );
  }

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const skillData = resultData?.[activeSkill] || resultData || {};
  const results = skillData.results || [];

  return (
    <div className="p-4 md:p-8 rounded-2xl space-y-8 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/ielts")}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              Full Test Results
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Review your overall performance across all skills
            </p>
          </div>
        </div>

        {skillData && results.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700">
              <Clock size={18} className="text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {formatTime(skillData.time_spent || resultData?.time_spent || 0)}
              </span>
            </div>
            {skillData.total_questions ? (
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                <CheckCircle
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  {skillData.correct_answers}/{skillData.total_questions} Correct
                </span>
              </div>
            ) : null}
            <div className="bg-[#604CDF] text-white px-6 py-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold">
              Band Score: {skillData.band_score || skillData.overall_score || resultData?.overall_band || "N/A"}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 bg-white dark:bg-slate-900 p-3 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        {SKILLS.map((skill) => {
          const Icon = skill.icon;
          const isActive = activeSkill === skill.id;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
                isActive
                  ? `bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg`
                  : `bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800`
              }`}
            >
              <Icon size={20} className={isActive ? "" : skill.color} />
              <span className="hidden md:inline">{skill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {isLoading && !resultData ? (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-[#604CDF]" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">
              Loading {activeSkill} Results...
            </p>
          </div>
        ) : !resultData || results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 font-bold text-lg">No results found for {activeSkill}.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {(activeSkill === "listening" || activeSkill === "reading") &&
              results.map((part, pIdx) => (
                <div key={pIdx} className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-slate-800 text-white px-6 py-2.5 rounded-2xl shadow-md">
                    <span className="bg-[#604CDF] w-8 h-8 flex items-center justify-center rounded-lg font-bold">
                      {part.part_no || pIdx + 1}
                    </span>
                    <h2 className="text-lg font-bold uppercase tracking-wide">
                      {part.title || `${activeSkill} Part ${part.part_no || pIdx + 1}`}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {(part.question_groups || []).map((group, gIdx) => (
                      <QuestionGroupRenderer key={gIdx} group={group} />
                    ))}
                  </div>
                </div>
              ))}

            {(activeSkill === "writing" || activeSkill === "speaking") && (
              <WritingSpeakingRenderer results={results} skill={activeSkill} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Writing & Speaking Renderer ──────────────────────────────────────────────
const WritingSpeakingRenderer = ({ results, skill }) => {
  const [currentSerial, setCurrentSerial] = useState(
    results[0]?.part_no || results[0]?.serial_number
  );

  const currentResult =
    results.find((r) => (r.part_no || r.serial_number) === currentSerial) ||
    results[0];

  const getWordCount = (text) => {
    if (!text) return 0;
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    return cleanText === "" ? 0 : cleanText.split(/\s+/).length;
  };

  const studentAnswerText = currentResult
    ? currentResult.user_answer ||
      currentResult.answer ||
      currentResult.transcript ||
      ""
    : "";

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex gap-2 mb-6">
        {results.map((r) => {
          const serial = r.part_no || r.serial_number;
          return (
            <button
              key={serial}
              onClick={() => setCurrentSerial(serial)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                currentSerial === serial
                  ? "bg-[#604CDF] text-white shadow-md shadow-[#604CDF]/30"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
              }`}
            >
              Part {serial}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Answer Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-xs">
              Task Prompt
            </h3>
            <div
              className="text-slate-800 dark:text-white font-medium leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: currentResult?.question_text || currentResult?.prompt || "Task Prompt",
              }}
            />
            {currentResult?.image && (
              <img src={currentResult.image} alt="Task visual" className="mt-4 rounded-xl max-h-60" />
            )}
            {skill === "speaking" && currentResult?.audio_url && (
              <audio src={currentResult.audio_url} controls className="mt-4 w-full h-10" />
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                Your Answer
              </h3>
              {skill === "writing" && (
                <span className="text-xs font-bold text-[#604CDF] bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                  {getWordCount(studentAnswerText)} words
                </span>
              )}
            </div>
            {skill === "speaking" && currentResult?.user_audio_url ? (
               <audio src={currentResult.user_audio_url} controls className="w-full h-10" />
            ) : (
              <p className="text-slate-700 dark:text-slate-300 font-medium text-sm leading-relaxed whitespace-pre-wrap">
                {studentAnswerText || "No answer provided."}
              </p>
            )}
          </div>
        </div>

        {/* Feedback Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-[#604CDF] font-black text-lg">AI Feedback</h3>
               <span className="text-xl font-black bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-4 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                 Band: {currentResult?.score || currentResult?.band_score || "N/A"}
               </span>
             </div>
             {currentResult?.feedback ? (
               <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300">
                 {currentResult.feedback}
               </div>
             ) : (
               <p className="text-slate-400 text-sm italic">Feedback not available.</p>
             )}
          </div>
          
          {currentResult?.model_answer && (
             <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-[2rem] p-6 shadow-sm border border-emerald-100 dark:border-emerald-800/30">
                <h3 className="text-emerald-700 font-bold mb-4 uppercase tracking-wider text-xs">
                  Model Answer
                </h3>
                <div
                  className="prose prose-sm dark:prose-invert text-slate-700 dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: currentResult.model_answer }}
                />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Question Components for Listening & Reading ──────────────────────────────
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
            {group.type?.replace("_", " ")}
          </span>
        </div>
        {group.instruction && !/\d+\[blank\]/.test(group.instruction) && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
            <div
              className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: group.instruction }}
            />
          </div>
        )}
      </div>

      <div className="mt-4">{renderQuestionType()}</div>
    </div>
  );
};

const FillGapView = ({ group }) => {
  const questionMap = {};
  (group.questions || []).forEach((q) => {
    questionMap[q.serial_number] = q;
  });

  const sourceText = group.passage_text || group.instruction || "";
  const hasBlankPattern = /\d+\[blank\]/.test(sourceText);

  if (hasBlankPattern) {
    const processedHtml = sourceText.replace(/(\d+)\[blank\]/g, (match, num) => {
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
            ${
              userAns
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
    });

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {group.questions.map((q) => (
        <div
          key={q.serial_number}
          className={`p-4 rounded-xl border flex flex-col gap-3 ${
            q.is_correct
              ? "bg-emerald-50/30 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30"
              : "bg-red-50/30 border-red-100 dark:bg-red-900/10 dark:border-red-800/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span
                className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
                  q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}
              >
                {q.serial_number}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Your Answer
                </span>
                <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
                  {q.user_answer || "Empty"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end border-l pl-4 border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">
                Correct
              </span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                {q.correct_answer}
              </span>
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

const ChoiceView = ({ group }) => (
  <div className="space-y-6">
    {group.questions.map((q) => (
      <div key={q.serial_number} className="space-y-4">
        <div className="flex items-start gap-4">
          <span
            className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
              q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            }`}
          >
            {q.serial_number}
          </span>
          <p
            className="text-slate-800 dark:text-white font-bold leading-relaxed pt-1"
            dangerouslySetInnerHTML={{ __html: q.question_text }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
          <div
            className={`p-4 rounded-xl border flex flex-col gap-1 ${
              q.is_correct ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400">Your Answer</span>
            <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-700" : "text-red-700"}`}>
              {q.user_answer || "No selection"}
            </span>
          </div>
          {!q.is_correct && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-emerald-500">Correct Answer</span>
              <span className="text-sm font-bold text-emerald-700">{q.correct_answer}</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

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
              <span
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl font-bold text-base ${
                  q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}
              >
                {q.serial_number}
              </span>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Your Answer</span>
                  <span
                    className={`text-sm font-bold uppercase ${
                      q.is_correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
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
          </div>
        ))}
      </div>
    </div>
  );
};

const IdentifyInfoView = ({ group }) => (
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
            <span
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm ${
                q.is_correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}
            >
              {q.serial_number}
            </span>
            <p
              className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1"
              dangerouslySetInnerHTML={{ __html: q.question_text }}
            />
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
      </div>
    ))}
  </div>
);

const DefaultQuestionView = ({ group }) => (
  <div className="space-y-4">
    {group.questions.map((q) => (
      <div key={q.serial_number} className="p-4 border rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-400">{q.serial_number}.</span>
          <span
            className="text-sm text-slate-700"
            dangerouslySetInnerHTML={{ __html: q.question_text || "Question" }}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${q.is_correct ? "text-emerald-600" : "text-red-600"}`}>
            {q.user_answer}
          </span>
          {!q.is_correct && <span className="text-sm font-bold text-emerald-600">{q.correct_answer}</span>}
        </div>
      </div>
    ))}
  </div>
);

export default FullTestResult;
