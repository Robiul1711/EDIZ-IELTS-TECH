import React, { useEffect } from 'react';

const FillGapOptions = ({ group, answers, onChange }) => {
  const renderWithBlanks = () => {
    let html = group.instruction;

    // Find all serial numbers
    const serialNumbers = group.questions?.map(q => q.serial_number) || [];

    // Replace "n[blank]" with placeholders
    serialNumbers.forEach(sn => {
      const regex = new RegExp(`${sn}\\[blank\\]`, 'g');
      html = html.replace(regex, `<span class="fill-gap-option-placeholder" data-serial="${sn}"></span>`);
    });

    // Handle plain [blank] sequentially
    let plainIdx = 0;
    html = html.replace(/\[blank\]/g, () => {
      const sn = serialNumbers[plainIdx++];
      return `<span class="fill-gap-option-placeholder" data-serial="${sn}"></span>`;
    });

    return (
      <div className="p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
        <div 
          className="text-slate-800 dark:text-slate-200 font-bold text-base mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: group.question_details }}
        />
        <div 
          className="fill-gap-content prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-[2.2] text-base"
          dangerouslySetInnerHTML={{ __html: html }}
          ref={(el) => {
            if (!el) return;
            const placeholders = el.querySelectorAll('.fill-gap-option-placeholder');
            placeholders.forEach(ph => {
              const sn = ph.getAttribute('data-serial');
              
              // Clear previous dynamic content to prevent duplicates on re-render
              ph.innerHTML = '';
              
              const container = document.createElement('span');
              container.className = "inline-flex items-center align-middle mx-2";
              
              const dropZone = document.createElement('div');
              const hasAnswer = answers[sn] && group.options[answers[sn]];
              
              dropZone.className = `flex items-center justify-center min-w-[80px] min-h-[32px] px-3 py-1 text-sm font-bold rounded-lg cursor-pointer transition-all border-2 ${
                hasAnswer 
                  ? "border-dashed border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200" 
                  : "border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              }`;
              
              // To handle cases where options have HTML like <input>, we use innerHTML
              if (hasAnswer) {
                // Show letter + text or just text? Usually the letter is what's recorded, 
                // but showing the text is more intuitive. Let's show the text.
                dropZone.innerHTML = group.options[answers[sn]];
              } else {
                dropZone.textContent = sn; // Show serial number when empty
              }
              
              // Drag and Drop event listeners
              dropZone.ondragover = (e) => {
                e.preventDefault();
                dropZone.classList.add('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
              };
              
              dropZone.ondragleave = (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
              };
              
              dropZone.ondrop = (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20');
                const optionKey = e.dataTransfer.getData("text/plain");
                if (optionKey && group.options[optionKey]) {
                  onChange(sn, optionKey);
                }
              };
              
              // Click to remove
              dropZone.onclick = () => {
                if (answers[sn]) {
                  onChange(sn, "");
                }
              };

              container.appendChild(dropZone);
              ph.appendChild(container);
            });
          }}
        />
      </div>
    );
  };

  const renderOptions = () => {
    if (!group.options) return null;
    
    // Find options that are already used to visually distinguish them
    const usedOptions = Object.values(answers);

    return (
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-inner">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 text-center">
          Drag and drop the correct options into the blanks above
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(group.options).map(([key, value]) => {
            const isUsed = usedOptions.includes(key);
            return (
              <div
                key={key}
                draggable={!isUsed}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", key);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                  isUsed 
                    ? "opacity-40 cursor-not-allowed border-slate-300 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500" 
                    : "cursor-grab active:cursor-grabbing border-slate-700 bg-slate-800 text-white hover:bg-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fill-gap-options-container">
      {renderWithBlanks()}
      {renderOptions()}
    </div>
  );
};

export default FillGapOptions;
