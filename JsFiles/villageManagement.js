document.addEventListener("DOMContentLoaded", () => {
  const villages = [
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

  const addVillageBtn = document.querySelector(".add-village-btn");
  const addVillageModal = document.getElementById("addVillageModal");
  const closeAddModalBtn = addVillageModal.querySelector(".close");

  const viewDetailsModal = document.getElementById("viewDetailsModal");
  const closeViewDetailsBtn = viewDetailsModal.querySelector(".close");

  const updateVillageModal = document.getElementById("updateVillageModal");
  const closeUpdateModalBtn = document.querySelector(".update-close");

  const demographicModal = document.getElementById("demographicModal");
  const closeBtn = demographicModal.querySelector(".close");

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
          <button class="update-btn" data-index="${index}">Update Village</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="demographic-btn" data-index="${index}">Update Demographic Data</button>
        </div>
      `;
      villageContainer.appendChild(villageItem);
    });

    document.querySelectorAll(".update-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const village = villages[index];
        document.getElementById("updateVillageName").value = village.name;
        updateVillageModal.style.display = "flex";
      });
    });

    closeUpdateModalBtn.addEventListener("click", () => {
      updateVillageModal.style.display = "none";
    });

    document
      .getElementById("updateVillageForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const index = villages.findIndex(
          (v) => v.name === document.getElementById("updateVillageName").value
        );
        if (index !== -1) {
          const currentVillage = villages[index];
          const updatedVillage = {
            ...currentVillage,
            location:
              document.getElementById("updateRegionDistrict").value ||
              currentVillage.location,
            landArea:
              parseFloat(document.getElementById("updateLandArea").value) ||
              currentVillage.landArea,
            latitude:
              document.getElementById("updateLatitude").value ||
              currentVillage.latitude,
            longitude:
              document.getElementById("updateLongitude").value ||
              currentVillage.longitude,
          };
          villages[index] = updatedVillage;
          localStorage.setItem("villages", JSON.stringify(villages));
          renderVillages(villages);
          alert("Village updated successfully!");
        }
        updateVillageModal.style.display = "none";
      });

    document.querySelectorAll(".demographic-btn").forEach((button, index) => {
      button.addEventListener("click", () => {
        const village = villages[index];
        document.getElementById("demographicVillageName").textContent =
          village.name;
        if (village.demographics) {
          document.getElementById("populationSize").value =
            village.demographics.populationSize || "";
          document.getElementById("ageDistribution").value =
            village.demographics.ageDistribution || "";
          document.getElementById("genderRatios").value =
            village.demographics.genderRatios || "";
          document.getElementById("populationGrowthRate").value =
            village.demographics.populationGrowthRate || "";
        } else {
          document.getElementById("demographicForm").reset();
        }
        demographicModal.style.display = "flex";
      });
    });

    closeBtn.addEventListener("click", () => {
      demographicModal.style.display = "none";
    });

    document
      .getElementById("demographicForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const index = villages.findIndex(
          (v) =>
            v.name ===
            document.getElementById("demographicVillageName").textContent
        );
        if (index !== -1) {
          villages[index].demographics = {
            populationSize: document.getElementById("populationSize").value,
            ageDistribution: document.getElementById("ageDistribution").value,
            genderRatios: document.getElementById("genderRatios").value,
            populationGrowthRate: document.getElementById(
              "populationGrowthRate"
            ).value,
          };
          localStorage.setItem("villages", JSON.stringify(villages));
          alert("Demographic data updated successfully!");
        }

        demographicModal.style.display = "none";
      });

    // Add event listeners for "View" and "Delete" buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        showVillageDetails(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        deleteVillage(index);
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

  // Function to delete a village
  const deleteVillage = (index) => {
    villages.splice(index, 1);
    localStorage.setItem("villages", JSON.stringify(villages));
    renderVillages(villages);
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
    
    const isUrban = villageTags.some((tag) => urbanTags.includes(tag.toLowerCase()));
    if (isUrban) {
      totalUrbanAreas++;
    }
  });

  localStorage.setItem("totalUrbanAreas", totalUrbanAreas);
  
  console.log("Total Urban Areas:", totalUrbanAreas);  // طباعة النتيجة في وحدة التحكم
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
    document.getElementById("averageLandAreaValue").textContent = `Average Land Area: ${averageLandArea.toFixed(2)} sq km`;

    console.log("Average Land Area:", averageLandArea.toFixed(2));
    return averageLandArea.toFixed(2);
  };

  // Event listener to open the "Add Village" modal
  addVillageBtn.addEventListener("click", () => {
    addVillageModal.style.display = "flex";
  });

  // Event listeners to close modals
  closeAddModalBtn.addEventListener("click", () => {
    addVillageModal.style.display = "none";
  });

  closeViewDetailsBtn.addEventListener("click", () => {
    viewDetailsModal.style.display = "none";
  });

  // Close modals when clicking outside them
  window.addEventListener("click", (event) => {
    if (event.target === addVillageModal) {
      addVillageModal.style.display = "none";
    }
    if (event.target === viewDetailsModal) {
      viewDetailsModal.style.display = "none";
    }
    if (event.target === updateVillageModal) {
      updateVillageModal.style.display = "none";
    }
    if (event.target === demographicModal) {
      demographicModal.style.display = "none";
    }
  });

  document
    .querySelector("#addVillageModal form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // Collect form data
      const villageName = document.getElementById("villageName").value.trim();
      const regionDistrict = document
        .getElementById("regionDistrict")
        .value.trim();
      const landArea =
        parseFloat(document.getElementById("landArea").value) || 0;
      const latitude =
        document.getElementById("latitude").value.trim() || "N/A";
      const longitude =
        document.getElementById("longitude").value.trim() || "N/A";
      const tags = document
        .getElementById("categoriesTags")
        .value.split(",")
        .map((tag) => tag.trim());
      const imageFile = document.getElementById("uploadImage").files[0];
      const image = imageFile ? URL.createObjectURL(imageFile) : "default.jpg";

      // Validate required fields
      if (!villageName || !regionDistrict) {
        alert("Please fill in both the village name and region/district.");
        return;
      }

      // Create a new village object
      const newVillage = {
        name: villageName,
        location: regionDistrict,
        landArea,
        latitude,
        longitude,
        tags,
        image,
      };

      // Add the new village to the list and save to local storage
      villages.push(newVillage);
      localStorage.setItem("villages", JSON.stringify(villages));
      renderVillages(villages);

      // Calculate and log the total number of Urban Areas
      calculateTotalUrbanAreas();

      // Calculate and update the average land area
      calculateAverageLandArea();

      // Reset form
      document.getElementById("villageName").value = "";
      document.getElementById("regionDistrict").value = "";
      document.getElementById("landArea").value = "";
      document.getElementById("latitude").value = "";
      document.getElementById("longitude").value = "";
      document.getElementById("categoriesTags").value = "";
      document.getElementById("uploadImage").value = "";
    });

  searchInput.addEventListener("input", handleSearchAndSort);
  sortSelect.addEventListener("change", handleSearchAndSort);

  renderVillages(villages);
  calculateTotalUrbanAreas();
  calculateAverageLandArea();  // Call this function when the page loads
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
  const villageManagementLink = document.querySelector("a[href='VillageManagement.html']");

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
