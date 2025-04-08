import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from '../components/api.js'
import { toast } from "react-toastify";
// import '../farmerFillProfile.css'

const CreateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.document[0]) {
      formData.append("document", data.document[0]);
    }

    try {
      const response = await API.post("/postProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage(response.data.message);
      toast.success("Profile Uploaded Successfully");

      console.log(response);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while creating the profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero-container mx-auto p-6">
      <h1 className="hero-title mb-6">Create Profile</h1>

      {successMessage && <p className="hero-success-text mb-4">{successMessage}</p>}
      {errorMessage && <p className="hero-error-text mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="hero-form">
        <div className="hero-grid mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="hero-input"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p className="hero-error-message">{errors.fullName.message}</p>}

          <input
            type="email"
            placeholder="Email Address"
            className="hero-input"
            {...register("EmailAddress", { required: "Email Address is required" })}
          />
          {errors.EmailAddress && <p className="hero-error-message">{errors.EmailAddress.message}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            className="hero-input"
            {...register("PhoneNumber", { required: "Phone Number is required" })}
          />
          {errors.PhoneNumber && <p className="hero-error-message">{errors.PhoneNumber.message}</p>}

          <input
            type="text"
            placeholder="Country"
            className="hero-input"
            {...register("Country", { required: "Country is required" })}
          />

          <input
            type="text"
            placeholder="State"
            className="hero-input"
            {...register("State", { required: "State is required" })}
          />

          <input
            type="text"
            placeholder="City"
            className="hero-input"
            {...register("City", { required: "City is required" })}
          />

          <input
            type="text"
            placeholder="Postal Code"
            className="hero-input"
            {...register("PostalCode", { required: "Postal Code is required" })}
          />

          <input
            type="text"
            placeholder="Address"
            className="hero-input"
            {...register("Address", { required: "Address is required" })}
          />

          <input
            type="date"
            placeholder="Date of Birth"
            className="hero-input"
            {...register("DateofBirth", { required: "Date of Birth is required" })}
          />

          <select
            className="hero-input"
            {...register("Gender", { required: "Gender is required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            className="hero-input"
            {...register("title", { required: "Title is required" })}
          />

          <select
            className="hero-input"
            {...register("type", { required: "Type is required" })}
          >
            <option value="">Select Type</option>
            <option value="farm_certificate">Farm Certificate</option>
            <option value="loan_agreement">Loan Agreement</option>
            <option value="identity_proof">Identity Proof</option>
            <option value="other">Other</option>
          </select>

          <input
            type="file"
            className="hero-input"
            {...register("document", { required: "Document is required" })}
          />
          {errors.document && <p className="hero-error-message">{errors.document.message}</p>}
        </div>

        <button
          type="submit"
          className="hero-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;