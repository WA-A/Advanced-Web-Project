import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUpPage from "../signup-page/SignUpPage";
import LoginPage from "../login-page/LoginPage";
import Dashboard from "../dashboard-page/DashboardPage";
import GalleryPage from "../gallery-page/GalleryPage";
import GalleryPageUser from "../gallery-page-User/GalleryPageUser.js";
import ChatPage from "../chat-page/ChatPage";
import VillageManagement from "../village-management-page/VillageManagementPage";
import VillageManagementUser from "../village-management-page-User/VillageManagementPageUser.js";


import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup-page");
  };

  const handleLogin = () => {
    navigate("/login-page");
  };

  return (
    <div className="App">
      <div className="main-container">
        <h1>Welcome to the Advanced Web Project</h1>
        <div className="buttons">
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="login" onClick={handleLogin}>
            Login
          </button>
        </div>
        <footer className="footer-text">
          Created by Wasan Awwad & Masa Abu Aisheh
        </footer>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup-page" element={<SignUpPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/gallery-user" element={<GalleryPageUser />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/village-management" element={<VillageManagement />} />
      <Route path="/village-management-user" element={<VillageManagementUser />} />
    </Routes>
  </Router>
);

export default AppWrapper;
