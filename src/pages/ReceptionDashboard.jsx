import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientRegisterForm from "./PatientRegisterForm";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([fetchPatients(), fetchFollowups()]);
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/complaints/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      const patientList = Array.isArray(data.complaints)
        ? data.complaints
        : [data];
      setPatients(patientList);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowups = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/followup/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch followups");
      }
      const data = await response.json();
      const followupList = Array.isArray(data.followups)
        ? data.followups
        : [data];
      setFollowups(followupList);
    } finally {
      setLoading(false);
    }
  };

  // Quick action buttons that float on the page
  const QuickActionButton = () => (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setShowQuickActions(!showQuickActions)}
        className="bg-[var(--darkgreen)] h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[var(--darkergreen)] transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      {showQuickActions && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-64 transform transition-all duration-300">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Register New Patient
            </button>
            <Link
              to="/appointment"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule Appointment
            </Link>
            <Link
              to="/patientdb"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Patient
            </Link>
            <Link
              to="/sendmessage"
              className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Reminder
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // Top navigation cards
  const ActionCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {" "}
      {/* Changed to grid-cols-4 */}
      <button
        onClick={() => setIsRegisterModalOpen(true)}
        className="bg-white rounded-lg shadow-md p-6 hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
              Register Patient
            </h3>
            <p className="text-gray-600">Add a new patient to the system</p>
          </div>
        </div>
      </button>
      <Link
        to="/appointment"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
              Schedule Appointment
            </h3>
            <p className="text-gray-600">Book a new appointment</p>
          </div>
        </div>
      </Link>
      <Link
        to="/patientdb"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
              Search Patient
            </h3>
            <p className="text-gray-600">Find patient records</p>
          </div>
        </div>
      </Link>
      <Link
        to="/sendmessage"
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
              Send Reminder
            </h3>
            <p className="text-gray-600">Send followup reminders</p>
          </div>
        </div>
      </Link>
    </div>
  );

  // Dashboard stats component
  const DashboardStats = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Today's Appointments
          </h3>
          <p className="text-3xl font-bold text-white">{patients.length}</p>
        </div>
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Today's Follow-ups
          </h3>
          <p className="text-3xl font-bold text-white">{followups.length}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-center text-[var(--txt)] my-10">
          Reception Dashboard
        </h1>

        <ActionCards />
        <DashboardStats />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">
            Appointments
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {loading ? (
              <p className="text-[var(--txt)]">Loading patients...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : patients.length === 0 ? (
              <p className="text-[var(--txt)]">No patients registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">
                        Phone Number
                      </th>
                      <th className="border border-gray-300 p-2">Age</th>
                      <th className="border border-gray-300 p-2">Complaint</th>
                      <th className="border border-gray-300 p-2">Time</th>
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
                          {patient.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {patient.complaint || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {patient.time
                            ? patient.time.split(".")[0].slice(0, 5)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">
            Follow-ups
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {loading ? (
              <p className="text-[var(--txt)]">Loading follow-ups...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : followups.length === 0 ? (
              <p className="text-[var(--txt)]">No Follow-ups for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">
                        Phone Number
                      </th>
                      <th className="border border-gray-300 p-2">Age</th>
                      <th className="border border-gray-300 p-2">Follow-up</th>
                      <th className="border border-gray-300 p-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followups.map((followup, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-2">
                          {followup.name || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {followup.phonenumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {followup.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {followup.followup || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {followup.time
                            ? followup.time.split(".")[0].slice(0, 5)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <QuickActionButton />

        {/* Modal for Patient Registration */}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[var(--txt)]">
                  Register Patient
                </h2>
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <PatientRegisterForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
