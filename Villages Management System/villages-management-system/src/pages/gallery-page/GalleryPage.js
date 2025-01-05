import React, { useState,useEffect } from "react";
import "./Gallery.css";

import QudsImage from "../../assets/images/Quds.jpg";
import IbrahimiImage from "../../assets/images/ibrahami.jpg";
import RamallahImage from "../../assets/images/ramallaha.jpg";
import HefaImage from "../../assets/images/hefa.jpg";
import JeninImage from "../../assets/images/jenin.jpg";
import JerichoImage from "../../assets/images/jercio.jpg";
import AdminAvatar from "../../assets/images/Profile.png";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  const [currentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList, setImageList] = useState([
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
      
  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username );
      } 
    }, []);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  };

  const handleAddImage = (event) => {
    event.preventDefault();
    const imageFile = event.target.elements.imageFile.files[0];
    const description = event.target.elements.description.value;

    if (imageFile && description) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = { src: reader.result, alt: description, description };
        setImageList((prevList) => [...prevList, newImage]);
        setIsModalOpen(false);
        event.target.reset();
      };
      reader.readAsDataURL(imageFile);
    } else {
      alert("Please select an image and enter a description.");
    }
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
              <a href="/village-management">Village Management</a>
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
          <div className="button">
            <button
              onClick={() => {
                setIsModalOpen(true);
                console.log("Button clicked");
              }}
              id="openModalButton"
            >
              Add New Image
            </button>
          </div>
          {isModalOpen && (
            <div
              id="addimageModal"
              className={`modal ${isModalOpen ? "show" : ""}`}
            >
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>
                  &times;
                </span>
                <h2>Add New Image</h2>
                <form id="addImageForm" onSubmit={handleAddImage}>
                  <label htmlFor="imageFile">Select Image</label>
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    required
                  />

                  <label htmlFor="description">Description</label>
                  <textarea name="description" rows="3" required></textarea>

                  <button type="submit">Add Image</button>
                </form>
              </div>
            </div>
          )}

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
