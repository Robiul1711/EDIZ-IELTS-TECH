import { GraduationCap, ClipboardList } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] to-[#7c3aed]">
      <div className="bg-white w-[380px] rounded-2xl shadow-xl px-8 py-7">
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
          Join EDIZ Classroom
        </h2>

        {/* Student Button */}
        <button className="w-full flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-3 mb-4 hover:bg-gray-50 transition">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <GraduationCap size={20} />
          </div>
          <span className="text-gray-700 font-medium">
            Join as a student
          </span>
        </button>

        {/* Teacher Button */}
        <button className="w-full flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
            <ClipboardList size={20} />
          </div>
          <span className="text-gray-700 font-medium">
            Join as a teacher
          </span>
        </button>
      </div>
    </div>
  );
};

export default Register;
