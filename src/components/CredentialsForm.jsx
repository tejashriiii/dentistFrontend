import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const CredentialsForm = ({ formAction }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) {
        return; 
      }
      if (value.length > 10) {
        return; // Prevent entering more than 10 digits
      }

      // Validate mobile number length
      if (value.length !== 10 && value.length > 0) {
        setErrors((prev) => ({ ...prev, mobileNumber: "Mobile number must be 10 digits" }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNumber: "" }));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.mobileNumber) {
      return; }

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
        alert(errorData.error || "Something went wrong!");
      } else {
        alert(`${capitalizeFirstLetter(formAction)} successful!`);
        setFormData({
          mobileNumber: "",
          password: "",
          name: "",
        });
      }
    } catch (error) {
      alert("Network error! Please try again.");
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
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
            maxLength={10}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
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
