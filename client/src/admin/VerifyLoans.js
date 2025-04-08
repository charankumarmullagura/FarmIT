import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import "./VerifyLoans.css";
import { toast } from "react-toastify";

function VerifyLoans() {
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

  const handleVerify = async (id) => {
    try {
      const response = await API.put(`/verifyLoan/${id}`);
      if (response.status === 201) {
        setLoans(loans.map((loan) =>
          loan._id === id ? { ...loan, status: "Verified" } : loan
        ));
        toast.success("Loan verified successfully!");
      } else {
        toast.error("Failed to verify loan.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying loan.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loan?"
    );
    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/deleteLoan/${id}`);
      if (response.status === 200) {
        setLoans(loans.filter((loan) => loan._id !== id));
        toast.success("Loan deleted successfully!");
      } else {
        toast.error("Failed to delete loan.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting loan.");
    }
  };

  return (
    <div className="loan-list-container">

      <h2 className="loan-list-title">Loan Requests</h2>
      {loans.length === 0 ? (
        <p className="text-center text-gray-600">No loan requests found.</p>
      ) : (
        <div className="loan-grid">
          {loans.map((loan) => (
            <div key={loan._id} className="loan-card">
              <h4 style={{ color: "black" }}>Name: {loan.name}</h4>
              <h4 style={{ color: "black" }}>FARM ID: {loan._id}</h4>
              <p className="loan-amount">Amount: ₹{loan.amount}</p>
              <p className="loan-duration">Duration: {loan.duration} months</p>
                  <p className="loan-interest">Interest Rate: {loan.interestRate}%</p>
                  <p className="loan-interest">status: {loan.isVerified? "✅ Verified" : "⛔ Not Verified"}</p>

                  {!loan.isVerified && (
                <button
                  className="invest-button"
                  onClick={() => handleVerify(loan._id)}
                >
                  Verify
                </button>
                )}
              <button
                className="delete-button"
                onClick={() => handleDelete(loan._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerifyLoans;