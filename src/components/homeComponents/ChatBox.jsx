import React from "react";
import { X, Edit2 } from "lucide-react";
import { ChatBot } from "../svg/AllSVG";

const ChatBox = ({ onClose }) => {
  return (
    <div className="w-[350px] md:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-purple-100 animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-purple-50/80 p-6 flex justify-between items-start h-[140px] relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#EAE6FF] to-transparent opacity-50"></div>
        <div className="bg-[#604CDF] p-2 rounded-full z-10 w-fit shadow-md">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <ChatBot />
          </div>
        </div>
        <div className="flex gap-2 z-10">
          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white relative">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#F3F4F6] p-4 rounded-3xl rounded-tr-sm max-w-[90%] text-gray-700 text-[15px] leading-relaxed font-medium shadow-sm">
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
          <span className="text-gray-500 text-sm font-medium animate-pulse">
            Thinking.......
          </span>
        </div>
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white">
        <div className="relative group">
          <textarea
            placeholder="Ask anything........"
            className="w-full h-[120px] bg-gradient-to-br from-[#F5F3FF] to-[#FDFDFF] rounded-[2rem] border border-purple-100 p-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 resize-none text-gray-700 placeholder-gray-400 text-base shadow-inner transition-all"
            disabled
          ></textarea>
          <button className="absolute bottom-5 right-5 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border border-purple-50">
            <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
