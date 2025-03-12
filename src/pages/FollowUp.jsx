import React, { useState } from "react";

const FollowUp = ({ userType }) => {
  // Mock patient data
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", appointment: "2025-02-10" },
    { id: 2, name: "Jane Smith", appointment: "2025-02-12" },
    { id: 3, name: "Alice Brown", appointment: "2025-02-15" },
  ]);

  // Handle appointment update
  const handleAppointmentChange = (id, newDate) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, appointment: newDate } : patient
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-purple-100 p-6 rounded-lg shadow-md mt-5">
      <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
        Follow-Up Appointments
      </h2>

      {/* For Doctor and Staff */}
      {(userType === "doctor" || userType === "staff") && (
        <div>
          <h3 className="text-2xl font-semibold text-purple-800 mb-3">
            Patient List
          </h3>
          <table className="w-full border-collapse border border-purple-300 bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-purple-500 text-white">
                <th className="border p-3">ID</th>
                <th className="border p-3">Patient Name</th>
                <th className="border p-3">Next Appointment</th>
                {userType === "doctor" && <th className="border p-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="text-center hover:bg-purple-200">
                  <td className="border p-3">{patient.id}</td>
                  <td className="border p-3">{patient.name}</td>
                  <td className="border p-3 text-purple-600 font-medium">
                    {patient.appointment}
                  </td>
                  {userType === "doctor" && (
                    <td className="border p-3">
                      <input
                        type="date"
                        className="border p-1 rounded-md bg-purple-50 text-purple-700"
                        value={patient.appointment}
                        onChange={(e) => handleAppointmentChange(patient.id, e.target.value)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* For Patients */}
      {userType === "patient" && (
        <div className="mt-5">
          <h3 className="text-2xl font-semibold text-purple-800 mb-3">
            Your Appointment
          </h3>
          {patients.length > 0 ? (
            <p className="text-lg">
              Your next appointment is on:{" "}
              <span className="font-bold text-purple-700">
                {patients[0].appointment}
              </span>
            </p>
          ) : (
            <p className="text-lg text-red-500">No appointment scheduled yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowUp;











