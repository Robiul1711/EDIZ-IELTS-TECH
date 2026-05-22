import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  CheckCircle2,
} from "lucide-react";

const WritingResultDetail = () => {
  const { test_no } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookNo = searchParams.get("book_no") || searchParams.get("book");
  const type = searchParams.get("type") || "academic";

  const {
    data: resultData,
    isLoading,
    refetch,
  } = useApiQuery({
    queryKey: ["writing-result", test_no, bookNo, type],
    url: `/ielts/writing/results`,
    params: { book_no: bookNo, test_no: test_no, type },
    secure: true,
  });

  const [activeTab, setActiveTab] = useState("feedback"); // 'feedback' or 'explanation'
  const [currentSerial, setCurrentSerial] = useState(1);

  const results = useMemo(() => resultData?.data?.results || [], [resultData]);
  const currentResult =
    results.find((r) => (r.part_no || r.serial_number) === currentSerial) ||
    results[0];

  useEffect(() => {
    if (
      results.length > 0 &&
      !results.find((r) => (r.part_no || r.serial_number) === currentSerial)
    ) {
      setCurrentSerial(results[0].part_no || results[0].serial_number);
    }
  }, [results, currentSerial]);

  // Mutations for Feedback and Explanation
  const { mutate: fetchFeedback, isPending: isFetchingFeedback } =
    useApiMutation({
      url: "/ielts/writing/tests/feedback",
      method: "POST",
      secure: true,
      onSuccess: () => {
        refetch();
      },
    });

  const { mutate: fetchExplanation, isPending: isFetchingExplanation } =
    useApiMutation({
      url: "/ielts/writing/tests/explaination", // as specified by the user: explaination
      method: "POST",
      secure: true,
      onSuccess: () => {
        refetch();
      },
    });

  const handleGenerateFeedback = () => {
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("serial_number", currentSerial);
    formData.append("part_no", currentSerial);
    formData.append("task_no", currentSerial);
    formData.append("part", currentSerial);
    formData.append("task", currentSerial);
    fetchFeedback(formData);
  };

  const handleGenerateExplanation = () => {
    const formData = new FormData();
    formData.append("book_no", bookNo);
    formData.append("test_no", test_no);
    formData.append("type", type);
    formData.append("serial_number", currentSerial);
    formData.append("part_no", currentSerial);
    formData.append("task_no", currentSerial);
    formData.append("part", currentSerial);
    formData.append("task", currentSerial);
    fetchExplanation(formData);
  };

  // Helper to count words
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

  const wordCount = useMemo(() => {
    return getWordCount(studentAnswerText);
  }, [studentAnswerText]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-500">
        <p>No results found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFF] dark:bg-slate-950/40 rounded-2xl">
      <div className="p-4 space-y-6">
        {/* Top Navigation Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
          <button
            onClick={() => navigate("/dashboard/ielts/writing")}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold tracking-widest uppercase">
            Writing
          </div>

          <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-start">
            {results.map((r) => {
              const serial = r.part_no || r.serial_number;
              return (
                <button
                  key={serial}
                  onClick={() => setCurrentSerial(serial)}
                  className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
                    currentSerial === serial
                      ? "bg-[#A22BDE] text-white shadow-md shadow-[#A22BDE]/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {serial}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                const currentIndex = results.findIndex(
                  (r) => (r.part_no || r.serial_number) === currentSerial,
                );
                if (currentIndex > 0) {
                  const prevVal =
                    results[currentIndex - 1].part_no ||
                    results[currentIndex - 1].serial_number;
                  setCurrentSerial(prevVal);
                }
              }}
              disabled={
                currentSerial ===
                (results[0]?.part_no || results[0]?.serial_number)
              }
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                const currentIndex = results.findIndex(
                  (r) => (r.part_no || r.serial_number) === currentSerial,
                );
                if (currentIndex < results.length - 1) {
                  const nextVal =
                    results[currentIndex + 1].part_no ||
                    results[currentIndex + 1].serial_number;
                  setCurrentSerial(nextVal);
                }
              }}
              disabled={
                currentSerial ===
                (results[results.length - 1]?.part_no ||
                  results[results.length - 1]?.serial_number)
              }
              className="w-10 h-10 rounded-full bg-[#A22BDE] flex items-center justify-center text-white disabled:opacity-50 shadow-lg shadow-[#A22BDE]/30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {currentResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Question Prompt & Image */}
            <div className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              <div>
                <h3 className="text-slate-500 font-bold mb-2 uppercase tracking-wider text-sm">
                  Task {currentResult.part_no || currentResult.serial_number}
                </h3>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-relaxed mb-4">
                  {currentResult.question_text ||
                    currentResult.title ||
                    "Writing Task"}
                </h2>
                {currentResult.part_details && (
                  <div
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl mb-4 italic"
                    dangerouslySetInnerHTML={{
                      __html: currentResult.part_details,
                    }}
                  />
                )}
                {currentResult.prompt && (
                  <div
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: currentResult.prompt }}
                  />
                )}
              </div>

              {currentResult.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white p-2 shadow-sm">
                  <img
                    src={currentResult.image}
                    alt="Task Visualization"
                    className="w-full h-auto object-contain max-h-[350px]"
                  />
                </div>
              )}
            </div>

            {/* Middle Column: Scores, Student Answer & Model Answer */}
            <div className="lg:col-span-1 space-y-6 lg:border-l lg:border-r border-slate-200 dark:border-slate-800 lg:px-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-slate-800 dark:text-white">
                    {currentResult.score
                      ? currentResult.score.toFixed(1)
                      : "0.0"}{" "}
                    <span className="text-lg text-slate-400 font-medium">
                      / 9.0
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Raw Score
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#604CDF] dark:text-[#8673FF]">
                    {wordCount}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Word Count
                  </div>
                </div>
              </div>

              {/* Student Answer */}
              <div className="space-y-3">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm">
                  My Answer
                </h3>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
                  <p className="text-slate-700 dark:text-slate-300 font-medium text-sm leading-relaxed whitespace-pre-wrap">
                    {studentAnswerText || "No answer provided."}
                  </p>
                </div>
              </div>

              {/* Model Answer */}
              <div className="space-y-3">
                <span className="inline-block px-4 py-1.5 bg-[#604CDF] text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  Model Answer
                </span>
                <div className=" dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 min-h-[200px] max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div
                    className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed prose prose-sm dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html:
                        currentResult.model_answer ||
                        "No model answer available.",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: AI Feedback & Explanation */}
            <div className="lg:col-span-1 max-h-[calc(100vh-200px)] flex flex-col">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-black text-[#604CDF] dark:text-[#8673FF]">
                    AI Feedback
                  </h3>
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar min-h-[250px]">
                  {activeTab === "feedback" && (
                    <div className="space-y-4">
                      {currentResult.feedback ===
                        "Feedback is generated upon click." ||
                      !currentResult.feedback ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-4">
                          <p className="text-slate-500 text-sm text-center">
                            Feedback not generated yet.
                          </p>
                          <button
                            onClick={handleGenerateFeedback}
                            disabled={isFetchingFeedback}
                            className="px-6 py-2 bg-[#604CDF] text-white rounded-xl font-bold text-sm hover:bg-[#5E4FD7] transition-colors flex items-center gap-2"
                          >
                            {isFetchingFeedback && (
                              <Loader2 size={16} className="animate-spin" />
                            )}
                            Generate Feedback
                          </button>
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                          {currentResult.feedback}
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "explanation" && (
                    <div className="space-y-4">
                      {currentResult.explanation ===
                        "Explanation is generated upon click." ||
                      !currentResult.explanation ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-4">
                          <p className="text-slate-500 text-sm text-center">
                            Explanation not generated yet.
                          </p>
                          <button
                            onClick={handleGenerateExplanation}
                            disabled={isFetchingExplanation}
                            className="px-6 py-2 bg-[#604CDF] text-white rounded-xl font-bold text-sm hover:bg-[#5E4FD7] transition-colors flex items-center gap-2"
                          >
                            {isFetchingExplanation && (
                              <Loader2 size={16} className="animate-spin" />
                            )}
                            Generate Explanation
                          </button>
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                          {currentResult.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6 pt-0 space-y-3 mt-auto">
                  <button
                    onClick={() => setActiveTab("explanation")}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-colors border ${
                      activeTab === "explanation"
                        ? "bg-slate-100 dark:bg-slate-800 text-[#604CDF] dark:text-[#8673FF] border-slate-200 dark:border-slate-700"
                        : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#604CDF]"
                    }`}
                  >
                    Explanation
                  </button>
                  <button
                    onClick={() => setActiveTab("feedback")}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-colors border ${
                      activeTab === "feedback"
                        ? "bg-[#604CDF] text-white border-[#604CDF] shadow-lg shadow-[#604CDF]/20"
                        : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#604CDF]"
                    }`}
                  >
                    Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default WritingResultDetail;
