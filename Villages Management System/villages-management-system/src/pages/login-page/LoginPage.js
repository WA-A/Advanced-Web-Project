import React from "react";
import "./Login.css";

const LoginPage = () => {
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="signup-text">
            Don't have an account?{" "}
            <a href="/" id="signupLink">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
