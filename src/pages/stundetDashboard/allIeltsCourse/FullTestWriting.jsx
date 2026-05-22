import React, { useState, useMemo } from "react";
import { useApiMutation } from "@/hooks/apiMutation";
import { toast } from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  BookOpen,
  Clock,
  FileText,
  CheckCircle2,
} from "lucide-react";

const FullTestWriting = ({ data, session, onComplete }) => {
  const testParts = data || [];

  const { mutateAsync: submitSingleAnswer } = useApiMutation({
    url: "/ielts/full-test/submit-section",
    method: "POST",
    secure: true,
    toast: false,
  });

  const [activePart, setActivePart] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({ 1: "", 2: "" });
  const [startTime] = useState(Date.now());
  const [leftWidth, setLeftWidth] = useState(50);

  const currentPart = testParts[activePart];

  const wordCount = useMemo(() => {
    const text = answers[activePart + 1] || "";
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  }, [answers, activePart]);

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswers((prev) => ({ ...prev, [activePart + 1]: value }));
  };

  const savePartAnswer = async (partIdx) => {
    const partNo = partIdx + 1;
    const answer = answers[partNo];
    if (!answer || answer.trim() === "") return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const formData = new FormData();
    formData.append("session_id", session.id);
    formData.append("skill", "writing");
    formData.append("serial_number", partNo);
    formData.append("time_spent", timeSpent);
    formData.append(`answer[${partNo}]`, answer);

    await submitSingleAnswer(formData);
  };

  const handlePartChange = async (newPartIdx) => {
    if (newPartIdx === activePart) return;

    const currentAnswer = answers[activePart + 1];
    if (currentAnswer && currentAnswer.trim() !== "") {
      setIsSaving(true);
      try {
        await savePartAnswer(activePart);
      } catch (err) {
        console.error("Failed to auto-save part answer", err);
      }
      setIsSaving(false);
    }
    setActivePart(newPartIdx);
  };

  const handleSubmit = async () => {
    const currentAnswer = answers[activePart + 1];
    const hasAnyAnswer = Object.values(answers).some(
      (val) => val && val.trim() !== "",
    );

    if ((!currentAnswer || currentAnswer.trim() === "") && !hasAnyAnswer) {
      toast.error("Please enter an answer before submitting.");
      return;
    }

    setIsSaving(true);
    try {
      if (currentAnswer && currentAnswer.trim() !== "") {
        await savePartAnswer(activePart);
      }
      setIsSubmitted(true);
      onComplete();
    } catch (err) {
      console.error("Failed to submit test", err);
      toast.error("Failed to submit test. Please try again.");
    }
    setIsSaving(false);
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const onMouseMove = (moveEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / window.innerWidth) * 100;
      const newWidth = Math.min(Math.max(startWidth + deltaX, 20), 80);
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  if (!testParts.length) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50 dark:bg-slate-950 font-sans p-6">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-500 rotate-12">
            <BookOpen size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
            No Writing Data
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            No writing questions were found for this test.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden relative font-sans">
      {/* Left Side: Prompt */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="h-full overflow-y-auto p-6 lg:p-10 border-r border-slate-200 dark:border-slate-800 custom-scrollbar bg-white dark:bg-slate-900 transition-[width] duration-75 ease-out"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase">
              <FileText size={12} />
              Writing {currentPart?.part_no === 1 ? "Task 1" : "Task 2"}
            </div>
            <h1 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {currentPart?.title}
            </h1>
          </header>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div
              dangerouslySetInnerHTML={{ __html: currentPart?.part_details }}
              className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium italic"
            />
          </div>

          <div className="space-y-8">
            <div
              className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: currentPart?.prompt }}
            />

            {currentPart?.image && (
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white p-4 shadow-xl">
                <img
                  src={currentPart.image}
                  alt="Task Visualization"
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 bottom-0 w-2.5 cursor-col-resize z-10 group flex items-center justify-center transition-all bg-transparent hover:bg-indigo-500/10"
        style={{ left: `calc(${leftWidth}% - 5px)` }}
      >
        <div className="w-1 h-12 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-indigo-500 group-hover:h-24 transition-all" />
      </div>

      {/* Right Side: Answer Input + Footer */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="h-full overflow-y-auto p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 custom-scrollbar flex flex-col"
      >
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Clock size={14} />
              Writing Section
            </div>
            <div
              className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                wordCount < (currentPart?.part_no === 1 ? 150 : 250)
                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              Word Count: {wordCount}
            </div>
          </div>

          {isSubmitted ? (
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col h-full gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-2 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Your Answer
                  </label>
                  <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-y-auto font-serif leading-relaxed text-lg">
                    {answers[activePart + 1] || "No answer provided."}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
              <textarea
                value={answers[activePart + 1] || ""}
                onChange={handleAnswerChange}
                placeholder={`Enter your Part ${activePart + 1} answer...`}
                className="flex-1 w-full p-8 lg:p-10 bg-transparent text-slate-800 dark:text-slate-200 outline-none resize-none font-serif text-lg leading-relaxed dark:placeholder:text-slate-700"
              />
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center px-2 py-4 gap-6 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
          <div className="flex gap-3">
            {testParts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isSaving}
                onClick={() => handlePartChange(idx)}
                className={`px-8 h-12 flex items-center justify-center rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                  activePart === idx
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                Part {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4 ">
            {activePart < testParts.length - 1 ? (
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handlePartChange(activePart + 1)}
                className="flex items-center gap-2 px-8 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 cursor-pointer"
              >
                <span>{isSaving ? "Saving..." : "Next"}</span>
                {!isSaving && <ChevronRight size={20} />}
              </button>
            ) : (
              <button
                type="button"
                disabled={isSaving || isSubmitted}
                onClick={handleSubmit}
                className="group relative flex items-center gap-4 px-10 h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale shadow-xl shadow-indigo-100 dark:shadow-none uppercase text-xs tracking-[0.2em] cursor-pointer"
              >
                <span>
                  {isSaving ? "Saving..." : isSubmitted ? "Submitted" : "Submit Writing"}
                </span>
                {!isSaving && !isSubmitted && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/50 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <Send size={16} strokeWidth={2.5} />
                  </div>
                )}
                {isSubmitted && <CheckCircle2 size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullTestWriting;
