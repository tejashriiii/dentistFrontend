// Dashboard.jsx
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/u/patients/", {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();

      // Ensure we extract only the patient array
      setPatients(data.patients || []);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Patient Dashboard
      </h1>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
          Registered Patients
        </h2>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <p className="text-gray-500">Loading patients...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : patients.length === 0 ? (
            <p className="text-gray-500">No patients registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-2">First Name</th>
                    <th className="border border-gray-300 p-2">Last Name</th>
                    <th className="border border-gray-300 p-2">DOB</th>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td className="border border-gray-300 p-2">{patient[2]}</td>
                      <td className="border border-gray-300 p-2">{patient[3]}</td>
                      <td className="border border-gray-300 p-2">{patient[1]}</td>
                      <td className="border border-gray-300 p-2">{patient[4]}</td>
                      <td className="border border-gray-300 p-2">{patient[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

