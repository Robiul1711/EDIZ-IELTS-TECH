import React from 'react';

const FillGap = ({ group, answers, onChange }) => {
  const hasBlanksInInstruction = group.instruction && (group.instruction.includes('[blank]') || group.instruction.includes('____'));

  const renderWithBlanks = () => {
    let html = group.instruction;
    
    // First, find all serial numbers in the group to map them
    const serialNumbers = group.questions?.map(q => q.serial_number) || [];
    
    // Replace "n[blank]" with a placeholder that we can identify
    // We use a temporary string to avoid double-processing
    serialNumbers.forEach(sn => {
      const regex = new RegExp(`${sn}\\[blank\\]`, 'g');
      html = html.replace(regex, `<span class="fill-gap-placeholder" data-serial="${sn}"></span>`);
    });

    // Also handle plain [blank] if any are left (mapping them sequentially)
    let plainIdx = 0;
    html = html.replace(/\[blank\]/g, () => {
      const sn = serialNumbers[plainIdx++];
      return `<span class="fill-gap-placeholder" data-serial="${sn}"></span>`;
    });

    return (
      <div className="p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div 
          className="text-slate-800 dark:text-slate-200 font-bold text-base mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: group.question_details }}
        />
        <div 
          className="fill-gap-content prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-[1.8] text-base"
          dangerouslySetInnerHTML={{ __html: html }}
          ref={(el) => {
            if (!el) return;
            const placeholders = el.querySelectorAll('.fill-gap-placeholder');
            placeholders.forEach(ph => {
              const sn = ph.getAttribute('data-serial');
              if (ph.children.length === 0) {
                const container = document.createElement('span');
                container.className = "inline-block mx-1 align-baseline relative group";
                
                const input = document.createElement('input');
                input.type = "text";
                input.value = answers[sn] || "";
                input.placeholder = sn;
                input.className = "w-24 md:w-32 px-3 py-1 bg-indigo-50/50 dark:bg-indigo-900/20 border-b-2 border-indigo-200 dark:border-indigo-800 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none transition-all text-indigo-900 dark:text-indigo-100 font-black text-center rounded-t-lg";
                
                input.onchange = (e) => onChange(sn, e.target.value);
                input.oninput = (e) => {
                  // Adjust width slightly based on content
                  const length = e.target.value.length;
                  if (length > 4) {
                    e.target.style.width = `${Math.min(length * 10 + 40, 200)}px`;
                  } else {
                    e.target.style.width = "96px";
                  }
                };
                
                container.appendChild(input);
                ph.appendChild(container);
              } else {
                // Update value if already created
                const input = ph.querySelector('input');
                if (input && input.value !== (answers[sn] || "")) {
                   input.value = (answers[sn] || "");
                }
              }
            });
          }}
        />
      </div>
    );
  };

  const renderAsList = () => {
    return (
      <div className="space-y-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div 
            className="text-slate-800 dark:text-slate-200 font-bold text-base mb-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: group.question_details }}
          />
          <div 
            className="text-slate-500 dark:text-slate-400 text-xs font-medium prose-sm prose-slate dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: group.instruction }}
          />
        </div>

        <div className="space-y-3">
          {group.questions?.map((q) => (
            <div 
              key={q.serial_number}
              className="p-4 lg:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[50px]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
                    {q.serial_number}
                  </span>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={answers[q.serial_number] || ""}
                    onChange={(e) => onChange(q.serial_number, e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-801 border border-slate-200 dark:border-slate-700 rounded-xl text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return hasBlanksInInstruction ? renderWithBlanks() : renderAsList();
};

export default FillGap;
