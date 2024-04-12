import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../pages_styles/Home.css';

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  const handleGetStarted = () => {
    loginWithRedirect({
      redirect_uri: "http://localhost:3000/CreatorDashboard" // Replace with your authorized callback URL
    });
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Royalty Management System</Link>
          </div>
          <nav className="navigation">
            <ul>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/explore-royalties">Explore Royalties</Link></li>
              <li><button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Unlock the Value of Your Royalties</h1>
            <p>Revolutionize the way you manage and transact your creative assets.</p>
            <button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button>
          </div>
          <div className="hero-image">
            <img src="hero-image.jpg" alt="Royalty Management System" />
          </div>
        </section>

        <section className="features">
          <div className="feature"> 
            <h2>Transparent Transactions</h2>
            <p>Our platform provides a secure and transparent marketplace for buying, selling, and leasing royalties.</p>
          </div>
          <div className="feature">
            <h2>Streamlined Royalty Management</h2>
            <p>Effortlessly track your royalty earnings, manage licensing agreements, and optimize your revenue streams.</p>
          </div>
          <div className="feature">
            <h2>Leveraging Technology</h2>
            <p>We integrate cutting-edge technologies like blockchain and machine learning to enhance your experience.</p>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <blockquote>
              <p>"The Royalty Management System has been a game-changer for my creative business. It's intuitive, secure, and has helped me maximize the value of my royalties."</p>
              <cite>- John Doe, Artist</cite>
            </blockquote>
          </div>
          <div className="testimonial">
            <blockquote>
              <p>"As an investor, I've found the platform to be incredibly user-friendly and transparent. It's made buying and managing royalties a seamless experience."</p>
              <cite>- Jane Smith, Investor</cite>
            </blockquote>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="copyright">
            &copy; 2023 Royalty Management System. All rights reserved.
          </div>
          <nav className="footer-navigation">
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;
