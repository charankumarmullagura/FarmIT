import React, { useEffect, useState } from "react";
import API from "../components/api.js";
import { toast } from 'react-toastify'
import "./MyIssues.css";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const response = await API.get("/myissues");
        if (response.status === 200) {
          setIssues(response.data);
        } else {
          toast.error("Failed to fetch issues.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching issues.");
      }
    //    finally {
    //     setLoading(false);
    //   }
    };

    fetchMyIssues();
  }, []);

  return (
    <div className="Myissues-container">
      <h2 className="Myissues-title">My Reported Issues</h2>
      {/* {loading ? (
        <p className="text-center text-gray-600">Loading issues...</p>
      ) : issues.length === 0 ? (
        <p className="text-center text-gray-600">No issues reported.</p>
      ) : ( */}
        <table className="Myissues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.issueTitle}</td>
                <td>{issue.issueDiscription}</td>
                <td className={issue.status === "Resolved" ? "resolved" : "pending"}>
                  {issue.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default MyIssues;
