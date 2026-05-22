import React from 'react';

const MultipleChoiceGroup = ({ group, answers, onChange }) => {
  // All questions in the group share the same options.
  // We just take the options from the first question.
  const firstQuestion = group.questions?.[0];
  if (!firstQuestion) return null;

  const rawOptions = firstQuestion.options;
  const options = Array.isArray(rawOptions) 
    ? rawOptions 
    : typeof rawOptions === 'object' && rawOptions !== null
      ? Object.entries(rawOptions).map(([key, val]) => ({ key, val }))
      : [];

  const handleToggle = (optionValue, isSelected) => {
    if (isSelected) {
      // Find the serial number that has this option and clear it
      const q = group.questions.find(q => answers[q.serial_number] === optionValue);
      if (q) {
        onChange(q.serial_number, "");
      }
    } else {
      // Find the first available serial number that is empty
      const emptyQ = group.questions.find(q => !answers[q.serial_number]);
      if (emptyQ) {
        onChange(emptyQ.serial_number, optionValue);
      } else {
        // If all are filled, we just replace the last one to allow changing answers easily
        const lastQ = group.questions[group.questions.length - 1];
        onChange(lastQ.serial_number, optionValue);
      }
    }
  };

  return (
    <div className="space-y-4">
      {group.question_details && (
        <div className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div 
            className="text-slate-800 dark:text-slate-200 font-bold text-base mb-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: group.question_details }}
          />
        </div>
      )}
      
      <div className="p-5 lg:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        {group.instruction && (
          <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
            {group.instruction}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {options.map((opt, optIdx) => {
            const optionLabel = typeof opt === 'string' ? opt : opt.val;
            const optionValue = typeof opt === 'string' ? opt : opt.key;
            const isSelected = group.questions.some(q => answers[q.serial_number] === optionValue);

            return (
              <label
                key={optIdx}
                className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg shadow-indigo-100 dark:shadow-none"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-800"
                }`}
              >
                <div className="flex items-center h-6">
                   <input
                     type="checkbox"
                     checked={isSelected}
                     onChange={() => handleToggle(optionValue, isSelected)}
                     className="w-5 h-5 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 cursor-pointer transition-colors"
                   />
                </div>
                <span className={`text-sm font-semibold pt-0.5 ${isSelected ? "text-indigo-900 dark:text-indigo-100" : "text-slate-600 dark:text-slate-400"}`}>
                  {optionLabel}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceGroup;
