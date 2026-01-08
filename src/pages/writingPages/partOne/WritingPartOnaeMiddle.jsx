import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChevronDown } from "lucide-react";

// Mock data based on the "Trade War" chart image
const data = [
  { name: "China", deficit: 380, tariff: 60 },
  { name: "Mexico", deficit: 180, tariff: 40 },
  { name: "Japan", deficit: 70, tariff: 30 },
  { name: "Germany", deficit: 90, tariff: 25 },
  { name: "Vietnam", deficit: 130, tariff: 50 },
  { name: "Ireland", deficit: 95, tariff: 20 },
  { name: "Italy", deficit: 75, tariff: 35 },
  { name: "South Korea", deficit: 65, tariff: 28 },
  { name: "Canada", deficit: 60, tariff: 15 },
  { name: "Thailand", deficit: 50, tariff: 45 },
];

const WritingPartOnaeMiddle = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="section-padding-x py-8 flex flex-col gap-6 w-full dark:bg-slate-950">
      {/* Top Instruction Bar */}
      <div className=" bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-sm dark:text-slate-300">
          <span className="font-bold text-gray-900 dark:text-white">
            Part -01:
          </span>{" "}
          You should spend about 20 minutes on this task. Write at least 150
          words.
        </p>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Chart Content */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Taking Trade War Global
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              US trade deficit and effective tariffs rate as of April 4th
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-4 leading-relaxed">
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>
          </div>

          <div className="h-[400px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  height={80}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#1e293b" }}
                  contentStyle={{
                    borderRadius: "8px",
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    color: "#f8fafc",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="left"
                  wrapperStyle={{ paddingBottom: "20px", color: "#f8fafc" }}
                />
                <Bar
                  name="Total Deficit (in US$)"
                  dataKey="deficit"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={15}
                />
                <Bar
                  name="Effective Tariffs (in %)"
                  dataKey="tariff"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  barSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-[10px] text-gray-400 dark:text-slate-500 italic">
            Sources: White House / US Census Bureau via BBC (includes countries
            listed as affected by the respective tariffs)
          </div>
        </div>

        {/* RIGHT COLUMN: Writing Area */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-6 shadow-sm flex-grow min-h-[500px] relative">
            <textarea
              className="w-full h-[400px] resize-none outline-none text-gray-700 dark:text-slate-200 bg-transparent leading-relaxed placeholder-gray-300 dark:placeholder-slate-600"
              placeholder="Start typing your summary..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="text-gray-900 dark:text-white font-bold text-lg">
            Word Count:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {wordCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPartOnaeMiddle;
