import React, { useState, useEffect } from "react";
import DentalChart from "../../assets/dentalChart.svg";
import { useNavigate } from "react-router-dom";

export default function Treatment() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [complaints, setComplaints] = useState({});
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load saved state from sessionStorage on component mount
  useEffect(() => {
    const savedSelectedButtons = sessionStorage.getItem("selectedButtons");
    const savedComplaints = sessionStorage.getItem("complaints");

    if (savedSelectedButtons) {
      setSelectedButtons(JSON.parse(savedSelectedButtons));
    }

    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedButtons.length > 0) {
      sessionStorage.setItem(
        "selectedButtons",
        JSON.stringify(selectedButtons),
      );
    }

    if (Object.keys(complaints).length > 0) {
      sessionStorage.setItem("complaints", JSON.stringify(complaints));
    }
  }, [selectedButtons, complaints]);

  const fetchTreatments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doc/treatment/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch treatments");
      const data = await response.json();
      setTreatments(Array.isArray(data.treatments) ? data.treatments : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleButtonClick = (id) => {
    setSelectedButtons((prev) =>
      prev.includes(id)
        ? prev.filter((buttonId) => buttonId !== id)
        : [...prev, id],
    );
  };

  const handleAddEntry = (toothId, treatment) => {
    if (treatment) {
      setComplaints((prev) => ({
        ...prev,
        [toothId]: [
          ...(prev[toothId] || []),
          { treatment: treatment.name, price: treatment.price },
        ],
      }));

      // Close dropdown after selection
      setIsDropdownOpen((prev) => ({
        ...prev,
        [toothId]: false,
      }));

      // Clear search term
      setSearchTerm((prev) => ({
        ...prev,
        [toothId]: "",
      }));
    }
  };

  const handleRemoveEntry = (toothId, index) => {
    setComplaints((prev) => ({
      ...prev,
      [toothId]: prev[toothId].filter((_, i) => i !== index),
    }));
  };

  const toggleDropdown = (toothId) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [toothId]: !prev[toothId],
    }));
  };

  const handleSearchChange = (toothId, value) => {
    setSearchTerm((prev) => ({
      ...prev,
      [toothId]: value,
    }));
  };

  const filteredTreatments = (toothId) => {
    const term = searchTerm[toothId] || "";
    return treatments.filter((treatment) =>
      treatment.name.toLowerCase().includes(term.toLowerCase()),
    );
  };

  const handleSaveTreatments = async () => {
    try {
      // Here you would make an API call to save the treatments
      // For now, just show an alert with the summary
      alert(
        "Treatments will be saved successfully, after that saving to db thing",
      );

      // You can navigate to another page or show a modal with the summary
    } catch (error) {
      console.error("Error saving treatments:", error);
      alert("Failed to save treatments. Please try again.");
    }
  };

  const navigateToTreatmentManagement = () => {
    navigate("/treatmentcrud");
  };

  const buttonIds = [
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  ];

  // Generate treatment summary
  const generateSummary = () => {
    let summary = {};

    Object.keys(complaints).forEach((toothId) => {
      complaints[toothId].forEach((item) => {
        const key = `${item.treatment} - ₹${item.price}`;
        if (!summary[key]) {
          summary[key] = {
            teeth: [toothId],
            price: Number(item.price),
          };
        } else {
          summary[key].teeth.push(toothId);
          summary[key].price += Number(item.price);
        }
      });
    });

    return summary;
  };

  const treatmentSummary = generateSummary();

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <img src={DentalChart} alt="Dental Chart" />
      </div>

      {buttonIds.map((row, idx) => (
        <div key={idx} className="flex space-x-2">
          {row.map((id) => (
            <button
              key={id}
              className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${selectedButtons.includes(id) ? "bg-[#4a6d4a]" : "bg-[#ACD1AF]"}`}
              onClick={() => handleButtonClick(id)}
            >
              {id}
            </button>
          ))}
        </div>
      ))}

      {/* Treatment Management Button placed before tooth selection display */}
      <div className="mt-4">
        <button
          onClick={navigateToTreatmentManagement}
          className="bg-[#4a6d4a] text-white px-4 py-2 rounded-lg"
        >
          Treatment Management
        </button>
      </div>

      {selectedButtons.map((toothId) => (
        <div key={toothId} className="mt-4">
          <h3 className="font-semibold text-lg text-[#4a6d4a]">
            Tooth {toothId}
          </h3>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Treatment
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchTerm[toothId] || ""}
                onChange={(e) => handleSearchChange(toothId, e.target.value)}
                onClick={() => toggleDropdown(toothId)}
                className="border px-3 py-2 rounded-lg w-full"
              />

              {isDropdownOpen[toothId] && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredTreatments(toothId).length > 0 ? (
                    filteredTreatments(toothId).map((treatment) => (
                      <div
                        key={treatment.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleAddEntry(toothId, treatment)}
                      >
                        {treatment.name} - &#8377; {treatment.price}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">
                      No treatments found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Treatments
            </label>
            {complaints[toothId]?.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2"
              >
                <span>
                  {entry.treatment} - &#8377; {entry.price}
                </span>
                <button
                  onClick={() => handleRemoveEntry(toothId, index)}
                  className="text-gray-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedButtons.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-lg text-[#4a6d4a] mb-4">
            Treatment Summary
          </h3>
          {Object.keys(treatmentSummary).length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              {Object.entries(treatmentSummary).map(
                ([treatment, data], index) => (
                  <div key={index} className="mb-2">
                    <strong>tooth no</strong>
                    {data.teeth.join(", ")}: {treatment}
                  </div>
                ),
              )}
              <div className="mt-4 font-bold">
                Grand Total: &#8377;{" "}
                {Object.values(treatmentSummary).reduce(
                  (sum, item) => sum + item.price,
                  0,
                )}
              </div>
            </div>
          ) : (
            <p>No treatments selected yet.</p>
          )}

          <div className="mt-6">
            <button
              onClick={handleSaveTreatments}
              className="bg-[#4a6d4a] text-white px-4 py-2 rounded-lg"
            >
              Save Treatments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
