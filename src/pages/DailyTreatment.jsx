// DailyTreatment.jsx

import React, { useState, useEffect } from "react";
import Prescriptions from "../components/Prescriptions";
import Treatment from "../components/Treatment";

export default function TreatmentDashboard() {
  const [dateTime, setDateTime] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedTab, setSelectedTab] = useState("treatment"); // State to track selected tab

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/p/complaints/", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        let names = data.complaints.map((complaint) => complaint.name);

        // Ensure we extract only the patient array
        if (!names.length) {
          names = ["No patients left"];
        }
        setComplaints(names);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchPatients();
  }, []);
  useEffect(() => {
    const now = new Date();

    // Convert to IST (UTC +5:30)
    const offsetIST = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istTime = new Date(now.getTime() + offsetIST);

    // Format as YYYY-MM-DDTHH:MM (required for datetime-local input)
    const formattedDateTime = istTime.toISOString().slice(0, 16);

    setDateTime(formattedDateTime);
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="p-6 bg-[var(--bg)] min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          {/* Date and Clinic Section */}
          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Date*
              </label>
              <input
                type="datetime-local"
                defaultValue={dateTime}
                className="w-full px-3 py-2 border border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--darkgreen)] hover:border-[var(--darkgreen)]"
              />
            </div>
            <div className="w-1/2 pl-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Clinic*
              </label>
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                <option>Ojas Dental Clinic</option>
              </select>
            </div>
          </div>

          {/* Patient and Doctor Dropdown Section */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 pr-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Patient*
              </label>
              {/* Patient Dropdown - to be fetched from server DB */}
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                {complaints.map((name) => (
                  <option>{name}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2 pl-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Doctor*
              </label>
              {/* Doctor Dropdown - to be fetched from server DB */}
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                <option>Dr. A</option>
                <option>Dr. B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navbar-like Tabs Section */}
        <div className="mb-4">
          <div className="flex space-x-4 border-b-2 border-[var(--lightgreen)]">
            <button
              className={`px-6 py-2 ${selectedTab === "treatment" ? "bg-[var(--darkgreen)] text-white" : "bg-transparent text-[var(--darkgreen)]"}`}
              onClick={() => handleTabChange("treatment")}
            >
              Treatment
            </button>
            <button
              className={`px-6 py-2 ${selectedTab === "prescription" ? "bg-[var(--darkgreen)] text-white" : "bg-transparent text-[var(--darkgreen)]"}`}
              onClick={() => handleTabChange("prescription")}
            >
              Prescription
            </button>
          </div>
        </div>

        {/* Conditionally Render Treatment or Prescription */}
        <div className="mt-6">
          {selectedTab === "treatment" ? (
            <div className="min-h-64 mb-6">
              <Treatment />
            </div>
          ) : selectedTab === "prescription" ? (
            <div className="min-h-64 mb-6">
              <Prescriptions />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
