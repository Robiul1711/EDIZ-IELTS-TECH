import React from 'react';

const Matching = ({ group, answers, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Group Header */}
      <div className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div 
          className="text-slate-800 dark:text-slate-200 font-bold text-base mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: group.question_details }}
        />
        <div 
          className="text-slate-500 dark:text-slate-400 text-xs font-medium prose-sm prose-slate dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: group.instruction }}
        />
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {group.questions?.map((q) => {
          const options = Array.isArray(q.options) 
            ? q.options 
            : typeof q.options === 'object' && q.options !== null
              ? Object.entries(q.options).map(([key, val]) => ({ key, val }))
              : [];

          return (
            <div 
              key={q.serial_number}
              className="p-4 lg:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800/50"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[40px]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-100 dark:border-indigo-800/50">
                    {q.serial_number}
                  </span>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed mb-3 md:mb-0">
                    {q.text || "Match the correct option"}
                  </p>
                </div>

                <div className="w-full md:w-64">
                   <select 
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    onChange={(e) => onChange(q.serial_number, e.target.value)}
                    value={answers[q.serial_number] || ""}
                  >
                    <option value="">Select option...</option>
                    {options.map((opt, i) => {
                      const label = typeof opt === 'string' ? opt : opt.val;
                      const value = typeof opt === 'string' ? opt : opt.key;
                      return <option key={i} value={value}>{label}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matching;
