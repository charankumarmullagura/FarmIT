import React, { useState } from "react";
import API from "./api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Signup.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      const passwordConditions = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

if (!passwordConditions.test(formData.password)) {
  toast.error(
    "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
  );
  return;
}
      
      if (formData.firstName.length < 1) {
          toast.error("First Name should contain atleast 3 characters");
          return;
     }
      if (formData.lastName.length < 1) {
        toast.error("First Name should contain atleast 2 characters");
        return;
}
    
    try {
      await API.post("/register", formData);
      toast.success("Register successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during registration");
    }
  };

return (
  <div className="main-container">
    <form onSubmit={handleSubmit} className="form-container">
      <DotLottieReact
        src="https://lottie.host/cc506d73-970f-4300-8d47-374df204b999/HBTFCdgrqD.lottie"
        loop
        autoplay
      />
      <h1 className="register">Register</h1>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <label style={{ fontWeight: "500", color: "#4A5568" }}>
          First Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <label style={{ fontWeight: "500", color: "#4A5568" }}>
          Last Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <label style={{ fontWeight: "500", color: "#4A5568" }}>
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <label style={{ fontWeight: "500", color: "#4A5568" }}>
          Password <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      <select
        className="select-input"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="farmer">Farmer</option>
        <option value="investor">Investor</option>
        {/* <option value="admin">Admin</option> */}
      </select>

      <h4>
        If you have already Registered,{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </h4>

      <button type="submit" className="submit-btn">
        Register
      </button>
    </form>
  </div>
);
};
export default SignupForm;