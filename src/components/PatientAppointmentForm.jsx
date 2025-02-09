import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PatientAppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    chiefComplaint: "",
  });

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (e) => {
    const phoneValue = e.target.value;
    if (!/^[0-9]{10}$/.test(phoneValue)) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
    setFormData({ ...formData, phone: phoneValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) {
      toast.error("Please correct the phone number error.");
      return;
    }
  
    const dataToSend = {
      phonenumber: formData.phone,
      complaint: {
        name: formData.name,
        chief_complaint: formData.chiefComplaint,
      },
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/ad/complaints/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error(errorData.message || "Failed to register complaint.");
      } else {
        const responseData = await response.json();
        console.log("Complaint registered:", responseData);
        toast.success("Appointment submitted successfully!");
        
        setFormData({ name: "", phone: "", chiefComplaint: "" });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error! Please try again.");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--bg)] rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-[var(--txt)] mb-6">
        Appointment Form
      </h2>
      <form onSubmit={handleSubmit}>
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
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={validatePhone}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        {/* Chief Complaint */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Chief Complaint
          </label>
          <textarea
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--darkgreen)] text-white p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer duration-200"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default PatientAppointmentForm;
