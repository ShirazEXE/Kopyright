import React, { useState, useEffect } from 'react';
import "../pages_styles/InvestorDashboard.css";
import { useNavigate } from 'react-router-dom';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [boughtContent, setBoughtContent] = useState([]);

  useEffect(() => {
    fetch("/api/investorContent")
     .then((response) => response.json())
     .then((data) => {
        setBoughtContent(data);
      })
     .catch((error) => console.error("Error fetching bought content:", error));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', });
      navigate('/', { replace: true }); // redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleMarketplaceClick = () => {
    navigate('/marketplace');
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  return (
    <div className="investor-dashboard-container">
      <button className="hamburger-btn" onClick={toggleFilterSidebar}>
        ☰
      </button>
      <div className={`filter-sidebar ${isFilterSidebarOpen? 'open' : ''}`}>
        <button className="sidebar-btn" onClick={handleMarketplaceClick}>
          Go to Marketplace
        </button>
        <button className="sidebar-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="welcome-container">
        <h1>Welcome to the Investor Dashboard!</h1>
        <p>You are now logged in as an Investor.</p>
        <p>Here you can view your investment portfolio and make informed investment decisions.</p>
      </div>
      <div className="transaction-history-container">
        <h2>Transaction History</h2>
        {boughtContent.length > 0? (
          <div>
            {boughtContent.map((content, index) => (
              <div key={index} className="content-item">
                <h3>{content.title}</h3>
                <p>Description: {content.description}</p>
                <p>Initial Valuation: ${content.price}</p>
                <p>Price per Share: ${(content.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bought content available.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;