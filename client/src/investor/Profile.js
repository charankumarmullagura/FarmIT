// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import API from "../components/api";
// import "../farmer/Profile.css";

// const CreateProfile = () => {
//   const { register, handleSubmit } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setMessage("");

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "document") {
//         formData.append("document", data.document[0]);
//       } else {
//         formData.append(key, data[key]);
//       }
//     });

//     try {
//       const response = await API.post("/postProfile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(response.data.message);
//       toast.success("Profile Uploaded Successfully");

//       if (response.data.role === "farmer") {
//         navigate("/farmerDashboard");
//       } else if (response.data.role === "investor") {
//         navigate("/InvestorDashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred while creating the profile.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="create-profile-wrapper">
//       <h2 className="create-profile-heading">Create Profile</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="profile-form">

//         {/* Personal Details */}
//         <div className="create-profile-section">
//           <div className="create-section-label">Personal Details</div>
//           <div className="create-profile-grid">
//             <input type="text" placeholder="Full Name" className="profile-input" {...register("fullName", { required: true })} />
//             <input type="email" placeholder="Email Address" className="profile-input" {...register("EmailAddress", { required: true })} />
//             <input type="text" placeholder="Phone Number" className="profile-input" {...register("PhoneNumber", { required: true })} />
//             <input type="text" placeholder="Country" className="profile-input" {...register("Country", { required: true })} />
//             <input type="text" placeholder="State" className="profile-input" {...register("State", { required: true })} />
//             <input type="text" placeholder="City" className="profile-input" {...register("City", { required: true })} />
//             <input type="text" placeholder="Postal Code" className="profile-input" {...register("PostalCode", { required: true })} />
//             <input type="text" placeholder="Address" className="profile-input" {...register("Address", { required: true })} />
//             <input type="date" className="profile-input" {...register("DateofBirth", { required: true })} />
//             <select className="create-profile-input" {...register("Gender", { required: true })}>
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* KYC */}
//         <div className="create-profile-section">
//           <div className="create-section-label">KYC</div>
//           <div className="create-profile-grid">
//             <input type="text" placeholder="Adhar Number" className="create-profile-input" {...register("AdharNumber", { required: true })} />
//             <input type="text" placeholder="PAN Card Number" className="create-profile-input" {...register("PANCARDNumber", { required: true })} />
//           </div>
//         </div>

//         {/* Document Verification */}
//         <div className="create-profile-section">
//           <div className="create-section-label">Document Verification</div>
//           <div className="create-profile-grid">
//             <select className="create-profile-input" {...register("type", { required: true })}>
//               <option value="">Select Type</option>
//               <option value="farm_certificate">Farm Certificate</option>
//               <option value="loan_agreement">Loan Agreement</option>
//               <option value="identity_proof">Identity Proof</option>
//               <option value="other">Other</option>
//             </select>
//             <input type="file" className="create-profile-input" {...register("document", { required: true })} />
//           </div>
//         </div>

//         <button type="submit" className="create-submit-button" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Create Profile"}
//         </button>

//         {message && <p className="create-profile-message">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateProfile;









import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../components/api";
import "../farmer/Profile.css";

const CreateProfile = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isProfileLocked, setIsProfileLocked] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if profile already exists
  useEffect(() => {
    async function checkProfile() {
      try {
        const response = await API.get("/getProfile");
        if (response.data.profile) {
          setIsProfileLocked(true);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    }
    checkProfile();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "document") {
        formData.append("document", data.document[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await API.post("/postProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      toast.success("Profile Uploaded Successfully");
      setIsProfileLocked(true);

      // Stay in dashboard but navigate to /getProfile view
      navigate("/investor");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred while creating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-profile-wrapper">
      <h2 className="create-profile-heading">{isProfileLocked ? "Profile Locked" : "Create Profile"}</h2>

      {isProfileLocked ? (
        <p className="create-profile-message">Your profile has already been created and cannot be edited.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">

          {/* Personal Details */}
          <div className="create-profile-section">
            <div className="create-section-label">Personal Details</div>
            <div className="create-profile-grid">
              <input type="text" placeholder="Full Name" className="profile-input" {...register("fullName", { required: true })} />
              <input type="email" placeholder="Email Address" className="profile-input" {...register("EmailAddress", { required: true })} />
              <input type="text" placeholder="Phone Number" className="profile-input" {...register("PhoneNumber", { required: true })} />
              <input type="text" placeholder="Country" className="profile-input" {...register("Country", { required: true })} />
              <input type="text" placeholder="State" className="profile-input" {...register("State", { required: true })} />
              <input type="text" placeholder="City" className="profile-input" {...register("City", { required: true })} />
              <input type="text" placeholder="Postal Code" className="profile-input" {...register("PostalCode", { required: true })} />
              <input type="text" placeholder="Address" className="profile-input" {...register("Address", { required: true })} />
              <input type="date" className="profile-input" {...register("DateofBirth", { required: true })} />
              <select className="create-profile-input" {...register("Gender", { required: true })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* KYC */}
          <div className="create-profile-section">
            <div className="create-section-label">KYC</div>
            <div className="create-profile-grid">
              <input type="text" placeholder="Adhar Number" className="create-profile-input" {...register("AdharNumber", { required: true })} />
              <input type="text" placeholder="PAN Card Number" className="create-profile-input" {...register("PANCARDNumber", { required: true })} />
            </div>
          </div>

          {/* Document Verification */}
          <div className="create-profile-section">
            <div className="create-section-label">Document Verification</div>
            <div className="create-profile-grid">
              <select className="create-profile-input" {...register("type", { required: true })}>
                <option value="">Select Type</option>
                <option value="farm_certificate">Farm Certificate</option>
                <option value="loan_agreement">Loan Agreement</option>
                <option value="identity_proof">Identity Proof</option>
                <option value="other">Other</option>
              </select>
              <input type="file" className="create-profile-input" {...register("document", { required: true })} />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Profile"}
          </button>

          {message && <p className="create-profile-message">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default CreateProfile;
