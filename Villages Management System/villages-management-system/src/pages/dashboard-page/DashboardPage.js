import React, { useEffect, useRef,useState } from "react";
import Chart from "chart.js/auto";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";
import AdminAvatar from "../../assets/images/Profile.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const ageChartRef = useRef(null);
  const genderChartRef = useRef(null);
  const populationChartRef = useRef(null);
  const mapRef = useRef(null);
  const [username, setUsername] = useState("");
     
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username );
    } 
    

    const userRole = localStorage.getItem("userRole") || "user"; 

    const updateLinks = () => {
      const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");
      sidebarLinks.forEach((link) => {
        if (link.getAttribute("data-role") === "village") {
          link.href = userRole === "admin" ? "../village-management-page" : "../village-management-page-User";
        } else if (link.getAttribute("data-role") === "gallery") {
          link.href = userRole === "admin" ? "../gallery-page" : "../gallery-page-User";
        }
      });
    };

    updateLinks();

    
      const createChart = (ctx, config) => {
        if (ctx && ctx.chartInstance) {
          ctx.chartInstance.destroy();
        }
        ctx.chartInstance = new Chart(ctx, config);
      };
  
      createChart(ageChartRef.current.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
          datasets: [
            {
              data: [20, 30, 25, 15, 10],
              backgroundColor: [
                "#a74c65",
                "#2f72a3",
                "#D4A32C",
                "#3c8489",
                "#7056b7",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  const total = tooltipItem.dataset.data.reduce(
                    (acc, curr) => acc + curr,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `${tooltipItem.label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
  
      createChart(genderChartRef.current.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [55, 45],
              backgroundColor: ["#2f72a3", "#a74c65"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  const total = tooltipItem.dataset.data.reduce(
                    (acc, curr) => acc + curr,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `${tooltipItem.label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
  
      createChart(populationChartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: [
            "Jabalia",
            "Beit Lahia",
            "Quds",
            "Shejaiya",
            "Hebron",
            "Nablus",
            "Ramallah",
            "Beit Jala",
          ],
          datasets: [
            {
              label: "Population",
              data: [50000, 30000, 20000, 60000, 200000, 150000, 100000, 20000],
              backgroundColor: "#3c8489",
              borderColor: "#009fa6",
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => value.toLocaleString(),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) =>
                  `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()}`,
              },
            },
          },
        },
      });
  
      if (!mapRef.current) {
        mapRef.current = L.map("map-container").setView([31.5, 34.4667], 10);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
  
        const marker = L.marker([31.5, 34.4667]).addTo(mapRef.current);
        marker.bindPopup("<b>Location</b>").openPopup();
      }
  
      const totalVillagesElement = document.querySelector(".stat p");
      const totalVillages = localStorage.getItem("totalVillages") || "8";
      totalVillagesElement.textContent = totalVillages;
  
      const currentPath = window.location.pathname;
      const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");
      sidebarLinks.forEach((link) => {
        if (link.href.includes(currentPath)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
  
      const averageLandArea = localStorage.getItem("averageLandArea");
      const averageLandAreaDisplay = document.getElementById(
        "averageLandAreaDisplay"
      );
      if (averageLandAreaDisplay && averageLandArea) {
        averageLandAreaDisplay.textContent = `Average Land Area: ${averageLandArea} hectares`;
      }
  
      const totalUrbanAreas = localStorage.getItem("totalUrbanAreas");
      const totalUrbanAreasDisplay = document.getElementById(
        "totalUrbanAreasDisplay"
      );
      if (totalUrbanAreasDisplay) {
        totalUrbanAreasDisplay.textContent =
          totalUrbanAreas || "No urban areas data available.";
      }
    }, []);

 

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" className="active">
                Overview
              </Link>
            </li>
            <li>
              <a href="/village-user" data-role="village">
                Village Management
              </a>
            </li>
            <li>
              <a href="/chat">Chat</a>
            </li>
            <li>
              <a href="/gallery-user" data-role="gallery">
                Gallery
              </a>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar" />
          <span id="adminName"> {username}</span>
          <a href="/" onClick={handleLogout} id="logoutButton">
            Logout
          </a>
        </div>
      </aside>
      <main className="content">
        <section className="overview">
          <h2>Overview</h2>
          <div className="map">
            <div id="map-container" style={{ height: "300px" }}></div>
          </div>
          <div className="stats">
            <div className="stat">
              <h3>Total Number of Villages</h3>
              <p>8</p>
            </div>
            <div className="stat">
              <h3>Total Number of Urban Areas</h3>
              {/* <p id="totalUrbanAreasDisplay">3</p> */}
              <p>3</p>
            </div>
            <div className="stat">
              <h3>Total Population Size</h3>
              <p>660,000</p>
            </div>
            <div className="stat">
              <h3>Average Land Area</h3>
              <p id="averageLandAreaDisplay">11.88</p>
            </div>
          </div>
        </section>
        <section className="charts">
          <div className="chart">
            <h3>Age Distribution</h3>
            <canvas ref={ageChartRef} id="ageDistributionChart"></canvas>
          </div>
          <div className="chart">
            <h3>Gender Ratios</h3>
            <canvas ref={genderChartRef} id="genderRatiosChart"></canvas>
          </div>
        </section>
        <section className="bar-chart">
          <h3>Population</h3>
          <canvas ref={populationChartRef} id="populationChart"></canvas>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
