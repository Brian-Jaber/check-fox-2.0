import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <h1>Welcome to Check Fox 2.0!</h1>
      </header>
      <main className="landing-page__content">
        <p>A simple, secure, and easy to use MSBS customer tracking web app!</p>
        <button className="landing-page__sign-in">Sign in</button>
        <button className="Landing-page__sign-up">Sign up</button>
      </main>
    </div>
  );
};

export default LandingPage;
