import React, { useState } from "react";

export default function TreatmentDashboard() {
  const [complaints, setComplaints] = useState(["Gum Disease", "Tooth Sensitivity"]);
  const [observations, setObservations] = useState(["Tooth Decay"]);
  const [treatments, setTreatments] = useState([
    { name: "RCT", cost: 5000 },
    { name: "Consultation", cost: 250 },
    { name: "X-Ray", cost: 400 },
  ]);
  const [discount, setDiscount] = useState(0);

  const handleAdd = (list, setList, value) => {
    if (value) {
      setList([...list, value]);
    }
  };

  const handleRemove = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const totalFees = treatments.reduce((sum, treatment) => sum + treatment.cost, 0);
  const netFees = totalFees - discount;

  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-1">Date*</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-1">Clinic*</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300">
                <option>Quest Care Medical Clinic, Ghatkopar</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-1">Patient*</label>
              <input
                type="text"
                value="Aakruti Kapoor"
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-1">Doctor</label>
              <input
                type="text"
                value="Anil Kumar Sharma"
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="border-b mb-4">
          <nav className="flex space-x-4">
            <button className="py-2 px-4 text-sm font-semibold text-purple-700 border-b-2 border-purple-700">
              TREATMENT
            </button>
            <button className="py-2 px-4 text-sm font-semibold text-gray-500">PRESCRIPTION</button>
            <button className="py-2 px-4 text-sm font-semibold text-gray-500">VITAL SIGNS</button>
            <button className="py-2 px-4 text-sm font-semibold text-gray-500">ATTACHMENTS</button>
            <button className="py-2 px-4 text-sm font-semibold text-gray-500">FOLLOW UP</button>
          </nav>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Complaints</label>
            <div>
              {complaints.map((complaint, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-100 px-3 py-2 mb-2 rounded-lg"
                >
                  <span>{complaint}</span>
                  <button
                    onClick={() => handleRemove(complaints, setComplaints, index)}
                    className="text-purple-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add complaint"
                  id="complaintInput"
                  className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                />
                <button
                  onClick={() =>
                    handleAdd(
                      complaints,
                      setComplaints,
                      document.getElementById("complaintInput").value
                    )
                  }
                  className="ml-2 bg-purple-700 text-white px-3 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">Treatment</label>
            <div>
              {treatments.map((treatment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-100 px-3 py-2 mb-2 rounded-lg"
                >
                  <span>
                    {treatment.name} - Rs. {treatment.cost}
                  </span>
                  <button
                    onClick={() => handleRemove(treatments, setTreatments, index)}
                    className="text-purple-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add treatment"
                  id="treatmentInput"
                  className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                />
                <button
                  onClick={() =>
                    handleAdd(
                      treatments,
                      setTreatments,
                      { name: document.getElementById("treatmentInput").value, cost: 0 }
                    )
                  }
                  className="ml-2 bg-purple-700 text-white px-3 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-purple-700 mb-2">Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-purple-700">Fees:</span>
            <span>Rs. {totalFees}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-semibold text-purple-700">Net:</span>
            <span>Rs. {netFees}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg">Delete</button>
          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
}
