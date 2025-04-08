import React, { useState } from "react";
import API from "../components/api";
import { toast } from "react-toastify";
import './DocumentUpload.css';

const DocumentUpload = () => {
  const [document, setDocument] = useState({
    title: "",
    type: "farm_certificate",
    relatedToModel: "",
    relatedToId: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", document.title);
      formData.append("type", document.type);
      formData.append("relatedToModel", document.relatedToModel);
      formData.append("relatedToId", document.relatedToId);
      formData.append("document", file);

      await API.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Document uploaded successfully!");
      setDocument({ title: "", type: "farm_certificate", relatedToModel: "", relatedToId: "" });
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-document">
    <div className="form-container">
      <h2 className="text-xl font-bold text-center mb-4">📄 Upload Document</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Document Title"
          value={document.title}
          onChange={handleChange}
          required
          className="input-field"
        />

        <select name="type" value={document.type} onChange={handleChange} required className="input-field">
          <option value="farm_certificate">Farm Certificate</option>
          <option value="loan_agreement">Loan Agreement</option>
          <option value="identity_proof">Identity Proof</option>
          <option value="other">Other</option>
        </select>

        <input type="file" onChange={handleFileChange} required className="input-field" />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default DocumentUpload;
