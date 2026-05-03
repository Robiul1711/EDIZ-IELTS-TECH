import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import TestHeader from "@/components/common/TestHeader";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  BookOpen,
  Clock,
  FileText,
  CheckCircle2,
} from "lucide-react";

const StudentIeltsWritingTest = () => {
  const { test_no } = useParams();
  const [searchParams] = useSearchParams();
  const part_no = searchParams.get("part");
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  // API Query to fetch test details
  const { data: testDetails, isLoading } = useApiQuery({
    queryKey: ["writing-test-details", test_no, bookNo, type],
    url: `/ielts/writing/tests/${test_no}`,
    params: { book_no: bookNo, test_no: test_no, type },
    secure: true,
  });

  const {
    mutate: submitTest,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useApiMutation({
    url: "/ielts/writing/tests/submit",
    method: "POST",
    secure: true,
  });

  const [activePart, setActivePart] = useState(0);

  // Sync activePart with URL param
  useEffect(() => {
    if (part_no) {
      setActivePart(parseInt(part_no) - 1);
    }
  }, [part_no]);

  const [answers, setAnswers] = useState({ 1: "", 2: "" });
  const [startTime] = useState(Date.now());
  const [leftWidth, setLeftWidth] = useState(50); // percentage

  const testParts = testDetails?.data || [];
  const currentPart = testParts[activePart];

  // Calculate word count for current answer
  const wordCount = useMemo(() => {
    const text = answers[activePart + 1] || "";
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  }, [answers, activePart]);

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswers((prev) => ({ ...prev, [activePart + 1]: value }));
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("time_spent", timeSpent);

    // Add answers for all parts
    Object.entries(answers).forEach(([partNo, answer]) => {
      formData.append(`answer[${partNo}]`, answer);
    });

    submitTest(formData);
  };

  // Resize handler
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="mt-6 text-slate-500 font-bold tracking-widest uppercase text-xs animate-pulse">
            Loading Writing Test...
          </div>
        </div>
      </div>
    );
  }

  if (!testParts.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-6">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-500 rotate-12">
            <BookOpen size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
            No Test Data
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            We couldn't find any questions for this writing test. Please verify
            the details or contact support.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden font-sans">
      <TestHeader
        durationInSeconds={testParts.reduce(
          (acc, part) => acc + (part.duration_seconds || 1200),
          0,
        )}
        onExit="/dashboard/ielts/writing"
      />

      <main className="flex-1 flex overflow-hidden relative">
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

            {/* Part Details / Instructions */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div
                dangerouslySetInnerHTML={{ __html: currentPart?.part_details }}
                className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium italic"
              />
            </div>

            {/* Prompt Content */}
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

        {/* Right Side: Answer Input */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="h-full overflow-y-auto p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 custom-scrollbar flex flex-col"
        >
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <Clock size={14} />
                Time Remaining:{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                  20:00
                </span>
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
              <div className="space-y-6 flex-1">
                <div className="flex flex-col h-full gap-6">
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 ml-2 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />{" "}
                      Your Answer
                    </label>
                    <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-y-auto font-serif leading-relaxed text-lg">
                      {answers[activePart + 1] || "No answer provided."}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-3 ml-2 flex items-center gap-2">
                      <BookOpen size={14} /> Model Answer
                    </label>
                    <div
                      className="flex-1 p-6 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 text-slate-800 dark:text-slate-200 overflow-y-auto font-serif leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{
                        __html: currentPart?.model_answer,
                      }}
                    />
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
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="h-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center px-6 lg:px-10 gap-6 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setActivePart(0)}
            className={`px-8 h-12 flex items-center justify-center rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
              activePart === 0
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Part 1
          </button>
          <button
            type="button"
            onClick={() => setActivePart(1)}
            className={`px-8 h-12 flex items-center justify-center rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
              activePart === 1
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Part 2
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={isSubmitting || isSubmitted}
            onClick={handleSubmit}
            className="group relative flex items-center gap-4 px-10 h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale shadow-xl shadow-indigo-100 dark:shadow-none uppercase text-xs tracking-[0.2em]"
          >
            <span>
              {isSubmitting
                ? "Submitting..."
                : isSubmitted
                  ? "Submitted"
                  : "Submit Test"}
            </span>
            <div
              className={`w-8 h-8 rounded-xl bg-indigo-500/50 flex items-center justify-center transition-transform group-hover:translate-x-1 ${isSubmitted ? "hidden" : ""}`}
            >
              <Send size={16} strokeWidth={2.5} />
            </div>
            {isSubmitted && <CheckCircle2 size={18} />}
          </button>
        </div>
      </footer>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
        .prose b {
          font-weight: 800;
          color: #0f172a;
        }
        .dark .prose b {
          color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default StudentIeltsWritingTest;
