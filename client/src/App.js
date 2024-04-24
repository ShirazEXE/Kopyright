import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import CreatorDashboard from './pages/CreatorDashboard';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CreatorDashboard" element={<CreatorDashboard />} />
        <Route path="/Marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
};

export default App;