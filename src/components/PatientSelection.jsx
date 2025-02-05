import { useState } from "react";

const PatientSelection = () => {
    // Dummy data for testing
    const dummyPatients = [
        { id: "1", phoneNumber: "1234567890", name: "John Doe", address: "123 Main St", allergies: "Peanuts", conditions: "Diabetes", age: 30 },
        { id: "2", phoneNumber: "1234567890", name: "Jane Doe", address: "456 Elm St", allergies: "None", conditions: "Asthma", age: 25 },
        { id: "3", phoneNumber: "9876543210", name: "Alice Smith", address: "789 Oak St", allergies: "Dust", conditions: "Hypertension", age: 40 },
    ];

    // Store phone number input
    const [phoneNumber, setPhoneNumber] = useState("");
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Handle "Search" button click
    const handleSearch = () => {
        const filteredPatients = dummyPatients.filter(p => p.phoneNumber === phoneNumber);
        setPatients(filteredPatients);
        setSelectedPatient(filteredPatients.length === 1 ? filteredPatients[0] : null);
    };

    return (
        <div className="p-6 bg-[#f4f8f1] min-h-screen flex flex-col items-center">
            <div className="max-w-lg bg-white shadow-md rounded-lg p-6 w-full">
                <h2 className="text-xl font-bold text-[#3c3e3f] mb-4">Search Patient</h2>

                {/* Phone Number Input */}
                <div className="mb-4">
                    <label className="block text-[#3c3e3f] font-semibold">Enter Phone Number:</label>
                    <input
                        type="text"
                        className="w-full mt-2 p-2 border rounded-lg bg-[#ACD1AF] text-[#3c3e3f]"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="mt-3 w-full bg-[#87ab87] text-white p-2 rounded-lg"
                    >
                        Search
                    </button>
                </div>

                {/* Patient Selection Dropdown */}
                {patients.length > 1 && (
                    <div className="mb-4">
                        <label className="block text-[#3c3e3f] font-semibold">Select Patient:</label>
                        <select
                            className="w-full mt-2 p-2 border rounded-lg bg-[#ACD1AF] text-[#3c3e3f]"
                            value={selectedPatient?.id || ""}
                            onChange={(e) => {
                                const selected = patients.find(p => p.id === e.target.value);
                                setSelectedPatient(selected);
                            }}
                        >
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Patient Details */}
                {selectedPatient && (
                    <div className="p-4 bg-[#87ab87] text-white rounded-lg">
                        <h2 className="text-lg font-bold mb-2">{selectedPatient.name}</h2>
                        <p><strong>Address:</strong> {selectedPatient.address}</p>
                        <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
                        <p><strong>Conditions:</strong> {selectedPatient.conditions}</p>
                        <p><strong>Age:</strong> {selectedPatient.age}</p>
                    </div>
                )}

                {/* No Patient Found */}
                {patients.length === 0 && phoneNumber !== "" && (
                    <p className="text-red-500 mt-3">No patient found for this phone number.</p>
                )}
            </div>
        </div>
    );
};

export default PatientSelection;
