import React, { useState } from "react";
import { X, Clock, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

const AssignHomeworkModal = ({ isOpen, onClose }) => {
  // 1. Track which exam is selected
  const [examType, setExamType] = useState("IELTS");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 text-center relative border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Assign Homework</h2>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Homework Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Homework title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Writing Task 1 - Map Description"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Exam Type Selector */}
          <div className="flex items-center gap-6 py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="exam" 
                value="IELTS"
                checked={examType === "IELTS"}
                onChange={(e) => setExamType(e.target.value)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600" 
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">IELTS</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="exam" 
                value="PTE"
                checked={examType === "PTE"}
                onChange={(e) => setExamType(e.target.value)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600" 
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">PTE</span>
            </label>
          </div>

          {/* Conditional Rendering: Only show Format if IELTS */}
          {examType === "IELTS" && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Choose exam format <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Academic</option>
                  <option>General Training</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
          )}

          {/* Skill & Book Grid */}
          <div className={`grid ${examType === "IELTS" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Skill <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                <option>Writing</option>
                <option>Reading</option>
                <option>Listening</option>
                <option>Speaking</option>
              </select>
            </div>
            
            {/* Conditional Rendering: Only show Book if IELTS */}
            {examType === "IELTS" && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose Book <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                  <option>Book 20</option>
                </select>
              </div>
            )}
          </div>

          {/* Conditional Rendering: Only show Test & Part if IELTS */}
          {examType === "IELTS" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose Test <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                  <option>Test-1</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose Part <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                  <option>2</option>
                </select>
              </div>
            </div>
          )}

          <div className="py-2 text-center">
             <span className="text-slate-500 font-bold text-sm">Assignment Details</span>
          </div>

          {/* Details Grid (Always visible for both) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Homework time <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="text" defaultValue="40 min" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none" />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Score <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                <option>9</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Due date <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="text" defaultValue="12 Jan 2026" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none" />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expected Submissions <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none">
                <option>24</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm sm:text-base rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={onClose}
              className="flex-1 py-3 text-sm sm:text-base rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg transition-all"
            >
              Assign Homework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignHomeworkModal;