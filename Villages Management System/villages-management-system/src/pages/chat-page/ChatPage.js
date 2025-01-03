import React, { useState, useEffect } from "react";
import AdminAvatar from "../../assets/images/Profile.png";
import User from "../../assets/images/user.png";

import "./Chat.css";

const ChatPage = () => {
  const [activeAdmin, setActiveAdmin] = useState(null);
  const [messages, setMessages] = useState({});
  const [searchText, setSearchText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || {
      Admin1: [
        {
          sender: "Admin1",
          text: "Hello! How can I assist you today?",
          type: "admin",
        },
        {
          sender: "You",
          text: "I have a question about my account.",
          type: "user",
        },
        {
          sender: "Admin1",
          text: "Sure! Please provide your account details.",
          type: "admin",
        },
      ],
      Admin2: [
        {
          sender: "Admin2",
          text: "Hello! How can I assist you today?",
          type: "admin",
        },
      ],
      Admin3: [
        {
          sender: "Admin3",
          text: "Hello! Do you need assistance?",
          type: "admin",
        },
      ],
    };
    setMessages(savedMessages);

    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(savedUser);
  }, []);

  const handleAdminClick = (adminName) => {
    if (activeAdmin === adminName) {
      setActiveAdmin(null); // Close chat if already opened
    } else {
      setActiveAdmin(adminName); // Open chat with selected admin
    }
    console.log("Active admin set to:", adminName); // Debugging log
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setActiveAdmin(null); // Close chat on search
  };

  const handleSendMessage = () => {
    if (!currentUser || !activeAdmin) return;

    if (newMessage.trim() === "") return;

    const isUser = currentUser.role === "user";
    const message = {
      sender: isUser ? "You" : activeAdmin,
      text: newMessage,
      type: isUser ? "user" : "admin",
    };

    const updatedMessages = {
      ...messages,
      [activeAdmin]: [...messages[activeAdmin], message],
    };
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    setNewMessage(""); // Clear input field
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  const renderMessages = (adminName) => {
    return messages[adminName]?.map((msg, index) => (
      <p
        key={index}
        className={msg.type === "user" ? "user-message" : "admin-message"}
      >
        <span className={msg.type === "user" ? "user-name" : "admin-name"}>
          {msg.sender}:
        </span>{" "}
        {msg.text}
      </p>
    ));
  };

  return (
    <div className="chat">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Overview</a>
            </li>
            <li>
              <a href="/village-management">Village Management</a>
            </li>
            <li>
              <a href="/chat" className="active">
                Chat
              </a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar" />
          <span id="adminName">{currentUser?.username}</span>
          <a
            href="/"
            id="logoutButton"
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "index.html";
            }}
          >
            Logout
          </a>
        </div>
      </aside>
      <div className="chat-container">
        <h2>Chat with Admins</h2>
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search for an admin..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="available-admins">
          <h3>Available Admins</h3>
          <div className="admin-list">
            {["Admin1", "Admin2", "Admin3"].map((adminName) => (
              <div
                key={adminName}
                className="admin-profile"
                data-admin={adminName}
                onClick={() => handleAdminClick(adminName)}
                style={{
                  display: adminName.toLowerCase().includes(searchText)
                    ? "flex"
                    : "none",
                }}
              >
                <img src={User} alt={adminName} />
                <span>{adminName}</span>
              </div>
            ))}
          </div>
        </div>
        {activeAdmin && (
          <div className="chat-box">
            <h3>Chat with: {activeAdmin}</h3>
            <div className="chat-window">{renderMessages(activeAdmin)}</div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
