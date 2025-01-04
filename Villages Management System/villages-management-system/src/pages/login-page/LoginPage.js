import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";  

const adminAccounts = [
  { username: "Wasan", password: "admin123" },
  { username: "Masa", password: "admin456" },
];

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const isAdmin = adminAccounts.some(
      (account) => account.username === username && account.password === password
    );

    if (isAdmin) {
      localStorage.setItem("user", JSON.stringify({ username, role: "admin" }));
      navigate("/dashboard"); 
    } else {
      localStorage.setItem("user", JSON.stringify({ username, role: "user" }));
      navigate("/dashboard"); 
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="signup-text">
            Don't have an account?{" "}
            <a href="../signup-page" id="signupLink">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
