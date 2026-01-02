import React from 'react';
import { Search, ChevronLeft, PlayCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentIeltsWriting = () => {
  const navigate = useNavigate();

  // Data updated with "status" to handle locking logic
  const writingData = [
    {
      version: 20,
      status: "unlocked",
      tests: [
        { id: "v20-t1", label: "Test 1", tasks: ["Progress Diagram", "Combination Chart"] },
        { id: "v20-t2", label: "Test 2", tasks: ["Map", "Table"] },
        { id: "v20-t3", label: "Test 3", tasks: ["Map", "Table"] },
        { id: "v20-t4", label: "Test 4", tasks: ["Map", "Table"] },
      ]
    },
    {
      version: 19,
      status: "locked", // This version will show lock icons
      tests: [
        { id: "v19-t1", label: "Test 1", tasks: ["Progress Diagram", "Map"] },
        { id: "v19-t2", label: "Test 2", tasks: ["Line Graph", "Bar Chart"] },
        { id: "v19-t3", label: "Test 3", tasks: ["Map", "Table"] },
        { id: "v19-t4", label: "Test 4", tasks: ["Map", "Table"] },
      ]
    },
    {
      version: 18,
      status: "locked",
      tests: [
        { id: "v18-t1", label: "Test 1", tasks: ["Progress Diagram", "Map"] },
        { id: "v18-t2", label: "Test 2", tasks: ["Line Graph", "Bar Chart"] },
        { id: "v18-t3", label: "Test 3", tasks: ["Map", "Table"] },
        { id: "v18-t4", label: "Test 4", tasks: ["Map", "Table"] },
      ]
    }
  ];

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search test title and press enter" 
            className="w-full pl-4 pr-10 py-2.5 bg-white/80 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#604CDF]/20 focus:border-[#604CDF] transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      {writingData.map((group) => (
        <div key={group.version} className="space-y-6">
          {/* Version Header Indicator */}
          <div className="inline-flex items-center gap-4 bg-[#3E4555] text-white pr-10 py-2.5 rounded-2xl shadow-md">
            <div className="w-12 h-12 flex items-center justify-center bg-[#5E4FD7] rounded-xl ml-2 text-xl font-bold shadow-inner">
              {group.version}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight tracking-tight">Writing</h2>
              <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-medium">Academic</p>
            </div>
          </div>

          {/* Grid for Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.tests.map((test) => (
              <div 
                key={test.id} 
                className={`bg-white rounded-[1.8rem] overflow-hidden border border-slate-50 transition-all duration-300 ${
                  group.status === "unlocked" 
                    ? "shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer" 
                    : "shadow-none opacity-100"
                }`}
              >
                {/* Header Label Area - Changes color if locked */}
                <div className={`${group.status === "unlocked" ? "bg-[#8B7EFF]" : "bg-[#8B7EFF]/80"} p-4 transition-colors`}>
                  <span className="bg-white/20 text-white text-[13px] font-semibold px-5 py-1.5 rounded-full backdrop-blur-md inline-block">
                    {test.label}
                  </span>
                </div>

                {/* Card Task List */}
                <div className="p-5 min-h-[120px]">
                  <div className="space-y-4">
                    {test.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        {group.status === "unlocked" ? (
                          <>
                            <PlayCircle 
                              className="text-[#604CDF] group-hover:scale-110 transition-transform duration-200" 
                              size={20} 
                              strokeWidth={2.5}
                            />
                            <span className="text-[14px] font-medium text-slate-600 group-hover:text-[#604CDF] transition-colors">
                              {task}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="p-1 bg-red-50 rounded-full">
                              <Lock className="text-red-400" size={14} strokeWidth={2.5} />
                            </div>
                            <span className="text-[14px] font-medium text-slate-400 italic">
                              {task} (Locked)
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentIeltsWriting;