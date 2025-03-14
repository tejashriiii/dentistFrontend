// Treatment.jsx

import React, { useState, useEffect } from 'react';
import DentalChart from '../../assets/dentalChart.svg';
import About from './About';

export default function Treatment() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [complaints, setComplaints] = useState({});
  const [treatments, setTreatments] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [newTreatment, setNewTreatment] = useState('');
  const [newTreatmentCost, setNewTreatmentCost] = useState('');
  const [selectedTreatments, setSelectedTreatments] = useState({});


  const fetchTreatments = async () => {
    try {
      const response = await fetch('http://localhost:8000/ad/api/treatments/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTreatments(data);
      } else {
        console.error('Error fetching treatments:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleButtonClick = (id) => {
    setSelectedButtons((prev) =>
      prev.includes(id) ? prev.filter((buttonId) => buttonId !== id) : [...prev, id]
    );
  };

  

  const handleAddEntry = (setter, toothId, value, cost) => {
    if (value) {
      setter((prev) => ({
        ...prev,
        [toothId]: [...(prev[toothId] || []), { treatment: value, cost }],
      }));
    }
  };

  const handleRemoveEntry = (setter, toothId, index) => {
    setter((prev) => ({
      ...prev,
      [toothId]: prev[toothId].filter((_, i) => i !== index),
    }));
  };

  const handleConfirmSelection = () => {
    setConfirmed(true);
  };

  // const handleAddTreatment = (toothId) => {
  //   if (newTreatment && newTreatmentCost) {
  //     setComplaints((prev) => ({
  //       ...prev,
  //       [toothId]: [
  //         ...(prev[toothId] || []),
  //         { treatment: newTreatment, cost: newTreatmentCost },
  //       ],
  //     }));
  //     setNewTreatment('');
  //     setNewTreatmentCost('');
  //   }
  // };
  const handleAddTreatment = (toothId) => {
    if (selectedTreatments[toothId]?.newTreatment && selectedTreatments[toothId]?.newTreatmentCost) {
      setComplaints((prev) => ({
        ...prev,
        [toothId]: [
          ...(prev[toothId] || []),
          { treatment: selectedTreatments[toothId].newTreatment, cost: selectedTreatments[toothId].newTreatmentCost },
        ],
      }));
      setSelectedTreatments(prev => ({
        ...prev,
        [toothId]: { ...prev[toothId], newTreatment: '', newTreatmentCost: '' }
      }));
    }
  };
  
  const buttonIds = [
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  ];

  return (
    <div className="flex flex-col space-y-4">

      <div>
        <img src={DentalChart} alt="Dental Chart" />
      </div>

      {buttonIds.map((row, idx) => (
        <div key={idx} className="flex space-x-2">
          {row.map((id) => (
            <button key={id} className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${selectedButtons.includes(id) ? 'bg-[#4a6d4a]' : 'bg-[#ACD1AF]'}`} onClick={() => handleButtonClick(id)}>
              {id}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <p className="text-lg">Selected button(s): {selectedButtons.length > 0 ? selectedButtons.join(', ') : <span className="italic text-gray-500">None</span>}</p>
        <button onClick={handleConfirmSelection} className="mt-4 bg-[#4a6d4a] text-white px-4 py-2 rounded-lg">Confirm Selection</button>
      </div>


      {confirmed && selectedButtons.map((toothId) => (
        <div key={toothId} className="mt-4">
          <h3 className="font-semibold text-lg text-[#4a6d4a]">Tooth {toothId}</h3>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Treatment</label>
            <div className="flex space-x-2">
              {treatments.map((treatment) => (
                <button key={treatment.id} onClick={() => handleAddEntry(setComplaints, toothId, treatment.name, treatment.cost)} className="bg-[#87AB87] text-white px-3 py-2 rounded-lg">
                  {treatment.name}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Add New Treatment</label>
              
                <select
                className="border px-3 py-2 rounded-lg w-full mb-4"
                value={selectedTreatments[toothId]?.name || ''}
                onChange={(e) => {
                  const treatment = treatments.find(t => t.name === e.target.value);
                  setSelectedTreatments(prev => ({
                    ...prev,
                    [toothId]: { name: treatment?.name || '', cost: treatment?.cost || '' }
                  }));
                }}
              >
                <option value="">Select Treatment</option>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name} - ${treatment.cost}
                  </option>
                ))}
              </select>              
              <input
                type="text"
                placeholder="Treatment Name"
                value={selectedTreatments[toothId]?.newTreatment || ''}
                onChange={(e) =>
                  setSelectedTreatments(prev => ({
                    ...prev,
                    [toothId]: { ...prev[toothId], newTreatment: e.target.value }
                  }))
                }
                className="border px-3 py-2 rounded-lg mb-2"
              />
              <input
                type="number"
                placeholder="Cost"
                value={selectedTreatments[toothId]?.newTreatmentCost || ''}
                onChange={(e) =>
                  setSelectedTreatments(prev => ({
                    ...prev,
                    [toothId]: { ...prev[toothId], newTreatmentCost: e.target.value }
                  }))
                }
                className="border px-3 py-2 rounded-lg mb-4"
              />

              <button
                onClick={() => handleAddTreatment(toothId)}
                className="bg-[#87AB87] text-white px-4 py-2 rounded-lg"
              >
                Add Treatment with Cost
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Treatments</label>
            {complaints[toothId]?.map((entry, index) => (
              <div key={index} className="flex justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2">
                <span>{entry.treatment} - &#8377; {entry.cost}</span>
                <button onClick={() => handleRemoveEntry(setComplaints, toothId, index)} className="text-gray-700 font-bold">×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
