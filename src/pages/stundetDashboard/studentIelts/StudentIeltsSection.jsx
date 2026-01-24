import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IeltsTypeSelectionModal from "@/components/modals/IeltsTypeSelectionModal";
import { ImageAssets } from "@/lib/ImageProvider";

const IELTSCategory = [
  {
    id: 1,
    name: "Reading",
    title: "",
    image: ImageAssets.R,
    link: "/student-dashboard/ielts/reading",
    bg: "#B6A4FF",
    color: "#6144D8",
  },
  {
    id: 2,
    name: "Speaking",
    // title: "(Academic + General)",
    image: ImageAssets.S,
    link: "/student-dashboard/ielts/speaking",
    bg: "#FFCB74",
    color: "#D88E2B",
  },
  {
    id: 3,
    name: "Writing",
    title: "",
    image: ImageAssets.W,
    link: "/student-dashboard/ielts/writing",
    bg: "#D7F26F",
    color: "#8BC34A",
  },
  {
    id: 4,
    name: "Listening",
    // title: "(Academic + General)",
    image: ImageAssets.L,
    link: "/student-dashboard/ielts/listening",
    bg: "#C6F7FC",
    color: "#41C4D3",
  },
];

const StudentIeltsSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingLink, setPendingLink] = useState("");

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setPendingLink(link);
    setIsModalOpen(true);
  };

  const handleSelectType = (type) => {
    setIsModalOpen(false);
    if (pendingLink) {
      navigate(`${pendingLink}?type=${type}`);
    }
  };

  return (
    <div className=" md:py-12  w-full">
      <IeltsTypeSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectType}
      />
      {/* Full Test Banner */}
      <div
        onClick={(e) => handleLinkClick(e, "/reading")}
        className="group block w-full cursor-pointer"
      >
        <div className="p-6 xxs:p-8  rounded lg:rounded-2xl bg-white dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-md border border-transparent dark:border-slate-800">
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#334156] dark:text-white transition-colors">
              Full Test
            </h1>
            <p className="text-gray-500 mt-2 font-medium dark:text-white">
              Take a complete mock exam
            </p>
          </div>
          {/* Image Container with constraints */}
          <div className="max-w-80 flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
            <img
              src={ImageAssets.Full}
              alt="IELTS Full Test"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {IELTSCategory.map((category) => (
          <div
            key={category.id}
            onClick={(e) => handleLinkClick(e, category.link)}
            className="group relative block cursor-pointer"
          >
            <div
              className="p-6 md:p-10 h-full rounded lg:rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: category.bg }}
            >
              <div className="flex flex-col justify-center">
                <h2
                  className="text-3xl md:text-4xl font-bold transition-colors"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h2>
                {category.title && (
                  <p
                    className="text-sm md:text-base font-semibold mt-1 opacity-80"
                    style={{ color: category.color }}
                  >
                    {category.title}
                  </p>
                )}
              </div>

              <div className="h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                <img
                  src={category.image}
                  alt={`${category.name} category`}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentIeltsSection;
