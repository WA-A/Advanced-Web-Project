import React, { useState, useEffect, useRef } from "react";
import AdminAvatar from "../../assets/images/Profile.png";
import User from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Chat.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [availableAdmins, setAvailableAdmins] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const chatWindowRef = useRef(null);

  // Handle navigation for different roles
  const handleVillageManagement = () => {
    if (role === "admin") {
      navigate("/village-management");
    } else {
      navigate("/village-management-user");
    }
  };

  const handleGalleryPage = () => {
    if (role === "admin") {
      navigate("/gallery");
    } else {
      navigate("/gallery-user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);

    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });

      if (
        message.type === "admin" &&
        !availableAdmins.includes(message.sender)
      ) {
        setAvailableAdmins((prevAdmins) => [...prevAdmins, message.sender]);
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [availableAdmins]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: username,
      text: newMessage,
      type: role,
    };

    socket.send(JSON.stringify(message));

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    setNewMessage(""); // Reset message input
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <button
                className="village-management-link"
                onClick={handleVillageManagement}
                data-role="village"
                style={{
                  background: "none",
                  border: "none",
                  color: "#c7cbd7",
                  cursor: "pointer",
                  padding: 10,
                  margin: 0,
                }}
              >
                Village Management
              </button>
            </li>

            <li>
              <a href="/chat" className="active">
                Chat
              </a>
            </li>
            <li>
              <button
                className="gallery-link"
                onClick={handleGalleryPage}
                data-role="gallery"
                style={{
                  background: "none",
                  border: "none",
                  color: "#c7cbd7",
                  cursor: "pointer",
                  padding: 10,
                  margin: 0,
                }}
              >
                Gallery
              </button>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar" />
          <span id="adminName"> {username}</span>
          <a href="/" onClick={handleLogout} id="logoutButton">
            Logout
          </a>
        </div>
      </aside>
      <div className="chat-container">
        <h2>Chat with Admin</h2>
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search for a user..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="available-admins">
          <h3>Available Admins</h3>
          {availableAdmins.length === 0 ? (
            <p>No admins available</p>
          ) : (
            <div className="admin-list">
              {availableAdmins.map((admin, index) => (
                <div className="admin-profile" key={index}>
                  <img src={User} alt={admin} />
                  <span>{admin}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-box">
          <h3>Chat Window</h3>
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <p
                key={index}
                className={
                  msg.type === "user" ? "user-message" : "admin-message"
                }
              >
                <span
                  className={msg.type === "user" ? "user-name" : "admin-name"}
                >
                  {msg.sender}:
                </span>{" "}
                {msg.text}
              </p>
            ))}
          </div>
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
      </div>
    </div>
  );
};

export default ChatPage;
