import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


import About from './pages/About';
import Contact from './pages/Contact';
import CreatorDashboard from './pages/CreatorDashboard';
import Home from './pages/Home'; 

const App = () => {
  const { loginWithRedirect } = useAuth0();

  const handleGetStarted = () => {
    loginWithRedirect({
      redirect_uri: "http://localhost:3000/CreatorDashboard" 
    });
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CreatorDashboard" element={<CreatorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
