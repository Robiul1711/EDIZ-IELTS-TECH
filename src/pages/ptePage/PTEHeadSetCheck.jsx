import { ImageAssets } from "@/lib/ImageProvider";
import { File } from "lucide-react";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTEHeadSetCheck = () => {
  return (
    // Added responsive padding (px-4) and adjusted gap for smaller screens
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 dark:bg-slate-950">
      {/* Responsive text size: smaller on mobile, larger on desktop */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-6 md:mt-10 dark:text-white">
        PTE Headset Check Page
      </h1>

      {/* Set a max-width so the image doesn't overflow on small screens */}
      <img
        src={ImageAssets.headset}
        alt="Headset"
        className="w-full max-w-[300px] md:max-w-md h-auto object-contain"
      />

      <audio
        src={ImageAssets.audio}
        controls
        className="w-full max-w-md"
      ></audio>

      {/* Adjusted font size and spacing for mobile readability */}
      <ul className="list-decimal space-y-3 mt-4 text-base md:text-lg font-semibold max-w-2xl dark:text-slate-300">
        <li>Put on your headset and click the play button.</li>
        <li>You will hear a short recording.</li>
        <li>
          If you cannot hear the sound clearly, make sure to check your headset
          and see if they are working properly.
        </li>
        <li>If you can hear the sound, click the 'Next' button.</li>
      </ul>

      {/* - flex-col-reverse: Places "Next" above "Save" on mobile (primary action first) 
                - md:flex-row: Switches back to side-by-side on desktop
            */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-auto md:mt-0">
        <button className="bg-black dark:bg-slate-800 text-white w-full md:w-auto px-8 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2">
          <File size={20} /> Save & Exit
        </button>
        <Link to="/pte/microphone-check">
          <button className="bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>
      <p className="dark:text-slate-400">
        In the actual test, the play button will be deactivated. The audio
        recording will be played automatically.
      </p>
    </div>
  );
};

export default PTEHeadSetCheck;
