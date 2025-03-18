import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedMedicationId, setSelectedMedicationId] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [savedPrescriptions, setSavedPrescriptions] = useState([]);
  const [summaryItems, setSummaryItems] = useState([]);
  const navigate = useNavigate();

  // Fetch prescription data from API
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/doc/prescription/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch prescriptions");

      const data = await response.json();
      console.log(data);

      if (data.prescriptions && typeof data.prescriptions === "object") {
        const flattenedData = Object.entries(data.prescriptions).flatMap(
          ([type, items]) =>
            items.map((item) => ({ id: item.id, name: item.name, type })),
        );
        setPrescriptions(flattenedData);
        
        // Set default selected type if available
        if (flattenedData.length > 0) {
          const types = [...new Set(flattenedData.map(item => item.type))];
          if (types.length > 0 && !selectedType) {
            setSelectedType(types[0]);
          }
        }
      } else {
        setPrescriptions([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load savedPrescriptions and summary from sessionStorage on component mount
  useEffect(() => {
    fetchPrescriptions();
    const savedItems = sessionStorage.getItem("savedPrescriptions");
    if (savedItems) {
      setSavedPrescriptions(JSON.parse(savedItems));
      setSelectedItems(JSON.parse(sessionStorage.getItem("selectedItems") || "{}"));
    }
    
    // Load dynamic summary from session storage if available
    const savedSummary = sessionStorage.getItem("prescriptionSummary");
    if (savedSummary) {
      setSummaryItems(JSON.parse(savedSummary));
    }
  }, []);

  // Reset selected medication when type changes
  useEffect(() => {
    setSelectedMedicationId('');
  }, [selectedType]);

  // Add medication to selected items when medication is selected
  useEffect(() => {
    if (selectedMedicationId) {
      const medication = prescriptions.find(item => item.id === selectedMedicationId);
      if (medication) {
        setSelectedItems(prev => {
          const updated = {
            ...prev,
            [medication.id]: { 
              id: medication.id, 
              name: medication.name, 
              type: medication.type,
              days: 3
            }
          };
          
          // Only add dosage property for medicine types that need it
          if (!['Paste', 'Gel', 'Mouthwash'].includes(medication.type)) {
            updated[medication.id].dosage = '';
          }
          
          sessionStorage.setItem("selectedItems", JSON.stringify(updated));
          return updated;
        });
      }
    }
  }, [selectedMedicationId, prescriptions]);

  // Update summary items whenever selected items change
  useEffect(() => {
    const newSummary = Object.values(selectedItems);
    setSummaryItems(newSummary);
    sessionStorage.setItem("prescriptionSummary", JSON.stringify(newSummary));
  }, [selectedItems]);

  // Get unique medication types
  const medicationTypes = [...new Set(prescriptions.map(item => item.type))];

  // Get medications for selected type
  const medicationsForType = prescriptions.filter(item => item.type === selectedType);

  // Handle dosage or days change
  const handleChange = (itemId, field, value) => {
    setSelectedItems((prev) => {
      const updated = {
        ...prev,
        [itemId]: { ...prev[itemId], [field]: value },
      };
      sessionStorage.setItem("selectedItems", JSON.stringify(updated));
      return updated;
    });
  };

  // Remove medication from selected items
  const removeMedication = (itemId) => {
    setSelectedItems((prev) => {
      const updated = {...prev};
      delete updated[itemId];
      sessionStorage.setItem("selectedItems", JSON.stringify(updated));
      return updated;
    });
  };

  // Check if item needs dosage options (not paste, gel, mouthwash)
  const needsDosage = (itemType) => {
    return !['Paste', 'Gel', 'Mouthwash'].includes(itemType);
  };

  // Save prescription
  const savePrescription = async () => {
    const prescriptionsToSave = Object.values(selectedItems);
    setSavedPrescriptions(prescriptionsToSave);
    sessionStorage.setItem("savedPrescriptions", JSON.stringify(prescriptionsToSave));
    
    // Send data to backend
    // try {
    //   const response = await fetch("http://localhost:8000/doc/save-prescription/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    //     },
    //     body: JSON.stringify({ prescriptions: prescriptionsToSave }),
    //   });
      
    //   if (!response.ok) throw new Error("Failed to save prescriptions");
      
    //   const data = await response.json();
    //   console.log("Saved successfully:", data);
      
    //   // You could add a success message here
    // } catch (err) {
    //   console.error("Error saving prescriptions:", err);
    //   setError(err.message);
    // }
    alert('saved to dv') //alert for now
  };

  // Navigate to prescription management
  const navigateToPrescriptionManagement = () => {
    navigate('/prescriptioncrud');
  };

  if (loading) return <div className="p-4">Loading prescriptions...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Prescription</h1>
        <button 
          onClick={navigateToPrescriptionManagement} 
          className="bg-[var(--darkgreen)] text-white p-2 rounded"
        >
          Manage Prescriptions
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Medication Type Dropdown */}
          <div className="flex-1">
            <label htmlFor="medicationType" className="block font-semibold mb-2">
              Select Medication Type:
            </label>
            <select
              id="medicationType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Type</option>
              {medicationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Medication Dropdown */}
          <div className="flex-1">
            <label htmlFor="medication" className="block font-semibold mb-2">
              Select Medication:
            </label>
            <select
              id="medication"
              value={selectedMedicationId}
              onChange={(e) => setSelectedMedicationId(e.target.value)}
              className="p-2 border rounded w-full"
              disabled={!selectedType}
            >
              <option value="">Select Medication</option>
              {medicationsForType.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medications dosage editing area */}
      {Object.values(selectedItems).length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Selected Medications</h2>
          {Object.values(selectedItems).map((item) => (
            <div key={item.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">({item.type})</span>
                </div>
                <button 
                  onClick={() => removeMedication(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              
              <div className="mt-3">
                {/* Only show dosage options for medicine types that need it */}
                {needsDosage(item.type) && (
                  <div className="mb-3">
                    <p className="mb-1 font-medium">Dosage:</p>
                    <div className="flex flex-wrap gap-2">
                      {['OD', 'BD', 'TDS', 'HALF BD', 'HALF TDS'].map((d) => (
                        <label key={d} className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`dosage-${item.id}`}
                            value={d}
                            checked={item.dosage === d}
                            onChange={(e) => handleChange(item.id, 'dosage', e.target.value)}
                            className="mr-1"
                          />
                          {d}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="mb-1 font-medium">Days:</p>
                  <input
                    type="number"
                    min="1"
                    value={item.days}
                    onChange={(e) => handleChange(item.id, 'days', parseInt(e.target.value))}
                    className="p-1 border rounded w-16"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Summary */}
      {summaryItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Prescription Summary</h2>
          <div className="border rounded p-4 bg-gray-50">
            {summaryItems.map((item, index) => (
              <div key={index} className="mb-2">
                <strong>{item.name}</strong> ({item.type}) 
                {needsDosage(item.type) && item.dosage && (
                  <span> - Dosage: {item.dosage}</span>
                )}
                <span>, Days: {item.days}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <button 
        onClick={savePrescription} 
        className="bg-[var(--darkgreen)] text-white p-2 rounded"
        disabled={Object.values(selectedItems).length === 0}
      >
        Save Prescription
      </button>

      
    </div>
  );
};

export default Prescriptions;