import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Monitor, PieChart, Calendar, Trash2 } from "lucide-react";
import AssignHomeworkModal from "./AssignHomeworkModal";
import HomeWorkResultModal from "../../../components/modals/HomeWorkResultModal";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { useQueryClient } from "@tanstack/react-query";

const HomeworkCard = ({ data, onView, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
      {/* Title and Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
          {data.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
           Ongoing
          </span>
        </div>
      </div>

      {/* Meta Info with Icons */}
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs flex-wrap">
        {data.book_no ? (
          <>
            <div className="flex items-center gap-1.5">
              <BookOpen
                size={14}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <span>{data.book_no}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor size={14} className="text-green-500" />
              <span>{data.test_no}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PieChart size={14} className="text-slate-500 dark:text-slate-400" />
              <span>{data.part_no}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <Monitor size={14} className="text-indigo-600 dark:text-indigo-400" />
              <span>{data.pte_test_title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-green-500" />
              <span>{data.batch}</span>
            </div>
          </>
        )}
      </div>

      {/* Numerical Details */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          HW time:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.time}</b>
        </span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span>
          Score:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.score || "N/A"}</b>
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          Due: <b className="text-slate-700 dark:text-slate-200">{data.due_date}</b>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => onView(data)}
          className="flex-1 py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors flex items-center justify-center"
        >
          View
        </button>
        <button
          onClick={() => onDelete(data.id)}
          className="px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 font-semibold transition-colors flex items-center justify-center dark:bg-red-500/10 dark:hover:bg-red-500/20"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const HomeWork = () => {
   const queryClient = useQueryClient();
   const { data: teachersHomeworksData, isLoading: teachersHomeworksLoading} = useApiQuery({
    queryKey: ["teachersHomeworks"],
    url: "/instructor/homework",
    secure: true,
  });
  
   const { data: pteTeachersHomeworksData, isLoading: pteTeachersHomeworksLoading} = useApiQuery({
    queryKey: ["pteTeachersHomeworks"],
    url: "/instructor/pte-homework",
    secure: true,
  });

    console.log(pteTeachersHomeworksData?.data)
  
  const { mutate: deleteHomework } = useApiMutation({
    url: (id) => `/instructor/homework/${id}`,
    method: "DELETE",
    secure: true,
    successMessage: "Homework deleted successfully.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachersHomeworks"] });
    }
  });

  const { mutate: deletePteHomework } = useApiMutation({
    url: (id) => `/instructor/pte-homework/${id}`,
    method: "DELETE",
    secure: true,
    successMessage: "PTE Homework deleted successfully.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pteTeachersHomeworks"] });
    }
  });

  const [activeTab, setActiveTab] = useState("ielts"); // Tab state

  const [isModalOpen, setIsModalOpen] = useState(false); // Assign Modal state
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // View Modal state
  const [selectedHw, setSelectedHw] = useState(null);

  const handleAssign = (newHw) => {
    // Left for compatibility
  };

  const handleView = (hw) => {
    setSelectedHw(hw);
    setIsResultModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this homework?")) {
      if (activeTab === "ielts") {
        deleteHomework(id);
      } else {
        deletePteHomework(id);
      }
    }
  };

  return (
    <div className="min-h-screen ">
    

      {/* Tabs */}
      <div className="flex flex-wrap  sm:justify-between items-center gap-4 mb-6 border-b border-gray-100 dark:border-slate-800">
  <div className="flex">
        <button
          onClick={() => setActiveTab("ielts")}
          className={`px-6 py-3 font-bold text-sm sm:text-base transition-colors border-b-2 ${
            activeTab === "ielts"
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          IELTS
        </button>
        <button
          onClick={() => setActiveTab("pte")}
          className={`px-6 py-3 font-bold text-sm sm:text-base transition-colors border-b-2 ${
            activeTab === "pte"
              ? "text-indigo-600 border-indigo-600"
              : "text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          PTE
        </button>

  </div>
              {/* Top Banner: Assign Homework */}
      <div className="  mb-2">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="w-full sm:p-3 p-2 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-3 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8  rounded-md bg-indigo-600 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <Plus size={18} strokeWidth={3} />
          </div>
          <div className="text-left">
            <h2 className="font-semibold text-slate-800 dark:text-white sm:text-base text-sm">
              Assign Homework
            </h2>
          </div>
        </button>
      </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 space-y-12 shadow-sm">
        {/* Active Homework Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold">
            Active homework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {(activeTab === "ielts" ? teachersHomeworksLoading : pteTeachersHomeworksLoading) ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-4 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                  <div className="flex gap-3 mt-auto">
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex-1"></div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-14"></div>
                  </div>
                </div>
              ))
            ) : (
              (activeTab === "ielts" ? teachersHomeworksData?.data?.ongoing : pteTeachersHomeworksData?.data?.ongoing)?.map((hw) => (
                <HomeworkCard 
                  key={hw.id} 
                  data={hw} 
                  onView={handleView} 
                  onDelete={handleDelete} 
                />
              ))
            )}
          </div>
        </section>

      </div>
      {/* Assign Homework Modal */}
      <AssignHomeworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={handleAssign}
      />

      {/* View Homework Details Modal */}
      <HomeWorkResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        data={selectedHw}
      />
    </div>
  );
};

export default HomeWork;
