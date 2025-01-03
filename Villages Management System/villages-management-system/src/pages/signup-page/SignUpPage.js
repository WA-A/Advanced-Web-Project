import React from "react";
import "./SignUp.css";

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <form id="signup-form">
        <h2>Sign Up</h2>
        <div className="full-name">
          <label for="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
          />
        </div>
        <div className="username">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="password">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <h3 className="have-account">
          Already have an account? <a href="/">Login</a>
        </h3>
      </form>
    </div>
  );
};

export default SignUpPage;
