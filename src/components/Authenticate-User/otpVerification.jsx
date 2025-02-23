import React, { useState, useRef } from "react";

const OtpVerification = ({ email, onOtpVerified }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp:finalOtp }),
    });

    const data = await response.json();
    if (response.ok) {
      onOtpVerified(data.exists);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="relative flex flex-col space-y-3">
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="w-10 h-10 text-center text-lg border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ))}
      </div>
      <button
        onClick={handleVerifyOtp}
        className="bg-green-500 hover:bg-green-700 cursor-pointer text-white py-2 px-4 rounded"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpVerification;
