import { ImageAssets } from "@/lib/ImageProvider";
import { ChevronRight } from "lucide-react"; // Optional: efficient icon
import React from "react";
import { Link } from "react-router-dom";

const IELTSCategory = [
  {
    id: 1,
    name: "Reading",
    title: "",
    image: ImageAssets.R,
    link: "/ielts",
    bg: "#B6A4FF",
    color: "#6144D8",
  },
  {
    id: 2,
    name: "Speaking",
    title: "(Academic + General)",
    image: ImageAssets.S,
    link: "/speaking",
    bg: "#FFCB74",
    color: "#D88E2B",
  },
  {
    id: 3,
    name: "Writing",
    title: "",
    image: ImageAssets.W,
    link: "/writing",
    bg: "#D7F26F",
    color: "#8BC34A",
  },
  {
    id: 4,
    name: "Listening",
    title: "(Academic + General)",
    image: ImageAssets.L,
    link: "/listening",
    bg: "#C6F7FC",
    color: "#41C4D3",
  },
];

const IELTSPage = () => {
  return (
    <div className="section-padding-x py-12  w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
        <Link to="/" className="hover:text-Primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-Primary font-bold">IELTS</span>
      </nav>

      {/* Full Test Banner */}
      <Link to="/ielts/full-test" className="group block w-full">
        <div className="p-10 rounded lg:rounded-2xl  bg-[#E2E2E2] hover:bg-gray-200 transition-all duration-300 flex items-center justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-md">
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#334156] transition-colors">
              Full Test
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
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
      </Link>

      {/* Categories Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {IELTSCategory.map((category) => (
          <Link
            to={category.link}
            key={category.id}
            className="group relative block"
          >
            <div
              className="p-10 h-full rounded lg:rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IELTSPage;
