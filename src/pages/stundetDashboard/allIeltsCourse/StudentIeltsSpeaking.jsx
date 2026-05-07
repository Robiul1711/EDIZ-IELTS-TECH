import React from "react";
import { Search, ChevronLeft, PlayCircle, Lock, Mic } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import { useAuth } from "@/hooks/useAuth";

import { useApiMutation } from "@/hooks/apiMutation";

const StudentIeltsSpeaking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "academic";

  const {
    data: allIeltsSpeakingTests,
    isLoading,
    refetch,
  } = useApiQuery({
    queryKey: ["all-ielts-speaking-tests", type],
    url: "/ielts/speaking/all-tests",
    params: { type },
    secure: true,
  });

  const { mutate: resetTest } = useApiMutation({
    url: "/ielts/speaking/reset",
    method: "DELETE",
    secure: true,
    onSuccess: () => {
      refetch();
    },
  });

  const handleReset = (book_no, test_no) => {
    if (
      window.confirm(
        "Are you sure you want to re-attempt? This will clear your previous progress.",
      )
    ) {
      const formData = new FormData();
      formData.append("book_no", book_no);
      formData.append("test_no", test_no);
      formData.append("type", type);
      resetTest(formData);
    }
  };

  if (isLoading) {
    // ... existing isLoading code ...
    return (
      <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#604CDF]"></div>
      </div>
    );
  }

  const books = allIeltsSpeakingTests?.data || [];

  return (
    <div className="w-full space-y-6">
      {/* Top Navigation & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate(user ? "/dashboard/ielts" : "/ielts")}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {books.map((book) => (
        <React.Fragment key={book.book_no}>
          {book.types.map((typeGroup, typeIdx) => (
            <div key={`${book.book_no}-${typeIdx}`} className="space-y-8">
              {/* Section Header */}
              <div className="inline-flex items-center gap-4 bg-[#3E4555] text-white pr-8 py-2 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 flex items-center justify-center bg-[#5E4FD7] rounded-xl ml-2 text-xl font-bold">
                  {book.book_no}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold leading-tight">
                      Speaking
                    </h2>
                    <Mic size={18} className="text-white/50" />
                  </div>
                  <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold flex items-center gap-2">
                    {typeGroup.type}
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    Cambridge Official
                  </p>
                </div>
              </div>

              {/* Test Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2   gap-6 md:gap-8">
                {typeGroup.tests.map((test, testIdx) => (
                  <div
                    key={`${book.book_no}-${testIdx}`}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group"
                  >
                    {/* Card Header */}
                    <div className="bg-[#604CDF] p-5 relative overflow-hidden flex items-center justify-between">
                      <div className="relative z-10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />
                        <span className="bg-white/20 text-white text-sm md:text-base font-bold px-5 py-2 rounded-full backdrop-blur-md border border-white/20">
                          {test.test_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 relative z-10">
                        {test?.is_submit ? (
                          <>
                            <Link
                              to={`/dashboard/speaking-result/${test.test_no}?book=${book.book_no}&type=${type}`}
                              className="text-white font-bold text-xs px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 cursor-pointer"
                            >
                              View Results
                            </Link>
                            <button
                              onClick={() =>
                                handleReset(book.book_no, test.test_no)
                              }
                              className="text-white font-bold text-xs px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-200 transition-all duration-300 cursor-pointer"
                            >
                              Re-Attempt
                            </button>
                          </>
                        ) : (
                          <>
                            {user && (
                              <Link
                                to={`/speaking-test/${test.test_no}/part/1?book=${book.book_no}&type=${type}`}
                                className="px-3 py-1 text-xs md:px-4 md:py-1.5 rounded-full text-white font-semibold bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300"
                              >
                                Start All Test
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 relative">
                      <div
                        className={`${!user ? "blur-[1px] select-none" : ""}`}
                      >
                        {test.parts.map((part, partIdx) => (
                          <div
                            key={partIdx}
                            className="w-full flex items-start justify-between"
                          >
                            <div className="flex items-start gap-4  p-2 rounded-xl flex-1">
                              <div className="mt-1">
                                {part?.is_lock ? (
                                  <div className="w-6 h-6 flex items-center justify-center bg-red-50 text-red-500 rounded-lg border border-red-100">
                                    <Lock size={14} />
                                  </div>
                                ) : (
                                  <PlayCircle
                                    className="text-[#604CDF] group-hover/item:scale-125 transition-all duration-300"
                                    size={22}
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <div>
                                  <p
                                    className={`text-sm md:text-base font-bold leading-snug break-words ${
                                      part?.is_lock
                                        ? "text-slate-400 dark:text-slate-500"
                                        : "text-slate-700 dark:text-slate-200 group-hover/item:text-[#604CDF] transition-colors"
                                    }`}
                                  >
                                    {part.title || `Part ${part.part_no}`}
                                  </p>

                                  {part.total_complete && (
                                    <div className="flex items-center gap-1.5 mt-1.5 group/complete">
                                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 capitalize">
                                        Completed :{" "}
                                        <span className="font-mono">
                                          {part.total_complete}
                                        </span>
                                      </p>
                                    </div>
                                  )}
                                  {!part.total_complete && (
                                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                                      Not started
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4 self-center">
                              {test.is_submit ? (
                                <div className="text-white font-bold text-[10px] px-3 py-1.5 rounded-lg bg-slate-700/80 backdrop-blur-sm shadow-sm cursor-help">
                                  Already Submitted
                                </div>
                              ) : (
                                <Link
                                  to={`/speaking-test/${test.test_no}/part/${part.part_no}?book=${book.book_no}&type=${type}`}
                                  className="text-white font-bold text-[10px] px-4 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
                                >
                                  Start Part
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {!user && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 ">
                          <div className="bg-white/70 dark:bg-slate-800/80 rounded-3xl p-5 flex flex-col items-center gap-3 ">
                            <div className="w-10 h-10 bg-[#604CDF]/10 rounded-full flex items-center justify-center text-[#604CDF]">
                              <Lock size={20} />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-slate-800 dark:text-white">
                                Start Your Test
                              </p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                                Authentication Required
                              </p>
                            </div>
                            <Link
                              to="/auth"
                              className="mt-1 px-6 py-2 bg-[#604CDF] text-white text-xs font-bold rounded-full hover:bg-[#5E4FD7] transition-all shadow-lg shadow-[#604CDF]/30"
                            >
                              Sign In to Start
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StudentIeltsSpeaking;
