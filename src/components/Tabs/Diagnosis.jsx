import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { OctagonX, PencilRuler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DentalChart from "../../assets/dentalChart.svg";
import TypableDropdown from "../TypableDropdown";

export default function Diagnosis({ activeComplaint }) {
  const TOOTH_NUMBERS = [
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  ];
  const [treatments, setTreatments] = useState({});
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [savedDiagnosis, setSavedDiagnosis] = useState({});
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState("");
  const [selectedToothNumber, setSelectedToothNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editDiagnosisId, setEditDiagnosisId] = useState("");
  const navigate = useNavigate();
  // Save state to sessionStorage whenever it changes

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
      const TREATMENT_OPTIONS = data.treatments.map(
        (treatment) => treatment.name,
      );
      TREATMENT_OPTIONS.splice(TREATMENT_OPTIONS.indexOf("Consultation"), 1);
      setTreatmentOptions(TREATMENT_OPTIONS);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDiagnosis = async () => {
    try {
      const FETCH_DIAGNOSIS_URL = `${import.meta.env.VITE_API_URL}/p/diagnosis/${activeComplaint.id}/`;
      const response = await fetch(FETCH_DIAGNOSIS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      const data = await response.json();
      const patientDiagnosis = data.diagnosis;
      const consultationEntry = patientDiagnosis.find(
        (item) => (item.name = "Consultation"),
      );
      patientDiagnosis.splice(patientDiagnosis.indexOf(consultationEntry, 1));
      patientDiagnosis.sort((a, b) => a.tooth_number - b.tooth_number);
      setSavedDiagnosis(patientDiagnosis);

      if (!response.ok) throw new Error("Failed to fetch patient's diagnosis");
    } catch (error) {
      console.log(error);
      if (error.error) toast.error(error.error);
      else toast.error(error);
    }
  };

  const createDiagnosis = async (diagnosisToCreate) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/diagnosis/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(diagnosisToCreate),
        },
      );

      if (response.ok) {
        toast.success("Diagnosis saved!");
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

  const updateDiagnosis = async (diagnosisToUpdate) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/diagnosis/`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(diagnosisToUpdate),
        },
      );

      if (response.ok) {
        toast.success("Diagnosis updated!");
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

  const deleteDiagnosis = async (diagnosisId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/diagnosis/delete/${diagnosisId}/`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );

      const outcome = await response.json();
      if (response.ok) {
        toast.success(outcome.success);
        return true;
      }
      if (!response.ok) {
        toast.error(outcome.error);
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const saveDiagnosis = async () => {
    if (selectedTreatmentId == "" || selectedToothNumber == "") {
      toast.warning("Check if all fields are filled");
      return;
    }
    let verdict = false;
    if (editMode) {
      const diagnosis = {
        treatment: selectedTreatmentId,
        id: editDiagnosisId,
        tooth_number: selectedToothNumber,
      };
      verdict = await updateDiagnosis(diagnosis);
    } else {
      const diagnosis = {
        complaint: activeComplaint.id,
        tooth_number: selectedToothNumber,
        treatment: selectedTreatmentId,
      };
      verdict = await createDiagnosis(diagnosis);
    }
    if (verdict) {
      cancelEditMode();
      fetchDiagnosis();
    }
  };

  const handleDeleteDiagnosis = async (diagnosisId) => {
    const verdict = await deleteDiagnosis(diagnosisId);
    if (verdict) {
      fetchDiagnosis();
    }
  };
  const navigateToTreatmentManagement = () => {
    navigate("/treatmentcrud");
  };

  const resetFields = () => {
    setSelectedTreatment("");
    setSelectedTreatmentId("");
    setSelectedToothNumber("");
  };

  const cancelEditMode = () => {
    resetFields();
    setEditMode(false);
  };

  const handleEditDiagnosis = (diagnosis) => {
    setEditMode(true);
    setSelectedTreatment(diagnosis.treatment_name);
    setSelectedTreatmentId(diagnosis.treatment);
    setSelectedToothNumber(diagnosis.tooth_number);
    setEditDiagnosisId(diagnosis.id);
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  useEffect(() => {
    // Fetch previous diagnosis only if followup
    fetchDiagnosis();
  }, [activeComplaint]);

  useEffect(() => {
    if (!treatments.length) return;

    const SELECTED_TREATMENT_ID = treatments.find(
      (entry) => entry.name === selectedTreatment,
    )?.id;
    setSelectedTreatmentId(SELECTED_TREATMENT_ID);
  }, [selectedTreatment]);

  return Object.keys(activeComplaint).length > 0 ? (
    <div className="flex flex-col space-y-4 p-4">
      <div>
        <img src={DentalChart} alt="Dental Chart" />
      </div>
      <div className="flex w-full justify-between mb-5">
        <h1 className="text-2xl font-bold text-[var(--txt)]">Add Diagnosis</h1>
        <button
          onClick={navigateToTreatmentManagement}
          className="mt-1 bg-[var(--darkgreen)] text-white p-2 rounded hover:bg-[var(--darkergreen)] hover:cursor-pointer"
        >
          Manage Treatments
        </button>
      </div>
      <div className="flex flex-wrap gap-7 w-full items-end">
        <div>
          <label
            htmlFor="treatment-list"
            className="block font-semibold mb-2 text-[var(--darkergreen)]"
          >
            Diagnosis:
          </label>
          <TypableDropdown
            id="treatment-list"
            options={treatmentOptions}
            onChange={setSelectedTreatment}
            inputValue={selectedTreatment}
          />
        </div>
        <div>
          <label
            htmlFor="tooh-number-list"
            className="block font-semibold mb-2 text-[var(--darkergreen)]"
          >
            Tooth Number:
          </label>
          <TypableDropdown
            id="tooth-number-list"
            options={TOOTH_NUMBERS}
            onChange={setSelectedToothNumber}
            inputValue={selectedToothNumber}
          />
        </div>
        <button
          className="w-1/5 bg-[var(--darkgreen)] text-white mt-5 p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer"
          onClick={saveDiagnosis}
        >
          {editMode ? "Update diagnosis" : "Save Diagnosis"}
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
      {savedDiagnosis.length > 0 ? (
        <div className="my-12">
          <h1 className="block text-2xl font-bold mb-4 text-[var(--txt)]">
            Saved Diagnosis
          </h1>
          <table className="w-full border-collapse border border-gray-300 py-5 my-5">
            <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
              <tr>
                <th className="border border-gray-300 p-2">No.</th>
                <th className="border border-gray-300 p-2">Diagnosis</th>
                <th className="border border-gray-300 p-2">Tooth</th>
                <th className="border border-gray-300 p-2 border-b-[var(--lightgreen)]">
                  Edit
                </th>
                <th className="border border-gray-300 p-2 border-b-red-700">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {savedDiagnosis.map((diagnosis, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {diagnosis.treatment_name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {diagnosis.tooth_number}
                  </td>
                  <td
                    className="w-1/12 border border-[var(--lightgreen)] border-b-gray-500 text-[var(--txt)] bg-[var(--lightgreen)] hover:border-[var(--darkergreen)] hover:bg-[var(--darkergreen)] hover:cursor-pointer hover:text-white font-bold p-2 text-center"
                    onClick={() => handleEditDiagnosis(diagnosis)}
                  >
                    <PencilRuler className="mx-auto" />
                  </td>
                  <td
                    className="w-1/12 border border-red-700 border-b-red-900 bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white font-bold p-2 text-center"
                    onClick={() => handleDeleteDiagnosis(diagnosis.id)}
                  >
                    <OctagonX className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full my-14 text-center mx-auto italic text-2xl text-gray-500">
          No Diagnosis given for this complaint.
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
}
