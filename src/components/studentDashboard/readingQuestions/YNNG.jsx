import React from 'react';

const YNNG = ({ question, index, onChange }) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-3">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-sm border border-violet-100 dark:border-violet-800">
          {index + 1}
        </span>
        <div className="flex-1 space-y-4">
          <p className="text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
            {question.text}
          </p>
          <div className="flex flex-wrap gap-4 px-2">
            {['YES', 'NO', 'NOT GIVEN'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={`ynng-${index}`}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded-full checked:border-violet-600 transition-all focus:ring-2 focus:ring-violet-500/20"
                    onChange={() => onChange(question.serial_number, option)}
                  />
                  <div className="absolute w-2.5 h-2.5 bg-violet-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors uppercase tracking-wider">
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

export default YNNG;
