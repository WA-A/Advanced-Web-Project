document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    window.location.href = 'index.html'; 
  } else {
    document.getElementById('adminName').textContent = currentUser.username;
  }

  
  const ageCtx = document.getElementById("ageDistributionChart").getContext("2d");
  new Chart(ageCtx, {
    type: "pie",
    data: {
      labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
      datasets: [
        {
          data: [20, 30, 25, 15, 10],
          backgroundColor: ["#a74c65 ", "#2f72a3", "#D4A32C", "#3c8489", "#7056b7"],
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  const genderCtx = document.getElementById("genderRatiosChart").getContext("2d");
  new Chart(genderCtx, {
    type: "pie",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [55, 45],
          backgroundColor: ["#2f72a3", "#a74c65 "],
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  const popCtx = document.getElementById("populationChart").getContext("2d");
  new Chart(popCtx, {
    type: "bar",
    data: {
      labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
      datasets: [
        {
          label: "Population",
          data: [50000, 30000, 20000, 60000, 200000, 150000, 100000, 20000],
          backgroundColor: "#3c8489",
          borderColor: "#009fa6",
          borderWidth: 1.5,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString(); 
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()}`;
            }
          }
        }
      }
    }
  });

  const map = L.map('map-container').setView([31.5, 34.4667], 10); 

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


  const marker = L.marker([51.505, -0.09]).addTo(map);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById('logoutButton'); 

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('currentUser'); 
      window.location.href = 'index.html'; 
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const totalVillagesElement = document.querySelector(".stat p"); 
  const totalVillages = localStorage.getItem("totalVillages"); 

  if (totalVillages) {
    totalVillagesElement.textContent = totalVillages; 
  } else {
    totalVillagesElement.textContent = "0"; 
  }
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







