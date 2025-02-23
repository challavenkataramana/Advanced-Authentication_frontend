import React from "react";
import LoginForm from "./loginform";
import RegisterForm from "./registerform";

const PasswordInput = ({ email, userExists }) => {
  return (
    <div className="flex flex-col space-y-3">
      {userExists ? (
        <LoginForm email={email} />
      ) : (
        <RegisterForm email={email} />
      )}
    </div>
  );
};

export default PasswordInput;
