import React, { useState ,useEffect} from "react";
import "./Village.css";
import AdminAvatar from "../../assets/images/Profile.png";

function VillageManagement() {
  const [adminName, setAdminName] = useState("Admin");
  const [username, setUsername] = useState("");
  const [villageName, setVillageName] = useState("");
  const [regionDistrict, setRegionDistrict] = useState("");
  const [landArea, setLandArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [categoriesTags, setCategoriesTags] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [villageList, setVillageList] = useState([
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
  ]);
  const [originalVillageList] = useState(villageList);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDemographicModalVisible, setIsDemographicModalVisible] =
    useState(false);
  const [currentVillage, setCurrentVillage] = useState(null);

  // Function to open the demographic modal and set the village name dynamically
  const openDemographicModal = (villageName) => {
    const selectedVillage = villageList.find(
      (village) => village.name === villageName
    );
    setCurrentVillage(selectedVillage);
    setIsDemographicModalVisible(true);
  };

  // Function to close the demographic modal
  const closeDemographicModal = () => {
    setIsDemographicModalVisible(false);
  };

  // مش جاهز لسا
  // Handle form submission for updating demographic data
  const handleDemographicData = (event) => {
    event.preventDefault();

    // Get the village name from the modal header
    const villageName = document.getElementById(
      "demographicVillageName"
    ).textContent;

    // Find the village object in the villages array by name
    const index = villageList.findIndex(
      (village) => village.name === villageName
    );

    if (index !== -1) {
      // Get the form values
      const populationSize = document.getElementById("populationSize").value;
      const ageDistribution = document.getElementById("ageDistribution").value;
      const genderRatios = document.getElementById("genderRatios").value;
      const populationGrowthRate = document.getElementById(
        "populationGrowthRate"
      ).value;

      // Update the demographic data for the selected village
      const updatedVillage = {
        ...villageList[index],
        demographics: {
          populationSize,
          ageDistribution,
          genderRatios,
          populationGrowthRate,
        },
      };

      // Update the village list with the new demographic data
      const updatedVillages = villageList.map((village) =>
        village.name === villageName ? updatedVillage : village
      );

      // Save the updated village list to localStorage
      localStorage.setItem("villages", JSON.stringify(updatedVillages));

      // Update state if necessary
      setVillageList(updatedVillages);

      // Alert to confirm success
      alert("Demographic data updated successfully!");

      // Close the modal after submission
      closeDemographicModal();
    } else {
      alert("Village not found!");
    }
  };

  // Open the update modal and populate the selected village data
  const openUpdateModal = (index) => {
    setSelectedVillage(villageList[index]);
    setIsUpdateModalVisible(true);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };

  // Handle form submission for updating the village
  const handleUpdateVillage = (event) => {
    event.preventDefault();
    const updatedVillage = {
      ...selectedVillage,
      location:
        event.target.updateRegionDistrict.value || selectedVillage.location,
      landArea:
        parseFloat(event.target.updateLandArea.value) ||
        selectedVillage.landArea,
      latitude: event.target.updateLatitude.value || selectedVillage.latitude,
      longitude:
        event.target.updateLongitude.value || selectedVillage.longitude,
    };

    const updatedVillages = villageList.map((village) =>
      village.name === selectedVillage.name ? updatedVillage : village
    );
    setVillageList(updatedVillages);
    localStorage.setItem("villages", JSON.stringify(updatedVillages));

    alert("Village updated successfully!");
    closeUpdateModal();
  };

  const itemsPerPage = 4;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    alert("Logged out!");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    if (sortValue === "default") {
      setVillageList(originalVillageList);
    } else if (sortValue === "alphabetical") {
      const sortedList = [...villageList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setVillageList(sortedList);
    }
  };

  const handleAddVillageSubmit = (e) => {
    e.preventDefault();

    const newVillage = {
      name: villageName,
      location: regionDistrict,
      landArea: landArea,
      latitude: latitude,
      longitude: longitude,
      tags: categoriesTags.split(",").map((tag) => tag.trim()),
      image: "default-image.jpg",
    };

    const existingVillages = JSON.parse(localStorage.getItem("villages")) || [];

    const updatedVillages = [...existingVillages, newVillage];

    localStorage.setItem("villages", JSON.stringify(updatedVillages));

    setVillageList(updatedVillages);

    // Close the modal and reset the form
    closeModal();
    resetForm();
  };

  const resetForm = () => {
    setVillageName("");
    setRegionDistrict("");
    setLandArea("");
    setLatitude("");
    setLongitude("");
    setCategoriesTags("");
  };

  const filteredVillages = villageList.filter((village) =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVillages.length / itemsPerPage);

  const paginatedVillages = filteredVillages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteVillage = (index) => {
    const updatedVillageList = villageList.filter((_, i) => i !== index);
    setVillageList(updatedVillageList);

    localStorage.setItem("villages", JSON.stringify(updatedVillageList));
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedVillage(null);
  };

  const handleViewVillage = (village) => {
    setSelectedVillage(village);
    setIsViewModalOpen(true);
  };


  useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUsername(parsedUser.username );
        } 
      }, []);
      
  return (
    <div className="dashboard-village-management">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Overview</a>
            </li>
            <li>
              <a href="/village-management" className="active">
                Village Management
              </a>
            </li>
            <li>
              <a href="/chat">Chat</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar" />
          <span id="adminName"> {username}</span>
          <a href="/" id="logoutButton" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </aside>

      <div className="main-content">
        <button className="add-village-btn" onClick={openModal}>
          Add New Village
        </button>
        <div className="village-list">
          <h3>View Village List</h3>
          <div className="search-sort">
            <input
              type="text"
              placeholder="Search villages..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="select-pagination">
              <div className="sort-by">
                <span>Sort by: </span>
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Default</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="pagination">
                <span>Page: {currentPage}</span>
                <button
                  className="prev-btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="next-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="village-items">
            {paginatedVillages.length > 0 ? (
              paginatedVillages.map((village, index) => (
                <div key={index} className="village-item">
                  <span>
                    {village.name} - {village.location}
                  </span>
                  <div className="actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewVillage(village)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => openUpdateModal(index)}
                      className="update-btn"
                    >
                      Update Village
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteVillage(
                          (currentPage - 1) * itemsPerPage + index
                        )
                      }
                    >
                      Delete Village
                    </button>
                    <button
                      onClick={() => openDemographicModal(village.name)}
                      className="demographic-btn"
                    >
                      Update Demographic Data
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No villages found.</p>
            )}
          </div>
        </div>

        {/* Add Village Modal */}
        {isModalOpen && (
          <div id="addVillageModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Add New Village</h2>
              <form onSubmit={handleAddVillageSubmit}>
                <label htmlFor="villageName">Village Name:</label>
                <input
                  type="text"
                  id="villageName"
                  name="villageName"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  required
                />

                <label htmlFor="regionDistrict">Region/District:</label>
                <input
                  type="text"
                  id="regionDistrict"
                  name="regionDistrict"
                  value={regionDistrict}
                  onChange={(e) => setRegionDistrict(e.target.value)}
                  required
                />

                <label htmlFor="landArea">Land Area (sq km):</label>
                <input
                  type="number"
                  id="landArea"
                  name="landArea"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                />

                <label htmlFor="latitude">Latitude:</label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />

                <label htmlFor="longitude">Longitude:</label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />

                <label htmlFor="uploadImage">Upload Image:</label>
                <input type="file" id="uploadImage" name="uploadImage" />

                <label htmlFor="categoriesTags">Categories/Tags:</label>
                <input
                  type="text"
                  id="categoriesTags"
                  name="categoriesTags"
                  value={categoriesTags}
                  onChange={(e) => setCategoriesTags(e.target.value)}
                  placeholder="e.g., rural, urban"
                />
                <button type="submit">Add Village</button>
              </form>
            </div>
          </div>
        )}

        {/* View Village Modal */}
        {isViewModalOpen && selectedVillage && (
          <div id="viewDetailsModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeViewModal}>
                &times;
              </span>
              <h2>Village Details</h2>
              <p>
                <strong>Village Name: </strong>
                <span>{selectedVillage.name}</span>
              </p>
              <p>
                <strong>Region/District: </strong>
                <span>{selectedVillage.location}</span>
              </p>
              <p>
                <strong>Land Area (sq km): </strong>
                <span>{selectedVillage.landArea}</span>
              </p>
              <p>
                <strong>Latitude: </strong>
                <span>{selectedVillage.latitude}</span>
              </p>
              <p>
                <strong>Longitude: </strong>
                <span>{selectedVillage.longitude}</span>
              </p>
              <p>
                <strong>Tags: </strong>
                <span>{selectedVillage.tags.join(", ")}</span>
              </p>
              <img
                id="villageImage"
                src={selectedVillage.image}
                alt={`${selectedVillage.name} Image`}
              />
            </div>
          </div>
        )}

        {isUpdateModalVisible && (
          <div id="updateVillageModal" className="modal">
            <div className="modal-content">
              <span onClick={closeUpdateModal} className="close update-close">
                &times;
              </span>
              <h2>Update Village</h2>
              <form id="updateVillageForm" onSubmit={handleUpdateVillage}>
                <label htmlFor="updateVillageName">Village Name:</label>
                <input
                  type="text"
                  id="updateVillageName"
                  name="villageName"
                  value={selectedVillage?.name || ""}
                  disabled
                />

                <label htmlFor="updateRegionDistrict">Region/District:</label>
                <input
                  type="text"
                  id="updateRegionDistrict"
                  name="regionDistrict"
                  defaultValue={selectedVillage?.location || ""}
                  required
                />

                <label htmlFor="updateLandArea">Land Area (sq km):</label>
                <input
                  type="number"
                  id="updateLandArea"
                  name="landArea"
                  defaultValue={selectedVillage?.landArea || ""}
                />

                <label htmlFor="updateLatitude">Latitude:</label>
                <input
                  type="text"
                  id="updateLatitude"
                  name="latitude"
                  defaultValue={selectedVillage?.latitude || ""}
                />

                <label htmlFor="updateLongitude">Longitude:</label>
                <input
                  type="text"
                  id="updateLongitude"
                  name="longitude"
                  defaultValue={selectedVillage?.longitude || ""}
                />

                <label htmlFor="updateUploadImage">Upload Image:</label>
                <input type="file" id="updateUploadImage" name="uploadImage" />
                <button type="submit">Update Village</button>
              </form>
            </div>
          </div>
        )}

        {isDemographicModalVisible && (
          <div id="demographicModal" className="modal">
            <div className="modal-content">
              <span onClick={closeDemographicModal} className="close">
                &times;
              </span>
              <h2>
                Add Demographic Data for
                <span id="demographicVillageName"></span>
              </h2>
              <form id="demographicForm" onSubmit={handleDemographicData}>
                <label htmlFor="populationSize">Population Size:</label>
                <input
                  type="number"
                  id="populationSize"
                  name="populationSize"
                  required
                />

                <label htmlFor="ageDistribution">Age Distribution:</label>
                <input
                  type="text"
                  id="ageDistribution"
                  name="ageDistribution"
                  placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%"
                />

                <label htmlFor="genderRatios">Gender Ratios:</label>
                <input
                  type="text"
                  id="genderRatios"
                  name="genderRatios"
                  placeholder="e.g., Male: 51%, Female: 49%"
                />

                <label htmlFor="populationGrowthRate">
                  Population Growth Rate:
                </label>
                <input
                  type="text"
                  id="populationGrowthRate"
                  name="populationGrowthRate"
                />

                <button type="submit">Add Demographic Data</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VillageManagement;
