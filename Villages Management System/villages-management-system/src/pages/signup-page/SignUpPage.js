import React, { useState } from "react";
import "./SignUp.css";

const SignUpPage = () => {
  const adminAccounts = [
    { username: "Wasan", password: "admin123" },
    { username: "Masa", password: "admin456" },
  ];

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    userType: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullname, username, password } = formData;

    if (!fullname || !username || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const isAdmin = adminAccounts.some(
      (admin) => admin.username === username && admin.password === password
    );

    if (isAdmin) {
      alert(`Welcome Admin ${username}!`);
      window.location.href = "/dashboard"; 
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      alert("Username already exists. Please choose another one.");
      return;
    }

    const newUser = { fullname, username, password, userType: "user" };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("User registered successfully!");
    setFormData({ fullname: "", username: "", password: "", userType: "user" });

    window.location.href = "/dashboard"; 
  };

  return (
    <div className="signup-container">
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="full-name">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            value={formData.fullname}
            onChange={handleInputChange}
          />
        </div>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <h3 className="have-account">
          Already have an account? <a href="../login-page">Login</a>
        </h3>
      </form>
    </div>
  );
};

export default SignUpPage;
