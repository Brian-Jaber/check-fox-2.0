import React from "react";
import "../../stylesheets/loginsignup.css";

const LoginSignUp: React.FC = () => {
  return (
    <div className="login-buttons-box">
      <button className="login-button-style">Login</button>
      <button className="login-button-style">Sign Up</button>
    </div>
  );
};

export default LoginSignUp;
