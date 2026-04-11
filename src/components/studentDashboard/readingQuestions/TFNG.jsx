import React from 'react';

const TFNG = ({ group, answers, onChange }) => {
  // Extract options from the first question in the group, fallback to T/F/NG
  const options = group.questions?.[0]?.options || ['TRUE', 'FALSE', 'NOT GIVEN'];

  return (
    <div className="space-y-4">
      {/* Group Header */}
      <div className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div 
          className="text-slate-800 dark:text-slate-200 font-bold text-base mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: group.question_details }}
        />
        <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">
          Select <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">{options[0]}</span>, <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">{options[1]}</span>, or <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">{options[2] || 'NOT GIVEN'}</span> for each statement.
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {group.questions?.map((q) => (
          <div 
            key={q.serial_number}
            className="group/q p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800/50 shadow-sm transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-100 dark:border-indigo-800/50">
                    {q.serial_number}
                  </span>
                  <p className="text-base lg:text-lg text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col lg:flex-row gap-3">
                {options.map((option) => {
                  const isSelected = answers[q.serial_number] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => onChange(q.serial_number, option)}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none scale-105"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TFNG;
