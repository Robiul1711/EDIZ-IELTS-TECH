import { useApiMutation } from "@/hooks/apiMutation";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";


const JoinAsTeacher = ({ onBack }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const { mutate, isPending } = useApiMutation({
    url: "/teacher-entry",
    method: "POST",
    secure: true,
    onSuccess: (response) => {

      navigate("/classroom/register-as-teacher");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };


  return (
    <div className="bg-white dark:bg-slate-900 w-full max-w-[380px] mx-4 rounded-2xl shadow-xl px-6 xxs:px-8 py-7 dark:border dark:border-slate-800">
      <button onClick={onBack} className="text-sm text-purple-600 mb-4">
        ← Back
      </button>

      <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Join EDIZ Classroom
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Teacher ID */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1">
            Teacher ID
          </label>
          <input
            type="text"
            placeholder="Enter Teacher ID"
            {...register("teacher_id", {
              required: "Teacher ID is required",
            })}
            className="w-full h-10 rounded-full border border-gray-200 dark:border-slate-700 px-4 text-sm text-black dark:text-white dark:bg-slate-800
                       placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.teacher_id && (
            <p className="text-xs text-red-500 mt-1">
              {errors.teacher_id.message}
            </p>
          )}
        </div>
        {/* Batch No */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1">
            Password
          </label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="w-full h-10 rounded-full border border-gray-200 dark:border-slate-700 px-4 text-sm text-black dark:text-white dark:bg-slate-800
                       placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 rounded-full text-white font-medium text-sm
                     bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]
                     shadow-lg shadow-purple-300/40 dark:shadow-none
                     hover:opacity-90 transition"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinAsTeacher;
