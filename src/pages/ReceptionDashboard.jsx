import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, UserPlus, Search, Mail } from "lucide-react"; // Lucide icons

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Top navigation cards
  const ActionCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8">
      <Link
        to="/register"
        className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-[var(--darkgreen)] p-3 md:p-4 rounded-full text-white">
            <UserPlus className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg md:text-xl font-semibold text-[var(--darkergreen)]">
              Register Patient
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Add a new patient to the system
            </p>
          </div>
        </div>
      </Link>
      <Link
        to="/appointment"
        className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-[var(--darkgreen)] p-3 md:p-4 rounded-full text-white">
            <CalendarPlus className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[var(--darkergreen)]">
              Schedule Appointment
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Book a new appointment
            </p>
          </div>
        </div>
      </Link>
      <Link
        to="/patientdb"
        className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-[var(--darkgreen)] p-3 md:p-4 rounded-full text-white">
            <Search className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[var(--darkergreen)]">
              Search Patient
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Find patient records
            </p>
          </div>
        </div>
      </Link>
      <Link
        to="/sendmessage"
        className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-[var(--darkgreen)] p-3 md:p-4 rounded-full text-white">
            <Mail className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[var(--darkergreen)]">
              Send Reminder
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Send followup reminders
            </p>
          </div>
        </div>
      </Link>
    </div>
  );

  // Dashboard stats component
  const DashboardStats = () => (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-6 md:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-white">
            Today's Appointments
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {patients.length}
          </p>
        </div>
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-3 md:p-4 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold text-white">
            Today's Follow-ups
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-white">
            {followups.length}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-3 md:p-6">
      <div className="w-full md:w-4/5 lg:w-2/3">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[var(--txt)] my-6 md:my-10">
          Reception Dashboard
        </h1>

        <ActionCards />
        <DashboardStats />

        <div className="mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--darkergreen)] mb-3 md:mb-4">
            Appointments
          </h2>
          <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
            {loading ? (
              <p className="text-[var(--txt)]">Loading patients...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : patients.length === 0 ? (
              <p className="text-[var(--txt)]">No patients registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Name
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Phone
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">Age</th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Complaint
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-1 md:p-2">
                          {patient.name || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {patient.phonenumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {patient.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {patient.complaint || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
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

        <div className="mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--darkergreen)] mb-3 md:mb-4">
            Follow-ups
          </h2>
          <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
            {loading ? (
              <p className="text-[var(--txt)]">Loading follow-ups...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : followups.length === 0 ? (
              <p className="text-[var(--txt)]">No Follow-ups for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Name
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Phone
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">Age</th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Follow-up
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {followups.map((followup, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-1 md:p-2">
                          {followup.name || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {followup.phonenumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {followup.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {followup.followup || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
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
      </div>
    </div>
  );
};

export default Dashboard;
