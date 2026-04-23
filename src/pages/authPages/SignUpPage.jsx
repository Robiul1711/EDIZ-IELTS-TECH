import { useApiMutation } from "@/hooks/apiMutation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { saveAuth, setEmail } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const { mutate, isPending } = useApiMutation({
    url: "/register",
    method: "POST",
    secure: false,
    successMessage: "Registration successful! Please verify your email.",
    onSuccess: (response) => {
      console.log("Registration response:", response);
      navigate("/auth/verify-otp", { state: { action: "email_verification" } });
    },
  });

  const onSubmit = (data) => {
    setEmail(data.email);
    mutate(data);
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl dark:shadow-slate-800/50 mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#5D5FEF] to-[#705CF6] p-8 text-white">
        <p className="text-sm font-medium mb-1 opacity-90">
          No Payment Required
        </p>
        <h2 className="text-2xl font-bold leading-tight">
          Sign Up And Get One Free Mock Test
        </h2>
      </div>

      {/* Body Section */}
      <div className="p-6 xxs:p-8">
        {/* Back Link */}
        <Link
          to="/auth"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
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
          Back
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="•••••••"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="•••••••"
              className="w-full px-4 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: value => value === password.current || "The passwords do not match"
              })}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-custom2 text-white font-bold py-3 px-4 rounded-full hover:shadow-custom transition duration-200 mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
