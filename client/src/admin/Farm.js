import React, { useEffect, useState } from "react";
import API from "../components/api.js";
import "./Farms.css";
import { toast } from "react-toastify";

function AllFarms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await API.get("/getAllFarmsnn");
        if (response.status === 200) {
          setFarms(response.data);
        } else {
          toast.error("Failed to fetch farms.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching farms.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);


  return (
    <div className="farm-list-container">
      <h2 className="farm-list-title">All Farms</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading farms...</p>
      ) : farms.length === 0 ? (
        <p className="text-center text-gray-600">No farms available.</p>
      ) : (
        <div className="farm-grid">
          {farms.map((farm) => (
            <div key={farm._id} className="farm-card">
              <h3 className="farm-name">🏡 {farm.name}</h3>
              {farm.images?.length > 0 && (
                <img
                  src={`http://localhost:5005/${farm.images[0]}`}
                  alt="Farm"
                  className="farm-image"
                />
              )}
              <p className="farm-location">📍 Location: {farm.location}</p>
              <p className="farm-type">🌾 Type: {farm.farmType}</p>
              <p className="farm-size">📏 Size: {farm.size} acres</p>
              <p className="farm-status">✅ Status: {farm.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFarms;
