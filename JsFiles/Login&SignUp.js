const admins = [
    { username: 'Wasan', password: 'admin123', role: 'admin' },
    { username: 'Masa', password: 'admin123', role: 'admin' }
  ];
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const loginForm = document.getElementById('loginForm');
  const signupLink = document.getElementById('signupLink');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
      localStorage.setItem('currentUser', JSON.stringify(admin));
     // alert('Welcome, Admin!');
      window.location.href = './../HomePage.html'; 
      return;
    }
  
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome, ${user.username}!`);
      window.location.href = 'user-dashboard.html'; 
      alert('Invalid username or password!');
    }
  });
  
  // SignUp New User 
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
  
    if (username && password) {
      if (admins.some(a => a.username === username) || users.some(u => u.username === username)) {
        alert('Username already taken. Please choose another.');
        return;
      }
  
      users.push({ username, password, role: 'user' });
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered successfully! Please log in.');
    } else {
      alert('Signup failed. Please enter valid information.');
    }
  });
  