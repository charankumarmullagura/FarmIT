import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import "./InvLoans.css";
import { toast } from "react-toastify";

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await API.get("/available");
        if (response.status === 200) {
          const updatedLoans = response.data.map((loan) => ({
            ...loan,
            status: loan.status || "Pending",
          }));
          setLoans(updatedLoans);
        } else {
          toast.error("Failed to fetch loans.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching loans.");
      }
    };

    fetchLoans();
  }, []);

  const handleInvestment = async (loan) => {
    try {
      const response = await API.post(`/${loan._id}/invest`, {
        status: "Approved",
      });
      if (response.status === 200) {
        toast.success("Investment successful!");
        setLoans(loans.filter((l) => l._id !== loan._id)); // Remove invested loan
      } else {
        toast.error("Failed to invest in the loan.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error processing investment."
      );
    }
  };

  return (
    <div className="loan-requests-wrapper">
      <h2 className="loan-requests-title">Available Loan Requests</h2>
      {loans.length === 0 ? (
        <p className="no-loans-message">No loan requests found.</p>
      ) : (
        <div className="loan-requests-grid">
          {loans.map((loan) => (
            <div key={loan._id} className="loan-request-card">
              <p className="loan-request-amount">Amount: {loan.amount}</p>
              <p className="loan-request-duration">
                Duration: {loan.duration} months
              </p>
              <p className="loan-request-interest">
                Interest Rate: {loan.interestRate}%
              </p>
              <p className="loan-request-purpose">Purpose: {loan.purpose}</p>
              <button
                className="loan-invest-button"
                onClick={() => handleInvestment(loan)}
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoanList;