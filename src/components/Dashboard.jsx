// Dashboard.jsx
import React, { useState } from 'react';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Patient Dashboard</h1>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 ">Registered Patients</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {patients.length === 0 ? (
            <p className="text-gray-500">No patients registered yet.</p>
          ) : (
            <ul className="space-y-4">
              {patients.map((patient, index) => (
                <li key={index} className="border-b pb-2">
                  <h3 className="font-semibold">{patient.patientName}</h3>
                  <p>Mobile: {patient.mobileNumber}</p>
                  <p>Address: {patient.address}</p>
                  <p>Chief Complaint: {patient.chiefComplaint}</p>
                  <p>Allergic History: {patient.allergicHistory}</p>
                  <p>X-ray Tooth Number: {patient.xrayToothNumber}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
