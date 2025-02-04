import React, { useState, useEffect } from "react";

const PatientRegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    dob: "",
    gender: "",
  });

  const [illnessInput, setIllnessInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddIllness = () => {
    if (illnessInput.trim()) {
      setFormData({
        ...formData,
        pastIllnesses: [...formData.pastIllnesses, illnessInput.trim()],
      });
      setIllnessInput("");
    }
  };

  const handleRemoveIllness = (index) => {
    const updatedIllnesses = formData.pastIllnesses.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, pastIllnesses: updatedIllnesses });
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        allergicHistories: [...formData.allergicHistories, allergyInput.trim()],
      });
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = formData.allergicHistories.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, allergicHistories: updatedAllergies });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      phonenumber: formData.mobileNumber,
      details: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        gender: formData.gender,
        date_of_birth: formData.dob,
      },
    };
    console.log(JSON.stringify(dataToSend));

    try {
      const response = await fetch(`http://127.0.0.1:8000/ad/details/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        // Handle error responses here (e.g., show a message to the user)
      } else {
        const responseData = await response.json();
        console.log("Login successful:", responseData);
        // Handle successful login (e.g., store token, redirect user)
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors here
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#fbfffb] rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-[#3d4243] mb-6">
        New Patient Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87] "
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[#a9f0a9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#87ab87]"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="T">Transgender</option>
            <option value="O">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#87ab87] text-white p-2 rounded-md hover:bg-[#87ab87] transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default PatientRegisterForm;
