import React from 'react';

const MCQ = ({ group, answers, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Group Header */}
      {
        group.question_details && (
          
      <div className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div 
          className="text-slate-800 dark:text-slate-200 font-bold text-base mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: group.question_details }}
        />
        {/* <div 
          className="text-slate-500 dark:text-slate-400 text-xs font-medium prose-sm prose-slate dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: group.instruction }}
        /> */}
      </div>
        )
      }

      {/* Questions List */}
      <div className="space-y-4">
        {group.questions?.map((q) => {
          const options = Array.isArray(q.options) 
            ? q.options 
            : typeof q.options === 'object' && q.options !== null
              ? Object.entries(q.options).map(([key, val]) => ({ key, val }))
              : [];

          return (
            <div 
              key={q.serial_number}
              className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-100 dark:border-indigo-800/50">
                  {q.serial_number}
                </span>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {q.text}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((opt, optIdx) => {
                  const optionLabel = typeof opt === 'string' ? opt : opt.val;
                  const optionValue = typeof opt === 'string' ? opt : opt.key;
                  const isSelected = answers[q.serial_number] === optionValue;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => onChange(q.serial_number, optionValue)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg shadow-indigo-100 dark:shadow-none"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-800"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? "text-indigo-900 dark:text-indigo-100" : "text-slate-600 dark:text-slate-400"}`}>
                        {optionLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MCQ;
