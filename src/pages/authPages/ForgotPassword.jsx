import { useApiMutation } from "@/hooks/apiMutation";
import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { setEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useApiMutation({
    url: "/forgot-password",
    method: "POST",
    secure: false,
    onSuccess: (response) => {
      console.log(response)
      setEmail(response?.data?.email);
      navigate("/auth/verify-otp", { state: { action: "forgot_password" } });
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl dark:shadow-slate-800/50 mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#5D5FEF] to-[#705CF6] p-8 text-white text-center">
    <Link to="/" className="">
      <img src={ImageAssets.logo} alt="logo" className="mx-auto mb-4" />
    </Link>
        <h2 className="text-2xl font-bold leading-tight">
          Forgot Password?
        </h2>
        <p className="text-sm font-medium mt-2 opacity-90">
          Enter your email to recover access
        </p>
      </div>

      {/* Body Section */}
      <div className="p-6 xxs:p-8">
        {/* Back Link */}
        <Link
          to="/auth"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-8">
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2 ml-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 ml-4 italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#5D5FEF] hover:bg-[#4a4ce0] text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-purple-200 dark:shadow-none transform active:scale-95 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            A verification code will be sent to this email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;