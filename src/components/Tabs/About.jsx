import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientHistory from "../PatientHistory";

function About({ activeComplaint }) {
  // Get the current patient name from the parent component
  const [detailsEditMode, setDetailsEditMode] = useState(false);
  const [history, setHistory] = useState({});
  const [pastIllnesses, setPastIllnesses] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [smokes, setSmokes] = useState("No");
  const [alcohol, setAlcohol] = useState("No");
  const [tobacco, setTobacco] = useState("No");

  // Watch for patient changes in the parent component

  // Custom handlers for adding and removing items
  const handleAddItem = (setter, value, inputId) => {
    if (value && value.trim() !== "") {
      setter((prev) => [...prev, value.trim()]);
      document.getElementById(inputId).value = "";
    }
  };

  const handleRemoveItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const fetchMedicalDetails = async () => {
    try {
      console.log("control here with: ", activeComplaint);
      const patient = activeComplaint.name.replace(/\s+/g, "_").toLowerCase();
      const phoneNumber = activeComplaint.phonenumber;

      // Send data to backend
      const FETCH_MEDICAL_DETAILS_URL = `${import.meta.env.VITE_API_URL}/p/medical_details/${phoneNumber}/${patient}/`;
      const response = await fetch(FETCH_MEDICAL_DETAILS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const medicalDetails = data.medical_details;
        setAllergies(medicalDetails.allergies);
        setPastIllnesses(medicalDetails.illnesses);
        setSmokes(medicalDetails.smoking ? "Yes" : "No");
        setTobacco(medicalDetails.tobacco ? "Yes" : "No");
        setAlcohol(medicalDetails.drinking ? "Yes" : "No");
      } else {
        toast.error("Couldn't fetch patient's medical details");
      }
    } catch (error) {
      console.error("While fetching medical_details: ", error);
      toast.error("Couldn't fetch medical details");
    }
  };

  const fetchHistory = async () => {
    try {
      const patientId = activeComplaint.patient_id;

      // Send data to backend
      const FETCH_HISTORY_URL = `${import.meta.env.VITE_API_URL}/p/history/${patientId}/`;
      const response = await fetch(FETCH_HISTORY_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history);
      }
    } catch (error) {
      console.log("Error sending data to backend:", error);
      toast.error("Error connecting to the server. Please try again later.");
    }
  };

  const handleCancel = async () => {
    fetchMedicalDetails();
    setDetailsEditMode(false);
  };

  const handleSendToBackend = async () => {
    try {
      const patient = activeComplaint.name;
      const phoneNumber = activeComplaint.phonenumber;

      // Prepare data in the format required by the backend
      const data = {
        identity: {
          name: patient,
          phonenumber: phoneNumber,
        },
        medical_details: {
          allergies: allergies,
          illnesses: pastIllnesses,
          smoking: smokes === "Yes",
          drinking: alcohol === "Yes",
          tobacco: tobacco === "Yes",
        },
      };

      // Send data to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/medical_details/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        toast.success("Medical details saved successfully!");
        setDetailsEditMode(false);
      } else {
        toast.error("Failed to save medical details. Please try again.");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      toast.error("Error connecting to the server. Please try again later.");
    }
  };

  const fetchAboutData = async () => {
    try {
      Promise.all([fetchMedicalDetails(), fetchHistory()]);
    } catch (error) {
      toast.error("Couldn't fetch any data");
    }
  };

  useEffect(() => {
    if (Object.keys(activeComplaint).length > 0) {
      console.log("working or nah?");
      fetchAboutData();
    }
  }, [activeComplaint]);

  return Object.keys(activeComplaint).length > 0 ? (
    <div className="p-4">
      {detailsEditMode ? (
        <div>
          <h2 className="text-[var(--txt)] text-2xl font-semibold">
            Edit Medical Details
          </h2>
          <div className="flex flex-col space-y-6">
            <div className="mt-4 grid grid-cols-1 gap-6">
              {[
                {
                  label: "Past Illnesses",
                  state: pastIllnesses,
                  setter: setPastIllnesses,
                  id: "illnessInput",
                },
                {
                  label: "Allergies",
                  state: allergies,
                  setter: setAllergies,
                  id: "allergyInput",
                },
              ].map(({ label, state, setter, id }) => (
                <div key={id} className="w-1/2">
                  <label className="block font-semibold text-[var(--darkergreen)]">
                    {label}
                  </label>
                  <div className="flex mt-2">
                    <input
                      id={id}
                      type="text"
                      className="border px-3 py-2 rounded-lg flex-grow border-[var(--lightgreen)]"
                      placeholder={`Add ${label.toLowerCase()}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddItem(
                            setter,
                            document.getElementById(id)?.value,
                            id,
                          );
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        handleAddItem(
                          setter,
                          document.getElementById(id)?.value,
                          id,
                        )
                      }
                      className="ml-2 bg-[var(--darkgreen)] text-white px-3 py-2 rounded-lg hover:bg-[var(--darkergreen)] hover:cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {/* Numbered list of items */}
                  {state.length > 0 && (
                    <div className="mt-3">
                      <div>
                        {state.map((item, index) => (
                          <div
                            key={index}
                            className="flex my-1 px-2 w-fit items-center py-1 bg-[var(--bg)] border-1 border-[var(--lightgreen)] rounded-xl"
                          >
                            <span className="mr-2 text-[var(--txt)] font-semibold">
                              {index + 1}.
                            </span>
                            <span className="text-[var(--txt)] font-medium">
                              {item}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(setter, index)}
                              className="ml-5 text-red-700 font-bold hover:text-red-600 hover:cursor-pointer"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Yes/No questions */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Smokes?", state: smokes, setter: setSmokes },
                {
                  label: "Consumes Alcohol?",
                  state: alcohol,
                  setter: setAlcohol,
                },
                { label: "Eats Tobacco?", state: tobacco, setter: setTobacco },
              ].map(({ label, state, setter }) => (
                <div key={label} className="flex flex-col">
                  <label className="block font-semibold text-[var(--darkergreen)]">
                    {label}
                  </label>
                  <div className="flex space-x-2">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        className={`px-4 mr-5 mt-3 py-2 rounded-lg transition duration-300 ${
                          state === option
                            ? "bg-[var(--darkgreen)] text-white"
                            : "bg-gray-300 hover:bg-[var(--lightgreen)] hover:text-[var(--txt)] hover:cursor-pointer"
                        }`}
                        onClick={() => setter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Save button - New addition */}
            <div className="mt-6">
              <button
                onClick={handleSendToBackend}
                className="px-6 py-2 mr-2 bg-[var(--darkgreen)] text-white rounded-lg font-medium hover:bg-[var(--darkergreen)] hover:cursor-pointer transition duration-200"
              >
                Save Medical Details
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 hover:cursor-pointer transition duration-200"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-6 p-4 pb-6 border-1 border-[var(--lightgreen)] rounded-lg bg-[var(--bg)]">
            <h2 className="font-semibold text-2xl text-[var(--txt)] p-3">
              Patient Health Summary
            </h2>
            <div className="grid grid-cols-3 gap-4 p-3">
              <div>
                <h4 className="font-bold text-xl text-[var(--darkergreen)]">
                  Past Illnesses
                </h4>
                {pastIllnesses.length > 0 ? (
                  <div className="mt-2 pl-2">
                    {pastIllnesses.map((illness, index) => (
                      <div key={index} className="flex items-center py-1">
                        <span className="mr-2 font-semibold">{index + 1}.</span>
                        <span>{illness}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-2 italic">
                    No past illnesses recorded
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xl text-[var(--darkergreen)]">
                  Allergies
                </h4>
                {allergies.length > 0 ? (
                  <div className="mt-2 pl-2">
                    {allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center py-1">
                        <span className="mr-2 font-semibold">{index + 1}.</span>
                        <span>{allergy}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-2 italic">
                    No allergies recorded
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xl text-[var(--darkergreen)]">
                  Habits
                </h4>
                <div className="font-semibold text-[var(--darkergreen)] mt-2 pl-2">
                  <span className="text-black">1.</span> Smokes:{"  "}
                  <span className="text-black">{smokes}</span>
                </div>
                <div className="font-semibold text-[var(--darkergreen)] mt-2 pl-2">
                  <span className="text-black">2.</span> Consumes Alcohol:{"  "}
                  <span className="text-black">{alcohol}</span>
                </div>
                <div className="font-semibold text-[var(--darkergreen)] mt-2 pl-2">
                  <span className="text-black">3.</span> Eats Tobacco:{"  "}
                  <span className="text-black">{tobacco}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="px-6 py-2 bg-[var(--darkgreen)] text-white rounded-lg font-medium hover:bg-[var(--darkergreen)] hover:cursor-pointer transition duration-200"
            onClick={() => {
              setDetailsEditMode(true);
            }}
          >
            Edit Medical Details
          </button>
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-2xl text-[var(--txt)] font-semibold my-4">
          Past Complaints
        </h2>
        <PatientHistory
          history={history}
          currentComplaint={activeComplaint.id}
        />
      </div>
    </div>
  ) : (
    <div className="p-4 flex justify-center items-center">
      <h2 className="text-3xl text-[var(--txt)] font-semibold mb-4">
        No Active complaint/followup
      </h2>
    </div>
  );
}

export default About;
