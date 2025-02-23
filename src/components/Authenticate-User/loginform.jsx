import React, { useState } from "react";
import ForgotPassword from "./forgetPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ email }) => {
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return forgotPassword ? (
    <ForgotPassword />
  ) : (
    <div className=" flex flex-col space-y-3">
      <div className="relative w-full">
        <span className="absolute -top-1 left-1 text-sm  text-gray-600 bg-gray-100 px-1 rounded transform -translate-y-1/2">
          Password
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-300 w-full"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      <button
        onClick={handleLogin}
        className="py-2 px-4 rounded cursor-pointer text-white bg-green-500 hover:bg-green-700"
      >
        Login
      </button>
      <button
        onClick={() => setForgotPassword(true)}
        className="text-blue-500 text-left hover:underline text-sm"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default LoginForm;
