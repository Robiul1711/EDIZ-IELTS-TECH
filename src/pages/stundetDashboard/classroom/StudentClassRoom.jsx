import React from 'react';
import { GraduationCap, Presentation } from 'lucide-react';

const StudentClassRoom = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden rounded-[2rem] shadow-sm">
      {/* Background with Brand Gradient and Watermark Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A3AFF] via-[#604CDF] to-[#2D1B69] opacity-95">
        {/* Subtle Background Icons - Mimicking image_a76284.png watermark */}
        <div className="absolute top-10 left-10 text-white/10 rotate-12">
          <GraduationCap size={280} strokeWidth={1} />
        </div>
        <div className="absolute bottom-[-50px] right-20 text-white/5 -rotate-12">
          <Presentation size={320} strokeWidth={1} />
        </div>
      </div>

      {/* Center Selection Modal */}
      <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm mx-4 transform transition-all hover:scale-[1.01]">
        <h2 className="text-xl font-bold text-[#334156] text-center mb-8">
          Join EDIZ Classroom
        </h2>

        <div className="space-y-4">
          {/* Join As Student Button */}
          <button className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-100 rounded-full hover:bg-slate-50 hover:shadow-md group transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#F5F3FF] text-[#604CDF] rounded-full transition-colors group-hover:bg-[#604CDF] group-hover:text-white">
                <GraduationCap size={22} />
              </div>
              <span className="text-[15px] font-semibold text-slate-700">
                Join As A Student
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#604CDF]" />
          </button>

          {/* Join As Teacher Button */}
          <button className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-100 rounded-full hover:bg-slate-50 hover:shadow-md group transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#F0FDF4] text-[#22C55E] rounded-full transition-colors group-hover:bg-[#22C55E] group-hover:text-white">
                <Presentation size={22} />
              </div>
              <span className="text-[15px] font-semibold text-slate-700">
                Join As A Teacher
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#22C55E]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentClassRoom;