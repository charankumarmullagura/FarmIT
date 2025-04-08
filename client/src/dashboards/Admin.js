import React, { useState } from "react";
import "./Admin.css";
import Users from "../admin/UserList";
import Reports from "../admin/ReportList";
import Loan from "../admin/AdminLoans";
import Farm from "../admin/Farm";
import AllProfiles from "../admin/AllProfiles"
import VerifyLoans from "../admin/VerifyLoans"
import { Link } from "react-router-dom";

function Admin() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">FarmIT - Admin</h1>
          <ul className="nav-links">
            <li>
              <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
            </li>
            <li>
              <Link to="/Login">
                <button className="add-farm-button">Log Out</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {activeSection === null && (
        <div className="card-container">
          <ul className="admin-ul">
            <li>
              <div className="card">
                <h2>💰 Loans</h2>
                <p>Manage and track all loan applications.</p>
                <button className="card-link" onClick={() => setActiveSection("loan")}>View Loans</button>
              </div>
            </li>
            <li>
              <div className="card">
                <h2>🌾 Farms</h2>
                <p>View and manage all registered farms.</p>
                <button className="card-link" onClick={() => setActiveSection("farm")}>Manage Farms</button>
              </div>
            </li>
            <li>
              <div className="card">
                <h2>👨‍🌾 Verify Users</h2>
                <p>Manage and oversee all users on the platform.</p>
                <button className="card-link" onClick={() => setActiveSection("users")}>Verify Users</button>
              </div>
            </li>
            <li>
              <div className="card">
                <h2>📂 Verify Profile</h2>
                <p>Manage and oversee all documents on the platform.</p>
                <button className="card-link" onClick={() => setActiveSection("AllProfiles")}>Verify Profiles</button>
              </div>
            </li>
          </ul>
          <ul className="admin-ul">
          <li>
              <div className="card">
                <h2>📂 Verify Loans</h2>
                <p>Manage and oversee all loans on the platform.</p>
                <button className="card-link" onClick={() => setActiveSection("VerifyLoans")}>Verify Loans</button>
              </div>
            </li>
          <li>
              <div className="card">
                <h2>📜Verify Reports</h2>
                <p>Monitor reports related to loans and farms.</p>
                <button className="card-link" onClick={() => setActiveSection("reports")}>Verify Reports</button>
              </div>
            </li>
            {/* <li>
              <div className="card">
                <h2>📱 Profile</h2>
                <p>Access and update your admin profile.</p>
                <button className="card-link" onClick={() => setActiveSection("profile")}>View Profile</button>
              </div>
            </li> */}
          </ul>
        </div>
      )}
      <div className="admin-content">
        {activeSection === "loan" && <Loan />}
        {activeSection === "farm" && <Farm />}
        {activeSection === "users" && <Users />}
        {activeSection === "reports" && <Reports />}
        {activeSection === "AllProfiles" && <AllProfiles />}
        {activeSection === "VerifyLoans" && <VerifyLoans />}
      </div>
    </div>
  );
}

export default Admin;
