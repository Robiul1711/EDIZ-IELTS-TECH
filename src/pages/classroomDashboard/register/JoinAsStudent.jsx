import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JoinAsStudent = ({ onBack }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Student Data:", data);

    // 👉 navigate after submit
    navigate("/classroom/register-as-student", {
      state: data, // optional: pass form data
    });
  };

  return (
    <div className="bg-white w-[380px] rounded-2xl shadow-xl px-8 py-7">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-purple-600 mb-4"
      >
        ← Back
      </button>

      <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
        Join EDIZ Classroom
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            Your name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full h-10 rounded-full border border-gray-200 px-4 text-sm 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="Enter Phone number"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Invalid phone number",
              },
            })}
            className="w-full h-10 rounded-full border border-gray-200 px-4 text-sm 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-purple-400"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 rounded-full text-white font-medium text-sm
                     bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]
                     shadow-lg shadow-purple-300/40
                     hover:opacity-90 transition"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinAsStudent;
