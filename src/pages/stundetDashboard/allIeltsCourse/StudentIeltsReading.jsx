import React from "react";
import { Search, ChevronLeft, PlayCircle, Lock } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";

const StudentIeltsReading = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "academic";

  const { data: allIeltsReadingTests, isLoading } = useApiQuery({
    queryKey: ["all-ielts-reading-tests", type],
    url: "/ielts/reading/all-tests",
    params: { type },
    secure: true,
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#604CDF]"></div>
      </div>
    );
  }

  // Flatten the nested structure for easier mapping if needed, 
  // but we can map directly from the response.
  const books = allIeltsReadingTests?.data || [];

  return (
    <div className="w-full space-y-6">
      {/* Top Navigation & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search test title and press enter"
            className="w-full pl-4 pr-10 py-2.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-[#604CDF]/20 focus:border-[#604CDF] transition-all"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            size={18}
          />
        </div>
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
                  <h2 className="text-xl font-bold leading-tight">Reading</h2>
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
                    <div className="bg-[#604CDF] p-5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />
                       <span className="bg-white/20 text-white text-sm md:text-base font-bold px-5 py-2 rounded-full backdrop-blur-md relative z-10 border border-white/20">
                        {test.test_name}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 ">
                      {test.parts.map((part, partIdx) => (
                        <div
                          key={partIdx}
                          className="flex items-start gap-4 group/item cursor-pointer hover:bg-Primary/10 hover:text-Primary transition-colors p-2 rounded-xl"
                        >
                          {/* {console.log(part)} */}
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
                            <Link 
                              to={`/reading-test/${test.test_no}/part/${part.part_no}?book=${book.book_no}&type=${type}`}
                            >
                              <p
                                className={`text-sm md:text-base  font-bold leading-snug break-words ${
                                  test.status === "locked"
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
                            </Link>
                          </div>
                        </div>
                      ))}
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

export default StudentIeltsReading;
