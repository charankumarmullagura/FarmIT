import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import "./AdminLoans.css";

function AllLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/getAllLoans");
        if (response.status === 200) {
          setLoans(response.data);
        } else {
          toast.error("Failed to fetch loans.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching loans.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="unique-loans-container">
      <h2 className="unique-loans-title">Loan Records</h2>
      {loading ? (
        <p className="unique-loans-loading">Fetching data...</p>
      ) : loans.length === 0 ? (
        <p className="unique-loans-empty">No records available.</p>
      ) : (
        <div className="unique-loans-grid">
          {loans.map((loan) => (
            <div key={loan._id} className="unique-loan-card">
              <p className="unique-loan-farmer">
                <strong>👨‍🌾 Farmer:</strong> {loan.name}
              </p>
              <p className="unique-loan-amount">
                <strong>💰 Amount:</strong> ₹{loan.amount}
              </p>
              <p className={`unique-loan-status ${loan.status === "Approved" ? "approved" : "pending"}`}>
                <strong>📌 Status:</strong> {loan.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllLoans;
