document.addEventListener("DOMContentLoaded", () => {
  const villages = [
    { name: "Jabalia", location: "Gaza Strip" },
    { name: "Beit Lahia", location: "Gaza Strip" },
    { name: "Quds", location: "West Bank" },
    { name: "Shejaiya", location: "Gaza Strip" },
    { name: "Hebron", location: "West Bank" },
  ];

  const villageContainer = document.querySelector(".village-items");
  const sortSelect = document.querySelector(".sort-by select");
  const searchInput = document.querySelector(".search-sort input");
  const addVillageModal = document.getElementById("addVillageModal");
  const addVillageBtn = document.querySelector(".add-village-btn");
  const closeModalBtn = document.querySelector(".modal .close");

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
          <button class="view-btn">View</button>
          <button class="update-btn">Update Village</button>
          <button class="delete-btn" data-index="${index}">Delete Village</button>
          <button class="demographic-btn">Update Demographic Data</button>
        </div>
      `;
      villageContainer.appendChild(villageItem);
    });

    // Add Event Listeners for "Delete" buttons after rendering
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index);
        deleteVillage(index);
      });
    });
    updateTotalVillages();
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

  searchInput.addEventListener("input", handleSearchAndSort);
  sortSelect.addEventListener("change", handleSearchAndSort);

  addVillageBtn.addEventListener("click", () => {
    addVillageModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    addVillageModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addVillageModal) {
      addVillageModal.style.display = "none";
    }
  });

  // Delete Village
  const deleteVillage = (index) => {
    villages.splice(index, 1); // Remove the selected village
    renderVillages(villages); // Re-render the list
  };

  document.querySelector("#addVillageModal form").addEventListener("submit", (event) => {
      event.preventDefault();

      const villageName = document.getElementById("villageName").value.trim();
      const regionDistrict = document
        .getElementById("regionDistrict")
        .value.trim();

      if (!villageName || !regionDistrict) {
        alert("Please fill in both the village name and region/district.");
        return;
      }

      const newVillage = {
        name: villageName,
        location: regionDistrict,
      };

      villages.push(newVillage);
      renderVillages(villages);
      addVillageModal.style.display = "none";

      document.getElementById("villageName").value = "";
      document.getElementById("regionDistrict").value = "";
    });
    updateTotalVillages();
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


