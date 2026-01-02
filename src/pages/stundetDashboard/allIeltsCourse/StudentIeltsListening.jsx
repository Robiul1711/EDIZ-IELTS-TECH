import React from 'react';
import { Search, ChevronLeft, PlayCircle, Lock, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentIeltsListening = () => {
  const navigate = useNavigate();

  // Data structured to match the visual patterns of previous modules
  const listeningData = [
    {
      version: 20,
      status: "unlocked",
      tests: [
        { id: "l20-t1", label: "Test 1", completed: "4/40" },
        { id: "l20-t2", label: "Test 2", completed: null },
        { id: "l20-t3", label: "Test 3", completed: null },
        { id: "l20-t4", label: "Test 4", completed: null },
      ]
    },
    {
      version: 19,
      status: "locked", // Matches the locked UI pattern in image_a61104.png
      tests: [
        { id: "l19-t1", label: "Test 1", completed: null },
        { id: "l19-t2", label: "Test 2", completed: null },
        { id: "l19-t3", label: "Test 3", completed: null },
        { id: "l19-t4", label: "Test 4", completed: null },
      ]
    }
  ];

  const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-500">
      {/* Top Navigation & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search test title and press enter" 
            className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#604CDF]/20 focus:border-[#604CDF] transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      {listeningData.map((group) => (
        <div key={group.version} className="space-y-6">
          {/* Version Header */}
          <div className="inline-flex items-center gap-4 bg-[#3E4555] text-white pr-10 py-2.5 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-[#5E4FD7] rounded-xl ml-2 text-xl font-bold">
              {group.version}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold leading-tight">Listening</h2>
                <Headphones size={18} className="text-white/40" />
              </div>
              <p className="text-[10px] text-slate-300 uppercase tracking-widest">Academic</p>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.tests.map((test) => (
              <div 
                key={test.id} 
                className={`bg-white rounded-[2rem] overflow-hidden border border-slate-50 transition-all duration-300 ${
                  group.status === "unlocked" 
                    ? "shadow-sm hover:shadow-xl hover:-translate-y-1" 
                    : "opacity-75"
                }`}
              >
                {/* Header Label */}
                <div className={`${group.status === "unlocked" ? "bg-[#8B7EFF]" : "bg-[#8B7EFF]/80"} p-4`}>
                  <span className="bg-white/20 text-white text-[13px] font-semibold px-5 py-1.5 rounded-full backdrop-blur-md">
                    {test.label}
                  </span>
                </div>

                {/* Section List */}
                <div className="p-6 space-y-5">
                  {sections.map((section, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="mt-0.5">
                        {group.status === "locked" ? (
                          <div className="w-5 h-5 flex items-center justify-center bg-red-50 text-red-400 rounded-full">
                            <Lock size={12} strokeWidth={3} />
                          </div>
                        ) : (
                          <PlayCircle 
                            className="text-[#604CDF] group-hover:scale-110 transition-transform" 
                            size={20} 
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <div>
                        <p className={`text-[13px] font-bold ${group.status === "locked" ? "text-slate-400" : "text-slate-700"}`}>
                          {section}
                        </p>
                        {test.completed && index === 0 ? (
                          <p className="text-[11px] italic text-red-400 mt-0.5 font-medium">
                            Completed : {test.completed}
                          </p>
                        ) : (
                          <p className="text-[11px] italic text-slate-400 mt-0.5">
                            Not started
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentIeltsListening;