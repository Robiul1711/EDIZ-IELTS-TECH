import React from 'react';
import { Tag } from 'lucide-react';

const IeltsInterface = () => {
  return (
    <div className="min-h-screen bg-gray-50 section-padding-x py-8 text-slate-600 font-sans">
      
      {/* --- Top Header --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <p className="font-medium text-slate-800">
          <span className="font-bold">Part -01:</span> Start the audio, then answer questions 1–10 as you go.
        </p>
      </div>

      {/* --- Instruction Box --- */}
      <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-8 mb-8 shadow-sm">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-medium shadow-sm">
            <Tag size={14} className="rotate-90" />
            Topic: Spa Packages
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Complete the table below. Write <span className="font-bold text-slate-800">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> in each box
        </p>
      </div>

      {/* --- The Table --- */}
      <div className="bg-white rounded-3xl border border-[rgba(49,65,88,0.12)] shadow-[0_2px_12px_0_rgba(0,0,0,0.12)] overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white text-slate-700 font-bold border-b border-gray-200">
                <th className="p-5 border-r border-gray-200 w-1/6">Spa Package</th>
                <th className="p-5 border-r border-gray-200 w-1/6">Service 1</th>
                <th className="p-5 border-r border-gray-200 w-1/6">Service 2</th>
                <th className="p-5 border-r border-gray-200 w-1/6">Service 3</th>
                <th className="p-5 border-r border-gray-200 w-1/6">Service 4</th>
                <th className="p-5 border-r border-gray-200 w-1/6">Service 5</th>
                <th className="p-5 w-1/6">Price Per Person</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {/* Row 1 */}
              <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 border-r border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold">
                    1. <input type="text" className="w-12 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" /> Package
                  </div>
                </td>
                <td className="p-4 border-r border-gray-200">Mud bath</td>
                <td className="p-4 border-r border-gray-200">Bubble bath</td>
                <td className="p-4 border-r border-gray-200">Full Body Massage</td>
                <td className="p-4 border-r border-gray-200">Relax, at the Roman Bath</td>
                <td className="p-4 border-r border-gray-200 text-gray-400 italic">N/A</td>
                <td className="p-4">$200</td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 border-r border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold">
                    2. <input type="text" className="w-12 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" /> Package
                  </div>
                </td>
                <td className="p-4 border-r border-gray-200">Mud bath</td>
                <td className="p-4 border-r border-gray-200">Bubble bath</td>
                <td className="p-4 border-r border-gray-200">Full Body Massage</td>
                <td className="p-4 border-r border-gray-200">
                   <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold">
                    3. <input type="text" className="w-16 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" />
                  </div>
                </td>
                <td className="p-4 border-r border-gray-200">Relax at the Roman Bath</td>
                <td className="p-4">$300</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-r border-gray-200">Empress Package</td>
                <td className="p-4 border-r border-gray-200">Mud bath</td>
                <td className="p-4 border-r border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <span>Full Body Massage with</span>
                    <div className="flex items-center gap-1 text-indigo-700 font-bold">
                      4. <input type="text" className="w-16 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" />
                    </div>
                  </div>
                </td>
                <td className="p-4 border-r border-gray-200">
                   <div className="flex items-center justify-center gap-1 text-indigo-700 font-bold">
                    Full 5. <input type="text" className="w-16 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" /> Session
                  </div>
                </td>
                <td className="p-4 border-r border-gray-200">Aromatherapy</td>
                <td className="p-4 border-r border-gray-200">Relax at the Roman Bath</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1 text-indigo-700 font-bold">
                    $ 6. <input type="text" className="w-16 h-8 border border-indigo-200 rounded bg-indigo-50/30 focus:outline-none focus:border-indigo-400 px-2 text-center" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Romanesque Spa Section --- */}
      <div className="bg-indigo-50/30 p-8 rounded-xl border border-indigo-50 ">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Romanesque Spa</h2>
        <p className="text-slate-500 text-sm mb-6">8 Unio Street, Bath</p>

        <h3 className="font-bold text-slate-800 mb-4">Reservation:</h3>

        <div className="space-y-4 max-w-4xl">
          {/* Form Row 1 */}
          <div className="flex items-center gap-3">
            <span className="text-slate-800 font-semibold min-w-[100px]">Package type:</span>
            <span className="text-indigo-700 font-bold text-sm">10.</span>
            <input type="text" className="flex-1 max-w-xs h-9 border border-gray-200 rounded bg-white px-3 focus:outline-none focus:border-indigo-400" />
          </div>

          {/* Form Row 2 */}
           <div className="flex items-center gap-3">
            <span className="text-slate-800 font-semibold min-w-[100px]">Guests:</span>
             <span className="text-slate-800 font-medium">Amalia, Maeve & Clarice</span>
            <span className="text-indigo-700 font-bold text-sm ml-2">10.</span>
            <input type="text" className="flex-1 max-w-xs h-9 border border-gray-200 rounded bg-white px-3 focus:outline-none focus:border-indigo-400" />
          </div>

           {/* Form Row 3 */}
           <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-800 font-semibold min-w-[100px]">Date</span>
             <span className="text-slate-800 font-medium">Sunday, Jane</span>
            <span className="text-indigo-700 font-bold text-sm ml-2">10.</span>
            <input type="text" className="w-32 h-9 border border-gray-200 rounded bg-white px-3 focus:outline-none focus:border-indigo-400" />
            
            <span className="text-slate-800 font-medium ml-2">at</span>
            <span className="text-indigo-700 font-bold text-sm">10.</span>
            <input type="text" className="w-32 h-9 border border-gray-200 rounded bg-white px-3 focus:outline-none focus:border-indigo-400" />
          </div>
        </div>
      </div>

  

    </div>
  );
};

export default IeltsInterface;