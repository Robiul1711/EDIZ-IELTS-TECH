import { ImageAssets } from "@/lib/ImageProvider";
import { File } from "lucide-react";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTEKeyboardCheck = () => {
  return (
    // Added responsive padding (px-4) and adjusted gap for smaller screens
    <div className="flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 dark:bg-slate-950">
      {/* Responsive text size: smaller on mobile, larger on desktop */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-6 md:mt-10 dark:text-white">
        Keyboard Check
      </h1>

      {/* Set a max-width so the image doesn't overflow on small screens */}
      <img
        src={ImageAssets.keyboard}
        alt="Headset"
        className="w-full max-w-[300px] md:max-w-md h-auto object-contain"
      />

      {/* Adjusted font size and spacing for mobile readability */}
      <ul className="list-decimal space-y-3 mt-4 text-base md:text-lg max-w-2xl dark:text-slate-300">
        <li>Look at the top row of letters on your keyboard.</li>
        <li>The letters should appear in this order: QWERTY</li>
      </ul>

      {/* - flex-col-reverse: Places "Next" above "Save" on mobile (primary action first) 
                - md:flex-row: Switches back to side-by-side on desktop
            */}
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-auto md:mt-0">
        <button className="bg-black dark:bg-slate-800 text-white w-full md:w-auto px-8 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2">
          <File size={20} /> Save & Exit
        </button>
        <Link to="/pte/syllubus">
          <button className="bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-lg font-semibold flex items-center justify-center gap-2">
            Next <MdDoubleArrow />
          </button>
        </Link>
      </div>
      <p className="dark:text-slate-400">
        In the actual test, you will use a QWERTY keyboard.
      </p>
    </div>
  );
};

export default PTEKeyboardCheck;
