import React, { useState } from 'react';

const PatientRegisterForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    address: '',
    chiefComplaint: '',
    pastIllness: '',
    allergicHistory: '',
    xrayToothNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you can handle form submission, e.g., send data to an API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Patient Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Chief Complaint
          </label>
          <textarea
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            History of Past Illness
          </label>
          <textarea
            name="pastIllness"
            value={formData.pastIllness}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Any Allergic History
          </label>
          <textarea
            name="allergicHistory"
            value={formData.allergicHistory}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            X-ray of Tooth (Specify Number)
          </label>
          <input
            type="number"
            name="xrayToothNumber"
            value={formData.xrayToothNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientRegisterForm;
