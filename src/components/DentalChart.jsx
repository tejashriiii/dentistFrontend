
import { useState } from "react";

const teethNumbers = Array.from({ length: 32 }, (_, i) => i + 1); // 32 teeth

const DentalChart = ({ xrayPrices, updatePrice, isAdmin }) => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const toggleToothSelection = (tooth) => {
    setSelectedTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  const handlePriceUpdate = (tooth) => {
    updatePrice(tooth, newPrice);
    setEditMode(null);
    setNewPrice("");
  };

  return (
    <div className="p-6 bg-purple-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">Dental Chart</h2>

      {/* Dental Chart Image */}
      <div className="flex justify-center mb-4">
        <img
          src="./src/assets/dental_chrat.jpg"
          alt="Dental Chart Reference"
          className="w-full max-w-lg border border-purple-300 rounded-lg shadow"
        />
      </div>

      {/* Dental Chart Grid */}
      <div className="grid grid-cols-8 gap-2 mb-6">
        {teethNumbers.map((tooth) => (
          <button
            key={tooth}
            onClick={() => toggleToothSelection(tooth)}
            className={`p-3 border rounded-lg ${
              selectedTeeth.includes(tooth)
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-700"
            }`}
          >
            {tooth}
          </button>
        ))}
      </div>

      {/* Selected Teeth & X-ray Prices */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-purple-700">Selected Teeth</h3>
        {selectedTeeth.length > 0 ? (
          <ul className="mt-2">
            {selectedTeeth.map((tooth) => (
              <li key={tooth} className="flex justify-between items-center p-2 border-b">
                <span className="text-purple-700">Tooth {tooth} - X-ray Price: ${xrayPrices[tooth] || "N/A"}</span>

                {isAdmin && (
                  editMode === tooth ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="border p-1 rounded w-16"
                      />
                      <button
                        onClick={() => handlePriceUpdate(tooth)}
                        className="bg-purple-600 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode(tooth)}
                      className="text-purple-500 underline"
                    >
                      Edit
                    </button>
                  )
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No teeth selected</p>
        )}
      </div>
    </div>
  );
};

export default DentalChart;
