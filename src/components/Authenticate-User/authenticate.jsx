import React, { useState } from "react";
import EmailInput from "./EmailInput";
import OtpVerification from "./otpVerification";
import PasswordInput from "./passwordinput";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-0 bg-white p-6">
      <img
        src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg"
        alt="login"
        className="w-full max-w-[300px] lg:max-w-[600px]"
      />

      <div className="flex flex-col items-center justify-center w-full max-w-[400px]">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-semibold text-left mb-8 text-blue-900">
            Application Name
          </h2>
          <p className="text-xl font-semibold text-left my-6">
            Unlock more Opportunities as a Member
          </p>

          {step === 1 && (
            <EmailInput
              onEmailSubmit={(email) => {
                setEmail(email);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <OtpVerification
              email={email}
              onOtpVerified={(exists) => {
                setUserExists(exists);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <PasswordInput email={email} userExists={userExists} />
          )}
        </div>
      </div>
    </div>
  );
};
