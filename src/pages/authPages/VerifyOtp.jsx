import React from "react";
import { useForm, Controller } from "react-hook-form";
import OTPInput from "otp-input-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApiMutation } from "@/hooks/apiMutation";
import { useAuth } from "@/hooks/useAuth";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, saveAuth } = useAuth();

  const actionType = location.state?.action || "email_verification";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const { mutate, isPending } = useApiMutation({
    url: "/verify-otp-password",
    method: "POST",
    secure: false,
    onSuccess: (response) => {
      if (actionType === "forgot_password") {
        const setToken = response?.data?.set_token;
        if (setToken) {
          localStorage.setItem("resetToken", setToken);
        }
        navigate("/auth/reset-password");
      } else {
        const tokenValue = response?.data?.token?.original?.access_token;
        const userData = response?.data?.user;
        if (tokenValue) {
          saveAuth({ token: tokenValue, user: userData });
        }
        navigate("/dashboard");
      }
    },
  });

  const onSubmit = (data) => {
    mutate({
      email: email,
      otp: data.otp,
      action: actionType,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg w-full max-w-sm">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
        {actionType === "forgot_password" ? "Password Reset" : "Verify Email"}
      </h1>

      {/* Message */}
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        We sent a code to <span className="text-purple-600">{email}</span>
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
