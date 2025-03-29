import React, { useState, useEffect } from "react";
import { OctagonX, PencilRuler } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Prescriptions = ({ activeComplaint }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMedicationId, setSelectedMedicationId] = useState("");
  const [savedPrescriptions, setSavedPrescriptions] = useState([]);
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedDosage, setSelectedDosage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [prescriptionToEditId, setPrescriptionToEditId] = useState({});
  const dosageOptions = ["OD", "BD", "TDS", "HALF BD", "HALF TDS"];
  const navigate = useNavigate();

  // Fetch prescription data from API
  const fetchAllPrescriptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/doc/prescription/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch prescriptions");

      const data = await response.json();

      if (data.prescriptions && typeof data.prescriptions === "object") {
        const flattenedData = Object.entries(data.prescriptions).flatMap(
          ([type, items]) =>
            items.map((item) => ({ id: item.id, name: item.name, type })),
        );
        setPrescriptions(flattenedData);

        // Set default selected type if available
        if (flattenedData.length > 0) {
          const types = [...new Set(flattenedData.map((item) => item.type))];
          if (types.length > 0 && !selectedType) {
            setSelectedType("");
          }
        }
      } else {
        setPrescriptions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatientPrescription = async () => {
    try {
      const sitting = activeComplaint.complaint_object
        ? activeComplaint.sitting
        : 0;
      const FETCH_PATIENT_PRESCRIPTIONS_URL = `http://localhost:8000/p/prescription/${activeComplaint.id}/${sitting}/`;
      console.log(FETCH_PATIENT_PRESCRIPTIONS_URL);
      const response = await fetch(FETCH_PATIENT_PRESCRIPTIONS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      const patientPrescriptions = data.prescription;
      console.log("patient-prescriptions: ", patientPrescriptions);
      setSavedPrescriptions(patientPrescriptions);

      if (!response.ok)
        throw new Error("Failed to fetch patient's prescriptions");
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  const createPatientPrescription = async (prescriptionToCreate) => {
    try {
      const response = await fetch("http://localhost:8000/p/prescription/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(prescriptionToCreate),
      });

      if (response.ok) {
        toast.success("Prescription created!");
        return true;
      }
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error);
      }
    } catch (error) {
      console.log("error");
    }
    return false;
  };

  const updatePatientPrescription = async (formattedPrescriptionToEdit) => {
    try {
      const response = await fetch("http://localhost:8000/p/prescription/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(formattedPrescriptionToEdit),
      });

      if (response.ok) {
        toast.success("Prescription updated!");
        return true;
      }
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error);
        return false;
      }
    } catch (error) {
      console.log("error");
    }
    return false;
  };

  const deletePrescription = async (prescriptionId) => {
    try {
      const DELETE_PRESCRIPTION_URL = `http://localhost:8000/p/prescription/delete/${prescriptionId}/`;
      const response = await fetch(DELETE_PRESCRIPTION_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      const message = await response.json();
      if (response.ok) {
        toast.success(message.success);
        fetchPatientPrescription();
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load savedPrescriptions and summary from sessionStorage on component mount
  useEffect(() => {
    Promise.all([fetchAllPrescriptions(), fetchPatientPrescription()]);
  }, [activeComplaint]);

  useEffect(() => {
    console.log("savedPrescriptions: ", savedPrescriptions);
  }, [savedPrescriptions]);

  // Get unique medication types and medications for that type
  const medicationTypes = [...new Set(prescriptions.map((item) => item.type))];
  const medicationsForType = prescriptions.filter(
    (item) => item.type === selectedType,
  );

  // Check if item needs dosage options (not paste, gel, mouthwash)
  const needsDosage = () => {
    return !["Toothpaste", "Gel", "Mouthwash", "Injection"].includes(
      selectedType,
    );
  };

  // Set dosage and days to 0 when not medication
  useEffect(() => {
    if (!editMode) setSelectedMedicationId("");
    if (!needsDosage()) {
      setSelectedDays(0);
      setSelectedDosage("");
    }
  }, [selectedType]);

  // Form validation
  const validPrescriptionFields = () => {
    if (!selectedMedicationId || !selectedType) {
      toast.warning("Please fill medication type and name");
      return false;
    }

    if (needsDosage() && (Number(selectedDays) == 0 || !selectedDosage)) {
      toast.warning("Please fill days and dosage");
      return false;
    }
    return true;
  };

  const resetFields = async () => {
    setSelectedType("");
    setSelectedMedicationId("");
    setSelectedDosage("");
    setSelectedDays(0);
  };

  const editPrescription = async (editInputPrescription) => {
    setEditMode(true);
    setSelectedType(editInputPrescription.prescription_type);
    setSelectedDosage(editInputPrescription.dosage);
    setSelectedDays(editInputPrescription.days);
    setSelectedMedicationId(editInputPrescription.prescription_id);
    setPrescriptionToEditId(editInputPrescription.id);
  };

  // Save prescription
  const savePrescription = async () => {
    if (!validPrescriptionFields()) return;
    const data = {
      complaint: activeComplaint.id,
      sitting: activeComplaint.complaint_object ? activeComplaint.sitting : 0,
      prescription: selectedMedicationId,
      dosage: selectedDosage,
      days: Number(selectedDays),
    };
    const createdSuccessfully = await createPatientPrescription(data);
    if (createdSuccessfully) {
      resetFields();
      fetchPatientPrescription();
    }
  };

  const saveEditedPrescription = async () => {
    if (!validPrescriptionFields()) return;
    const data = {
      id: prescriptionToEditId,
      prescription: selectedMedicationId,
      dosage: selectedDosage,
      days: Number(selectedDays),
    };
    const updatedSuccessfully = await updatePatientPrescription(data);
    console.log(updatedSuccessfully);
    if (updatedSuccessfully) {
      cancelEditMode();
      fetchPatientPrescription();
    }
  };

  const cancelEditMode = () => {
    setEditMode(false);
    resetFields();
  };

  // Navigate to prescription management
  const navigateToPrescriptionManagement = () => {
    navigate("/prescriptioncrud");
  };

  return Object.keys(activeComplaint).length > 0 ? (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="block text-2xl font-bold mb-4 text-[var(--txt)]">
          {editMode ? "Edit Prescription" : "Add Prescription"}
        </h1>
        <button
          onClick={navigateToPrescriptionManagement}
          className="bg-[var(--darkgreen)] text-white p-2 rounded hover:bg-[var(--darkergreen)] hover:cursor-pointer"
        >
          Manage Prescriptions
        </button>
      </div>

      <div className="mb-6 w-full flex items-center flex-wrap">
        {/* Medication Type Dropdown */}
        <div className="w-1/2 flex gap-2">
          <div className="w-1/2">
            <label
              htmlFor="medicationType"
              className="block font-semibold mb-2 text-[var(--darkergreen)]"
            >
              Medicine Type:
            </label>
            <select
              id="medicationType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded w-full border-[var(--lightgreen)]"
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
          <div className="w-1/2">
            <label
              htmlFor="medication"
              className="block font-semibold mb-2 text-[var(--darkergreen)]"
            >
              Medicine
            </label>
            <select
              id="medication"
              value={selectedMedicationId}
              onChange={(e) => setSelectedMedicationId(e.target.value)}
              className="p-2 border rounded w-full border-[var(--lightgreen)]"
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

        {needsDosage() && (
          <div className="w-1/2 flex justify-around gap-2">
            {/* Dosage Options */}
            <div className="w-2/3">
              <label className="block font-semibold mb-2 text-[var(--darkergreen)]">
                Dosage:
              </label>
              <div className="flex">
                {dosageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedDosage(option)}
                    className={`px-3 py-2 border-2 ${
                      selectedDosage === option
                        ? "bg-[var(--darkgreen)] text-white border-[var(--darkgreen)]"
                        : "bg-gray-300 text-[var(--txt)] hover:border-[var(--lightgreen)] hover:bg-[var(--lightgreen)] border-gray-300"
                    } transition duration-200 first:rounded-l last:rounded-r hover:cursor-pointer`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Days Input */}
            <div className="w-1/4">
              <label className="block font-semibold mb-2 text-[var(--darkergreen)]">
                Days:
              </label>
              <input
                type="number"
                min="1"
                value={selectedDays}
                onChange={(e) => setSelectedDays(e.target.value)}
                className="p-2 border rounded w-full border-[var(--lightgreen)]"
              />{" "}
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex w-full gap-2 justify-start">
        <button
          onClick={() => {
            editMode ? saveEditedPrescription() : savePrescription();
          }}
          className="w-1/5 bg-[var(--darkgreen)] text-white mt-5 p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer"
        >
          {editMode ? "Update Prescription" : "Create Prescription"}
        </button>
        {editMode && (
          <button
            onClick={cancelEditMode}
            className="w-1/5 bg-gray-500 text-white mt-5 p-2 rounded-md hover:bg-gray-600 hover:cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
      {savedPrescriptions.length > 0 ? (
        <div className="my-12">
          <h1 className="block text-2xl font-bold mb-4 text-[var(--txt)]">
            Saved Prescriptions
          </h1>
          <table className="w-full border-collapse border border-gray-300 py-5 my-5">
            <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
              <tr>
                <th className="border border-gray-300 p-2">No.</th>
                <th className="border border-gray-300 p-2">Medicine</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Dosage</th>
                <th className="border border-gray-300 p-2">Days</th>
                <th className="border border-gray-300 p-2 border-b-[var(--lightgreen)]">
                  Edit
                </th>
                <th className="border border-gray-300 p-2 border-b-red-700">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {savedPrescriptions.map((prescription, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {prescription.prescription_name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {prescription.prescription_type}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {prescription.dosage || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {prescription.days || "-"}
                  </td>
                  <td
                    className="w-1/12 border border-[var(--lightgreen)] border-b-gray-500 text-[var(--txt)] bg-[var(--lightgreen)] hover:border-[var(--darkergreen)] hover:bg-[var(--darkergreen)] hover:cursor-pointer hover:text-white font-bold p-2 text-center"
                    onClick={() => editPrescription(prescription)}
                  >
                    <PencilRuler className="mx-auto" />
                  </td>
                  <td
                    className="w-1/12 border border-red-700 border-b-red-900 bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white font-bold p-2 text-center"
                    onClick={() => deletePrescription(prescription.id)}
                  >
                    <OctagonX className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full my-6 text-center mx-auto italic text-2xl text-gray-500">
          No prescription given for this sitting yet.
        </div>
      )}
    </div>
  ) : (
    <div className="p-4 flex justify-center items-center">
      <h2 className="text-3xl text-[var(--txt)] font-semibold mb-4">
        No Active complaint/followup
      </h2>
    </div>
  );
};

export default Prescriptions;
