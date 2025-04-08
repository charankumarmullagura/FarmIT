import React, { useEffect, useState } from "react";
import API from "../components/api";
import { toast } from "react-toastify";
import "./MyDocument.css";

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first.");

        return;
      }
      
      const response = await API.get("/mydocuments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(response.data);
    } catch (error) {
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first.");
        return;
      }
      
      await API.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Document deleted successfully!");
      fetchDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete document");
    } finally {
      setLoading(false);
    }
  };
  const handleView = (filePath) => {
      if (!filePath) {
        toast.error("No file available for this profile.");
        return;
      }
      const fileUrl = filePath.startsWith("uploads")
        ? `http://localhost:5005/${filePath}`
        : `http://localhost:5005/uploads/${filePath}`;
      window.open(fileUrl, "_blank");
    };


  return (
    <div className="document-body">
      <div className="document-container">
        <h2 className="document-header">📂 My Documents</h2>
        {loading ? (
          <p className="document-loading">Loading...</p>
        ) : documents.length === 0 ? (
          <p className="document-empty">No documents uploaded.</p>
        ) : (
          <div className="document-grid">
            {documents.map((doc) => (
              <div key={doc._id} className="document-card">
                <h3 className="document-title">{doc.title}</h3>
                <p className="document-info"><strong>Type:</strong> {doc.type}</p>
                <p className="document-info"><strong>Uploaded:</strong> {new Date(doc.uploadedAt).toLocaleDateString()}</p>

                <div className="document-actions">
              <button
                className="view-btn"
                onClick={() => handleView(doc.filePath)}
              >
                View
              </button>
                  <button className="document-delete-btn" onClick={() => handleDelete(doc._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;
