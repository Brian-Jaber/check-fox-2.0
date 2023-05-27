import React, { useState } from "react";
import "../../stylesheets/loginsignup.css";

const LoginSignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(email);
  };

  return (
    <div className="login-buttons-box">
      <input
        type="text"
        placeholder="Enter your Username"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password Here!"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="login-button-style" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginSignUp;
