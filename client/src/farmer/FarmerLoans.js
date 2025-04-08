import React, { useState } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import "./FarmerLoans.css";

const LoanRequestForm = () => {
  const [loanData, setLoanData] = useState({
    amount: "",
    duration: "",
    interestRate: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/CreateLoaRequest", loanData);
      toast.success("Loan request submitted successfully!");
      setLoanData({ amount: "", duration: "", interestRate: "", purpose: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error during loan submission"
      );
    }
  };

  return (
    <div className="loan-wrapper">
      <div className="loan-container">
        <h2 className="loan-title">Request a Loan</h2>
        <form onSubmit={handleSubmit} className="loan-form">
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={loanData.name}
            onChange={handleChange}
            required
            className="loan-input-field"
          />
          <input
            type="number"
            name="amount"
            placeholder="Loan Amount"
            value={loanData.amount}
            onChange={handleChange}
            required
            className="loan-input-field"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (months)"
            value={loanData.duration}
            onChange={handleChange}
            required
            className="loan-input-field"
          />
          <input
            type="number"
            step="0.1"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={loanData.interestRate}
            onChange={handleChange}
            required
            className="loan-input-field"
          />
          <textarea
            name="purpose"
            placeholder="Purpose of Loan"
            value={loanData.purpose}
            onChange={handleChange}
            required
            className="loan-textarea-field"
          ></textarea>
          <button type="submit" className="loan-submit-button">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanRequestForm;