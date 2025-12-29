import React, { useState } from "react";

const WritingPartTwoMiddle = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="section-padding-x py-8 flex flex-col gap-6 w-full">
      {/* Top Instruction Bar */}
      <div className=" bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-sm">
          <span className="font-bold text-gray-900">Part -01:</span> You should
          spend about 20 minutes on this task. Write at least 150 words.
        </p>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Chart Content */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
             Movies and television shows are often criticized for being historically inaccurate.
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
            To what extent do you agree or disagree with this view?
            </p>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Give reasons for your opinion and include relevant examples from your own knowledge or experience.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Writing Area */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm flex-grow min-h-[500px] relative">


            <textarea
              className="w-full h-[400px] resize-none outline-none text-gray-700 leading-relaxed placeholder-gray-300"
              placeholder="Start typing your summary..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="text-gray-900 font-bold text-lg">
            Word Count: <span className="text-indigo-600">{wordCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPartTwoMiddle;