import React from "react";
import { FaCrown, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImageAssets } from "@/lib/ImageProvider";

const VideosSection = () => {
  const videos = [
    {
      id: 1,
      title: "IELTS Speaking Test Video Series",
      thumbnail: ImageAssets.speaking,
    },
    {
      id: 2,
      title: "IELTS Listening - 25 Top Tips",
      thumbnail: ImageAssets.listening,
    },
    {
      id: 3,
      title: "IELTS 2026 - 6.0 to 9.0",
      thumbnail: ImageAssets.reading,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#121214] rounded-[32px] p-6 md:p-10 shadow-sm border border-zinc-100 dark:border-zinc-800/50  transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 group">
            <FaCrown className="text-amber-500 text-sm group-hover:scale-110 transition-transform" />
            <Link
              to="#"
              className="text-[#5B4BC4] dark:text-indigo-400 text-[13px] font-semibold hover:underline decoration-2 underline-offset-4"
            >
              (Upgrade to premium)
            </Link>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            Watch IELTS/PTE Related videos
          </h2>
        </div>
        <Link
          to="#"
          className="text-[#5B4BC4] dark:text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4 transition-all"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Thumbnail */}
            <div className="aspect-video relative overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/30 transition-colors duration-300 flex items-center justify-center">
                {/* Play Button */}
                <div className="w-16 h-12 md:w-20 md:h-14 bg-white/90 dark:bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-xl">
                  <FaPlay className="text-[#5B4BC4] text-xl md:text-2xl ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosSection;
