import React from "react";
import { Tag } from "lucide-react";

const IeltsInterface = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 section-padding-x px-4 md:px-8 py-6 md:py-8 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">
      {/* --- Top Header --- */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 p-4 md:p-6 mb-6">
        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm md:text-base">
          <span className="font-bold">Part -01:</span> Start the audio, then
          answer questions 1–10 as you go.
        </p>
      </div>

      {/* --- Instruction Box --- */}
      <div className="bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 p-5 md:p-8 mb-8 shadow-sm">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-medium shadow-sm">
            <Tag size={14} className="rotate-90" />
            Topic: Spa Packages
          </span>
        </div>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Complete the table below. Write{" "}
          <span className="font-bold text-slate-800 dark:text-slate-200">
            NO MORE THAN TWO WORDS AND/OR A NUMBER
          </span>{" "}
          in each box
        </p>
      </div>

      {/* --- The Table --- */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-[rgba(49,65,88,0.12)] dark:border-slate-800 shadow-[0_2px_12px_0_rgba(0,0,0,0.12)] overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-center border-collapse min-w-[800px] md:min-w-[1000px]">
            <thead>
              <tr className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold border-b border-gray-200 dark:border-slate-800">
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Spa Package
                </th>
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Service 1
                </th>
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Service 2
                </th>
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Service 3
                </th>
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Service 4
                </th>
                <th className="p-3 md:p-5 border-r border-gray-200 dark:border-slate-800 w-1/6">
                  Service 5
                </th>
                <th className="p-3 md:p-5 w-1/6">Price Per Person</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              {/* Row 1 */}
              <tr className="border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                    1.{" "}
                    <input
                      type="text"
                      className="w-12 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                    />{" "}
                    Package
                  </div>
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Mud bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Bubble bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Full Body Massage
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Relax, at the Roman Bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-600 italic">
                  N/A
                </td>
                <td className="p-3 md:p-4">$200</td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                    2.{" "}
                    <input
                      type="text"
                      className="w-12 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                    />{" "}
                    Package
                  </div>
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Mud bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Bubble bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Full Body Massage
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                    3.{" "}
                    <input
                      type="text"
                      className="w-16 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                    />
                  </div>
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Relax at the Roman Bath
                </td>
                <td className="p-3 md:p-4">$300</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Empress Package
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Mud bath
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  <div className="flex flex-col items-center gap-1">
                    <span>Full Body Massage with</span>
                    <div className="flex items-center gap-1 text-indigo-700 dark:text-indigo-400 font-bold">
                      4.{" "}
                      <input
                        type="text"
                        className="w-16 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-indigo-700 dark:text-indigo-400 font-bold">
                    Full 5.{" "}
                    <input
                      type="text"
                      className="w-16 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                    />{" "}
                    Session
                  </div>
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Aromatherapy
                </td>
                <td className="p-3 md:p-4 border-r border-gray-200 dark:border-slate-800">
                  Relax at the Roman Bath
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex items-center justify-center gap-1 text-indigo-700 dark:text-indigo-400 font-bold">
                    $ 6.{" "}
                    <input
                      type="text"
                      className="w-16 h-8 border border-indigo-200 dark:border-indigo-900 rounded bg-indigo-50/30 dark:bg-indigo-900/20 focus:outline-none focus:border-indigo-400 px-2 text-center text-slate-900 dark:text-white"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Romanesque Spa Section --- */}
      <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-5 md:p-8 rounded-xl border border-indigo-50 dark:border-indigo-900/30 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
          Romanesque Spa
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-6">
          8 Unio Street, Bath
        </p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm md:text-base">
          Reservation:
        </h3>

        <div className="space-y-6 md:space-y-4 max-w-4xl">
          {/* Form Row 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-slate-800 dark:text-slate-200 font-semibold min-w-[120px] text-sm md:text-base">
              Package type:
            </span>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-indigo-700 dark:text-indigo-400 font-bold text-xs md:text-sm">
                10.
              </span>
              <input
                type="text"
                className="flex-1 max-w-xs h-9 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 px-3 focus:outline-none focus:border-indigo-400 text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Form Row 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-slate-800 dark:text-slate-200 font-semibold min-w-[120px] text-sm md:text-base">
              Guests:
            </span>
            <div className="flex items-center gap-2 flex-wrap flex-1">
              <span className="text-slate-800 dark:text-slate-300 font-medium text-sm md:text-base">
                Amalia, Maeve & Clarice
              </span>
              <div className="flex items-center gap-2">
                <span className="text-indigo-700 dark:text-indigo-400 font-bold text-xs md:text-sm">
                  10.
                </span>
                <input
                  type="text"
                  className="w-40 sm:flex-1 sm:max-w-xs h-9 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 px-3 focus:outline-none focus:border-indigo-400 text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Form Row 3 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-slate-800 dark:text-slate-200 font-semibold min-w-[120px] text-sm md:text-base">
              Date
            </span>
            <div className="flex items-center gap-2 flex-wrap flex-1">
              <span className="text-slate-800 dark:text-slate-300 font-medium text-sm md:text-base">
                Sunday, Jane
              </span>
              <div className="flex items-center gap-2">
                <span className="text-indigo-700 dark:text-indigo-400 font-bold text-xs md:text-sm">
                  10.
                </span>
                <input
                  type="text"
                  className="w-24 md:w-32 h-9 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 px-3 focus:outline-none focus:border-indigo-400 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <span className="text-slate-800 dark:text-slate-300 font-medium text-sm md:text-base">
                at
              </span>
              <div className="flex items-center gap-2">
                <span className="text-indigo-700 dark:text-indigo-400 font-bold text-xs md:text-sm">
                  10.
                </span>
                <input
                  type="text"
                  className="w-24 md:w-32 h-9 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 px-3 focus:outline-none focus:border-indigo-400 text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeltsInterface;
