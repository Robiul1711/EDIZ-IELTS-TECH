import React from "react";
import { useForm, Controller } from "react-hook-form";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP Submitted:", data.otp);
    navigate("/auth/reset-password");
    
    // 🔗 API verification logic here
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-sm">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Password Reset
      </h1>

      {/* Message */}
      <p className="text-center text-gray-600 mb-8">
        We sent a code to{" "}
        <span className="text-purple-600">example***@gmail.com</span>
      </p>

      {/* OTP Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* OTP Input */}
        <div className="flex justify-center mb-8">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "OTP must be 4 digits",
              },
            }}
            render={({ field }) => (
              <OTPInput
                {...field}
                OTPLength={4}
                otpType="number"
                autoFocus
                inputClassName="!w-14 !h-14 mx-2 rounded-md bg-slate-600 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={false}
              />
            )}
          />
        </div>

        {/* Error Message */}
        {errors.otp && (
          <p className="text-center text-red-500 text-sm mb-4">
            {errors.otp.message}
          </p>
        )}

        {/* Resend Code */}
        <p className="text-center text-gray-600 mb-6">
          Didn’t receive OTP code?
          <br />
          <button
            type="button"
            className="text-purple-600 hover:underline"
            onClick={() => console.log("Resend OTP")}
          >
            Resend code?
          </button>
        </p>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition duration-200"
        >
          Verify & Continue
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
