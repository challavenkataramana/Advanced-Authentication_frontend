import React from "react";

const StepHeader = ({ step, type }) => {
  const stepHeadings = {
    register: {
      1: "Enter Your Email",
      2: "Verify OTP",
      3: "Set Your Password",
    },
    forgotPassword: {
      1: "Forgot Password?",
      2: "Verify OTP",
      3: "Reset Your Password",
    },
  };

  return (
    <h2 className="text-sm font-semibold text-left mb-2 text-black">
      {stepHeadings[type][step]}
    </h2>
  );
};

export default StepHeader;