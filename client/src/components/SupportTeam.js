import React from 'react';
import './SupportTeam.css';

function SupportTeam() {
  return (
    <div className="support-container">
      <h2>Support Team</h2>
      <p>Our support team ensures smooth communication and problem-solving for both farmers and investors.</p>
      
      <div className="cards-container">
        <div className="card">
          <h3>24/7 Assistance</h3>
          <p>Our team is available round the clock to help farmers and investors with their queries.</p>
        </div>
        <div className="card">
          <h3>Expert Guidance</h3>
          <p>Get expert advice on investment strategies, farming techniques, and loan management.</p>
        </div>
        <div className="card">
          <h3>Seamless Communication</h3>
          <p>We bridge the gap between farmers and investors, ensuring smooth interactions and transactions.</p>
        </div>
        <div className="card">
          <h3>Contact Us</h3>
          <p>Phone Number: 000000000 <br/>
          <a href="mailto:support@example.com">support@example.com</a> <br/>
            Address: 123 Main St, City, State, Zipcode
          </p>
        </div>
      </div>
    </div>
  );
}

export default SupportTeam;
