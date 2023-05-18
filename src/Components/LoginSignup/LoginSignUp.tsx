import React, { useState } from "react";
import "../../stylesheets/loginsignup.css";

const LoginSignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="login-buttons-box">
      <input
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={handleUsernameChange}
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
