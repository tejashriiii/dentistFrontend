import React, { useState, useEffect } from "react";
import About from "../components/Tabs/About";
import Prescriptions from "../components/Tabs/Prescriptions";
import Treatment from "../components/Tabs/Treatment";


export default function TreatmentDashboard() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [complaints, setComplaints] = useState([]);
  const [selectedTab, setSelectedTab] = useState("treatment"); // State to track selected tab

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8000/p/complaints/", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        // console.log(data);
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchPatients();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="p-6 bg-[var(--bg)] min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <div className="flex justify-between pb-1.5">
            <div className="w-1/2 flex items-center space-x-2">
              <label className="text-lg block  font-semibold text-[var(--darkergreen)] ">
                Date:
              </label>
              <input
                type="date"
                value={todayDate} // Set value to today's date
                readOnly
                className="w-full px-2 "
              />
            </div>
          </div>

          {/* Patient and Doctor Dropdown Section */}
          <div className="flex w-full pt-1">
            {/* Patient Selection */}
            <div className="w-1/2 pr-4">
              <label className="text-lg block font-semibold text-[var(--darkergreen)] mb-1">
                Patient
              </label>
              <select
                className="w-full px-3 py-2 border border-[var(--darkgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--darkgreen)] hover:border-[var(--darkgreen)]"
                onChange={(e) => {
                  document.getElementById("complaint-box").innerText =
                    complaints.find((p) => p.name === e.target.value)
                      ?.complaint || "No complaint available";
                }}
              >
                {complaints.map((patient, index) => (
                  <option key={index} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="w-1/2 pl-4">
              <label className="block text-lg font-semibold text-[var(--darkergreen)] mb-1">
                Complaint
              </label>
              <div
                id="complaint-box"
                className="w-full px-3 py-2 border border-[var(--darkgreen)] rounded-lg"
              >
                {complaints.length > 0
                  ? complaints[0].complaint
                  : "No complaint available"}
              </div>
            </div>
          </div>
        </div>

        
        <div className="my-7">
          <div className="flex space-x-4 border-b-2 border-[var(--lightgreen)]">
          <button
              className={`px-6 py-2 ${
                selectedTab === "aboutPatient"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)]"
              }`}
              onClick={() => handleTabChange("aboutPatient")}
            >
              About Patient
            </button>
            <button
              className={`px-6 py-2 ${
                selectedTab === "treatment"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)]"
              }`}
              onClick={() => handleTabChange("treatment")}
            >
              Treatment
            </button>
            <button
              className={`px-6 py-2 ${
                selectedTab === "prescription"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)]"
              }`}
              onClick={() => handleTabChange("prescription")}
            >
              Prescription
            </button>
          </div>
        </div>

        {/* Conditionally Render Treatment or Prescription */}
        <div className="mt-6">
          {selectedTab === "aboutPatient" ? (
            <div className="min-h-64 mb-6">
              <About />
            </div>
          ) : selectedTab === "prescription" ? (
            <div className="min-h-64 mb-6">
              <Prescriptions />
            </div>
          ) :selectedTab === "treatment" ? (
            <div className="min-h-64 mb-6">
              <Treatment />
            </div>): null}
        </div>
      </div>
    </div>
  );
}
