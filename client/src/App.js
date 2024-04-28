import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import CreatorDashboard from './pages/CreatorDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TermsAndConditions from './pages/terms-and-conditions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CreatorDashboard" element={<CreatorDashboard />} />
        <Route path="/InvestorDashboard" element={<InvestorDashboard />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/Marketplace" element={<Marketplace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;