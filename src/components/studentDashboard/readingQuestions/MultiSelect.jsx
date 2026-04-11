import React from 'react';

const MultiSelect = ({ question, index, onChange, currentValue }) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-3">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm border border-emerald-100 dark:border-emerald-800">
          {index + 1}
        </span>
        <div className="flex-1 space-y-4">
          <p className="text-[15px] text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            {question.text}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {(Array.isArray(question.options) 
              ? question.options 
              : typeof question.options === 'object' && question.options !== null
                ? Object.values(question.options) 
                : []
            ).map((option, optIdx) => (
              <label key={optIdx} className="flex items-center p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                <input
                  type="checkbox"
                  checked={Array.isArray(currentValue) && currentValue.includes(option)}
                  className="w-4.5 h-4.5 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  onChange={(e) => onChange(question.serial_number, option, e.target.checked)}
                />
                <span className="ml-3 text-[14px] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
