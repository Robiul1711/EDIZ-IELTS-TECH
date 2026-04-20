import { useApiMutation } from "@/hooks/apiMutation";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const resetToken = localStorage.getItem("resetToken");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const { mutate, isPending } = useApiMutation({
    url: "/reset-password",
    method: "POST",
    secure: false,
    onSuccess: () => {
      localStorage.removeItem("resetToken");
      navigate("/auth/login");
    },
  });

  const onSubmit = (data) => {
    if (!email || !resetToken) {
      toast.error("Required reset information is missing. Please try the forgot password process again.");
      return;
    }
    mutate({
      email: email,
      set_token: resetToken,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl dark:shadow-slate-800/50 mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#5D5FEF] to-[#705CF6] p-8 text-white text-center">
        <h2 className="text-2xl font-bold leading-tight">
          Reset Your Password
        </h2>
        <p className="text-sm font-medium mt-2 opacity-90">
          Byte-Builders Security Protocol
        </p>
      </div>

      {/* Body Section */}
      <div className="p-6 xxs:p-8">
        {/* Back Link */}
        <Link
          to="/auth"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Login
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* New Password */}
          <div>
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#5D5FEF] hover:bg-[#4a4ce0] text-white font-bold py-3 px-4 rounded-full shadow-lg transform active:scale-95 transition duration-200"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;