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
    newPhoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentForm, setCurrentForm] = useState("main"); // 'main', 'forgot', 'changePhone'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const capitalizeFirstLetter = (val) =>
    String(val).charAt(0).toUpperCase() + String(val).slice(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let endpoint = "";
    let dataToSend = {};

    if (currentForm === "main") {
      endpoint = `auth/${formAction}/`;
      dataToSend = {
        phonenumber: formData.mobileNumber,
        password: formData.password,
        name: formData.name,
      };
    } else if (currentForm === "forgot") {
      endpoint = `auth/reset-password/`;
      dataToSend = {
        name: formData.name,
        phonenumber: formData.mobileNumber,
      };
    } else if (currentForm === "changePhone") {
      endpoint = `auth/change-phone/`;
      dataToSend = {
        name: formData.name,
        old_phonenumber: formData.mobileNumber,
        new_phonenumber: formData.newPhoneNumber,
      };
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.error || "Something went wrong!");
      } else {
        if (currentForm === "main") {
          const token = responseData.token;
          sessionStorage.setItem("jwt", token);
          window.dispatchEvent(new Event("roleChanged"));
          toast.success("Login successful! Redirecting...");

          setTimeout(() => {
            const userRole = getUserRole();
            if (userRole === "dentist") {
              navigate("/doctordashboard");
            } else if (userRole === "admin") {
              navigate("/admindashboard");
            } else if (userRole === "patient") {
              navigate("/patientdashboard");
            } else {
              navigate("/");
            }
          }, 1500);
        } else {
          toast.success(
            currentForm === "forgot"
              ? "Password reset link sent!"
              : "Phone number updated!"
          );
          setCurrentForm("main");
        }

        setFormData({
          mobileNumber: "",
          password: "",
          name: "",
          newPhoneNumber: "",
        });
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">
            Ojas Dental Clinic
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-[var(--txt)] mb-6 text-center">
          {currentForm === "forgot"
            ? "Forgot Password"
            : currentForm === "changePhone"
            ? "Change Phone Number"
            : `Patient ${capitalizeFirstLetter(formAction)}`}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--txt)]">
              Name
            </label>
            <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
              <FaUser className="text-[var(--darkgreen)] ml-3 mr-2" />
              <input
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

          {/* Old Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--txt)]">
              {currentForm === "changePhone"
                ? "Old Phone Number"
                : "Mobile Number"}
            </label>
            <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
              <FaPhone className="text-[var(--darkgreen)] ml-3 mr-2" />
              <input
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="block w-full p-2 border-none focus:outline-none"
              />
            </div>
          </div>

          {/* New Phone Field (only for phone change) */}
          {currentForm === "changePhone" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--txt)]">
                New Phone Number
              </label>
              <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
                <FaPhone className="text-[var(--darkgreen)] ml-3 mr-2" />
                <input
                  type="number"
                  name="newPhoneNumber"
                  value={formData.newPhoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter new phone number"
                  className="block w-full p-2 border-none focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Password (only for login) */}
          {currentForm === "main" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--txt)]">
                Password
              </label>
              <div className="flex items-center border border-[var(--darkgreen)] rounded-md mt-1 focus-within:ring-2 focus-within:ring-[var(--lightgreen)]">
                <FaLock className="text-[var(--darkgreen)] ml-3 mr-2" />
                <input
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
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[var(--darkgreen)] text-white p-3 rounded-md hover:bg-[var(--darkergreen)] duration-200 shadow-md hover:shadow-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : currentForm === "main"
              ? capitalizeFirstLetter(formAction)
              : "Submit"}
          </button>
        </form>

        {/* Switch Form Links */}
        {formAction === "login" && (
          <div className="mt-6 text-center space-y-2">
            {currentForm !== "main" && (
              <button
                onClick={() => setCurrentForm("main")}
                className="text-sm text-[var(--txt)] hover:underline"
              >
                Back to Login
              </button>
            )}
            {currentForm === "main" && (
              <>
                <button
                  onClick={() => setCurrentForm("forgot")}
                  className="block w-full text-sm text-[var(--txt)] hover:underline"
                >
                  Forgot Password?
                </button>
                <button
                  onClick={() => setCurrentForm("changePhone")}
                  className="block w-full text-sm text-[var(--txt)] hover:underline"
                >
                  Change Phone Number
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialsForm;
