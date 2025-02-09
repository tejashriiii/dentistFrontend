import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CredentialsForm = ({ formAction }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      phonenumber: formData.mobileNumber,
      password: formData.password,
      name: formData.name,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/${formAction}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || " Something went wrong!");
      } else {
        const responseData = await response.json();
        if (formAction === "login") {
          sessionStorage.setItem("jwt", responseData.token);
          toast.success("Login successful! Redirecting...");
          setFormData({
            mobileNumber: "",
            password: "",
            name: "",
          });
        } else {
          toast.success("Registration successful!");
          setFormData({
            mobileNumber: "",
            password: "",
            name: "",
          });
        }
        
      }
    } catch (error) {
      toast.error("Network error! Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--bg)] rounded-lg shadow-lg mt-10">
      <h2 className="p-0 text-2xl font-bold text-[var(--txt)] mb-6">
        Patient {capitalizeFirstLetter(formAction)}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
            maxLength={10}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--darkgreen)] text-white p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer duration-200"
        >
          {capitalizeFirstLetter(formAction)}
        </button>
      </form>
    </div>
  );
};

export default CredentialsForm;
