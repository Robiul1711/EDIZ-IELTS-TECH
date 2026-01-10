import React, { useState } from "react";
import {
  FaCamera,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" space-y-8 font-poppins text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Student Profile
      </h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-[#121214] overflow-hidden rounded-[32px] shadow-sm border border-zinc-100 dark:border-zinc-800/50">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="relative group mx-auto md:mx-0">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="text-zinc-400 text-5xl md:text-6xl" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 h-10 w-10 bg-[#5B4BC4] hover:bg-[#4a3ce0] text-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 active:scale-95">
                <FaCamera size={18} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Fields Section */}
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#5B4BC4] transition-colors" />
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      value="john.doe@university.edu"
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#5B4BC4] transition-colors" />
                    <input
                      type="tel"
                      defaultValue="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Joining Date
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value="January 10, 2024"
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <button className="h-12 px-8 bg-[#5B4BC4] hover:bg-[#4a3ce0] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all w-full md:w-auto">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-[#121214] rounded-[32px] shadow-sm border border-zinc-100 dark:border-zinc-800/50 overflow-hidden">
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl">
              <FaLock className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold">Security & Password</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all"
              />
            </div>
          </div>

          <button className="h-12 px-8 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl shadow-lg active:scale-95 transition-all w-full md:w-auto">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
