import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StudentPteCourse = () => {
  const axiosSecure = useAxiosSecure();

  const { data: testSets = [], isLoading: loading } = useQuery({
    queryKey: ["pte-test-sets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/pte/all-test-sets?type=full");
      return response.data.data || [];
    }
  });

  // Find the full test (mock test) for the banner
  const fullTest = testSets.find((test) => test.category === "mock_test");
  
  // Other tests for the grid
  const otherTests = testSets.filter((test) => test.category !== "mock_test");

  // Helper to get styling based on category
  const getCategoryStyle = (category) => {
    switch (category) {
      case "reading":
        return {
          bg: "#B6A4FF",
          color: "#6144D8",
          image: ImageAssets.R,
        };
      case "listening":
        return {
          bg: "#FFCB74",
          color: "#D88E2B",
          image: ImageAssets.L,
        };
      case "speaking_writing":
        return {
          bg: "#D7F26F",
          color: "#6D8A00",
          image: [ImageAssets.S, ImageAssets.W],
        };
      default:
        return {
          bg: "#E2E8F0",
          color: "#475569",
          image: ImageAssets.Full,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Full Test Banner */}
      {fullTest && (
        <Link to={`/dashboard/pte/test-set/${fullTest.id}`} className="group block w-full">
          <div className="p-6 xxs:p-8 md:p-10 rounded lg:rounded-2xl bg-white dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-md border border-transparent dark:border-slate-800">
            <div className="z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[#334156] dark:text-white">
                {fullTest.title}
              </h1>
            </div>
            {/* Icons container for banner */}
            <div className="max-w-60 md:max-w-xs flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
              <img
                src={ImageAssets.Full}
                alt={fullTest.title}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </Link>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {otherTests.map((test) => {
          const style = getCategoryStyle(test.category);
          return (
            <Link
              to={`/dashboard/pte/test-set/${test.id}`}
              key={test.id}
              className="group relative block h-full"
            >
              <div
                className="p-8 h-full min-h-[180px] rounded-[2.5rem] flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: style.bg }}
              >
                <div className="flex flex-col justify-center max-w-[50%]">
                  <h2
                    className="text-3xl md:text-4xl font-bold leading-tight"
                    style={{ color: style.color }}
                  >
                    {test.title}
                  </h2>
                </div>

                {/* Icon Container */}
                <div className="relative h-28 w-32 md:h-36 md:w-40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                  {Array.isArray(style.image) ? (
                    /* Combined Icons for Speaking & Writing */
                    <div className="flex items-center gap-1">
                      <img
                        src={style.image[1]}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md"
                        alt="Writing"
                      />
                      <img
                        src={style.image[0]}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md -ml-4"
                        alt="Speaking"
                      />
                    </div>
                  ) : (
                    /* Single Icon for Reading/Listening */
                    <img
                      src={style.image}
                      alt={test.title}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StudentPteCourse;
