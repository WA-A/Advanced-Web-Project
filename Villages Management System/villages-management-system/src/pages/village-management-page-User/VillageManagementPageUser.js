import React, { useState } from "react";
import "./Village.css";
import AdminAvatar from "../../assets/images/Profile.png";

function VillageManagement() {
  const [adminName, setAdminName] = useState("Admin");
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewVillage = (village) => {
    setSelectedVillage(village);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedVillage(null);
  };

  const filteredVillages = villageList.filter((village) =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <span>{adminName}</span>
          <a href="/" id="logoutButton">
            Logout
          </a>
        </div>
      </aside>

      <div className="main-content">
        <div className="village-list">
          <h3>View Village List</h3>
          <div className="search-sort">
            <input
              type="text"
              placeholder="Search villages..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="village-items">
            {filteredVillages.length > 0 ? (
              filteredVillages.map((village, index) => (
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
                  </div>
                </div>
              ))
            ) : (
              <p>No villages found.</p>
            )}
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default VillageManagement;
