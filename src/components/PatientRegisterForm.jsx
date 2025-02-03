import React, { useState } from 'react';

const PatientRegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    pastIllnesses: [],
    allergicHistories: [],
    password: '',
    dob: '',
    gender: '',
  });

  const [illnessInput, setIllnessInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');

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
      setIllnessInput('');
    }
  };

  const handleRemoveIllness = (index) => {
    const updatedIllnesses = formData.pastIllnesses.filter((_, i) => i !== index);
    setFormData({ ...formData, pastIllnesses: updatedIllnesses });
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        allergicHistories: [...formData.allergicHistories, allergyInput.trim()],
      });
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = formData.allergicHistories.filter((_, i) => i !== index);
    setFormData({ ...formData, allergicHistories: updatedAllergies });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Patient Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
            History of Past Illness
          </label>
          {formData.pastIllnesses.map((illness, index) => (
            <div key={index} className="flex justify-between items-center bg-purple-100 p-2 rounded-md mb-2">
              <span>{illness}</span>
              <button type="button" onClick={() => handleRemoveIllness(index)} className="text-purple-700 font-bold">&times;</button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={illnessInput}
              onChange={(e) => setIllnessInput(e.target.value)}
              className="flex-1 p-2 border border-purple-300 rounded-md focus:outline-none"
            />
            <button type="button" onClick={handleAddIllness} className="bg-purple-600 text-white p-2 rounded-md">Add</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Any Allergic History
          </label>
          {formData.allergicHistories.map((allergy, index) => (
            <div key={index} className="flex justify-between items-center bg-purple-100 p-2 rounded-md mb-2">
              <span>{allergy}</span>
              <button type="button" onClick={() => handleRemoveAllergy(index)} className="text-purple-700 font-bold">&times;</button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              className="flex-1 p-2 border border-purple-300 rounded-md focus:outline-none"
            />
            <button type="button" onClick={handleAddAllergy} className="bg-purple-600 text-white p-2 rounded-md">Add</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientRegisterForm;
