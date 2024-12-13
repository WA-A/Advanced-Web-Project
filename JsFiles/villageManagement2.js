document.addEventListener("DOMContentLoaded", () => {
  let villages = JSON.parse(localStorage.getItem("villages")) || [
    {
      name: "Jabalia",
      location: "Gaza Strip",
      landArea: 10,
      latitude: "31.525",
      longitude: "34.450",
      tags: ["Urban"],
      image: "jabalia.jpg",
    },
    {
      name: "Beit Lahia",
      location: "Gaza Strip",
      landArea: 8,
      latitude: "31.550",
      longitude: "34.500",
      tags: ["Rural"],
      image: "beit_lahia.jpg",
    },
    {
      name: "Quds",
      location: "West Bank",
      landArea: 125,
      latitude: "31.768",
      longitude: "35.213",
      tags: ["Historical"],
      image: "quds.jpg",
    },
    {
      name: "Shejaiya",
      location: "Gaza Strip",
      landArea: 12,
      latitude: "31.517",
      longitude: "34.483",
      tags: ["Urban", "Cultural"],
      image: "shejaiya.jpg",
    },
    {
      name: "Hebron",
      location: "West Bank",
      landArea: 50,
      latitude: "31.532",
      longitude: "35.099",
      tags: ["Historical", "Industrial"],
      image: "hebron.jpg",
    },
  ];

  const villageContainer = document.querySelector(".village-items");
  const sortSelect = document.querySelector(".sort-by select");
  const searchInput = document.querySelector(".search-sort input");
  const viewDetailsModal = document.getElementById("viewDetailsModal");
  const closeViewDetailsBtn = viewDetailsModal.querySelector(".close");

  const renderVillages = (filteredVillages) => {
    villageContainer.innerHTML = "";

    // Display message if no villages match the filter
    if (filteredVillages.length === 0) {
      villageContainer.innerHTML = `<p class="no-results">No villages found.</p>`;
      return;
    }

    // Loop through and display each village
    filteredVillages.forEach((village, index) => {
      const villageItem = document.createElement("div");
      villageItem.classList.add("village-item");
      villageItem.innerHTML = `
        <span>${village.name} - ${village.location}</span>
        <div class="actions">
          <button class="view-btn" data-index="${index}">View</button>
        </div>
      `;
      villageContainer.appendChild(villageItem);
    });

    // Add event listeners for "View" buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        showVillageDetails(index);
      });
    });
  };

  // Function to show details of a selected village
  const showVillageDetails = (index) => {
    const village = villages[index];

    // Update modal with village details
    document.getElementById("villageName").textContent = village.name;
    document.getElementById("villageRegion").textContent = village.location;
    document.getElementById("villageLandArea").textContent = village.landArea;
    document.getElementById("villageLatitude").textContent = village.latitude;
    document.getElementById("villageLongitude").textContent = village.longitude;
    document.getElementById("villageTags").textContent =
      village.tags.join(", ");
    document.getElementById("villageImage").src = village.image;
    document.getElementById("villageImage").alt = `${village.name} Image`;

    // Display the details modal
    viewDetailsModal.style.display = "flex";
  };

  // Handle search and sorting
  const handleSearchAndSort = () => {
    const searchText = searchInput.value.toLowerCase();

    // Filter villages based on search text
    let filteredVillages = villages.filter((village) =>
      village.name.toLowerCase().includes(searchText)
    );

    // Sort the filtered villages if needed
    if (sortSelect.value === "alphabetical") {
      filteredVillages.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Render the filtered and sorted list
    renderVillages(filteredVillages);
  };

  // Function to calculate Total Urban Areas
  const calculateTotalUrbanAreas = () => {
    const urbanTags = ["urban", "city", "town", "metropolis"];
    let totalUrbanAreas = 0;

    villages.forEach((village) => {
      const villageTags = village.tags.map((tag) => tag.toLowerCase());

      const isUrban = villageTags.some((tag) =>
        urbanTags.includes(tag.toLowerCase())
      );
      if (isUrban) {
        totalUrbanAreas++;
      }
    });

    localStorage.setItem("totalUrbanAreas", totalUrbanAreas);

    console.log("Total Urban Areas:", totalUrbanAreas); // طباعة النتيجة في وحدة التحكم
    return totalUrbanAreas;
  };

  // Function to calculate Average Land Area
  const calculateAverageLandArea = () => {
    let totalLandArea = 0;

    // Calculate the total land area of all villages
    villages.forEach((village) => {
      totalLandArea += village.landArea;
    });

    // Calculate the average land area
    const averageLandArea = totalLandArea / villages.length;

    // Update the average land area on the page
    document.getElementById(
      "averageLandAreaValue"
    ).textContent = `Average Land Area: ${averageLandArea.toFixed(2)} sq km`;

    console.log("Average Land Area:", averageLandArea.toFixed(2));
    return averageLandArea.toFixed(2);
  };

  closeViewDetailsBtn.addEventListener("click", () => {
    viewDetailsModal.style.display = "none";
  });

  // Close modals when clicking outside them
  window.addEventListener("click", (event) => {
    if (event.target === viewDetailsModal) {
      viewDetailsModal.style.display = "none";
    }
  });

  searchInput.addEventListener("input", handleSearchAndSort);
  sortSelect.addEventListener("change", handleSearchAndSort);

  renderVillages(villages);
  calculateTotalUrbanAreas();
  calculateAverageLandArea(); // Call this function when the page loads
});

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("adminName").textContent = currentUser.username;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
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

// Role User or Admin
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
