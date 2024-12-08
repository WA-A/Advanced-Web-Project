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


