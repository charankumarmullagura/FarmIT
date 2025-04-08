// import React, { useState, useEffect } from "react";
// import API from "../components/api.js";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import './Repay.css';

// const RepayLoan = () => {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchLoans = async () => {
//     setLoading(true);
//     try {
//       const response = await API.get("/getAllLoansbyfarmer");
//       setLoans(response.data);
//     } catch (error) {
//       console.error("Error fetching loans:", error);
//       toast.error("Failed to load loans");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepayment = async (loanId, amount, investorId) => {
//     try {
//       const farmerId = localStorage.getItem("farmerId");
//       console.log("Repayment Data:", {
//         loanId,
//         amount,
//         fromUserId: farmerId,
//         toUserId: investorId
//       });
//       const confirmed = window.confirm(`Do you want to repay Rs. ${amount}?`);
//       if (confirmed) {
//         const response = await API.post(`/${loanId}/repay`, {
//           amount: amount,
//           fromUserId: farmerId,
//           toUserId: investorId,
//         });
//         console.log("response")

//         if (response.data && response.data.message) {
//           toast.success(response.data.message);
//           fetchLoans();
//         } else {
//           toast.error("Unexpected response format.");
//         }
//       }
//     } catch (error) {
//       toast.error("Error while repay  amount.");
//     }
//   };

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   return (
//     <>
//       {/* <Navbar UserType={"farmer"} /> */}
//       <div style={{ marginTop: "100px" }} className="farmer-loans">
//         <div className="dashboard-content">
//           <h1>My Loans</h1>
//           {loading ? (
//             <p className="loading-message">Loading loans...</p>
//           ) : loans.length > 0 ? (
//             <div className="loan-list">
//               {loans.map((loan) => (
//                 <div key={loan._id} className="loan-card">
//                   {/* <h2>Farm: {loan.farm.name}</h2> */}
//                   <h2>Farm: {loan.farm || "Unknown Farm"}</h2>

//                   <p>
//                     <b>Amount:</b> Rs {loan.amount}
//                   </p>
//                   {/* <p>
//                     <b>Status:</b> {loan.status}
//                   </p> */}
//                   <p>
//                     <b>Repayment Schedule:</b>
//                   </p>
//                   <ul>
//                     {loan.repaymentSchedule.map((payment, index) => (
//                       <li key={index}>
//                         <h3>
//                           {new Date(payment.dueDate).toLocaleDateString()} - (
//                           {payment.status})
//                         </h3>
//                         {/* <b>
//                           Rs: <span className="payment-amount">{payment.amount}</span>
//                         </b> */}
//                         <b>
//                           Rs: <span className="payment-amount">{payment.amount.toFixed(2)}</span>
//                        </b>


//                         {payment.status === "pending" && (
//                           <button
//                             className="repay-btn"
//                             onClick={() =>
//                               handleRepayment(
//                                 loan._id,
//                                 payment.amount,
//                                 loan.investors[0]?.investor._id 
//                               )
//                             }
//                           >
//                             Repay
//                           </button>
//                         )}

//                         {/* {payment.status === "paid" &&  (
//                           <p>
//                             <b>Paid on:</b> {new Date(payment.paidDate).toLocaleDateString()}
//                           </p>
//                         )} */}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="no-loans">No loans found.</p>
//           )}
//         </div>
//       </div>
//       <Link to={"/issue/farmer"}>
//         <button className="issue-btn">Issue?</button>
//       </Link>
//     </>
//   );
// };

// export default RepayLoan;




import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './Repay.css';

const RepayLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await API.get("/getAllLoansbyfarmer");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async (loanId, amount, investorId) => {
    try {
      const farmerId = localStorage.getItem("farmerId");
      const confirmed = window.confirm(`Do you want to repay Rs. ${amount}?`);
      if (confirmed) {
        const response = await API.post(`/${loanId}/repay`, {
          amount,
          fromUserId: farmerId,
          toUserId: investorId,
        });

        if (response.data?.message) {
          toast.success(response.data.message);
          fetchLoans();
        } else {
          toast.error("Unexpected response format.");
        }
      }
    } catch (error) {
      toast.error("Error while repaying amount.");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="repay-container">
      <div className="repay-dashboard">
        <h1 className="repay-heading">📃 My Loans</h1>
        {loading ? (
          <p className="repay-loading">Loading loans...</p>
        ) : loans.length > 0 ? (
          <div className="repay-loan-list">
            {loans.map((loan) => (
              <div key={loan._id} className="repay-loan-card">
                <h2>🏡 Farm: {loan.farm || "Unknown Farm"}</h2>
                <p><b>💸 Amount:</b> Rs {loan.amount}</p>
                <p><b>📆 Repayment Schedule:</b></p>
                <ul>
                  {loan.repaymentSchedule.map((payment, index) => (
                    <li key={index} className="repay-schedule-item">
                      <div className="repay-schedule-header">
                        <span>
                          📅 {new Date(payment.dueDate).toLocaleDateString()} - ({payment.status})
                        </span>
                        <span>
                          💵 Rs: <strong>{payment.amount.toFixed(2)}</strong>
                        </span>
                      </div>
                      {payment.status === "pending" && (
                        <button
                          className="repay-button"
                          onClick={() =>
                            handleRepayment(loan._id, payment.amount, loan.investors[0]?.investor._id)
                          }
                        >
                          Repay
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="repay-no-loans">No loans found.</p>
        )}
      </div>
      <Link to={"/issue/farmer"}>
        <button className="repay-issue-button">❓ Issue?</button>
      </Link>
    </div>
  );
};

export default RepayLoan;