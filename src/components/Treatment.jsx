
// import React, { useState } from 'react';

// export default function ButtonSelection() {
//   const [selectedButtons, setSelectedButtons] = useState([]);
//   const [complaints, setComplaints] = useState({});
//   const [treatments, setTreatments] = useState({});
//   const [confirmed, setConfirmed] = useState(false);

//   const handleButtonClick = (id) => {
//     setSelectedButtons((prev) => {
//       if (prev.includes(id)) {
//         return prev.filter((buttonId) => buttonId !== id); // Deselect the button
//       } else {
//         return [...prev, id]; // Select the button
//       }
//     });
//   };

//   const handleAddComplaint = (toothId, complaint) => {
//     setComplaints((prev) => ({
//       ...prev,
//       [toothId]: [...(prev[toothId] || []), complaint],
//     }));
//   };

//   const handleRemoveComplaint = (toothId, index) => {
//     setComplaints((prev) => ({
//       ...prev,
//       [toothId]: prev[toothId].filter((_, i) => i !== index),
//     }));
//   };

//   const handleAddTreatment = (toothId, treatment) => {
//     setTreatments((prev) => ({
//       ...prev,
//       [toothId]: [...(prev[toothId] || []), treatment],
//     }));
//   };

//   const handleRemoveTreatment = (toothId, index) => {
//     setTreatments((prev) => ({
//       ...prev,
//       [toothId]: prev[toothId].filter((_, i) => i !== index),
//     }));
//   };

//   const handleConfirmSelection = () => {
//     setConfirmed(true);
//   };

//   // Define the button ranges
//   const buttonIds = [
//     [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28], // Row 1
//     [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38], // Row 2
//   ];

//   return (
//     <div className="flex flex-col space-y-4">
//       {/* Row 1 */}
//       <div className="flex space-x-2">
//         {buttonIds[0].map((id) => (
//           <button
//             key={id}
//             className={`px-3 py-2 rounded-lg text-white transition-colors duration-300 ${
//               selectedButtons.includes(id) ? 'bg-[#4a6d4a]' : 'bg-[#ACD1AF]'
//             }`}
//             onClick={() => handleButtonClick(id)}
//           >
//             {id}
//           </button>
//         ))}
//       </div>

//       {/* Row 2 */}
//       <div className="flex space-x-2">
//         {buttonIds[1].map((id) => (
//           <button
//             key={id}
//             className={`px-3 py-2 rounded-lg text-white transition-colors duration-300 ${
//               selectedButtons.includes(id) ? 'bg-[#4a6d4a]' : 'bg-[#ACD1AF]'
//             }`}
//             onClick={() => handleButtonClick(id)}
//           >
//             {id}
//           </button>
//         ))}
//       </div>

//       {/* Display selected buttons */}
//       <div className="mt-4">
//         <p className="text-lg">
//           Selected button(s): 
//           {selectedButtons.length > 0 ? (
//             selectedButtons.join(', ')
//           ) : (
//             <span className="italic text-gray-500">None</span>
//           )}
//         </p>
//         <button
//           onClick={handleConfirmSelection}
//           className="mt-4 bg-[#4a6d4a] text-white px-4 py-2 rounded-lg"
//         >
//           Confirm Selection
//         </button>
//       </div>

//       {/* Generate complaint and treatment sections after confirmation */}
//       {confirmed && (
//         <div className="mt-4">
//           {selectedButtons.map((toothId) => (
//             <div key={toothId} className="mt-4">
//               <h3 className="font-semibold text-lg text-[#4a6d4a]">Tooth {toothId}</h3>

//               {/* Complaints Section */}
//               <div className="mt-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Complaints
//                 </label>
//                 <div>
//                   {complaints[toothId]?.map((complaint, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-lg"
//                     >
//                       <span>{complaint}</span>
//                       <button
//                         onClick={() => handleRemoveComplaint(toothId, index)}
//                         className="text-gray-700 font-bold"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                   <div className="flex">
//                     <input
//                       type="text"
//                       placeholder="Add complaint"
//                       id={`complaintInput-${toothId}`}
//                       className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring"
//                     />
//                     <button
//                       onClick={() =>
//                         handleAddComplaint(
//                           toothId,
//                           document.getElementById(`complaintInput-${toothId}`).value
//                         )
//                       }
//                       className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Treatments Section */}
//               <div className="mt-4">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Treatments
//                 </label>
//                 <div>
//                   {treatments[toothId]?.map((treatment, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-lg"
//                     >
//                       <span>
//                         {treatment.name} - Rs. {treatment.cost}
//                       </span>
//                       <button
//                         onClick={() => handleRemoveTreatment(toothId, index)}
//                         className="text-gray-700 font-bold"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                   <div className="flex">
//                     <input
//                       type="text"
//                       placeholder="Add treatment"
//                       id={`treatmentInput-${toothId}`}
//                       className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring"
//                     />
//                     <button
//                       onClick={() =>
//                         handleAddTreatment(
//                           toothId,
//                           { name: document.getElementById(`treatmentInput-${toothId}`).value, cost: 0 }
//                         )
//                       }
//                       className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import DentalChart from '../assets/dentalChart.svg' 

export default function Treatment() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [complaints, setComplaints] = useState({});
  const [treatments, setTreatments] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [pastIllnesses, setPastIllnesses] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [smokes, setSmokes] = useState(null);
  const [alcohol, setAlcohol] = useState(null);

  const handleButtonClick = (id) => {
    setSelectedButtons((prev) => {
      if (prev.includes(id)) {
        return prev.filter((buttonId) => buttonId !== id); // Deselect the button
      } else {
        return [...prev, id]; // Select the button
      }
    });
  };

  const handleAddComplaint = (toothId, complaint) => {
    setComplaints((prev) => ({
      ...prev,
      [toothId]: [...(prev[toothId] || []), complaint],
    }));
  };

  const handleRemoveComplaint = (toothId, index) => {
    setComplaints((prev) => ({
      ...prev,
      [toothId]: prev[toothId].filter((_, i) => i !== index),
    }));
  };

  const handleAddTreatment = (toothId, treatment) => {
    setTreatments((prev) => ({
      ...prev,
      [toothId]: [...(prev[toothId] || []), treatment],
    }));
  };

  const handleRemoveTreatment = (toothId, index) => {
    setTreatments((prev) => ({
      ...prev,
      [toothId]: prev[toothId].filter((_, i) => i !== index),
    }));
  };

  const handleAddItem = (setter, value) => {
    if (value) setter((prev) => [...prev, value]);
  };

  const handleRemoveItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirmSelection = () => {
    setConfirmed(true);
  };

  // Define the button ranges
  const buttonIds = [
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28], // Row 1
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38], // Row 2
  ];

  return (
    
    <div className="flex flex-col space-y-4">
      <div className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Past Illnesses</label>
            {pastIllnesses.map((illness, index) => (
              <div key={index} className="flex justify-between bg-gray-100 px-3 py-2 rounded-lg">
                <span>{illness}</span>
                <button onClick={() => handleRemoveItem(setPastIllnesses, index)}>×</button>
              </div>
            ))}
            <div className="flex">
              <input id="illnessInput" type="text" className="border px-3 py-2 rounded-lg" placeholder="Add illness" />
              <button onClick={() => handleAddItem(setPastIllnesses, document.getElementById('illnessInput').value)} className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg">Add</button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Allergies</label>
            {allergies.map((allergy, index) => (
              <div key={index} className="flex justify-between bg-gray-100 px-3 py-2 rounded-lg">
                <span>{allergy}</span>
                <button onClick={() => handleRemoveItem(setAllergies, index)}>×</button>
              </div>
            ))}
            <div className="flex">
              <input id="allergyInput" type="text" className="border px-3 py-2 rounded-lg" placeholder="Add allergy" />
              <button onClick={() => handleAddItem(setAllergies, document.getElementById('allergyInput').value)} className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg">Add</button>
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <label className="block font-semibold text-gray-700">Smokes?</label>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg ${smokes === 'Yes' ? 'bg-[#4a6d4a] text-white' : 'bg-gray-300'}`} onClick={() => setSmokes('Yes')}>Yes</button>
                <button className={`px-4 py-2 rounded-lg ${smokes === 'No' ? 'bg-[#4a6d4a] text-white' : 'bg-gray-300'}`} onClick={() => setSmokes('No')}>No</button>
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700">Consumes Alcohol?</label>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg ${alcohol === 'Yes' ? 'bg-[#4a6d4a] text-white' : 'bg-gray-300'}`} onClick={() => setAlcohol('Yes')}>Yes</button>
                <button className={`px-4 py-2 rounded-lg ${alcohol === 'No' ? 'bg-[#4a6d4a] text-white' : 'bg-gray-300'}`} onClick={() => setAlcohol('No')}>No</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={DentalChart}/>
        </div>


      {/* Row 1 */}
      <div className="flex space-x-2">
        {buttonIds[0].map((id) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
              selectedButtons.includes(id) ? 'bg-[#4a6d4a]' : 'bg-[#ACD1AF]'
            }`}
            onClick={() => handleButtonClick(id)}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex space-x-2">
        {buttonIds[1].map((id) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
              selectedButtons.includes(id) ? 'bg-[#4a6d4a]' : 'bg-[#ACD1AF]'
            }`}
            onClick={() => handleButtonClick(id)}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Display selected buttons */}
      <div className="mt-4">
        <p className="text-lg">
          Selected button(s): 
          {selectedButtons.length > 0 ? (
            selectedButtons.join(', ')
          ) : (
            <span className="italic text-gray-500">None</span>
          )}
        </p>
        <button
          onClick={handleConfirmSelection}
          className="mt-4 bg-[#4a6d4a] text-white px-4 py-2 rounded-lg"
        >
          Confirm Selection
        </button>
      </div>

      {/* Generate complaint and treatment sections after confirmation */}
      {confirmed && (
        <div className="mt-4">
          {selectedButtons.map((toothId) => (
            <div key={toothId} className="mt-4">
              <h3 className="font-semibold text-lg text-[#4a6d4a]">Tooth {toothId}</h3>

              {/* Complaints Section */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complaints
                </label>
                <div>
                  {complaints[toothId]?.map((complaint, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-lg"
                    >
                      <span>{complaint}</span>
                      <button
                        onClick={() => handleRemoveComplaint(toothId, index)}
                        className="text-gray-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add complaint"
                      id={`complaintInput-${toothId}`}
                      className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                    <button
                      onClick={() =>
                        handleAddComplaint(
                          toothId,
                          document.getElementById(`complaintInput-${toothId}`).value
                        )
                      }
                      className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Treatments Section */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Treatments
                </label>
                <div>
                  {treatments[toothId]?.map((treatment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-lg"
                    >
                      <span>
                        {treatment.name} - Rs. {treatment.cost}
                      </span>
                      <button
                        onClick={() => handleRemoveTreatment(toothId, index)}
                        className="text-gray-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Add treatment"
                      id={`treatmentInput-${toothId}`}
                      className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                    <button
                      onClick={() =>
                        handleAddTreatment(
                          toothId,
                          { name: document.getElementById(`treatmentInput-${toothId}`).value, cost: 0 }
                        )
                      }
                      className="ml-2 bg-[#87AB87] text-white px-3 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
