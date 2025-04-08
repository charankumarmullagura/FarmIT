// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "./Farmer.css";
// import LoanRequestForm from "../farmer/FarmerLoans";
// import AddFarms from "../farmer/AddFarms";
// import AllFarms from "../farmer/MyFarms";
// import Issues from "../farmer/Issues";
// import Documentupload from "../farmer/Documentupload";
// import Repay from "../farmer/Repay";
// import MyTransactions from "../farmer/MyTranctions";
// import MyDocuments from "../farmer/MyDocuments";
// import MyIssues from "../farmer/Myissues";
// import GetProfile1 from "../farmer/Getprofile";
// import CreateProfile from "../farmer/Profile.js";
// import { Link, useLocation } from "react-router-dom";

// function Farmer() {
//   const [activeSection, setActiveSection] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("openprofile") === "true") {
//       setActiveSection("profile");
//     }
//   }, [location]);

//   const sections = [
//     { title: "👨‍🌾 Farms", description: "Manage your farms efficiently.", action: "farms", buttonText: "🌱 Add Farm" },
//     { title: "🌾 All Farms", description: "View all farms you have registered.", action: "allFarms", buttonText: "📋 View Farms" },
//     { title: "💰 Loans", description: "Manage and track loan applications.", action: "loans", buttonText: "📄 Apply Loan" },
//     { title: "📜 Issues", description: "Report and monitor issues.", action: "issues", buttonText: "⚠️ Report Issue" },
//     { title: "📜 MyIssues", description: "View and update your issues.", action: "MyIssues", buttonText: "📄 MyIssues"},
//     { title: "📜 Document Upload", description: "Upload important documents.", action: "documentupload", buttonText: "📂 Upload Docs" },
//     { title: "📁 My Documents", description: "View all farm-related documents.", action: "MyDocuments", buttonText: "📑 View Docs" },
//     { title: "💰 Repay", description: "Easily repay your loans.", action: "repay", buttonText: "💵 Make Payment" },
//     { title: "💰 My Transactions", description: "View all transactions.", action: "UserTransactions", buttonText: "📊 View Transactions" },
//     { title: "📱 Profile", description: "View and update your profile.", action: "profile", buttonText: "👤 Edit Profile" },
//   ];

//   return (
//     <div className="body1">
//       {/* Background Video */}
//       <video autoPlay loop muted playsInline className="background-video">
//         <source src="https://videos.pexels.com/video-files/3115488/3115488-uhd_2560_1440_24fps.mp4" type="video/mp4" />
//       </video>

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="container">
//           <h1 className="logo">FarmIT - Farmer</h1>
//           <ul className="nav-links">
//             <li>
//               <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
//             </li>
//             <li>
//               <Link to="/login">
//                 <button className="add-farm-button">LogOut</button>
//               </Link>
//             </li>
//             {/* <li>
//               <Link to="/getprofile">
//               👨🏻‍💼
//               </Link>
//             </li> */}
//             <li>
//   <button onClick={() => setActiveSection("getprofile")} className="nav-link">
//     👨🏻‍💼
//   </button>
// </li>

//           </ul>
//         </div>
//       </nav>

//       {/* Dynamic Content Section */}
//       {activeSection && (
//         <div className="farmer-content">
//           {activeSection === "farms" && <AddFarms />}
//           {activeSection === "allFarms" && <AllFarms />}
//           {activeSection === "loans" && <LoanRequestForm />}
//           {activeSection === "issues" && <Issues />}
//           {activeSection === "documentupload" && <Documentupload />}
//           {activeSection === "MyDocuments" && <MyDocuments />}
//           {activeSection === "repay" && <Repay />}
//           {activeSection === "UserTransactions" && <MyTransactions />}
//           {activeSection === "getprofile" && <GetProfile1 />}
//           {activeSection === "profile" && <CreateProfile />}
//           {activeSection === "MyIssues" && <MyIssues />}
//         </div>
//       )}

//       {/* Swiper Section (Only shown when no section is selected) */}
//       {!activeSection && (
//         <div className="Farmer-slider-container">
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={3}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="Farmer-card-slider"
//           >
//             {sections.map((section, index) => (
//               <SwiperSlide key={index}>
//                 <div className="Farmer-card" onClick={() => setActiveSection(section.action)}>
//                   <h2>{section.title}</h2>
//                   <p>{section.description}</p>
//                   <button className="Farmer-card-link">{section.buttonText}</button>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Farmer;











import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Farmer.css";
import LoanRequestForm from "../farmer/FarmerLoans";
import AddFarms from "../farmer/AddFarms";
import AllFarms from "../farmer/MyFarms";
import Issues from "../farmer/Issues";
import Documentupload from "../farmer/Documentupload";
import Repay from "../farmer/Repay";
import MyTransactions from "../farmer/MyTranctions";
import MyDocuments from "../farmer/MyDocuments";
import MyIssues from "../farmer/Myissues";
import GetProfile1 from "../farmer/Getprofile";
import CreateProfile from "../farmer/Profile.js";
import { Link, useLocation } from "react-router-dom";
import API from "../components/api"; // API handler

function Farmer() {
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
        console.log("No profile found");
        setProfileExists(false);
      }
    };

    checkProfile();

    const params = new URLSearchParams(location.search);
    if (params.get("openprofile") === "true") {
      setActiveSection("profile");
    }
  }, [location]);

  const sections = [
    { title: "👨‍🌾 Farms", description: "Manage your farms efficiently.", action: "farms", buttonText: "🌱 Add Farm" },
    { title: "🌾 All Farms", description: "View all farms you have registered.", action: "allFarms", buttonText: "📋 View Farms" },
    { title: "💰 Loans", description: "Manage and track loan applications.", action: "loans", buttonText: "📄 Apply Loan" },
    { title: "📜 Issues", description: "Report and monitor issues.", action: "issues", buttonText: "⚠️ Report Issue" },
    { title: "📜 MyIssues", description: "View and update your issues.", action: "MyIssues", buttonText: "📄 MyIssues" },
    { title: "📜 Document Upload", description: "Upload important documents.", action: "documentupload", buttonText: "📂 Upload Docs" },
    { title: "📁 My Documents", description: "View all farm-related documents.", action: "MyDocuments", buttonText: "📑 View Docs" },
    { title: "💰 Repay", description: "Easily repay your loans.", action: "repay", buttonText: "💵 Make Payment" },
    { title: "💰 My Transactions", description: "View all transactions.", action: "UserTransactions", buttonText: "📊 View Transactions" },
    {
      title: "📱 Profile",
      description: profileExists ? "Profile is locked after creation." : "Create your farmer profile.",
      action: "profile",
      buttonText: profileExists ? "🔒 Profile Locked" : "👤 Edit Profile",
      disabled: profileExists
    },
  ];

  return (
    <div className="body1">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="https://videos.pexels.com/video-files/3115488/3115488-uhd_2560_1440_24fps.mp4" type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">🌱FarmIT - Farmer</h1>
          <ul className="nav-links">
            <li>
              <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
            </li>
            <li>
              <Link to="/login">
                <button className="add-farm-button">LogOut</button>
              </Link>
            </li>
            <li>
              <button onClick={() => setActiveSection("getprofile")} className="nav-link">👨🏻‍💼</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Dynamic Section Rendering */}
      {activeSection && (
        <div className="farmer-content">
          {activeSection === "farms" && <AddFarms />}
          {activeSection === "allFarms" && <AllFarms />}
          {activeSection === "loans" && <LoanRequestForm />}
          {activeSection === "issues" && <Issues />}
          {activeSection === "documentupload" && <Documentupload />}
          {activeSection === "MyDocuments" && <MyDocuments />}
          {activeSection === "repay" && <Repay />}
          {activeSection === "UserTransactions" && <MyTransactions />}
          {activeSection === "getprofile" && <GetProfile1 />}
          {activeSection === "profile" && (profileExists ? <GetProfile1 /> : <CreateProfile />)}
          {activeSection === "MyIssues" && <MyIssues />}
        </div>
      )}

      {/* Swiper Section */}
      {!activeSection && (
        <div className="Farmer-slider-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="Farmer-card-slider"
          >
            {sections.map((section, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`Farmer-card ${section.disabled ? "disabled" : ""}`}
                  onClick={() => !section.disabled && setActiveSection(section.action)}
                >
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                  <button className="Farmer-card-link" disabled={section.disabled}>
                    {section.buttonText}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Farmer;







// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "./Farmer.css";
// import LoanRequestForm from "../farmer/FarmerLoans";
// import AddFarms from "../farmer/AddFarms";
// import AllFarms from "../farmer/MyFarms";
// import Issues from "../farmer/Issues";
// import Documentupload from "../farmer/Documentupload";
// import Repay from "../farmer/Repay";
// import MyTransactions from "../farmer/MyTranctions";
// import MyDocuments from "../farmer/MyDocuments";
// import MyIssues from "../farmer/Myissues";
// import GetProfile1 from "../farmer/Getprofile";
// import CreateProfile from "../farmer/Profile.js";
// import { Link, useLocation } from "react-router-dom";
// import API from "../components/api"; // Import your API handler

// function Farmer() {
//   const [activeSection, setActiveSection] = useState(null);
//   const [profileExists, setProfileExists] = useState(false); // Check if profile exists
//   const location = useLocation();

//   useEffect(() => {
//     // Fetch profile on mount to determine if profile exists
//     const checkProfile = async () => {
//       try {
//         const response = await API.get(`/getprofilebyid`);
//         if (response.status === 200) {
//           setProfileExists(true);
//         }
//       } catch (error) {
//         console.error("Profile not found:", error);
//         setProfileExists(false);
//       }
//     };

//     checkProfile();

//     // If URL has ?openprofile=true, open profile section
//     const params = new URLSearchParams(location.search);
//     if (params.get("openprofile") === "true") {
//       setActiveSection("getprofile");
//     }
//   }, [location]);

//   const sections = [
//     { title: "👨‍🌾 Farms", description: "Manage your farms efficiently.", action: "farms", buttonText: "🌱 Add Farm" },
//     { title: "🌾 All Farms", description: "View all farms you have registered.", action: "allFarms", buttonText: "📋 View Farms" },
//     { title: "💰 Loans", description: "Manage and track loan applications.", action: "loans", buttonText: "📄 Apply Loan" },
//     { title: "📜 Issues", description: "Report and monitor issues.", action: "issues", buttonText: "⚠️ Report Issue" },
//     { title: "📜 My Issues", description: "View and update your issues.", action: "MyIssues", buttonText: "📄 My Issues" },
//     { title: "📜 Document Upload", description: "Upload important documents.", action: "documentupload", buttonText: "📂 Upload Docs" },
//     { title: "📁 My Documents", description: "View all farm-related documents.", action: "MyDocuments", buttonText: "📑 View Docs" },
//     { title: "💰 Repay", description: "Easily repay your loans.", action: "repay", buttonText: "💵 Make Payment" },
//     { title: "💰 My Transactions", description: "View all transactions.", action: "UserTransactions", buttonText: "📊 View Transactions" },
//     { title: "📱 Profile", description: "View and update your profile.", action: "profile", buttonText: profileExists ? "🔒 Profile Locked" : "👤 Edit Profile", disabled: profileExists },
//   ];

//   return (
//     <div className="body1">
//       {/* Background Video */}
//       <video autoPlay loop muted playsInline className="background-video">
//         <source src="https://videos.pexels.com/video-files/3115488/3115488-uhd_2560_1440_24fps.mp4" type="video/mp4" />
//       </video>

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="container">
//           <h1 className="logo">🌱 FarmIT - Farmer</h1>
//           <ul className="nav-links">
//             <li>
//               <button className="nav-link" onClick={() => setActiveSection(null)}>Dashboard</button>
//             </li>
//             <li>
//               <Link to="/login">
//                 <button className="add-farm-button">LogOut</button>
//               </Link>
//             </li>
//             <li>
//               <button onClick={() => setActiveSection("getprofile")} className="nav-link">👨🏻‍💼</button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Dynamic Content Section */}
//       {activeSection && (
//         <div className="farmer-content">
//           {activeSection === "farms" && <AddFarms />}
//           {activeSection === "allFarms" && <AllFarms />}
//           {activeSection === "FarmLoans" && <LoanRequestForm />}
//           {activeSection === "issues" && <Issues />}
//           {activeSection === "documentupload" && <Documentupload />}
//           {activeSection === "MyDocuments" && <MyDocuments />}
//           {activeSection === "repay" && <Repay />}
//           {activeSection === "UserTransactions" && <MyTransactions />}
//           {activeSection === "getprofile" && <GetProfile1 />}
//           {activeSection === "profile" && (profileExists ? <GetProfile1 /> : <CreateProfile />)}
//           {activeSection === "MyIssues" && <MyIssues />}
//         </div>
//       )}

//       {/* Swiper Section (Only shown when no section is selected) */}
//       {!activeSection && (
//         <div className="Farmer-slider-container">
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={3}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="Farmer-card-slider"
//           >
//             {sections.map((section, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className={`Farmer-card ${section.disabled ? "disabled" : ""}`}
//                   onClick={() => !section.disabled && setActiveSection(section.action)}
//                 >
//                   <h2>{section.title}</h2>
//                   <p>{section.description}</p>
//                   <button className="Farmer-card-link" disabled={section.disabled}>
//                     {section.buttonText}
//                   </button>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Farmer;
