// import React, { useState } from "react";
// import "./Investor.css";
// import Profile from "../investor/Profile";
// import Loans from "../investor/InvLoans";
// import Investments from "../investor/Investments";
// import Documentupload from "../investor/DocumentUpload";
// import InvestorTracking from "../investor/InvestorTracking";
// import Issue from "../investor/Issues";
// import GetProfile1 from "../investor/Getprofile";
// import MyIssues from "../investor/Myissues";
// import { Link } from "react-router-dom";

// function Investor() {
//   const [activeSection, setActiveSection] = useState(null);

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="container">
//           <h1 className="logo">🌱FarmIT - Investor</h1>
//           <ul className="nav-links">
//             <li>
//               <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
//             </li>
//             <li>
//               <Link to="/Login">
//                 <button className="add-farm-button">LogOut</button>
//               </Link>
//             </li>
//             <li>
//               <button onClick={() => setActiveSection("getprofile")} className="nav-link">👨🏻‍💼</button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {activeSection === null && (
//         <div className="card-container">
//           <ul className="investor-ul">
//             <div className="card">
//               <h2>💰 Loans</h2>
//               <p>View all loans applications </p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("loans")}>Manage Loans</button>
//               </li>
//             </div>
//             <div className="card">
//               <h2>💰 Investments</h2>
//               <p>Track your investments efficiently.</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("investments")}>View Investments</button>
//               </li>
//             </div>
//             <div className="card">
//               <h2>📈 InvestorTracking</h2>
//               <p>Access all your investments</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("InvestorTracking")}>InvestorTracking</button>
//               </li>
//             </div>
//             <div className="card">
//               <h2>📜 Issues</h2>
//               <p>Report any issues.</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("issues")}>View Issues</button>
//               </li>
//             </div>
//             </ul>
//             <ul className="investor-ul">
//             <div className="card">
//               <h2>📜 My Issue</h2>
//               <p>View and update your issues.</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("MyIssues")}>View Issues</button>
//               </li>
//             </div>
//             <div className="card">
//               <h2>📜 Document Upload</h2>
//               <p>Upload important  documents.</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("documentupload")}>Upload Documents</button>
//               </li>
//             </div>
//             <div className="card">
//               <h2>📱 Profile</h2>
//               <p>Update your investor profile details.</p>
//               <li>
//                 <button className="card-link" onClick={() => setActiveSection("profile")}>View Profile</button>
//               </li>
//             </div>
//             </ul>
//         </div>
//       )}

//       <div className="investor-content">
//         {activeSection === "loans" && <Loans />}
//         {activeSection === "investments" && <Investments />}
//         {activeSection === "InvestorTracking" && <InvestorTracking/>}
//         {activeSection === "issues" && <Issue />}
//         {activeSection === "profile" && <Profile />}
//         {activeSection === "getprofile" && <GetProfile1 />}
//         {activeSection === "documentupload" && <Documentupload />}
//         {activeSection === "MyIssues" && <MyIssues />}
//       </div>
//     </div>
//   );
// }

// export default Investor;










import React, { useState, useEffect } from "react";
import "./Investor.css";
import Profile from "../investor/Profile";
import Loans from "../investor/InvLoans";
import Investments from "../investor/Investments";
import Documentupload from "../investor/DocumentUpload";
import InvestorTracking from "../investor/InvestorTracking";
import Issue from "../investor/Issues";
import GetProfile1 from "../investor/Getprofile";
import MyIssues from "../investor/Myissues";
import { Link, useLocation } from "react-router-dom";
import API from "../components/api";
function Investor() {
  const [activeSection, setActiveSection] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await API.get("/getprofilebyid");
        if (res.status === 200) {
          setProfileExists(true);
        }
      } catch (error) {
        setProfileExists(false);
      }
    };

    checkProfile();

    const params = new URLSearchParams(location.search);
    if (params.get("openprofile") === "true") {
      setActiveSection("profile");
    }
  }, [location]);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">🌱FarmIT - Investor</h1>
          <ul className="nav-links">
            <li>
              <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
            </li>
            <li>
              <Link to="/Login">
                <button className="add-farm-button">LogOut</button>
              </Link>
            </li>
            <li>
              <button onClick={() => setActiveSection("getprofile")} className="nav-link">👨🏻‍💼</button>
            </li>
          </ul>
        </div>
      </nav>

      {activeSection === null && (
        <div className="card-container">
          <ul className="investor-ul">
            <div className="card">
              <h2>💰 Loans</h2>
              <p>View all loans applications </p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("loans")}>Manage Loans</button>
              </li>
            </div>
            <div className="card">
              <h2>💰 Investments</h2>
              <p>Track your investments efficiently.</p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("investments")}>View Investments</button>
              </li>
            </div>
            <div className="card">
              <h2>📈 InvestorTracking</h2>
              <p>Access all your investments</p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("InvestorTracking")}>InvestorTracking</button>
              </li>
            </div>
            <div className="card">
              <h2>📜 Issues</h2>
              <p>Report any issues.</p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("issues")}>View Issues</button>
              </li>
            </div>
          </ul>

          <ul className="investor-ul">
            <div className="card">
              <h2>📜 My Issue</h2>
              <p>View and update your issues.</p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("MyIssues")}>View Issues</button>
              </li>
            </div>
            <div className="card">
              <h2>📜 Document Upload</h2>
              <p>Upload important documents.</p>
              <li>
                <button className="card-link" onClick={() => setActiveSection("documentupload")}>Upload Documents</button>
              </li>
            </div>
            <div
              className={`card ${profileExists ? "disabled" : ""}`}
              onClick={() => !profileExists && setActiveSection("profile")}
            >
              <h2>📱 Profile</h2>
              <p>{profileExists ? "Profile is locked after creation." : "Update your investor profile details."}</p>
              <li>
                <button className="card-link" disabled={profileExists}>
                  {profileExists ? "🔒 Profile Locked" : "👤 Edit Profile"}
                </button>
              </li>
            </div>
          </ul>
        </div>
      )}

      <div className="investor-content">
        {activeSection === "loans" && <Loans />}
        {activeSection === "investments" && <Investments />}
        {activeSection === "InvestorTracking" && <InvestorTracking />}
        {activeSection === "issues" && <Issue />}
        {activeSection === "profile" && (profileExists ? <GetProfile1 /> : <Profile />)}
        {activeSection === "getprofile" && <GetProfile1 />}
        {activeSection === "documentupload" && <Documentupload />}
        {activeSection === "MyIssues" && <MyIssues />}
      </div>
    </div>
  );
}

export default Investor;
