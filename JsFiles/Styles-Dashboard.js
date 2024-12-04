document.addEventListener("DOMContentLoaded", () => {
  // التحقق من وجود المستخدم المسجل دخوله
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // إذا لم يكن هناك مستخدم مسجل، إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  if (!currentUser) {
    window.location.href = 'index.html'; // إعادة توجيه إلى الصفحة الرئيسية أو صفحة تسجيل الدخول
  } else {
    // عرض اسم المستخدم في العنصر المخصص (على سبيل المثال: عنصر <span id="adminName">)
    document.getElementById('adminName').textContent = currentUser.username;
  }

  // **تعريف الرسوم البيانية**
  // Age Distribution Chart
  const ageCtx = document.getElementById("ageDistributionChart").getContext("2d");
  new Chart(ageCtx, {
    type: "pie",
    data: {
      labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
      datasets: [
        {
          data: [20, 30, 25, 15, 10],
          backgroundColor: ["#E57373", "#4A90E2", "#FFD54F", "#64B5F6", "#AB47BC"],
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

  // Gender Ratios Chart
  const genderCtx = document.getElementById("genderRatiosChart").getContext("2d");
  new Chart(genderCtx, {
    type: "pie",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [55, 45],
          backgroundColor: ["#4A90E2", "#E57373"],
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

  // Population Bar Chart
  const popCtx = document.getElementById("populationChart").getContext("2d");
  new Chart(popCtx, {
    type: "bar",
    data: {
      labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
      datasets: [
        {
          label: "Population",
          data: [50000, 30000, 20000, 60000, 200000, 150000, 100000, 20000],
          backgroundColor: "#4A90E2",
          borderColor: "#2C3E50",
          borderWidth: 1,
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
              return value.toLocaleString(); // Format numbers with commas
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

  // Leaflet Map
  const map = L.map('map-container').setView([51.505, -0.09], 13); // Example: London

  // Adding OpenStreetMap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Adding a marker (pin) on the map
  const marker = L.marker([51.505, -0.09]).addTo(map);

  // Popup on marker click
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
});

// تسجيل الخروج
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById('logoutButton'); // الزر لتسجيل الخروج

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('currentUser'); // مسح بيانات المستخدم من localStorage
      window.location.href = 'index.html'; // إعادة توجيه إلى الصفحة الرئيسية
    });
  }
});
