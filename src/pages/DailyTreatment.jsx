import React, { useState, useEffect, act } from "react";
import About from "../components/Tabs/About";
import Prescriptions from "../components/Tabs/Prescriptions";
import Diagnosis from "../components/Tabs/Diagnosis";
import Followup from "../components/Tabs/Followup";
import { Link } from "react-router-dom";

export default function TreatmentDashboard() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [complaints, setComplaints] = useState([]);
  const [activeComplaint, setActiveComplaint] = useState({});
  const [selectedTab, setSelectedTab] = useState("aboutPatient"); // State to track selected tab

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const [complaintResponse, followupResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/p/complaints/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/p/followup/`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }),
        ]);
        if (!complaintResponse.ok) {
          throw new Error("Failed to fetch complaints");
        }
        if (!followupResponse.ok) {
          throw new Error("Failed to fetch followups");
        }
        const complaintData = await complaintResponse.json();
        const followupData = await followupResponse.json();
        const patientData = [
          ...(complaintData.complaints || []),
          ...(followupData.followups || []),
        ];

        console.log("complaints got fetched!!");
        setComplaints(patientData);
        setActiveComplaint(patientData[0]);
        if (patientData.length == 0) setActiveComplaint({});

        // Store patient data including phone numbers in sessionStorage
        sessionStorage.setItem("patientData", JSON.stringify(patientData));

        // Also store individual patient phone numbers for easy access
        patientData.forEach((patient) => {
          if (patient.name && patient.phonenumber) {
            sessionStorage.setItem(
              `phone_${patient.name}`,
              patient.phonenumber,
            );
          }
        });
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchPatients();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    console.log("active-complaint: ", activeComplaint);
  }, [activeComplaint]);

  const handlePatientChange = (e) => {
    const selectedPatient = complaints.find((p) => p.name === e.target.value);
    setActiveComplaint(selectedPatient);

    // Store the current patient's phone number in case it's needed elsewhere
    if (selectedPatient?.phonenumber) {
      sessionStorage.setItem(
        `phone_${selectedPatient.name}`,
        selectedPatient.phonenumber,
      );
    }
  };

  return (
    <div className="p-6 bg-[var(--bg)] min-h-screen">
      <div className="w-2/3 mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--txt)]">
            Daily Treatment
          </h2>
          <Link
            to="/doctordashboard"
            className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
          >
            Back to Dashboard
          </Link>
        </div>
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
                onChange={handlePatientChange}
              >
                {complaints.length == 0 ? (
                  <option key="0" value={null}>
                    No patients remaining
                  </option>
                ) : (
                  complaints.map((patient, index) => (
                    <option key={index} value={patient.name}>
                      {patient.name}
                    </option>
                  ))
                )}
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
                  ? activeComplaint.complaint_object?.complaint ||
                  activeComplaint.complaint
                  : "No complaint available"}
              </div>
            </div>
          </div>
        </div>

        <div className="my-7">
          <div className="flex space-x-4 border-b-2 border-[var(--lightgreen)]">
            <button
              className={`px-6 py-2 transition duration-300 rounded-t-md hover:cursor-pointer ${selectedTab === "aboutPatient"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)] hover:bg-[var(--lightgreen)] hover:text-[var(--txt)]"
                }`}
              onClick={() => handleTabChange("aboutPatient")}
            >
              About Patient
            </button>

            <button
              className={`px-6 py-2 transition duration-300 rounded-t-md hover:cursor-pointer ${selectedTab === "treatment"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)] hover:bg-[var(--lightgreen)] hover:text-[var(--txt)]"
                }`}
              onClick={() => handleTabChange("treatment")}
            >
              Diagnosis
            </button>

            <button
              className={`px-6 py-2 transition duration-300 rounded-t-md hover:cursor-pointer ${selectedTab === "prescription"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)] hover:bg-[var(--lightgreen)] hover:text-[var(--txt)]"
                }`}
              onClick={() => handleTabChange("prescription")}
            >
              Prescription
            </button>
            <button
              className={`px-6 py-2 transition duration-300 rounded-t-md hover:cursor-pointer ${selectedTab === "followup"
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-transparent text-[var(--darkgreen)] hover:bg-[var(--lightgreen)] hover:text-[var(--txt)]"
                }`}
              onClick={() => handleTabChange("followup")}
            >
              Follow-up
            </button>
          </div>
        </div>

        {/* Conditionally Render Treatment or Prescription */}
        <div className="mt-6">
          {selectedTab === "aboutPatient" ? (
            <div className="min-h-64 mb-6">
              <About activeComplaint={activeComplaint} />
            </div>
          ) : selectedTab === "prescription" ? (
            <div className="min-h-64 mb-6">
              <Prescriptions activeComplaint={activeComplaint} />
            </div>
          ) : selectedTab === "treatment" ? (
            <div className="min-h-64 mb-6">
              <Diagnosis activeComplaint={activeComplaint} />
            </div>
          ) : selectedTab === "followup" ? (
            <div className="min-h-64 mb-6">
              <Followup activeComplaint={activeComplaint} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
