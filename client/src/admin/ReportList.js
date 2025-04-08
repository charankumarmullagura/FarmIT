// import React, { useEffect, useState } from "react";
// import API from "../components/api.js"; // Centralized API handling
// import { toast } from "react-toastify";
// import "./Issues.css";

// const Issues = () => {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const response = await API.get("/getallissues");
//         if (response.status === 200) {
//           setIssues(response.data);
//         } else {
//           toast.error("Failed to fetch issues.");
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Error fetching issues.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIssues();
//   }, []);

//   return (
//     <div className="issues-container">
//       <h2 className="issues-title">Reported Issues</h2>
//       {loading ? (
//         <p className="text-center text-gray-600">Loading issues...</p>
//       ) : issues.length === 0 ? (
//         <p className="text-center text-gray-600">No issues reported.</p>
//       ) : (
//         <table className="issues-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Reported By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {issues.map((issue) => (
//               <tr key={issue._id}>
//                 <td>{issue.issueTitle}</td>
//                 <td>
//                   {issue.user?.firstName} {issue.user?.lastName} <br />
//                   <span className="email-text">({issue.user?.email})</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Issues;




import React, { useEffect, useState } from "react";
import API from "../components/api.js"; // Centralized API handling
import { toast } from "react-toastify";
import "./Issues.css";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await API.get("/getallissues");
        if (response.status === 200) {
          setIssues(response.data);
        } else {
          toast.error("Failed to fetch issues.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Function to resolve an issue
  const handleResolveIssue = async (issueId) => {
    try {
      const response = await API.put(`/resolveissues/${issueId}`);
      if (response.status === 200) {
        toast.success("Issue marked as resolved.");
        // Update the local state to reflect the change
        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue._id === issueId ? { ...issue, status: "Resolved" } : issue
          )
        );
      } else {
        toast.error("Failed to resolve issue.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resolving issue.");
    }
  };

  return (
    <div className="issues-container">
      <h2 className="issues-title">All Reported Issues</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-600">No issues reported.</p>
      ) : (
        <table className="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Reported By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.issueTitle}</td>
                <td>{issue.issueDiscription}</td>
                <td>
                  {issue.user?.firstName} {issue.user?.lastName} <br />
                  <span className="email-text">({issue.user?.email})</span>
                </td>
                <td className={issue.status === "Resolved" ? "resolved" : "pending"}>
                  {issue.status || "Pending"}
                </td>
                <td>
                  {issue.status !== "Resolved" && (
                    <button
                      className="resolve-btn"
                      onClick={() => handleResolveIssue(issue._id)}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllIssues;
