import React, { useState } from "react";
import { X, Clock, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useApiMutation } from "@/hooks/apiMutation";
import { useQueryClient } from "@tanstack/react-query";

const AssignHomeworkModal = ({ isOpen, onClose }) => {
  const [examType, setExamType] = useState("ielts");
  const [formData, setFormData] = useState({
    title: "",
    examFormat: "Academic",
    skill: "reading",
    book_no: "20",
    test_no: "1",
    part_no: "1",
    time: "40",
    score: "9",
    due_date: "",
    total: "24",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useApiMutation({
    url: "/instructor/homework",
    method: "POST",
    secure: true,
    invalidateKeys: ["teachersHomeworks"],
    onSuccess: () => {
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      title: formData.title || `${examType.toUpperCase()} ${formData.skill} Task`,
      skill: formData.skill,
      test_type: examType,
      book_no: formData.book_no,
      test_no: formData.test_no,
      part_no: formData.part_no,
      due_date: formData.due_date,
      time: formData.time,
    };

    mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 text-center relative border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Assign Homework
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[85vh] overflow-y-auto"
        >
          {/* Homework Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Homework title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., IELTS Reading Test 7"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Exam Type Selector */}
          <div className="flex items-center gap-6 py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="exam"
                value="ielts"
                checked={examType === "ielts"}
                onChange={(e) => setExamType(e.target.value)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                IELTS
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="exam"
                value="pte"
                checked={examType === "pte"}
                onChange={(e) => setExamType(e.target.value)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                PTE
              </span>
            </label>
          </div>

          {/* Conditional Rendering: Only show Format if IELTS */}
          {examType === "ielts" && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Choose exam format <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="examFormat"
                  value={formData.examFormat}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                >
                  <option value="Academic">Academic</option>
                  <option value="General Training">General Training</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          )}

          {/* Skill & Book Grid */}
          <div
            className={`grid ${examType === "ielts" ? "grid-cols-2" : "grid-cols-1"} gap-4`}
          >
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Skill <span className="text-red-500">*</span>
              </label>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700  outline-none  dark:bg-slate-900"
              >
                <option value="writing">Writing</option>
                <option value="reading">Reading</option>
                <option value="listening">Listening</option>
                <option value="speaking">Speaking</option>
              </select>
            </div>

            {/* Conditional Rendering: Only show Book if IELTS */}
            {examType === "ielts" && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Choose Book <span className="text-red-500">*</span>
                </label>
                <select
                  name="book_no"
                  value={formData.book_no}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none dark:text-white dark:bg-slate-900"
                >
                  <option value="20">Book 20</option>
                  <option value="19">Book 19</option>
                  <option value="18">Book 18</option>
                  <option value="17">Book 17</option>
                  <option value="16">Book 16</option>
                  <option value="15">Book 15</option>
                </select>
              </div>
            )}
          </div>

          {/* Conditional Rendering: Only show Test & Part if IELTS */}
          {examType === "ielts" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Choose Test <span className="text-red-500">*</span>
                </label>
                <select
                  name="test_no"
                  value={formData.test_no}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none dark:text-white dark:bg-slate-900"
                >
                  <option value="1">Test-1</option>
                  <option value="2">Test-2</option>
                  <option value="3">Test-3</option>
                  <option value="4">Test-4</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Choose Part <span className="text-red-500">*</span>
                </label>
                <select
                  name="part_no"
                  value={formData.part_no}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none dark:text-white dark:bg-slate-900"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          )}

          <div className="py-2 text-center">
            <span className="text-slate-500 font-bold text-sm">
              Assignment Details
            </span>
          </div>

          {/* Details Grid (Always visible for both) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Homework time (minutes) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none"
                />
                <Clock
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Due date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent outline-none dark:[color-scheme:dark]"
                />
              </div>
            </div>

          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-3 text-sm sm:text-base rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 text-sm sm:text-base rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {isPending ? "Assigning..." : "Assign Homework"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignHomeworkModal;
