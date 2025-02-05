import React, { useState } from 'react';

const PatientAppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    chiefComplaint: '',
  });

  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (e) => {
    const phoneValue = e.target.value;
    if (!/^[0-9]{10}$/.test(phoneValue)) {
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
    }
    setFormData({ ...formData, phone: phoneValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError) return;
    console.log('Appointment Data Submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[var(--bg)] rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-[var(--txt)] mb-6">Patient Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--txt)]">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--txt)]">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={validatePhone}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>

        {/* Chief Complaint */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">Chief Complaint</label>
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
          className="w-full bg-[var(--darkgreen)] text-white p-2 rounded-md hover:bg-[var(--lightgreen)] transition duration-200"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default PatientAppointmentForm;
