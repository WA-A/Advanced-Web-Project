const admins = [
  { username: "Wasan", password: "admin123", role: "admin" },
  { username: "Masa", password: "admin123", role: "admin" },
];

const users = JSON.parse(localStorage.getItem("users")) || [];


const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const admin = admins.find(
      (a) => a.username === username && a.password === password
    );
    if (admin) {
      localStorage.setItem("currentUser", JSON.stringify(admin));
      alert(`Welcome Admin, ${admin.username}!`);
      window.location.href = "Dashboard.html"; 
      return;
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome, ${user.username}!`);
      window.location.href = "Dashboard.html"; 
    } else {
      alert("Invalid username or password! Please try again.");
    }
  });
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Form inputs:", { fullName, username, password });

    if (!fullName || !username || !password) {
      alert("All fields are required!");
      return;
    }

    // Check if the username is already exist
    if (
      admins.some((a) => a.username.toLowerCase() === username.toLowerCase()) ||
      users.some((u) => u.username.toLowerCase() === username.toLowerCase())
    ) {
      alert("Username already taken. Please choose another.");
      return;
    }

    // Add new user
    const newUser = { fullName, username, password, role: "user" };
    users.push(newUser);

    try {
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Updated users saved to localStorage:", users);
      alert("Sign-up successful! You can now log in.");
      signupForm.reset();
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("An error occurred while saving your data. Please try again.");
    }
  });
}
