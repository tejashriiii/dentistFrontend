import React, { useState } from "react";

// Sample list of valid medicines (you can extend it as needed)
const validMeds = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin"];

const Prescriptions = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [days, setDays] = useState("");
  const [measure, setMeasure] = useState("");
  const [instructions, setInstructions] = useState("");

  // Sample patient list
  const patients = ["John Doe", "Jane Smith", "David Brown", "Sarah Wilson"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle prescription save logic here (e.g., store in a database)
    console.log("Prescription added:", { selectedPatient, medicine, dosage, days, measure, instructions });
  };

  return (
    <div className="p-4">
      {!selectedPatient ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Patient List</h2>
          <ol className="list-decimal pl-6">
            {patients.map((patient, index) => (
              <li key={index}>
                <button
                  className="text-purple-500 hover:underline"
                  onClick={() => setSelectedPatient(patient)}
                >
                  {patient}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-purple-700">{selectedPatient}'s Prescription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="medicine" className="block text-lg">Medicine</label>
              <select
                id="medicine"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Medicine</option>
                {validMeds.map((med, index) => (
                  <option key={index} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex gap-4">
              <div>
                <label className="block text-lg">Dosage</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="dosage"
                      value="M"
                      onChange={(e) => setDosage(e.target.value)}
                    />
                    M
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="dosage"
                      value="A"
                      onChange={(e) => setDosage(e.target.value)}
                    />
                    A
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="dosage"
                      value="E"
                      onChange={(e) => setDosage(e.target.value)}
                    />
                    E
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="dosage"
                      value="SOS"
                      onChange={(e) => setDosage(e.target.value)}
                    />
                    SOS
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="days" className="block text-lg">Days</label>
                <input
                  type="number"
                  id="days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="measure" className="block text-lg">Measure</label>
              <input
                type="text"
                id="measure"
                value={measure}
                onChange={(e) => setMeasure(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="instructions" className="block text-lg">Instructions</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="border p-2 rounded w-full"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="bg-purple-500 text-white p-2 rounded">
              Save Prescription
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
