document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById('logoutButton');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (!currentUser) {
      window.location.href = 'index.html'; 
    } else {
      document.getElementById('adminName').textContent = currentUser.username;
    }
  
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      });
    }
  });
  
  // Add New Image 
  
const addButton = document.querySelector('.button button');
const imageList = document.querySelector('.ListImage');

addButton.addEventListener('click', () => {
  const newImage = document.createElement('div');
  newImage.classList.add('Image1'); 
  
  const img = document.createElement('img');
  img.src = './Image/Quds.jpg';
  img.alt = 'New Image';
  img.classList.add('avatar'); 
  
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Description of the new image'; 
  
  newImage.appendChild(img);
  newImage.appendChild(paragraph);
  
  imageList.appendChild(newImage);
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



// Role User or Admin
document.addEventListener("DOMContentLoaded", () => {
  const villageManagementLink = document.querySelector("a[href='VillageManagement.html']");

  if (villageManagementLink) {
    villageManagementLink.addEventListener("click", (event) => {
      event.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
       
        if (currentUser.role === "admin") {
          window.location.href = "VillageManagement.html";
        } 
        
        else if (currentUser.role === "user") {
          window.location.href = "VillageManagementForUser.html";
        }
      } else {
        window.location.href = "index.html";
      }
    });
  }
});
