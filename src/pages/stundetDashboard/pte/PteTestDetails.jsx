import React from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const PteTestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["pte-test-start", id],
    queryFn: async () => {
      const response = await axiosSecure.post(`/pte/test/start?test_id=${id}`);
      return response.data.data;
    },
    enabled: !!id
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Failed to load test details.</p>
        <Link to="/dashboard/pte" className="text-primary hover:underline mt-4 block">
          Back to PTE Course
        </Link>
      </div>
    );
  }

  const { structure, attempt } = data;

  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 pb-10 font-poppins px-4">
      {/* Header Area */}
      <div className="text-center mt-6 md:mt-12 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white uppercase">
          Test Structure
        </h1>

        <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
            <p>Please review the test structure before proceeding.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
            <p>Click the "Next" button when you're ready to start.</p>
          </div>
        </div>
      </div>

      {/* Syllabus Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <div className="min-w-[600px] border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
                  <th className="py-4 px-6 font-bold text-sm md:text-lg border-r border-gray-200 dark:border-slate-700 w-1/4 dark:text-slate-200 uppercase tracking-wider text-center">
                    Section
                  </th>
                  <th className="py-4 px-6 font-bold text-sm md:text-lg border-r border-gray-200 dark:border-slate-700 w-2/4 dark:text-slate-200 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="py-4 px-6 font-bold text-sm md:text-lg w-1/4 dark:text-slate-200 uppercase tracking-wider text-center">
                    Time Allowed
                  </th>
                </tr>
              </thead>
              <tbody>
                {structure.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    {section.content.map((item, cIdx) => (
                      <tr 
                        key={`${sIdx}-${cIdx}`} 
                        className="border-b border-gray-200 dark:border-slate-700 last:border-b-0"
                      >
                        {cIdx === 0 && (
                          <td
                            className="py-6 px-6 font-bold text-slate-700 dark:text-slate-300 border-r border-gray-200 dark:border-slate-700 align-middle bg-slate-50/30 dark:bg-slate-800/20 text-center"
                            rowSpan={section.content.length}
                          >
                            {section.section_name}
                          </td>
                        )}
                        <td className="py-4 px-6 border-r border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 font-medium transition-colors">
                          {item.name}
                        </td>
                        {cIdx === 0 && (
                          <td
                            className="py-6 px-6 align-middle text-center dark:text-slate-400 font-bold"
                            rowSpan={section.content.length}
                          >
                            {section.total_time || "As per section"}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-6">
        <Link to="/dashboard/pte" className="w-full md:w-auto">
          <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
            <File size={20} /> Back
          </button>
        </Link>

        <Link
          to={`/dashboard/pte/test-attempt/${attempt.id}`}
          className="w-full md:w-auto"
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg shadow-indigo-200 dark:shadow-none rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-95 active:scale-95 group">
            Next{" "}
            <MdDoubleArrow
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PteTestDetails;
