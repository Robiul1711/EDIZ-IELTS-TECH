import React from 'react';
import { Search, ChevronLeft, PlayCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentIeltsReading = () => {
  const navigate = useNavigate();

  const testData = [
    {
      id: 1,
      version: 20,
      title: "Reading",
      type: "Academic",
      tests: [
        { id: "T1", label: "Test 1", status: "partial", completed: "4/13" },
        { id: "T2", label: "Test 2", status: "partial", completed: "4/13" },
        { id: "T3", label: "Test 3", status: "partial", completed: "4/13" },
        { id: "T4", label: "Test 4", status: "partial", completed: "4/13" },
      ]
    },
    {
      id: 2,
      version: 19,
      title: "Reading",
      type: "Academic",
      tests: [
        { id: "T1-L", label: "Test 1", status: "locked" },
        { id: "T2-L", label: "Test 2", status: "locked" },
        { id: "T3-L", label: "Test 3", status: "locked" },
        { id: "T4-L", label: "Test 4", status: "locked" },
      ]
    }
  ];

  const sections = [
    { id: 1, name: "Part 1 - Identifying Mat..." },
    { id: 2, name: "Part 2 - Short Answers" },
    { id: 3, name: "Part 3 - Short Answers..." },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Top Navigation & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-colors"
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

      {testData.map((group) => (
        <div key={group.id} className="space-y-6">
          {/* Section Header */}
          <div className="inline-flex items-center gap-4 bg-[#3E4555] text-white pr-8 py-2 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-[#5E4FD7] rounded-xl ml-2 text-xl font-bold">
              {group.version}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">{group.title}</h2>
              <p className="text-xs text-slate-300 uppercase tracking-widest">{group.type}</p>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.tests.map((test) => (
              <div key={test.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                {/* Card Header */}
                <div className="bg-[#8B7EFF] p-4">
                  <span className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
                    {test.label}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-start gap-3 group cursor-pointer">
                      <div className="mt-0.5">
                        {test.status === 'locked' ? (
                          <div className="w-5 h-5 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                            <Lock size={12} />
                          </div>
                        ) : (
                          <PlayCircle className="text-[#604CDF] group-hover:scale-110 transition-transform" size={20} />
                        )}
                      </div>
                      <div>
                        <p className={`text-[13px] font-medium leading-tight ${test.status === 'locked' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {section.name}
                        </p>
                        {test.completed && section.id === 1 && (
                          <p className="text-[11px] italic text-red-400 mt-1 font-medium">
                            Completed : {test.completed}
                          </p>
                        )}
                        {!test.completed && (
                          <p className="text-[11px] italic text-slate-400 mt-1">
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

export default StudentIeltsReading;