import React from "react";
import { X, Edit2 } from "lucide-react";
import { ChatBot } from "../svg/AllSVG";

const ChatBox = ({ onClose }) => {
  return (
    <div className="w-[calc(100vw-px)] sm:w-[350px] md:w-[400px] h-[450px] sm:h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-purple-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-purple-50/80 dark:bg-gray-800 p-4 flex justify-between items-start h-[70px] relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#EAE6FF] to-transparent opacity-50"></div>
        <div className="bg-[#604CDF] p-2 rounded-full z-10 w-fit shadow-md">
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <ChatBot className="w-6 h-6" />
          </div>
        </div>
        <div className="flex gap-2 z-10">
          <button className="text-gray-500 dark:text-slate-400 dark:hover:text-slate-200 hover:text-gray-700 cursor-pointer">
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-slate-400 dark:hover:text-slate-200 hover:text-gray-700 cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-white dark:bg-slate-900 relative">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#F3F4F6] dark:bg-slate-800 p-4 rounded-3xl rounded-tr-sm max-w-[90%] text-gray-700 dark:text-slate-200 text-[15px] leading-relaxed font-medium shadow-sm">
            Hi! I want to create a website. Can you guide me on the best way to
            create a site, recommend a hosting plan, and explain what the
            difference between IELTS and PTE is
          </div>
        </div>

        {/* Bot Thinking */}
        <div className="flex items-center gap-3">
          <div className="bg-[#604CDF] p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-sm shrink-0">
            <div className="scale-75 text-white">
              <ChatBot />
            </div>
          </div>
          <span className="text-gray-500 dark:text-slate-400 text-sm font-medium animate-pulse">
            Thinking.......
          </span>
        </div>
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white dark:bg-slate-900">
        <div className="relative group">
          <textarea
            placeholder="Ask anything........"
            className="w-full h-[120px] bg-gradient-to-br from-[#F5F3FF] to-[#FDFDFF] dark:from-slate-800 dark:to-slate-900 rounded-[2rem] border border-purple-100 dark:border-slate-700 p-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-slate-700 focus:border-purple-300 dark:focus:border-slate-600 resize-none text-gray-700 dark:text-slate-200 placeholder-gray-400 text-base shadow-inner transition-all"
         
          ></textarea>
          <button className="absolute bottom-5 right-5 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border border-purple-50 dark:border-slate-700">
            <div className="w-5 h-5 border-2 border-purple-200 dark:border-slate-700 border-t-purple-600 dark:border-t-purple-500 rounded-full animate-spin"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
