import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [isStrong, setIsStrong] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    let strengthLevel = 0;
    if (password.length >= 10) strengthLevel++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthLevel++;
    setStrength(strengthLevel);
    setIsStrong(strengthLevel === 2);
  };

  const handleRegister = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="relative w-full">
        <span className="absolute -top-1 left-1 text-sm  text-gray-600 bg-gray-100 px-1 rounded transform -translate-y-1/2">
          Reset Your Password
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          className="p-2 pr-12 rounded  bg-gray-300  w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-18 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-2 bg-gray-400 rounded">
          <div
            className={`h-2 rounded transition-all duration-300 ${
              strength === 0
                ? "w-0"
                : strength === 1
                ? "w-1/2  bg-green-500"
                : "w-full bg-green-500"
            }`}
          ></div>
        </div>
      </div>

      <button
        onClick={handleRegister}
        disabled={!isStrong}
        className={`py-2 px-4 rounded cursor-pointer text-white ${
          isStrong
            ? "bg-green-500 hover:bg-green-700"
            : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Reset
      </button>

      <div className="text-sm text-gray-500 space-y-1 mt-2">
        <ul>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            At least 10 characters
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            Contains special characters
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResetPassword;
