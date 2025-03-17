import React, { useState, useEffect } from "react";

const PatientDatabase = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/p/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      setPatients(Array.isArray(data.patients) ? data.patients : [data]);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-[var(--txt)] mb-6">
        Patient Database
      </h1>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">
          Patients List
        </h2>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <p className="text-[var(--txt)]">Loading patients...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : patients.length === 0 ? (
            <p className="text-[var(--txt)]">No patients found in the database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                  <tr>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Phone Number</th>
                    <th className="border border-gray-300 p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td className="border border-gray-300 p-2">
                        {patient.name || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {patient.phonenumber || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {patient.email || "N/A"}
                      </td>
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

export default PatientDatabase;
