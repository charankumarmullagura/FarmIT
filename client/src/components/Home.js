import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
        const navigate = useNavigate();
      
        const handleNavigate = () => {
          navigate('/about');
        };
  return (
    <>
      <header className="farmit-hero">
        <div className="farmit-hero-content">
          <h1>Empowering Farmers, Enabling Growth</h1>
          <p>Connecting farmers and investors for a better tomorrow</p>
          <a href="#farmit-about" className="farmit-cta-btn">Learn More</a>
        </div>
      </header>

      <section className="farmit-section farmit-impact">
        <h2>Welcome To <span className="farmit-green">FarmIT</span></h2>
        <div className="farmit-stats">
        <div className="farmit-stat">
  <img
    src="https://cdn.prod.website-files.com/62551fa7bee8db16e944f95d/6321c9321900d229963842c0_18%2C000%2B%20Registered%20farmers.webp"
    alt="Farmers"
    className="farmit-stat-image"
  />
  <h3>10+</h3>
  <p>Farmers Supported</p>
</div>
          <div className="farmit-stat">
          <img
    src="https://cdn.prod.website-files.com/62551fa7bee8db16e944f95d/6321c9321900d229963842c0_18%2C000%2B%20Registered%20farmers.webp"
    alt="Investor"
    className="farmit-stat-image"
  />
            <h3>15+</h3>
            <p>Investors Supported</p>
          </div>
          <div className="farmit-stat">
          <img
    src="https://logodix.com/logo/79398.png"
    alt="Investment"
    className="farmit-stat-image"
  />
            <h3>30+</h3>
            <p>Investment Raised</p>
          </div>
        </div>
      </section>

      <section id="farmit-about" className="farmit-section farmit-about">
        <div className="farmit-container">
          <div className="farmit-about-text">
            <h2>Who We Are</h2>
            <p>
              <strong>FarmIT</strong> is a digital bridge between farmers in need of support and investors looking for meaningful, impact-driven opportunities. We empower rural farmers by providing them access to funding, tools, and training they need to modernize agriculture.
            </p>
            <p>
              We are committed to building a transparent ecosystem where investors can directly contribute to agricultural development while enjoying sustainable returns. Our platform ensures every transaction is monitored, secure, and beneficial to both ends.
            </p>
            <button className="farmit-navigate-btn-1" onClick={handleNavigate}>
            Explore
          </button>
          </div>
          <div className="farmit-about-image">
            <img src="https://img.freepik.com/free-photo/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed_181624-25838.jpg?t=st=1744188083~exp=1744191683~hmac=a9b7ab89346bb7429acae2b14e30e1902050e65f92000f9fe212c15f3f22e21f&w=996" alt="Farm" />
          </div>
        </div>
      </section>

      <section className="farmit-section farmit-services">
        <h2>Our Services</h2>
        <div className="farmit-cards">
          <div className="farmit-card">
            <h3>Loan Assistance</h3>
            <p>Easy access to agricultural loans with transparent terms.</p>
          </div>
          <div className="farmit-card">
            <h3>Farm Investments</h3>
            <p>Invest directly in farms and help them grow.</p>
          </div>
          <div className="farmit-card">
            <h3>Farmer Support</h3>
            <p>Tools and resources for better productivity and sustainability.</p>
          </div>
        </div>
      </section>

      <footer className="farmit-footer">
  <div className="farmit-footer-content">
    <div className="farmit-footer-columns">
      <div className="farmit-contact">
        <h3>Contact Us</h3>
        <p>
          <strong>FarmIT PVT.Limited</strong><br />
          Registered Office:<br />
          Gat No 111/1, 123/2/3, Hyderabad,<br />
          District HYDERAABAD, HYDERABAD 500001, India<br /><br />
          <strong>Phone:</strong> 00000000000<br />
          <strong>Email:</strong> <a href="mailto:charan.mullagura@healthofin.com">charan.mullagura@healthofin.com</a>
        </p>
      </div>

      <div className="farmit-help">
        <h3>Help</h3>
        <ul>
          <li><a href="/">FAQs</a></li>
          <li><a href="/">Terms & Conditions</a></li>
          <li><a href="/">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div className="farmit-socials">
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" />
      </a>
    </div>

    <p>&copy; 2025 FarmIT. All rights reserved.</p>
  </div>
</footer>

    </>
  );
}

export default HomePage;