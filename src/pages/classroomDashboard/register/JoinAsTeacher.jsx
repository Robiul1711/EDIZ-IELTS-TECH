import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JoinAsTeacher = ({ onBack }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Teacher Form Data:", data);

    // 👉 navigate after submit
    navigate("/classroom/register-as-teacher", {
      state: data, // optional: pass data
    });
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
        {/* Name */}
        {/* <div className="mb-4">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1">
            Your name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full h-10 rounded-full border border-gray-200 dark:border-slate-700 px-4 text-sm text-black dark:text-white dark:bg-slate-800
                       placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div> */}

        {/* Teacher ID */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1">
            Teacher ID
          </label>
          <input
            type="text"
            placeholder="Enter Teacher ID"
            {...register("teacherId", {
              required: "Teacher ID is required",
            })}
            className="w-full h-10 rounded-full border border-gray-200 dark:border-slate-700 px-4 text-sm text-black dark:text-white dark:bg-slate-800
                       placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.teacherId && (
            <p className="text-xs text-red-500 mt-1">
              {errors.teacherId.message}
            </p>
          )}
        </div>
        {/* Batch No */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500 dark:text-slate-400 mb-1">
            Batch no.
          </label>
          <input
            type="text"
            placeholder="Enter Batch no."
            {...register("batchNo", { required: "Batch number is required" })}
            className="w-full h-10 rounded-full border border-gray-200 dark:border-slate-700 px-4 text-sm text-black dark:text-white dark:bg-slate-800
                       placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.batchNo && (
            <p className="text-xs text-red-500 mt-1">
              {errors.batchNo.message}
            </p>
          )}
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
