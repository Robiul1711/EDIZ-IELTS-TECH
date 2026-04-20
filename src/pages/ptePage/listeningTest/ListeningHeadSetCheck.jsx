import { ImageAssets } from "@/lib/ImageProvider";
import { File } from "lucide-react";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningHeadSetCheck = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 dark:bg-slate-950 transition-colors duration-300">
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-6 md:mt-12 text-slate-900 dark:text-white">
        Headset Check
      </h1>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 flex items-center justify-center max-w-sm md:max-w-md w-full">
        <img
          src={ImageAssets.headset}
          alt="Headset"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>

      <audio
        src={ImageAssets.audio}
        controls
        className="w-full max-w-md h-12 rounded-full shadow-md"
      ></audio>

      <ul className="list-decimal space-y-4 mt-4 text-sm md:text-base lg:text-lg font-medium max-w-2xl px-6 text-slate-700 dark:text-slate-300">
        <li>Put on your headset and click the play button.</li>
        <li>You will hear a short recording.</li>
        <li>
          If you cannot hear the sound clearly, check your connection or try
          another headset.
        </li>
        <li>
          If you can hear the sound clearly, click the <strong>Next</strong>{" "}
          button.
        </li>
      </ul>

      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-auto md:mt-6 px-4">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95">
          <File size={20} /> Save & Exit
        </button>
        <Link to="/pte/listening/microphone-check" className="w-full md:w-auto">
          <button className="bg-[#A22BDE] hover:bg-[#8e24c5] text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>
      <p className="text-center text-xs md:text-sm font-medium opacity-60 dark:text-slate-400 max-w-md px-4 mt-2">
        Note: In the actual test, audio starts automatically and controls are
        disabled.
      </p>
    </div>
  );
};

export default ListeningHeadSetCheck;
