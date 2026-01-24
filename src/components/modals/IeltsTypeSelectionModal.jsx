import React from "react";
import { X, GraduationCap, Briefcase } from "lucide-react";

const IeltsTypeSelectionModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 transform transition-all scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Select Module
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose the IELTS module you want to practice
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelect("academic")}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Academic
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500/80">
                For university admission
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelect("general")}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                General Training
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-500/80">
                For work or migration
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IeltsTypeSelectionModal;
