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
  const addVillageModal = document.getElementById("addVillageModal");
  const viewDetailsModal = document.getElementById("viewDetailsModal");
  const addVillageBtn = document.querySelector(".add-village-btn");
  const closeAddModalBtn = addVillageModal.querySelector(".close");
  const closeViewDetailsBtn = viewDetailsModal.querySelector(".close");

  const renderVillages = (filteredVillages) => {
    villageContainer.innerHTML = "";

    if (filteredVillages.length === 0) {
      villageContainer.innerHTML = `<p class="no-results">No villages found.</p>`;
      return;
    }
    filteredVillages.forEach((village, index) => {
      const villageItem = document.createElement("div");
      villageItem.classList.add("village-item");
      villageItem.innerHTML = `
        <span>${village.name} - ${village.location}</span>
        <div class="actions">
          <button class="view-btn" data-index="${index}">View</button>
          <button class="update-btn">Update Village</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="demographic-btn">Update Demographic Data</button>
        </div>
      `;
      villageContainer.appendChild(villageItem);
    });

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
    updateTotalVillages();
  };


  const showVillageDetails = (index) => {
    const village = villages[index];

    document.getElementById("villageName").textContent = village.name;
    document.getElementById("villageRegion").textContent = village.location;
    document.getElementById("villageLandArea").textContent = village.landArea;
    document.getElementById("villageLatitude").textContent = village.latitude;
    document.getElementById("villageLongitude").textContent = village.longitude;
    document.getElementById("villageTags").textContent =
      village.tags.join(", ");
    document.getElementById("villageImage").src = village.image;
    document.getElementById("villageImage").alt = `${village.name} Image`;

    viewDetailsModal.style.display = "flex";
  };

  const deleteVillage = (index) => {
    villages.splice(index, 1);
    renderVillages(villages);
  };

  // Update the total number of villages
  const updateTotalVillages = () => {
    const totalVillages = villages.length; 
    localStorage.setItem("totalVillages", totalVillages); 
  };


  renderVillages(villages);


  const handleSearchAndSort = () => {
    const searchText = searchInput.value.toLowerCase();
    let filteredVillages = villages.filter((village) =>
      village.name.toLowerCase().includes(searchText)
    );

    if (sortSelect.value === "alphabetical") {
      filteredVillages.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderVillages(filteredVillages);
  };

  addVillageBtn.addEventListener("click", () => {
    addVillageModal.style.display = "flex";
  });

  closeAddModalBtn.addEventListener("click", () => {
    addVillageModal.style.display = "none";
  });

  closeViewDetailsBtn.addEventListener("click", () => {
    viewDetailsModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addVillageModal) {
      addVillageModal.style.display = "none";
    }
    if (event.target === viewDetailsModal) {
      viewDetailsModal.style.display = "none";
    }
  });


  document
    .querySelector("#addVillageModal form")
    .addEventListener("submit", (event) => {

  // Delete Village
  const deleteVillage = (index) => {
    villages.splice(index, 1); // Remove the selected village
    renderVillages(villages); // Re-render the list
  };

  document.querySelector("#addVillageModal form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const villageName = document.getElementById("villageName").value.trim();
    const regionDistrict = document.getElementById("regionDistrict").value.trim();
    const landArea = parseFloat(document.getElementById("landArea").value) || 0;
    const latitude = document.getElementById("latitude").value.trim() || "N/A";
    const longitude = document.getElementById("longitude").value.trim() || "N/A";
    const tags = document
      .getElementById("categoriesTags")
      .value.split(",")
      .map((tag) => tag.trim());
    const imageFile = document.getElementById("uploadImage").files[0];
    const image = imageFile ? URL.createObjectURL(imageFile) : "default.jpg";
  
    if (!villageName || !regionDistrict) {
      alert("Please fill in both the village name and region/district.");
      return;
    }
  
    const newVillage = {
      name: villageName,
      location: regionDistrict,
      landArea,
      latitude,
      longitude,
      tags,
      image,
    };
  
    villages.push(newVillage);
  
    // Average Land Area
    const totalLandArea = villages.reduce((sum, village) => sum + village.landArea, 0);
    const averageLandArea = totalLandArea / villages.length;
  
    localStorage.setItem("averageLandArea", averageLandArea.toFixed(2)); 
    localStorage.setItem("villages", JSON.stringify(villages));
  

    // Total Number of Urban Areas
    const urbanAreaCount = tags.filter(tag => ["urban", "city", "town", "metropolis"].includes(tag.toLowerCase())).length;
  let totalUrbanAreas = localStorage.getItem("totalUrbanAreas") || 0;
  totalUrbanAreas = parseInt(totalUrbanAreas) + urbanAreaCount;
  localStorage.setItem("totalUrbanAreas", totalUrbanAreas);
  localStorage.setItem("villages", JSON.stringify(villages));

    renderVillages(villages);
    addVillageModal.style.display = "none";
  
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

    updateTotalVillages();
});

});


document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    window.location.href = 'index.html'; 
  } else {
    document.getElementById('adminName').textContent = currentUser.username;
  }
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
