import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages_styles/Marketplace.css";

const Marketplace = () => {
  const [contentList, setContentList] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [uploader, setUploader] = useState("all");
  const [filteredContentList, setFilteredContentList] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetch("/api/allContent")
    .then((response) => response.json())
    .then((data) => {
        setContentList(data);
        setFilteredContentList(data);
      })
    .catch((error) => console.error("Error fetching content list:", error));

    // Fetch user role from MongoDB
    fetch("/api/userRole")
    .then((response) => response.json())
    .then((data) => {
        setUserRole(data.role);
      })
    .catch((error) => console.error("Error fetching user role:", error));
  }, []);

  const applyFilter = () => {
    const filteredList = contentList.filter(
      (content) =>
        (uploader === "all" || content.username === uploader) &&
        content.price >= priceRange[0] &&
        content.price <= priceRange[1]
    );
    setFilteredContentList(filteredList);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, value + 1000]);
  };

  const removeFilter = () => {
    setUploader("all");
    setPriceRange([0, 1000]);
    setFilteredContentList(contentList);
  };

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>
      <button className="hamburger-btn" onClick={toggleFilterSidebar}>
        ☰
      </button>
      <div
        className={`filter-sidebar ${isFilterSidebarOpen? "open" : ""}`}
      >
        <div className="filter-container">
          <div>
            <label htmlFor="uploader">Uploader:</label>
            <select
              id="uploader"
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
            >
              <option value="all">All</option>
              {/* Add options for each uploader */}
            </select>
          </div>
          <div className="price-range">
            <label htmlFor="price-range">Price:</label>
            <input
              type="range"
              id="price-range"
              min="0"
              max="10000"
              step="1000"
              value={priceRange[0]}
              onChange={handlePriceChange}
            />
            <div className="price-range-label">
              ${priceRange[1] - 1000}
            </div>
            <button onClick={() => setPriceRange([0, 1000])}>Reset</button>
          </div>
          <button className="apply-btn" onClick={applyFilter}>
            Apply Filter
          </button>
          <button className="remove-filter-btn" onClick={removeFilter}>
            Remove Filter
          </button>
        </div>
        <button className="logout-btn" onClick={() => {
          fetch('/api/logout', { method: 'POST' });
          navigate('/', { replace: true });
        }}>
          Logout
        </button>
      </div>
      <div className="content-container">
        {filteredContentList.length >0? (
          filteredContentList.map((content, index) => (
            <div key={index} className="content-item">
              <h3>{content.title}</h3>
              <p>Uploaded By: {content.username}</p>
              {content.contentType.startsWith("image")? (
                <img
                  src={`data:image/jpg;base64,${content.thumbnailBase64}`}
                  alt="Thumbnail"
                  className="thumbnail"
                />
              ) : (
                <p>Thumbnail unavailable for this content.</p>
              )}
              <div className="content-details">
                <p>{content.description}</p>
                <p>Initial Valuation: ${content.price}</p>
                <p>Price per Share: ${(content.price / 100).toFixed(2)}</p>
                {userRole === "Investor" && (
                  <button className="buy-btn" onClick={() => {
                    // Handle the buy action here, e.g., make a POST request to the API
                    fetch(`/api/buyContent/${content.id}`, { method: 'POST' })
                     .then((response) => response.json())
                     .then((data) => {
                        console.log("Content bought successfully!");
                      })
                     .catch((error) =>
                        console.error("Error buying content:", error)
                      );
                  }}>
                    Buy
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No content available in the marketplace.</p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;