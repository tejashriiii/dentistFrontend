import React, { useState } from "react";

const SearchPatients = () => {
    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState("");

    const searchPatients = async () => {
        if (!searchName && !searchPhone) {
            setError("Please enter a name or phone number.");
            return;
        }

        let url = "http://localhost:8000/p/";
        if (searchName && searchPhone) {
            url += `${searchPhone}/${searchName.replace(/\s+/g, "_").toLowerCase()}/`;
        } else if (searchName) {
            url += `${searchName.replace(/\s+/g, "_").toLowerCase()}/`;
        } else if (searchPhone) {
            url += `${searchPhone}/`;
        }

        try {
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`,
                },
            });

            if (!response.ok) throw new Error("Patient not found");
            const data = await response.json();
            console.log(data)
            setPatients(Array.isArray(data.patients) ? data.patients : []);
            setError("");
        } catch (err) {
            setError(err.message);
            setPatients([]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Patients</h2>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    onClick={searchPatients}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {patients.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Results:</h3>
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
    <thead className="bg-[#87ab87] text-white">
        <tr className="text-center">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Date of Birth</th>
            <th className="p-3 border">Phone Number</th>
            <th className="p-3 border">Gender</th>
            <th className="p-3 border">Address</th>
        </tr>
    </thead>
    <tbody>
        {patients.map((patient, index) => (
            <tr key={index} className="text-center bg-gray-100 hover:bg-gray-200 transition">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{patient.name}</td>
                <td className="p-3 border">{patient.date_of_birth}</td>
                <td className="p-3 border">{patient.phonenumber ?? "N/A"}</td>
                <td className="p-3 border">{patient.gender === "M" ? "Male" : "Female"}</td>
                <td className="p-3 border">{patient.address}</td>
            </tr>
        ))}
    </tbody>
</table>

                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPatients;

