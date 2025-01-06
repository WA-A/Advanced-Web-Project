import React, { useState, useEffect } from "react";
import "./Gallery.css";

import QudsImage from "../../assets/images/Quds.jpg";
import IbrahimiImage from "../../assets/images/ibrahami.jpg";
import RamallahImage from "../../assets/images/ramallaha.jpg";
import HefaImage from "../../assets/images/hefa.jpg";
import JeninImage from "../../assets/images/jenin.jpg";
import JerichoImage from "../../assets/images/jercio.jpg";
import AdminAvatar from "../../assets/images/Profile.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const GalleryPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [imageList, setImageList] = useState([]);
  // Fetch the user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user"; // Default to "user" if no role is found

  const handleVillageManagement = () => {
    if (role === "admin") {
      navigate("/village-management");
    } else {
      navigate("/village-management-user");
    }
  };
  // Fetch the saved images and user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
    }

    const storedImages = localStorage.getItem("imageList");
    if (storedImages) {
      setImageList(JSON.parse(storedImages));
    } else {
      // Default images if none are saved
      setImageList([
        {
          src: QudsImage,
          alt: "Image of Quds",
          description: "The image of Quds",
        },
        {
          src: IbrahimiImage,
          alt: "Image of Ibrahimi Mosque",
          description: "The image of Ibrahimi Mosque",
        },
        {
          src: RamallahImage,
          alt: "Image of Ramallah",
          description: "The image of Ramallah",
        },
        {
          src: HefaImage,
          alt: "Image of Haifa",
          description: "The image of Haifa",
        },
        {
          src: JeninImage,
          alt: "Image of Jenin",
          description: "The image of Jenin",
        },
        {
          src: JerichoImage,
          alt: "Image of Jericho",
          description: "The image of Jericho",
        },
      ]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="dashboard-gallery">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <button
                className="village-management-link"
                onClick={handleVillageManagement}
                data-role="village"
                style={{
                  background: "none",
                  border: "none",
                  color: "#c7cbd7",
                  cursor: "pointer",
                  padding: 10,
                  margin: 0,
                }}
              >
                Village Management
              </button>
            </li>
            <li>
              <a href="/chat">Chat</a>
            </li>
            <li>
              <Link href="/gallery" className="active">
                Gallery
              </Link>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar" />
          <span id="adminName"> {username}</span>
          <Link to="/" onClick={handleLogout} id="logoutButton">
            Logout
          </Link>
        </div>
      </aside>

      <main className="content-gallery">
        <section className="Images">
          <div className="ListImage">
            {imageList.map((image, index) => (
              <div className="Image1" key={index}>
                <img src={image.src} alt={image.alt} className="avatar" />
                <p>{image.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GalleryPage;
