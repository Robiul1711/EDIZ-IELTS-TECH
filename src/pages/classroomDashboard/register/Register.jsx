import { GraduationCap, ClipboardList } from "lucide-react";
import banner from "../../../assets/images/banner3.png";
import JoinAsStudent from "./JoinAsStudent";
import JoinAsTeacher from "./JoinAsTeacher";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [joinAs, setJoinAs] = useState(null); // ✅ IMPORTANT

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Selection Card */}
      {!joinAs && (
        <div className="bg-white dark:bg-slate-900 w-full max-w-[380px] mx-4 rounded-2xl shadow-xl px-6 xxs:px-8 py-7 relative dark:border dark:border-slate-800">
          <div className="absolute top-2 left-4">
            <Link to="/" className="text-sm  text-purple-600">
              ← Back
            </Link>
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Join EDIZ Classroom
          </h2>

          {/* Student Button */}
          <button
            onClick={() => setJoinAs("student")}
            className="w-full flex items-center gap-4 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 mb-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <GraduationCap size={20} />
            </div>
            <span className="text-gray-700 dark:text-slate-300 font-medium">
              Join as a student
            </span>
          </button>

          {/* Teacher Button */}
          <button
            onClick={() => setJoinAs("teacher")}
            className="w-full flex items-center gap-4 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <ClipboardList size={20} />
            </div>
            <span className="text-gray-700 dark:text-slate-300 font-medium">
              Join as a teacher
            </span>
          </button>
        </div>
      )}

      {/* Forms */}
      {joinAs === "student" && <JoinAsStudent onBack={() => setJoinAs(null)} />}
      {joinAs === "teacher" && <JoinAsTeacher onBack={() => setJoinAs(null)} />}
    </div>
  );
};

export default Register;
