// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import API from "../components/api"; // Ensure this is correctly pointing to your API file

// const CreateProfile = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isProfileLocked, setIsProfileLocked] = useState(false); // Lock Profile after submission
//   const navigate = useNavigate();

//   // Check if profile is already created
//   useEffect(() => {
//     async function checkProfile() {
//       try {
//         const response = await API.get("/getProfile"); // API call to check if profile exists
//         if (response.data.profile) {
//           setIsProfileLocked(true); // Lock form if profile exists
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     }
//     checkProfile();
//   }, []);

//   // Submit Profile Form
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setMessage("");

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "document") {
//         formData.append("document", data.document[0]); // Ensure single file
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
//       setIsProfileLocked(true); // Lock the profile form after submission

//       // Redirect based on role
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
//     <div>
//       <h2>{isProfileLocked ? "Profile Locked" : "Create Profile"}</h2>
//       {isProfileLocked ? (
//         <p>Your profile has already been created and cannot be edited.</p>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input type="text" placeholder="Full Name" {...register("fullName", { required: "Full Name is required" })} />
//           {errors.fullName && <p>{errors.fullName.message}</p>}

//           <input type="email" placeholder="Email Address" {...register("EmailAddress", { required: "Email Address is required" })} />
//           {errors.EmailAddress && <p>{errors.EmailAddress.message}</p>}

//           <input type="text" placeholder="Phone Number" {...register("PhoneNumber", { required: "Phone Number is required" })} />
//           {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}

//           <input type="text" placeholder="Country" {...register("Country", { required: "Country is required" })} />
//           <input type="text" placeholder="State" {...register("State", { required: "State is required" })} />
//           <input type="text" placeholder="City" {...register("City", { required: "City is required" })} />
//           <input type="text" placeholder="Postal Code" {...register("PostalCode", { required: "Postal Code is required" })} />
//           <input type="text" placeholder="Address" {...register("Address", { required: "Address is required" })} />

//           <input type="date" {...register("DateofBirth", { required: "Date of Birth is required" })} />
//           <select {...register("Gender", { required: "Gender is required" })}>
//             <option value="">Select Gender</option>
//             <option value="male">male</option>
//             <option value="female">female</option>
//             <option value="other">other</option>
//           </select>

//           <input type="text" placeholder="Adhar Number" {...register("AdharNumber", { required: "Adhar Number is required" })} />
//           <input type="text" placeholder="PAN Card Number" {...register("PANCARDNumber", { required: "PAN Card Number is required" })} />

//           <select {...register("type", { required: "Type is required" })}>
//             <option value="">Select Type</option>
//             <option value="farm_certificate">Farm Certificate</option>
//             <option value="loan_agreement">Loan Agreement</option>
//             <option value="identity_proof">Identity Proof</option>
//             <option value="other">Other</option>
//           </select>

//           <input type="file" {...register("document", { required: "Document is required" })} />
//           {errors.document && <p>{errors.document.message}</p>}

//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Create Profile"}
//           </button>
//         </form>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreateProfile;








// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import API from "../components/api"; // Make sure this points to your API setup

// const CreateProfile = () => {
//   const { register, handleSubmit } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isProfileLocked, setIsProfileLocked] = useState(false);
//   const navigate = useNavigate();

//   // Check if profile already exists
//   useEffect(() => {
//     async function checkProfile() {
//       try {
//         const response = await API.get("/getProfile");
//         if (response.data.profile) {
//           setIsProfileLocked(true);
//           setMessage("Profile already exists and is locked.");
//         }
//       } catch (error) {
//         console.error("Error checking profile:", error);
//       }
//     }
//     checkProfile();
//   }, []);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setMessage("");

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "document") {
//         formData.append("document", data.document[0]); // Handle single file
//       } else {
//         formData.append(key, data[key]);
//       }
//     });

//     try {
//       const response = await API.post("/postProfile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Profile created successfully!");
//       setIsProfileLocked(true);
//       setMessage("Profile submitted and locked.");

//       // Redirect based on role
//       if (response.data.role === "farmer") {
//         navigate("/farmerDashboard");
//       } else if (response.data.role === "investor") {
//         navigate("/InvestorDashboard");
//       } else {
//         navigate("/getprofile");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to create profile.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="create-profile-wrapper">
//       <h2>{isProfileLocked ? "Profile Locked" : "Create Your Profile"}</h2>

//       {isProfileLocked ? (
//         <p className="text-gray-600 mb-4">You have already submitted your profile. Editing is disabled.</p>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
//           {/* Personal Details */}
//           <div className="create-profile-section">
//             <div className="create-section-label">Personal Details</div>
//             <div className="create-profile-grid">
//               <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} className="profile-input" />
//               <input type="email" placeholder="Email Address" {...register("EmailAddress", { required: true })} className="profile-input" />
//               <input type="text" placeholder="Phone Number" {...register("PhoneNumber", { required: true })} className="profile-input" />
//               <input type="text" placeholder="Country" {...register("Country", { required: true })} className="profile-input" />
//               <input type="text" placeholder="State" {...register("State", { required: true })} className="profile-input" />
//               <input type="text" placeholder="City" {...register("City", { required: true })} className="profile-input" />
//               <input type="text" placeholder="Postal Code" {...register("PostalCode", { required: true })} className="profile-input" />
//               <input type="text" placeholder="Address" {...register("Address", { required: true })} className="profile-input" />
//               <input type="date" {...register("DateofBirth", { required: true })} className="profile-input" />
//               <select {...register("Gender", { required: true })} className="profile-input">
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           {/* KYC Section */}
//           <div className="create-profile-section">
//             <div className="create-section-label">KYC</div>
//             <div className="create-profile-grid">
//               <input type="text" placeholder="Aadhar Number" {...register("AdharNumber", { required: true })} className="profile-input" />
//               <input type="text" placeholder="PAN Card Number" {...register("PANCARDNumber", { required: true })} className="profile-input" />
//             </div>
//           </div>

//           {/* Document Upload */}
//           <div className="create-profile-section">
//             <div className="create-section-label">Document Upload</div>
//             <div className="create-profile-grid">
//               <select {...register("type", { required: true })} className="profile-input">
//                 <option value="">Select Document Type</option>
//                 <option value="farm_certificate">Farm Certificate</option>
//                 <option value="loan_agreement">Loan Agreement</option>
//                 <option value="identity_proof">Identity Proof</option>
//                 <option value="other">Other</option>
//               </select>
//               <input type="file" {...register("document", { required: true })} className="profile-input" />
//             </div>
//           </div>

//           <button type="submit" className="create-submit-button" disabled={isSubmitting || isProfileLocked}>
//             {isSubmitting ? "Submitting..." : "Create Profile"}
//           </button>

//           {message && <p className="create-profile-message">{message}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default CreateProfile;







import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../components/api";

const CreateProfile = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isProfileLocked, setIsProfileLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkProfile() {
      try {
        const response = await API.get("/getProfile");
        if (response.data.profile) {
          setIsProfileLocked(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
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
      navigate("/farmer");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred while creating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-profile-wrapper">
      <h2>{isProfileLocked ? "Profile Locked" : "Create Profile"}</h2>
      {isProfileLocked ? (
        <p>Your profile has already been created and cannot be edited.</p>
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

          {/* Document Upload */}
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
