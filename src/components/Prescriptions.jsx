// import React, { useState } from "react";

// // Sample list of valid medicines (you can extend it as needed)
// const validMeds = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin"];

// const Prescriptions = () => {
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [medicine, setMedicine] = useState("");
//   const [dosage, setDosage] = useState("");
//   const [days, setDays] = useState("");
//   const [measure, setMeasure] = useState("");
//   const [instructions, setInstructions] = useState("");

//   // Sample patient list
//   const patients = ["John Doe", "Jane Smith", "David Brown", "Sarah Wilson"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle prescription save logic here (e.g., store in a database)
//     console.log("Prescription added:", { selectedPatient, medicine, dosage, days, measure, instructions });
//   };

//   return (
//     <div className="p-4">
//       {!selectedPatient ? (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Patient List</h2>
//           <ol className="list-decimal pl-6">
//             {patients.map((patient, index) => (
//               <li key={index}>
//                 <button
//                   className="text-purple-500 hover:underline"
//                   onClick={() => setSelectedPatient(patient)}
//                 >
//                   {patient}
//                 </button>
//               </li>
//             ))}
//           </ol>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-xl font-bold mb-4 text-purple-700">{selectedPatient}'s Prescription</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="medicine" className="block text-lg">Medicine</label>
//               <select
//                 id="medicine"
//                 value={medicine}
//                 onChange={(e) => setMedicine(e.target.value)}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select Medicine</option>
//                 {validMeds.map((med, index) => (
//                   <option key={index} value={med}>
//                     {med}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4 flex gap-4">
//               <div>
//                 <label className="block text-lg">Dosage</label>
//                 <div className="flex gap-4">
//                   <label>
//                     <input
//                       type="radio"
//                       name="dosage"
//                       value="M"
//                       onChange={(e) => setDosage(e.target.value)}
//                     />
//                     M
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="dosage"
//                       value="A"
//                       onChange={(e) => setDosage(e.target.value)}
//                     />
//                     A
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="dosage"
//                       value="E"
//                       onChange={(e) => setDosage(e.target.value)}
//                     />
//                     E
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="dosage"
//                       value="SOS"
//                       onChange={(e) => setDosage(e.target.value)}
//                     />
//                     SOS
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="days" className="block text-lg">Days</label>
//                 <input
//                   type="number"
//                   id="days"
//                   value={days}
//                   onChange={(e) => setDays(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="measure" className="block text-lg">Measure</label>
//               <input
//                 type="text"
//                 id="measure"
//                 value={measure}
//                 onChange={(e) => setMeasure(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="instructions" className="block text-lg">Instructions</label>
//               <textarea
//                 id="instructions"
//                 value={instructions}
//                 onChange={(e) => setInstructions(e.target.value)}
//                 className="border p-2 rounded w-full"
//                 rows="4"
//               ></textarea>
//             </div>

//             <button type="submit" className="bg-purple-500 text-white p-2 rounded">
//               Save Prescription
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Prescriptions;
import React, { useState } from 'react';

const Prescriptions = () => {
  // State to manage current patient view
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientName, setNewPatientName] = useState(''); // State for new patient name
  const [medicines] = useState([
    'Paracetamol',
    'Ibuprofen',
    'Amoxicillin',
    'Aspirin',
    'Ciprofloxacin',
  ]); // List of valid medicines
  const [prescriptions, setPrescriptions] = useState([]);
  
  // Patients list (hardcoded for now)
  const [patients, setPatients] = useState([
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Davis',
  ]);

  // Handling form submission to add prescription
  const addPrescription = (e) => {
    e.preventDefault();

    const newPrescription = {
      medicine: e.target.medicine.value,
      dosage: e.target.dosage.value,
      days: e.target.days.value,
      measure: e.target.measure.value,
      instructions: e.target.instructions.value,
    };

    setPrescriptions([...prescriptions, newPrescription]);
  };

  // Handle adding a new patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (newPatientName) {
      setPatients([...patients, newPatientName]);
      setNewPatientName(''); // Reset the input field
    }
  };

  return (
    <div className="p-4">
      {/* Add New Patient Form */}
      {}
      {!selectedPatient && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Add New Patient</h2>
          <form onSubmit={handleAddPatient}>
            <input
              type="text"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              placeholder="Enter patient's name"
              className="border p-2 rounded mb-2"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Add Patient
            </button>
          </form>
        </div>
      )}

      {/* Patient list display */}
      {!selectedPatient ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Patients</h1>
          <ol className="list-decimal pl-6">
            {patients.map((patient, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => setSelectedPatient(patient)}
              >
                {patient}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div>
          {/* Patient prescription view */}
          <h1 className="text-2xl font-bold mb-4">{selectedPatient}</h1>
          <form onSubmit={addPrescription}>
            <div className="mb-4">
              <label className="block text-lg font-medium">Medicine</label>
              <select name="medicine" className="border p-2 rounded w-full" required>
                {medicines.map((med, index) => (
                  <option key={index} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex space-x-4">
              <div>
                <label className="block text-lg font-medium">Dosage</label>
                <div>
                  <input
                    type="checkbox"
                    name="dosage"
                    value="M"
                    id="M"
                    required
                  />
                  <label htmlFor="M">Morning</label>
                </div>
                <div>
                   <input
                    type="checkbox"
                    name="dosage"
                    value="A"
                    id="A"
                  />
                  <label htmlFor="A">After-noon</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="dosage"
                    value="E"
                    id="E"
                  />
                  <label htmlFor="E">Evening</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="dosage"
                    value="N"
                    id="N"
                  />
                  <label htmlFor="N">NIght</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="dosage"
                    value="SOS"
                    id="SOS"
                  />
                  <label htmlFor="SOS">SOS</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="dosage"
                    value="Immediate"
                    id="Immediate"
                  />
                  <label htmlFor="Immediate">Immediate</label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium">Days</label>
                <input
                  type="number"
                  name="days"
                  min="1"
                  className="border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">Measure</label>
              <input
                type="text"
                name="measure"
                className="border p-2 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">Instructions</label>
              <textarea
                name="instructions"
                className="border p-2 rounded w-full"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Prescription
            </button>
          </form>

          {/* Display prescriptions */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Prescriptions</h2>
            <ul className="list-disc pl-6">
              {prescriptions.map((prescription, index) => (
                <li key={index}>
                  <strong>{prescription.medicine}</strong> - Dosage: {prescription.dosage}, 
                  Days: {prescription.days}, Measure: {prescription.measure}, 
                  Instructions: {prescription.instructions}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
