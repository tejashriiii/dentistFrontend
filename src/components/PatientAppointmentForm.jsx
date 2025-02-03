import React, { useState } from 'react';

const PatientAppointmentForm = () => {
  const [formData, setFormData] = useState({
    xrayToothNumber: '',
    date: '',
    time: '',
    chiefComplaint: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Data Submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Patient Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">X-ray of Tooth (Specify Number)</label>
          <input
            type="number"
            name="xrayToothNumber"
            value={formData.xrayToothNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">Chief Complaint</label>
          <textarea
            name="purpose"
            value={formData.chiefComplaint}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default PatientAppointmentForm;
