import { useAuth } from "@/hooks/useAuth";
import { useApiMutation } from "@/hooks/apiMutation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCamera,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Profile = () => {
  const { user, getProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || "",
        phone: user.phone || "",
      });
      setProfileImage(user.avatar);
    }
  }, [user, resetProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useApiMutation({
    url: "/profile/update",
    method: "POST",
    secure: true,
    successMessage: "Profile updated successfully!",
    onSuccess: () => {
      getProfile();
    },
  });

  const { mutate: changePassword, isPending: isChangingPassword } = useApiMutation({
    url: "/password/change",
    method: "POST",
    secure: true,
    successMessage: "Password changed successfully!",
    onSuccess: () => {
      resetPassword();
    },
  });

  const onUpdateProfile = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    updateProfile(formData);
  };

  const onChangePassword = (data) => {
    const formData = new FormData();
    formData.append("current_password", data.current_password);
    formData.append("new_password", data.new_password);
    formData.append("new_password_confirmation", data.new_password_confirmation);
    changePassword(formData);
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
            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#5B4BC4] transition-colors" />
                    <input
                      type="text"
                      {...registerProfile("name", { required: "Name is required" })}
                      className={`w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border ${
                        profileErrors.name ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"
                      } rounded-2xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all`}
                    />
                  </div>
                  {profileErrors.name && (
                    <span className="text-xs text-red-500 mt-1 ml-1">{profileErrors.name.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      value={user?.email || ""}
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
                      {...registerProfile("phone", { required: "Phone number is required" })}
                      className={`w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border ${
                        profileErrors.phone ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"
                      } rounded-2xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all`}
                    />
                  </div>
                  {profileErrors.phone && (
                    <span className="text-xs text-red-500 mt-1 ml-1">{profileErrors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                    Role
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#5B4BC4] transition-colors" />
                    <input
                      type="text"
                      value={user?.role || "Student"}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="h-12 px-8 bg-[#5B4BC4] hover:bg-[#4a3ce0] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </button>
            </form>
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

          <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    {...registerPassword("current_password", { required: "Current password is required" })}
                    placeholder="********"
                    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border ${
                      passwordErrors.current_password ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"
                    } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  >
                    {showCurrentPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {passwordErrors.current_password && (
                  <span className="text-xs text-red-500 mt-1 ml-1">{passwordErrors.current_password.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...registerPassword("new_password", { 
                      required: "New password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    placeholder="********"
                    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border ${
                      passwordErrors.new_password ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"
                    } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  >
                    {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {passwordErrors.new_password && (
                  <span className="text-xs text-red-500 mt-1 ml-1">{passwordErrors.new_password.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerPassword("new_password_confirmation", { 
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch('new_password') !== val) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                    placeholder="********"
                    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border ${
                      passwordErrors.new_password_confirmation ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"
                    } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B4BC4]/20 focus:border-[#5B4BC4] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {passwordErrors.new_password_confirmation && (
                  <span className="text-xs text-red-500 mt-1 ml-1">{passwordErrors.new_password_confirmation.message}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="h-12 px-8 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl shadow-lg active:scale-95 transition-all w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;


