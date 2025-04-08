import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h2>Connecting Farmers & Investors</h2>

      <div className="cards-container">
        <div className="card">
          <h3>The Role of the Admin</h3>
          <p>
            The <strong>admin</strong> plays a crucial role in facilitating secure and transparent interactions.  
            From verifying farmers and investors to initiating funding opportunities,  
            the admin ensures a smooth and reliable process for all stakeholders.
          </p>
        </div>

        <div className="card">
          <h3>Empowering Farmers</h3>
          <p>
            Farmers often face financial challenges when scaling their agricultural ventures.  
            Our platform provides them with the opportunity to secure funding, invest in better  
            resources, and enhance productivity, leading to sustainable growth.
          </p>
        </div>

        <div className="card">
          <h3>Unlocking Investment Potential</h3>
          <p>
            Investors can explore various agricultural projects and make informed investment decisions.  
            By supporting farmers, they not only contribute to the agricultural economy but also  
            receive profitable returns through well-managed farm projects.
          </p>
        </div>

        <div className="card">
          <h3>How It Works</h3>
          <ol>
            <li><strong>Farmers</strong> submit funding requests with project details.</li>
            <li><strong>Admins</strong> verify and approve projects for investment.</li>
            <li><strong>Investors</strong> browse and invest in verified farms.</li>
            <li><strong>Funds</strong> are disbursed securely through the platform.</li>
            <li><strong>Farmers</strong> use investments to scale and repay over time.</li>
            <li><strong>Investors</strong> earn returns based on the project’s success.</li>
          </ol>
        </div>

        <div className="card">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✔️ Secure and Transparent Transactions</li>
            <li>✔️ Verified Farmers and Investors</li>
            <li>✔️ Admin-Mediated Trustworthy Connections</li>
            <li>✔️ Sustainable Agricultural Growth</li>
            <li>✔️ A Win-Win Model for All Stakeholders</li>
          </ul>
        </div>

        <div className="card">
          <h3>Our Mission</h3>
          <p>
            Our goal is to create a sustainable agricultural ecosystem where farmers  
            have access to funding, and investors can support the future of farming  
            while earning fair returns. We believe in leveraging technology to  
            empower rural communities, improve food security, and drive economic growth.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
