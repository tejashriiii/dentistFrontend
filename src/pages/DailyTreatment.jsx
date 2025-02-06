import React, { useState , useEffect } from "react";
import Prescriptions from "../components/Prescriptions";
import Treatment from "../components/Treatment";

export default function TreatmentDashboard() {
  const [treatments, setTreatments] = useState([
    { name: "RCT", cost: 5000 },
    { name: "Consultation", cost: 250 },
    { name: "X-Ray", cost: 400 },
  ]);

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    
    // Convert to IST (UTC +5:30)
    const offsetIST = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istTime = new Date(now.getTime() + offsetIST);
  
    // Format as YYYY-MM-DDTHH:MM (required for datetime-local input)
    const formattedDateTime = istTime.toISOString().slice(0, 16);
  
    setDateTime(formattedDateTime);
  }, []);

  const handleAdd = (list, setList, value) => {
    if (value) {
      setList([...list, value]);
    }
  };

  const handleRemove = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const totalFees = treatments.reduce(
    (sum, treatment) => sum + treatment.cost,
    0
  );

  return (
    <div className="p-6 bg-[var(--bg)] min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          {/* Date and Clinic Section */}
          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Date*
              </label>
              <input
                type="datetime-local"
                defaultValue={dateTime}
                className="w-full px-3 py-2 border border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--darkgreen)] hover:border-[var(--darkgreen)]"
              />
            </div>
            <div className="w-1/2 pl-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Clinic*
              </label>
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                <option>Ojas Dental Clinic</option>
              </select>
            </div>
          </div>

          {/* Patient and Doctor Dropdown Section */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 pr-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Patient*
              </label>
              {/* Patient Dropdown - to be fetched from server DB */}
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                <option>Patient 1</option>
                <option>Patient 2</option>
              </select>
            </div>
            <div className="w-1/2 pl-4">
              <label className="block text-sm font-semibold text-[var(--darkgreen)] mb-1">
                Doctor*
              </label>
              {/* Doctor Dropdown - to be fetched from server DB */}
              <select className="w-full px-3 py-2 border  border-[var(--lightgreen)] rounded-lg focus:outline-none focus:ring focus:ring-[var(--lightgreen)] hover:border-[var(--darkgreen)]">
                <option>Dr. A</option>
                <option>Dr. B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Diagnosis Section - Placeholder for Diagnosis Component */}
        <div className="mt-6">
          <div className="min-h-64 mb-6">
            <Treatment />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-64 mb-6">
            {/* Placeholder for Diagnosis Component */}
          </div>
        </div>

        <div className="mt-6">
          <div className="">
            {<Prescriptions/>}
          </div>
        </div>
        
       
      </div>
    </div>
  );
}
