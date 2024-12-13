document.addEventListener("DOMContentLoaded", () => {
  const adminProfiles = document.querySelectorAll(".admin-profile");
  const chatBox = document.querySelector(".chat-box");
  const chatWithTitle = chatBox.querySelector("h3");
  const chatMessages = chatBox.querySelector(".chat-window");
  const searchInput = document.querySelector(".admin-search input");
  const chatInputField = chatBox.querySelector(".chat-input input");
  const sendButton = chatBox.querySelector(".chat-input button");

  let activeAdmin = null; // track the active admin

  // Retrieve messages from local storage or initialize if not present
  const messages = JSON.parse(localStorage.getItem("messages")) || {
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

  // open and toggle chat box when an admin clicked
  adminProfiles.forEach((admin) => {
    admin.addEventListener("click", () => {
      const adminName = admin.getAttribute("data-admin");

      // if clicking on the same admin toggle the chat box
      if (activeAdmin === adminName) {
        chatBox.style.display = "none";
        activeAdmin = null;
      } else {
        chatWithTitle.textContent = `Chat with: ${adminName}`;
        activeAdmin = adminName;

        // load messages for the selected admin
        renderMessages(adminName);

        chatBox.style.display = "block";
        chatBox.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // hide chat box when search
  searchInput.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    chatBox.style.display = "none";
    activeAdmin = null;

    adminProfiles.forEach((admin) => {
      const adminName = admin.getAttribute("data-admin").toLowerCase();
      if (adminName.includes(searchText)) {
        admin.style.display = "flex"; // show matching admin
      } else {
        admin.style.display = "none";
      }
    });
  });

  // render messages for specific admin
  const renderMessages = (adminName) => {
    chatMessages.innerHTML = ""; // clear previous messages

    if (messages[adminName]) {
      messages[adminName].forEach((msg) => {
        const messageElement = document.createElement("p");
        messageElement.classList.add(
          msg.type === "user" ? "user-message" : "admin-message"
        );
        messageElement.innerHTML = `<span class="${
          msg.type === "user" ? "user-name" : "admin-name"
        }">${msg.sender}:</span> ${msg.text}`;
        chatMessages.appendChild(messageElement);
      });
    }
  };

  // send message and store it for the active admin
  const sendMessage = () => {
    const messageText = chatInputField.value.trim();
    if (messageText === "" || !activeAdmin) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isUser = currentUser && currentUser.role === "user";
    const isAdmin = currentUser && currentUser.role === "admin";

    const message = {
      sender: isUser ? "You" : isAdmin ? activeAdmin : "Unknown",
      text: messageText,
      type: isUser ? "user" : isAdmin ? "admin" : "unknown",
    };

    if (!messages[activeAdmin]) {
      messages[activeAdmin] = [];
    }
    messages[activeAdmin].push(message);

    renderMessages(activeAdmin);

    chatInputField.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Save messages to local storage
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  sendButton.addEventListener("click", sendMessage);
  chatInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  sendButton.addEventListener("click", sendMessage);
  chatInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});

// Active Page
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");

  sidebarLinks.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("adminName").textContent = currentUser.username;
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});

// Role User or Admin For VillageManagement
document.addEventListener("DOMContentLoaded", () => {
  const villageManagementLink = document.querySelector(
    "a[href='VillageManagement.html']"
  );

  if (villageManagementLink) {
    villageManagementLink.addEventListener("click", (event) => {
      event.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
        if (currentUser.role === "admin") {
          window.location.href = "VillageManagement.html";
        } else if (currentUser.role === "user") {
          window.location.href = "VillageManagementForUser.html";
        }
      } else {
        window.location.href = "index.html";
      }
    });
  }
});

// Role User or Admin For Gallary
document.addEventListener("DOMContentLoaded", () => {
  const villageManagementLink = document.querySelector(
    "a[href='Gallary.html']"
  );

  if (villageManagementLink) {
    villageManagementLink.addEventListener("click", (event) => {
      event.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
        if (currentUser.role === "admin") {
          window.location.href = "Gallary.html";
        } else if (currentUser.role === "user") {
          window.location.href = "GallaryForUser.html";
        }
      } else {
        window.location.href = "index.html";
      }
    });
  }
});


