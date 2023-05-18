import React from "react";
import LoginSignUp from "../LoginSignup/LoginSignUp";
import "../../stylesheets/landingpage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <h1>Welcome to Check Fox 2.0!</h1>
      </header>
      <main className="landing-page__content">
        <p>To get started, either login or create an account</p>
        <LoginSignUp />
      </main>
    </div>
  );
};

export default LandingPage;
