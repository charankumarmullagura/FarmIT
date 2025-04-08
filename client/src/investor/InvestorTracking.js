// import React, { useEffect, useState } from "react";
// import axios from "../components/api";
// import { Spinner } from "react-bootstrap";

// const InvestorTracking = () => {
//   const [totalInvestments, setTotalInvestments] = useState(0);
//   const [totalReturns, setTotalReturns] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found. Please log in.");
//         }

//         const response = await axios.get("/analytics", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("✅ Full API Response:", response.data); 

//         if (!response.data.investments || !Array.isArray(response.data.investments)) {
//           throw new Error("Invalid investments data format.");
//         }
//         if (!response.data.repayments || !Array.isArray(response.data.repayments)) {
//           throw new Error("Invalid repayments data format.");
//         }

        
//         console.log("📊 Investment Data:", response.data.investments);
//         console.log("📊 Repayment Data:", response.data.repayments);

        
//         const totalInvestmentSum = response.data.investments.reduce((sum, inv) => {
//           console.log("➕ Adding Investments:", inv.totalAmount);
//           return sum + (inv.totalAmount || 0);
//         }, 0);

//         const totalReturnsSum = response.data.repayments.reduce((sum, rep) => {
//           console.log("➕ Adding Repayment:", rep.totalAmount);
//           return sum + (rep.totalAmount || 0);
//         }, 0);

//         console.log("🔹 Total Investments Calculated:", totalInvestmentSum);
//         console.log("🔹 Total Returns Calculated:", totalReturnsSum);

//         setTotalInvestments(totalInvestmentSum);
//         setTotalReturns(totalReturnsSum);
//       } catch (error) {
//         console.error("❌ Error fetching analytics:", error);
//         setError(error.message || "Failed to load analytics data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Spinner animation="border" role="status" />
//         <p>Loading analytics...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={styles.errorContainer}>
//         <p style={{ color: "red" }}>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Investor Analytics</h2>

//       <div style={styles.summaryContainer}>
//         <div style={styles.summaryBox}>
//           <h3>Total Investments</h3>
//           <p>${totalInvestments.toLocaleString()}</p>
//         </div>
//         <div style={styles.summaryBox}>
//           <h3>Total Returns</h3>
//           <p>${totalReturns.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     backgroundColor: "#f8fafc",
//     minHeight: "100vh",
//   },
//   summaryContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginTop: "20px",
//   },
//   summaryBox: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     minWidth: "200px",
//   },
//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "300px",
//   },
//   errorContainer: {
//     textAlign: "center",
//     padding: "20px",
//     backgroundColor: "rgba(255, 0, 0, 0.1)",
//     border: "1px solid rgba(255, 0, 0, 0.3)",
//     color: "red",
//     borderRadius: "10px",
//   },
// };

// export default InvestorTracking;



import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import "./InvestorAnalytics.css";

function InvestorAnalytics() {
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await API.get("/analytics");

        if (response.status === 200) {
          setTotalInvestments(response.data.totalInvestments || 0);
          setTotalReturns(response.data.totalReturns || 0);
        } else {
          toast.error("Failed to fetch analytics.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="unique-analytics-container">
      <h2 className="unique-analytics-title">Investor Analytics</h2>
      {loading ? (
        <p className="unique-analytics-loading">Fetching data...</p>
      ) : (
        <div className="unique-analytics-grid">
          <div className="unique-analytics-card">
            <p className="unique-analytics-label">💰 Total Investments</p>
            <p className="unique-analytics-value">₹{totalInvestments.toLocaleString()}</p>
          </div>
          <div className="unique-analytics-card">
            <p className="unique-analytics-label">📈 Total Returns</p>
            <p className="unique-analytics-value">₹{totalReturns.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestorAnalytics;
