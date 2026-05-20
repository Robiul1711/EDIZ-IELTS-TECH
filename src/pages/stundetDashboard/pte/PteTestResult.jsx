import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Trophy,
  Target,
  Clock,
  ChevronLeft,
  ChevronRight,
  BarChart,
  CheckCircle2,
  XCircle,
  FileText,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  ArrowRight,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

const PteTestResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [showSummary, setShowSummary] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeAiTab, setActiveAiTab] = useState(null);

  useEffect(() => {
    setActiveAiTab(null);
  }, [currentQuestionIndex]);

  const { data: resultData, isLoading: isLoadingResult, isError: isErrorResult } = useQuery({
    queryKey: ["pte-result", attemptId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/pte/test/attempt/${attemptId}/result`);
      return response.data.data;
    },
    enabled: !!attemptId,
  });

  const { data: summaryData, isLoading: isLoadingSummary } = useQuery({
    queryKey: ["pte-summary", attemptId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/pte/test/attempt/${attemptId}/summary`);
      return response.data.data;
    },
    enabled: showSummary && !!attemptId,
  });

  if (isLoadingResult) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorResult || !resultData) {
    return (
      <div className="p-10 text-center bg-gray-50 dark:bg-slate-950 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm max-w-md w-full">
          <XCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Failed to Load</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium">Could not fetch test results. Please try again later.</p>
          <button
            onClick={() => navigate("/dashboard/pte")}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const renderSectionIcon = (taskType) => {
    if (taskType.includes("reading") || taskType.includes("fill_in_the_blanks") || taskType.includes("re_order")) return <BookOpen className="text-blue-500" />;
    if (taskType.includes("listening") || taskType.includes("spoken") || taskType.includes("dictation")) return <Headphones className="text-purple-500" />;
    if (taskType.includes("speaking") || taskType.includes("aloud") || taskType.includes("retell") || taskType.includes("describe")) return <Mic className="text-green-500" />;
    if (taskType.includes("writing") || taskType.includes("essay") || taskType.includes("summarize_written")) return <PenTool className="text-amber-500" />;
    return <FileText className="text-gray-500" />;
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    if (percentage >= 50) return "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
    return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-poppins pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8370FF] to-[#6C5CE7] dark:from-slate-900 dark:to-slate-900/80 pt-8 pb-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button
              onClick={() => navigate("/dashboard/pte")}
              className="flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors"
            >
              <ChevronLeft size={20} /> Back to Dashboard
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
              Test Results
            </h1>
            <p className="text-indigo-100 dark:text-slate-400 font-medium text-lg flex items-center gap-2">
              <span className="opacity-75">Test Title:</span> <span className="font-bold">{resultData.test_title}</span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] text-center min-w-[200px]">
            <p className="text-white/80 font-black uppercase tracking-widest text-xs mb-2">Overall Score</p>
            <div className="text-5xl font-black text-white flex items-center justify-center gap-2">
              <Trophy size={40} className="text-yellow-400" />
              {resultData.overall_score}
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 md:px-8 -mt-20 relative z-20 space-y-8">

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Reading", score: resultData.reading_score, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Listening", score: resultData.listening_score, icon: Headphones, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { label: "Speaking", score: resultData.speaking_score, icon: Mic, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Writing", score: resultData.writing_score, icon: PenTool, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-md">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-gray-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">{item.label}</h3>
              <p className={`text-2xl font-black ${item.color}`}>{item.score}</p>
            </div>
          ))}
        </div>

        {/* View Summary Toggle */}
        <div className="flex justify-center my-8">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-md border-2 ${showSummary
                ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:border-slate-200'
                : 'bg-white text-slate-800 border-gray-200 hover:border-primary hover:text-primary dark:bg-slate-900 dark:text-white dark:border-slate-700'
              }`}
          >
            {showSummary ? 'Hide Detailed Summary' : 'View Detailed Summary'}
            {showSummary ? <BarChart size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>

        {/* Summary Content */}
        {showSummary && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isLoadingSummary ? (
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-primary w-10 h-10" />
              </div>
            ) : summaryData ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3 px-2">
                  <BarChart className="text-primary" /> Question Breakdown
                </h2>


                {/* Current Question */}
                {(() => {
                  const q = summaryData.questions[currentQuestionIndex];
                  if (!q) return null;

                  return (
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
                      <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-slate-700">
                            {renderSectionIcon(q.task_type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                              {q.title || q.task_type.replace(/_/g, ' ')}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                              {q.task_type.replace(/_/g, ' ')}
                            </p>
                          </div>
                        </div>
                        <div className={`px-6 py-2 rounded-xl border font-black text-lg ${getScoreColor(q.score, q.max_score)}`}>
                          {q.score} / {q.max_score} Pts
                        </div>
                      </div>

                      <div className="p-6 md:p-8 space-y-6">
                        {/* Context Section */}
                        {q.content?.text && (
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                            <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-base md:text-lg" dangerouslySetInnerHTML={{ __html: q.content.text }}></p>
                          </div>
                        )}

                        {/* Three Column Layout for Answers and Feedback */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                          {/* My Answer */}
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold text-slate-800 dark:text-white mb-6">My Answer</h4>
                            {(() => {
                              const getWordAtIndex = (val, contentText) => {
                                if (contentText && typeof contentText === 'string') {
                                  const cleanText = contentText.replace(/<[^>]*>/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                                  const words = cleanText.split(/\s+/).filter(Boolean);
                                  const idx = parseInt(val, 10);
                                  if (!isNaN(idx) && words[idx] !== undefined) {
                                    return `"${words[idx]}" (Index ${idx})`;
                                  }
                                }
                                return `Index ${val}`;
                              };

                              const getOptionText = (val, options) => {
                                if (options && Array.isArray(options)) {
                                  const idx = parseInt(val, 10);
                                  if (!isNaN(idx) && options[idx] !== undefined) {
                                    return options[idx];
                                  }
                                }
                                return val;
                              };

                              const studentAnswer = q.student_answer !== undefined ? q.student_answer : (q.details?.student_answer || q.details?.user_answer || q.details?.answers || q.user_answer || q.submitted_answer);
                              const correctAnswer = q.correct_answer !== undefined ? q.correct_answer : (q.details?.correct_answer || q.details?.answer_key);

                              if (studentAnswer === undefined || studentAnswer === null || (Array.isArray(studentAnswer) && studentAnswer.length === 0) || (typeof studentAnswer === 'object' && Object.keys(studentAnswer).length === 0)) {
                                return <p className="text-gray-400 text-sm italic">No answer data provided.</p>;
                              }

                              if (Array.isArray(studentAnswer)) {
                                return (
                                  <div className="space-y-3">
                                    {studentAnswer.map((val, idx) => {
                                      let isCorrect = false;
                                      if (Array.isArray(correctAnswer)) {
                                        isCorrect = correctAnswer.some(cVal => {
                                          if (typeof cVal === 'object' && cVal !== null) {
                                            return String(cVal.index) === String(val) || String(cVal.word).toLowerCase().trim() === String(val).toLowerCase().trim();
                                          }
                                          return String(cVal).toLowerCase().trim() === String(val).toLowerCase().trim();
                                        });
                                      } else if (correctAnswer !== undefined && correctAnswer !== null) {
                                        isCorrect = String(correctAnswer).toLowerCase().trim() === String(val).toLowerCase().trim();
                                      }

                                      let displayText = "";
                                      if (q.task_type === 'highlight_incorrect_words') {
                                        displayText = getWordAtIndex(val, q.content?.text);
                                      } else if (q.content?.options) {
                                        displayText = getOptionText(val, q.content.options);
                                      } else {
                                        displayText = String(val);
                                      }

                                      return (
                                        <div key={idx} className="flex items-center gap-3 text-sm md:text-base bg-gray-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800">
                                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isCorrect ? "bg-green-500" : "bg-red-500"}`} />
                                          <span className={`font-semibold capitalize ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                                            {displayText}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              if (typeof studentAnswer === 'object' && studentAnswer !== null) {
                                return (
                                  <div className="space-y-3">
                                    {Object.entries(studentAnswer).map(([key, val]) => {
                                      const compVal = typeof correctAnswer === 'object' && correctAnswer !== null ? correctAnswer[key] : correctAnswer;
                                      const isCorrect = val && compVal && String(val).toLowerCase().trim() === String(compVal).toLowerCase().trim();
                                      return (
                                        <div key={key} className="flex flex-col gap-1 text-sm md:text-base bg-gray-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800">
                                          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Blank {key}</span>
                                          <span className={`${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"} font-semibold`}>
                                            {String(val) || 'Blank'}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              return (
                                <div className="bg-gray-50 dark:bg-slate-800/40 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                                  <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {String(studentAnswer)}
                                  </p>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Answer Key */}
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                            <div className="inline-block bg-[#6C5CE7] text-white px-5 py-1.5 rounded-full text-sm font-bold mb-6">
                              Answer Key
                            </div>
                            {(() => {
                              const getWordAtIndex = (val, contentText) => {
                                if (contentText && typeof contentText === 'string') {
                                  const cleanText = contentText.replace(/<[^>]*>/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                                  const words = cleanText.split(/\s+/).filter(Boolean);
                                  const idx = parseInt(val, 10);
                                  if (!isNaN(idx) && words[idx] !== undefined) {
                                    return `"${words[idx]}" (Index ${idx})`;
                                  }
                                }
                                return `Index ${val}`;
                              };

                              const getOptionText = (val, options) => {
                                if (options && Array.isArray(options)) {
                                  const idx = parseInt(val, 10);
                                  if (!isNaN(idx) && options[idx] !== undefined) {
                                    return options[idx];
                                  }
                                }
                                return val;
                              };

                              const correctAnswer = q.correct_answer !== undefined ? q.correct_answer : (q.details?.correct_answer || q.details?.answer_key);

                              if (correctAnswer === undefined || correctAnswer === null || (Array.isArray(correctAnswer) && correctAnswer.length === 0) || (typeof correctAnswer === 'object' && Object.keys(correctAnswer).length === 0)) {
                                return <p className="text-gray-400 text-sm italic">No correct answer data provided.</p>;
                              }

                              if (Array.isArray(correctAnswer)) {
                                return (
                                  <div className="space-y-3">
                                    {correctAnswer.map((val, idx) => {
                                      let displayText = "";
                                      if (typeof val === 'object' && val !== null) {
                                        displayText = `${val.word} (Index ${val.index})`;
                                      } else if (q.task_type === 'highlight_incorrect_words') {
                                        displayText = getWordAtIndex(val, q.content?.text);
                                      } else if (q.content?.options) {
                                        displayText = getOptionText(val, q.content.options);
                                      } else {
                                        displayText = String(val);
                                      }

                                      return (
                                        <div key={idx} className="flex items-center gap-3 text-sm md:text-base bg-green-50/50 dark:bg-green-950/20 p-2.5 rounded-xl border border-green-100/50 dark:border-green-900/30">
                                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                                          <span className="text-green-600 dark:text-green-400 font-semibold">
                                            {displayText}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              if (typeof correctAnswer === 'object' && correctAnswer !== null) {
                                return (
                                  <div className="space-y-3">
                                    {Object.entries(correctAnswer).map(([key, val]) => (
                                      <div key={key} className="flex flex-col gap-1 text-sm md:text-base bg-green-50/50 dark:bg-green-950/20 p-2.5 rounded-xl border border-green-100/50 dark:border-green-900/30">
                                        <span className="text-green-500/80 text-xs font-bold uppercase tracking-wider">Blank {key}</span>
                                        <span className="text-green-600 dark:text-green-400 font-semibold">
                                          {String(val)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }

                              return (
                                <div className="bg-green-50/50 dark:bg-green-950/20 p-4 rounded-xl border border-green-100/50 dark:border-green-900/30">
                                  <p className="text-green-600 dark:text-green-400 text-sm leading-relaxed font-medium">
                                    {String(correctAnswer)}
                                  </p>
                                </div>
                              );
                            })()}
                          </div>

                          {/* AI Feedback */}
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-[#6C5CE7] text-lg">
                                {activeAiTab === "explanation" ? "AI Explanation" : "AI Feedback"}
                              </h4>
                              {activeAiTab && (
                                <span className="bg-[#6C5CE7]/10 text-[#6C5CE7] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                  {activeAiTab}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col gap-4 flex-1 justify-between">
                              {activeAiTab ? (
                                <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 flex-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <p className="text-gray-700 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                                    {activeAiTab === "feedback"
                                      ? (q.details?.feedback || "No feedback available for this question.")
                                      : (q.details?.explanation || "No explanation available for this question.")
                                    }
                                  </p>
                                </div>
                              ) : (
                                <div className="bg-gray-50/50 dark:bg-slate-800/20 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 text-center flex-1 flex flex-col items-center justify-center text-gray-400 min-h-[150px]">
                                  <p className="text-xs font-semibold uppercase tracking-wider leading-relaxed">Select Feedback or Explanation below to view details</p>
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex flex-col gap-2 mt-auto">
                                <button
                                  onClick={() => setActiveAiTab(prev => prev === "explanation" ? null : "explanation")}
                                  className={`w-full py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                                    activeAiTab === "explanation"
                                      ? 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#6C5CE7]'
                                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/20'
                                  }`}
                                >
                                  Explanation
                                </button>
                                <button
                                  onClick={() => setActiveAiTab(prev => prev === "feedback" ? null : "feedback")}
                                  className={`w-full py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                                    activeAiTab === "feedback"
                                      ? 'border-[#6C5CE7] bg-[#6C5CE7]/10 text-[#6C5CE7]'
                                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/20'
                                  }`}
                                >
                                  Feedback
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Pagination Controls */}
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-bold text-slate-700 dark:text-slate-300"
                    >
                      <ChevronLeft size={18} /> Previous
                    </button>
                    <span className="font-bold text-slate-500 dark:text-slate-400">
                      Question {currentQuestionIndex + 1} of {summaryData.questions.length}
                    </span>
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(summaryData.questions.length - 1, prev + 1))}
                      disabled={currentQuestionIndex === summaryData.questions.length - 1}
                      className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-bold text-slate-700 dark:text-slate-300"
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Tab View */}
                  <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100 dark:border-slate-800">
                    {summaryData.questions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentQuestionIndex === idx
                          ? 'bg-primary text-primary-foreground shadow-md scale-110'
                          : 'bg-white text-slate-500 border border-gray-200 hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">Could not load summary data.</p>
              </div>
            )}
          </div>
        )}

        {/* Regular Feedback View (When Summary is hidden) */}
        {!showSummary && resultData.questions_summary && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white px-2 mt-8">Performance Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resultData.questions_summary.map((q, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-slate-700">
                        {renderSectionIcon(q.task_type)}
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-200 capitalize">
                        {q.task_type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-black border ${getScoreColor(q.score, q.max_score)}`}>
                      {q.score}/{q.max_score}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-slate-950 p-5 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                      {q.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PteTestResult;
