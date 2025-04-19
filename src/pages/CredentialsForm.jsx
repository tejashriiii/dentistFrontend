import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPhone, FaUser, FaLock } from "react-icons/fa";
import { getUserRole } from "../utils/auth.js";

const CredentialsForm = ({ formAction }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      phonenumber: formData.mobileNumber,
      password: formData.password,
      name: formData.name,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${formAction}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Something went wrong!");
      } else {
        const responseData = await response.json();
        if (formAction === "login") {
          const token = responseData.token;
          sessionStorage.setItem("jwt", token);
          window.dispatchEvent(new Event("roleChanged"));

          const userRole = getUserRole();
          toast.success("Login successful! Redirecting...");

          // Clear form data
          setFormData({ mobileNumber: "", password: "", name: "" });

          // Redirect based on role with a 3-second delay
          setTimeout(() => {
            if (userRole === 'dentist') {
              navigate('/doctordashboard');
            } else if (userRole === 'admin') {
              navigate('/admindashboard');
            } else if (userRole === 'patient') {
              navigate('/');
            } else {
              navigate('/');
            }
          }, 2000);
        } else {
          toast.success("Registration successful!");
          setFormData({ mobileNumber: "", password: "", name: "" });
        }
      }
    } catch (error) {
      toast.error("Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Branding Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">
            Ojas Dental Clinic
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-[var(--txt)] mb-6 text-center">
          Patient {capitalizeFirstLetter(formAction)}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Mobile Number Field with Icon */}
          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-[var(--txt)]"
            >
              Mobile Number
            </label>
            <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
              <FaPhone className="text-[var(--darkgreen)] ml-3 mr-2" />
              <input
                id="mobileNumber"
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
                className="block w-full p-2 border-none focus:outline-none"
                maxLength={10}
              />
            </div>
          </div>

          {/* Name Field with Icon */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--txt)]"
            >
              Name
            </label>
            <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
              <FaUser className="text-[var(--darkgreen)] ml-3 mr-2" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="block w-full p-2 border-none focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field with Icon */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--txt)]"
            >
              Password
            </label>
            <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
              <FaLock className="text-[var(--darkgreen)] ml-3 mr-2" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="block w-full p-2 border-none focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[var(--darkgreen)] text-white p-3 rounded-md hover:bg-[var(--darkergreen)] duration-200 shadow-md hover:shadow-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            {isSubmitting ? "Submitting..." : capitalizeFirstLetter(formAction)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CredentialsForm;
