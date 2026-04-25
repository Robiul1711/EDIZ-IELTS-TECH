import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const ExamDashboard = () => {
  const exams = [
    {
      id: "#1",
      title: "IELTS speaking test",
      date: "22th November 2025, 4:20 PM",
      duration: "1 hr",
      type: "active"
    },
    {
      id: "#1",
      title: "IELTS speaking test",
      date: "22th November 2025, 4:20 PM",
      duration: "1 hr",
      type: "previous"
    }
  ];

  return (
   
      <div className=" space-y-10">
        
        {/* Active Exam Section */}
        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-4">Active Exam</h2>
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#1A1A1A] rounded-sm shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-16">
              <span className="text-gray-400 font-medium">#1</span>
              <span className="text-[#333] dark:text-white font-medium min-w-[180px]">IELTS speaking test</span>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-white">
                <Calendar size={18} className="text-gray-500 dark:text-white" />
                <span className="text-sm">22th November 2025, 4:20 PM</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-white">
                <Clock size={18} className="text-gray-500 dark:text-white" />
                <span className="text-sm">1 hr</span>
              </div>
            </div>

            <button className="bg-[#635BFF] hover:bg-[#5249E0] text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-md">
              Join Exam
            </button>
          </div>
        </section>

        {/* Previous Exam Section */}
        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-4">Previous Exam</h2>
          <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#1A1A1A] rounded-sm shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-16">
              <span className="text-gray-400 font-medium">#1</span>
              <span className="text-[#333] dark:text-white font-medium min-w-[180px]">IELTS speaking test</span>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-white">
                <Calendar size={18} className="text-gray-500 dark:text-white" />
                <span className="text-sm">22th November 2025, 4:20 PM</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-white">
                <Clock size={18} className="text-gray-500 dark:text-white" />
                <span className="text-sm">1 hr</span>
              </div>
            </div>

            <button className="bg-[#0F172A] hover:bg-black text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-md">
              See Results
            </button>
          </div>
        </section>

      </div>
   
  );
};

export default ExamDashboard;