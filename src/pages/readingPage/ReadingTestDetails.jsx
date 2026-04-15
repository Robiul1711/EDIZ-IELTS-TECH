import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import TestHeader from "@/components/common/TestHeader";
import FillGap from "@/components/studentDashboard/readingQuestions/FillGap";
import MCQ from "@/components/studentDashboard/readingQuestions/MCQ";
import Matching from "@/components/studentDashboard/readingQuestions/Matching";
import TFNG from "@/components/studentDashboard/readingQuestions/TFNG";
import { toast } from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReadingTestDetails = () => {
  const { test_no } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const { data: testDetails, isLoading } = useApiQuery({
    queryKey: ["reading-test-details", test_no, bookNo, type],
    url: "/ielts/reading",
    params: { book_no: bookNo, test_no: test_no, type },
    secure: true,
  });

  const { mutate: submitTest, isPending: isSubmitting } = useApiMutation({
    url: "/ielts/reading/tests/submit",
    method: "POST",
    secure: true,

  });

  const [activePart, setActivePart] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const questionRefs = useRef({});

  // Reset active part if URL change or data change
  useEffect(() => {
    setActivePart(0);
  }, [test_no, bookNo]);

  const handleAnswerChange = (serialNumber, value) => {
    setAnswers((prev) => ({ ...prev, [serialNumber]: value }));
  };

  const scrollToQuestion = (serialNumber, partIndex) => {
    if (activePart !== partIndex) {
      setActivePart(partIndex);
      // Wait for re-render before scrolling
      setTimeout(() => {
        const element = questionRefs.current[serialNumber];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else {
      const element = questionRefs.current[serialNumber];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Prepare form data
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("time_spent", timeSpent);

    Object.entries(answers).forEach(([sn, val]) => {
      formData.append(`answer[${sn}]`, val);
    });

    submitTest(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-slate-500 font-medium animate-pulse">
            Loading Test...
          </div>
        </div>
      </div>
    );
  }

  const passages = testDetails?.data || [];
  const currentPassage = passages[activePart];

  if (!currentPassage)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            No Test Data Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            We couldn't retrieve the details for this test. Please check the URL
            or try again.
          </p>
        </div>
      </div>
    );

  const renderQuestionGroup = (group, groupIdx) => {
    const groupStartSerial = group.questions?.[0]?.serial_number;

    return (
      <div
        key={groupIdx}
        ref={(el) => {
          if (el) questionRefs.current[groupStartSerial] = el;
        }}
      >
        {(() => {
          switch (group.type) {
            case "identify_info":
              return (
                <TFNG
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "choice":
              return (
                <MCQ
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "fill_gap":
              return (
                <FillGap
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            case "matching":
              return (
                <Matching
                  group={group}
                  answers={answers}
                  onChange={handleAnswerChange}
                />
              );
            default:
              return (
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 italic">
                    Unsupported question type: {group.type}
                  </p>
                </div>
              );
          }
        })()}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <TestHeader
        durationInSeconds={currentPassage.duration_seconds || 1200}
        onExit="/student-dashboard/ielts/reading"
      />

      <main className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Passage Left Section */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto p-4 lg:p-8 border-r border-slate-200 dark:border-slate-800 custom-scrollbar bg-white dark:bg-slate-900">
          <div className="max-w-3xl mx-auto">
            <header className="mb-6 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-3">
                Reading Passage {activePart + 1}
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {currentPassage.title}
              </h1>
            </header>

            <div 
              className="prose prose-slate dark:prose-invert max-w-none dark:text-slate-300 text-slate-700 leading-relaxed text-base lg:text-lg passage-content"
              style={{ fontSize: '1rem', lineHeight: '1.7' }}
              dangerouslySetInnerHTML={{ __html: currentPassage.passage }}
            />
          </div>
        </section>

        {/* Questions Right Section */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto p-4 lg:p-8 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-6 pb-24">
            {/* Part/Instructions Header */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
              <div 
                dangerouslySetInnerHTML={{ __html: currentPassage.part_details }} 
                className="text-slate-800 dark:text-slate-200 font-bold text-lg" 
              />
            </div>

            {/* Questions Container */}
            <div className="space-y-6">
              {currentPassage.questions?.map((group, idx) => renderQuestionGroup(group, idx))}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="min-h-[5rem] lg:h-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-center px-4 lg:px-6 gap-4 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] py-4 lg:py-0">
        <div className="flex w-full lg:w-auto justify-between lg:justify-start items-center gap-3">
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => setActivePart(prev => Math.max(0, prev - 1))}
              disabled={activePart === 0}
              className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
                activePart === 0 
                  ? "bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed" 
                  : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
              }`}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => setActivePart(prev => Math.min(passages.length - 1, prev + 1))}
              disabled={activePart === passages.length - 1}
              className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
                activePart === passages.length - 1 
                  ? "bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed" 
                  : "bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-400"
              }`}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full lg:w-auto flex gap-3 lg:gap-4 overflow-x-auto py-1 no-scrollbar scroll-smooth px-1">
          {passages.map((p, pIdx) => {
            const pQuestions = p.questions?.flatMap((g) => g.questions?.map((q) => q.serial_number)) || [];
            const isActive = activePart === pIdx;

            return (
              <div
                key={pIdx}
                className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 rounded-2xl border transition-all duration-500 ${
                  isActive
                    ? "bg-white dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/60 shadow-[0_4px_12px_rgba(99,102,241,0.08)] ring-1 ring-indigo-500/10"
                    : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800"
                }`}
              >
                <button
                  onClick={() => setActivePart(pIdx)}
                  className={`whitespace-nowrap font-black text-[10px] lg:text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  Part {pIdx + 1}
                </button>

                {isActive && (
                  <div className="flex gap-1.5 ml-1 lg:ml-2 border-l border-indigo-100 dark:border-indigo-800/50 pl-2 lg:pl-3">
                    {pQuestions.map((sn) => {
                      const isAnswered = answers[sn] && answers[sn].toString().trim() !== "";
                      return (
                        <button
                          key={sn}
                          onClick={() => scrollToQuestion(sn, pIdx)}
                          className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center text-[10px] lg:text-[11px] font-black transition-all transform hover:scale-110 active:scale-95 ${
                            isAnswered
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none border-transparent"
                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400"
                          }`}
                        >
                          {sn}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-auto flex items-center gap-3">
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex-1 lg:flex-none group relative flex items-center justify-center lg:justify-start gap-3 px-6 lg:px-10 h-12 lg:h-14 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-indigo-200 dark:shadow-none uppercase text-[10px] lg:text-xs tracking-[0.2em]"
          >
            <span>{isSubmitting ? "Sending..." : "Submit Test"}</span>
            <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-indigo-500/50 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ChevronRight size={14} strokeWidth={3} />
            </div>
          </button>
        </div>
      </footer>

      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .passage-content b {
          font-weight: 800;
          color: #111827;
        }
        .dark .passage-content b {
          color: #f9fafb;
        }
        .passage-content p {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ReadingTestDetails;
