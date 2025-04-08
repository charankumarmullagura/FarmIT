import React, { useState } from "react";
import API from "../components/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { response } from "express";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/login", formData);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");

      switch (data.role) {
        case "investor":
          navigate("/investor");
          break;
        case "farmer":
          navigate("/farmer");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          toast.error("Invalid role. Please contact support.");
          break;
      }
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You are not verified.");
      } else if (err.response?.status === 400) {
        toast.error("Invalid credentials.");
      } else {
        toast.error(err.response?.data?.message || "Error during login");
      }
    }
  };

  return (
    <div className="main-container1">
      <form onSubmit={handleSubmit} className="form-container1">
        <DotLottieReact
          src="https://lottie.host/059ece8d-4d8e-43c1-a659-7ad47bed3c39/7vIJNcHXTo.lottie"
          loop
          autoplay
        />
        <h1 className="loginn123">Login</h1>

        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label style={{ fontWeight: "500", color: "#4A5568"}}>
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
  
        <h4>
          If you haven't Registered,{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </h4>
  
        <button type="submit" className="submit-btnlogin">
          Login
        </button>
      </form>
    </div>
  );  
};

export default Login;