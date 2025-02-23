import React, { useState } from "react";
import OtpVerification from "./otpVerification";
import ResetPassword from "./resetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    setStep(2);
    const response = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("OTP sent to your email!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="relative flex flex-col space-y-3">
      {step === 1 && (
        <>
          <span className="absolute -top-1 left-1 text-sm  text-gray-600 bg-gray-100 px-1 rounded transform -translate-y-1/2">
            Forget Password ?
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-300"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-500 hover:bg-blue-700 font-semibold cursor-pointer text-white py-2 px-4 rounded"
          >
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <OtpVerification email={email} onOtpVerified={() => setStep(3)} />
      )}

      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
