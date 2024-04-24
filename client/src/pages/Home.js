import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../pages_styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">Royalty Management System</Link>
          </div>
          <nav className="navigation">
            <ul>
              <li><Link to="https://linktr.ee/RoyaltyInvestment">How It Works</Link></li>
              <li><Link to="https://linktr.ee/RoyaltyLegalHelp">Legal Help</Link></li>
              <li></li>
              <li></li>
              <button className="btn btn-login" onClick={() => navigate('/login')}>Login</button>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Unlock the Value of Your Royalties</h1>
            <p>Revolutionize the way you manage and transact your creative assets.</p>
            <button className="btn btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
          </div>
        </section>
        <section className="carousel-container">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
            <div className="slide">
              <img src="https://images.unsplash.com/photo-1576926241721-4b830531f667?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" />
              <h3>Invest in your favourite artist</h3>
            </div>
            <div className="slide">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" />
              <h3>Find the right price for your creative assets</h3>
            </div>
          </Carousel>
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