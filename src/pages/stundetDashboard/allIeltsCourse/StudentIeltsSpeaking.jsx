import React from 'react';
import { Search, ChevronLeft, PlayCircle, Lock, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentIeltsSpeaking = () => {
  const navigate = useNavigate();

  // Data structure matching the patterns in image_a61104.png and image_a61c28.png
  const speakingData = [
    {
      version: 20,
      status: "active",
      tests: [
        { id: "s20-t1", label: "Test 1", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s20-t2", label: "Test 2", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s20-t3", label: "Test 3", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s20-t4", label: "Test 4", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
      ]
    },
    {
      version: 19,
      status: "locked",
      tests: [
        { id: "s19-t1", label: "Test 1", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s19-t2", label: "Test 2", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s19-t3", label: "Test 3", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
        { id: "s19-t4", label: "Test 4", parts: ["Part 1 - Introduction", "Part 2 - Cue Card", "Part 3 - Discussion"] },
      ]
    }
  ];

  return (
    <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Header Section [Matches image_a61104.png] */}
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
            className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#604CDF]/20 focus:border-[#604CDF] transition-all shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </div>

      {speakingData.map((group) => (
        <div key={group.version} className="space-y-6">
          {/* Version Header [Matches image_a61c28.png style] */}
          <div className="inline-flex items-center gap-4 bg-[#3E4555] text-white pr-10 py-2.5 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-[#5E4FD7] rounded-xl ml-2 text-xl font-bold shadow-inner">
              {group.version}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold leading-tight tracking-tight">Speaking</h2>
                <Mic size={18} className="text-white/50" />
              </div>
              <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-medium">Academic</p>
            </div>
          </div>

          {/* Grid for Speaking Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.tests.map((test) => (
              <div 
                key={test.id} 
                className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 
                  ${group.status === 'active' ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : 'opacity-80'}`}
              >
                {/* Colored Header Pill */}
                <div className="bg-[#8B7EFF] p-4">
                  <span className="bg-white/20 text-white text-[13px] font-semibold px-5 py-1.5 rounded-full backdrop-blur-md inline-block">
                    {test.label}
                  </span>
                </div>

                {/* Parts List [Matches image_a671a8.png structure] */}
                <div className="p-6 space-y-5">
                  {test.parts.map((part, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="mt-0.5">
                        {group.status === 'locked' ? (
                          <div className="w-5 h-5 flex items-center justify-center bg-red-50 text-red-400 rounded-full">
                            <Lock size={12} strokeWidth={3} />
                          </div>
                        ) : (
                          <PlayCircle 
                            className="text-[#604CDF] group-hover:scale-110 transition-transform duration-200" 
                            size={20} 
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <div>
                        <p className={`text-[13px] font-semibold leading-tight ${group.status === 'locked' ? 'text-slate-400' : 'text-slate-700'}`}>
                          {part}
                        </p>
                        <p className="text-[11px] italic text-slate-400 mt-1 font-medium">
                          {group.status === 'locked' ? 'Locked' : 'Not started'}
                        </p>
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

export default StudentIeltsSpeaking;