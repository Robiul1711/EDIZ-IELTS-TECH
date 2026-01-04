import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import { Link } from "react-router-dom";

const IELTSCategory = [
  {
    id: 1,
    name: "Reading",
    image: ImageAssets.R,
    link: "/student-dashboard/ielts/reading",
    bg: "#B6A4FF", // Matches the light purple
    color: "#6144D8",
  },
  {
    id: 2,
    name: "Listening",
    image: ImageAssets.L,
    link: "/student-dashboard/ielts/listening",
    bg: "#FFCB74", // Matches the soft orange
    color: "#D88E2B",
  },
  {
    id: 3,
    name: "Speaking & Writing",
    image: [ImageAssets.S, ImageAssets.W], // Array for combined icons
    link: "/student-dashboard/ielts/speaking-writing",
    bg: "#D7F26F", // Matches the lime green
    color: "#6D8A00",
  },
];

const ChooseExamListPTE = () => {
  return (
    <div className="py-6  space-y-6">
      
      {/* Full Test Banner */}
      <Link to="/ielts/full-test" className="group block w-full">
        <div className="p-8 md:p-10 rounded-3xl bg-[#E2E2E2] hover:bg-[#DADADA] transition-all duration-300 flex items-center justify-between relative overflow-hidden shadow-sm">
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#334156]">
              Full Test
            </h1>
          </div>
          {/* Icons container for banner */}
          <div className="max-w-60 md:max-w-xs flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <img
              src={ImageAssets.Full}
              alt="IELTS Full Test"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </Link>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {IELTSCategory.map((category) => (
          <Link
            to={category.link}
            key={category.id}
            className="group relative block h-full"
          >
            <div
              className="p-8 h-full min-h-[180px] rounded-[2.5rem] flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ backgroundColor: category.bg }}
            >
              <div className="flex flex-col justify-center max-w-[50%]">
                <h2
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h2>
              </div>

              {/* Icon Container */}
              <div className="relative h-28 w-32 md:h-36 md:w-40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                {Array.isArray(category.image) ? (
                  /* Combined Icons for Speaking & Writing */
                  <div className="flex items-center gap-1">
                    <img 
                      src={category.image[1]} 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" 
                      alt="Writing"
                    />
                    <img 
                      src={category.image[0]} 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md -ml-4" 
                      alt="Speaking"
                    />
                  </div>
                ) : (
                  /* Single Icon for Reading/Listening */
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseExamListPTE;