// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../components/api.js";
// import './MyFarms.css';

// const FarmerDashboard = () => {
//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getFarms = async () => {
//     setLoading(true);
//     try {
//       const response = await API.get("/myfarms");
//       setFarms(response.data);
//     } catch (error) {
//       console.error("Error fetching farms:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFarms();
//   }, []);

//   return (
//     <>
//       <div className="farmer-dashboard-container">
//         <div className="dashboard-inner-content">
//           <div className="dashboard-header-section">
//             <h1 style={{color:"white", marginTop:"90px"}}>Farmer Dashboard</h1>
//             <Link to="/AddFarmer">
//               <button style={{color:"white", marginTop:"90px"}} className="add-farm-button">Add Farm Land</button>
//             </Link>
//           </div>
//           {loading ? (
//             <p className="loading-status">
//               <b>Loading Farms...</b>
//             </p>
//           ) : farms.length > 0 ? (
//             <div className="farms-display-list">
//               {farms.map((farm) => (
//                 <div key={farm._id} className="farm-item-card">
//                 <img
//                 src={`http://localhost:5005/${farm.images[0]}`}
//                 alt={farm.name}
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "5px",
//                 }}
//                 />
//                   <h2 className="farm-title"><b>Name: </b> {farm.name}</h2>
//                   <p className="farm-details"><b>Description: </b>{farm.description}</p>
//                   <p>
                    
//                   </p>
//                   <p>
//                     <b>Type: </b> {farm.farmType}
//                   </p>
//                   <p>
//                     <b>Size: </b> {farm.size} acres
//                   </p>
//                   <p>
//                     <b>Production Capacity: </b>{" "}
//                     {farm.productionCapacity} tons
//                   </p>
//                   <p>
//                     <b>Status: </b> {farm.status}
//                   </p>
//                   <Link to={"/FarmerLoan"}>
//                     <button className="request-loan-button">Request Loan</button>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="no-farms-message">No farms found.</p>
//           )}
//         </div>
//         <Link to={'/issues1'}>
//           <button className="report-issue-button">Issue?</button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default FarmerDashboard;









import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import LoanRequestForm from "./FarmerLoans.js";
import AddFarmer from "./AddFarms.js";
import IssuesForm from "./Issues.js";
import "./MyFarms.css";

const FarmerDashboard = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("farms");

  const getFarms = async () => {
    setLoading(true);
    try {
      const response = await API.get("/myfarms");
      setFarms(response.data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFarms();
  }, []);

  const renderContent = () => {
    if (view === "loan") return <LoanRequestForm />;
    if (view === "add") return <AddFarmer />;
    if (view === "issues") return <IssuesForm />;

    if (loading) return <p className="loading-status"><b>Loading Farms...</b></p>;
    if (farms.length === 0) return <p className="no-farms-message">No farms found.</p>;

    return (
      <div className="farms-display-list">
        {farms.map((farm) => (
          <div key={farm._id} className="farm-item-card">
            <img
              src={`http://localhost:5005/${farm.images[0]}`}
              alt={farm.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h2 className="farm-title"><b>Name: </b> {farm.name}</h2>
            <p className="farm-details"><b>Description: </b>{farm.description}</p>
            <p><b>Type: </b> {farm.farmType}</p>
            <p><b>Size: </b> {farm.size} acres</p>
            <p><b>Production Capacity: </b> {farm.productionCapacity} tons</p>
            <p><b>Status: </b> {farm.status}</p>
            <button
              className="request-loan-button"
              onClick={() => setView("loan")}
            >
              Request Loan
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="farmer-dashboard-container">
      <div className="dashboard-inner-content">
        <div className="dashboard-header-section">
          <h1 style={{ color: "white", marginTop: "90px" }}>Farmer Dashboard</h1>

          {view === "farms" && (
            <>
              <button
                style={{ color: "white", marginTop: "90px" }}
                className="add-farm-button"
                onClick={() => setView("add")}
              >
                Add Farm Land
              </button>

              <button
                className="report-issue-button"
                onClick={() => setView("issues")}
              >
                Issue?
              </button>
            </>
          )}

          {view !== "farms" && (
            <button
              className="back-to-farms-button"
              onClick={() => setView("farms")}
            >
              ⬅ Back to Farms
            </button>
          )}
        </div>

        {/* Main View Renderer */}
        {renderContent()}
      </div>
    </div>
  );
};

export default FarmerDashboard;