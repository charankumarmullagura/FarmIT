// import React, { useState, useEffect } from "react";
// import API from "../components/api.js";
// import { toast } from "react-toastify";
// import "./Allpropile.css";

// const AdminVerifyProfiles = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Please log in first.");
//           return;
//         }

//         const response = await API.get("/getAllProfiles", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProfiles(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch profiles.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await API.put(`/verifyProfile/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("Profile approved successfully!");
//       setProfiles(profiles.filter((profile) => profile._id !== id));
//     } catch (error) {
//       toast.error("Failed to approve profile.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm("Are you sure you want to Reject this profile?");
//       if (!confirmDelete) return;

//       const token = localStorage.getItem("token");
//       await API.delete(`/deleteProfile/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("Profile deleted successfully!");
//       setProfiles(profiles.filter((profile) => profile._id !== id));
//     } catch (error) {
//       toast.error("Failed to delete profile.");
//     }
//   };

//   const handleView = (filePath) => {
//     if (!filePath) {
//       toast.error("No file available for this profile.");
//       return;
//     }

//     const fileUrl = filePath.startsWith("uploads")
//       ? `http://localhost:5005/${filePath}`
//       : `http://localhost:5005/uploads/${filePath}`;

//     window.open(fileUrl, "_blank");
//   };

//   if (loading) {
//     return <div className="loading">Loading profiles...</div>;
//   }

//   return (
//     <div className="admin-profiles-container">
//       <h1 className="admin-profiles-heading">Manage Profiles</h1>
//       <div className="admin-profiles-grid">
//         {profiles.map((profile) => (
//           <div key={profile._id} className="profile-card">
//             <div className="profile-card-info">
//               <h2 className="profile-card-name">{profile.fullName}</h2>
//               <p className="profile-card-email">{profile.email}</p>
//               <p className="profile-card-phone">{profile.PhoneNumber}</p>
//             </div>
//             <div className="profile-card-actions">
//               <button
//                 className="approve-btn"
//                 onClick={() => handleApprove(profile._id)}
//               >
//                 Approve
//               </button>
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(profile._id)}
//               >
//                 Reject
//               </button>
//               <button
//                 className="view-btn"
//                 onClick={() => handleView(profile.filePath)}
//               >
//                 View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminVerifyProfiles;




import React, { useState, useEffect } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import "./Allpropile.css";

const AdminVerifyProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in first.");
          return;
        }

        const response = await API.get("/getAllProfiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfiles(response.data);
      } catch (error) {
        toast.error("Failed to fetch profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/verifyProfile/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile approved successfully!");
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (error) {
      toast.error("Failed to approve profile.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to reject this profile?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      await API.delete(`/deleteProfile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile deleted successfully!");
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (error) {
      toast.error("Failed to delete profile.");
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

  if (loading) {
    return <div className="admin-loader-verify">Loading profiles...</div>;
  }

  return (
    <div className="admin-container-verify">
      <h1 className="admin-heading-verify">Manage Profiles</h1>
      <div className="admin-grid-verify">
        {profiles.map((profile) => (
          <div key={profile._id} className="admin-profile-card">
            <div className="admin-profile-info">
              {/* <h2 className="admin-profile-name">{profile.fullName}</h2>
              <p className="admin-profile-email">{profile.EmailAddress}</p>
              <p className="admin-profile-phone">{profile.PhoneNumber}</p>
              <p className="admin-profile-adhar">{profile.AdharNumber}</p>
              <p className="admin-profile-pan">{profile.PANCARDNumber}</p> */}
              <div className="admin-profile-info">
  <div className="admin-info-row">
    <span className="admin-info-label">Full Name: </span>
    <span className="admin-info-value">{profile.fullName}</span>
  </div>
  <div className="admin-info-row">
    <span className="admin-info-label">Email: </span>
    <span className="admin-info-value">{profile.EmailAddress}</span>
  </div>
  <div className="admin-info-row">
    <span className="admin-info-label">Phone No: </span>
    <span className="admin-info-value">{profile.PhoneNumber}</span>
  </div>
  <div className="admin-info-row">
    <span className="admin-info-label">Aadhar No: </span>
    <span className="admin-info-value">{profile.AdharNumber}</span>
  </div>
  <div className="admin-info-row">
    <span className="admin-info-label">PAN No: </span>
    <span className="admin-info-value">{profile.PANCARDNumber}</span>
  </div>
  <div className="admin-info-row">
    <span className="admin-info-label">File Type: </span>
    <span className="admin-info-value">{profile.type}</span>

  </div>
</div>
            </div>
            <div className="admin-profile-actions">
              <button
                className="admin-approve-btn"
                onClick={() => handleApprove(profile._id)}
              >
                Approve
              </button>
              <button
                className="admin-delete-btn"
                onClick={() => handleDelete(profile._id)}
              >
                Reject
              </button>
              <button
                className="admin-view-btn"
                onClick={() => handleView(profile.filePath)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVerifyProfiles;