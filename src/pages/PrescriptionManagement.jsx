import { useEffect, useState } from "react";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPrescription, setNewPrescription] = useState({ name: "", type: "Gel" });
    const [editingPrescription, setEditingPrescription] = useState(null);

    const fetchPrescriptions = async () => {
        try {
            const response = await fetch("http://localhost:8000/doc/prescription/", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch prescriptions");

            const data = await response.json();

            if (data.prescriptions && typeof data.prescriptions === "object") {
                const flattenedData = Object.entries(data.prescriptions).flatMap(([type, items]) =>
                    items.map(item => ({ id: item.id, name: item.name, type }))
                );
                setPrescriptions(flattenedData);
            } else {
                setPrescriptions([]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const handleAddPrescription = async () => {
        try {
            const response = await fetch("http://localhost:8000/doc/prescription/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newPrescription.name, type: newPrescription.type })
            });

            if (!response.ok) throw new Error("Failed to add prescription");

            setNewPrescription({ name: "", type: "Gel" });
            fetchPrescriptions();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditPrescription = async () => {
    try {
        const response = await fetch(`http://localhost:8000/doc/prescription/${editingPrescription.id}/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: editingPrescription.id, 
                name: editingPrescription.name,
                type: editingPrescription.type
            })
        });

        if (!response.ok) throw new Error("Failed to update prescription");

        setEditingPrescription(null);
        fetchPrescriptions();
    } catch (err) {
        setError(err.message);
    }
};


    const handleDeletePrescription = async (id) => {
        try { const response = await fetch(`http://localhost:8000/doc/prescription/${id}/`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete prescription");

            fetchPrescriptions();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-[var(--txt)] mb-6">Prescriptions</h1>

            {/* Add Prescription Form */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Add Prescription</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    value={newPrescription.name}
                    onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
                />
                <select
                    className="border border-gray-300 p-2 rounded-md w-full mb-2"
                    value={newPrescription.type}
                    onChange={(e) => setNewPrescription({ ...newPrescription, type: e.target.value })}
                >
                    <option value="Gel">Gel</option>
                    <option value="Toothpaste">Toothpaste</option>
                    <option value="Medication">Medication</option>
                    <option value="Mouthwash">Mouthwash</option>
                </select>
                <button
                    className="bg-[var(--darkgreen)] text-[var(--txt)] p-2 rounded-md w-full"
                    onClick={handleAddPrescription}
                >
                    Add Prescription
                </button>
            </div>

            {/* Edit Prescription Form */}
            {editingPrescription && (
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Edit Prescription</h2>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="border border-gray-300 p-2 rounded-md w-full mb-2"
                        value={editingPrescription.name}
                        onChange={(e) =>
                            setEditingPrescription({ ...editingPrescription, name: e.target.value })
                        }
                    />
                    <select
                        className="border border-gray-300 p-2 rounded-md w-full mb-2"
                        value={editingPrescription.type}
                        onChange={(e) => setEditingPrescription({ ...editingPrescription, type: e.target.value })
                        }
                    >
                        <option value="Gel">Gel</option>
                        <option value="Toothpaste">Toothpaste</option>
                        <option value="Medication">Medication</option>
                        <option value="Mouthwash">Mouthwash</option>
                    </select>
                    <button
                        className="bg-[var(--darkgreen)] text-[var(--txt)] p-2 rounded-md w-full"
                        onClick={handleEditPrescription}
                    >
                        Update Prescription
                    </button>
                </div>
            )}

            {/* Prescriptions Table */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Prescriptions List</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                    {loading ? (
                        <p className="text-[var(--txt)]">Loading prescriptions...</p>
                    ) : error ? (
                        <p className="text-red-600">Error: {error}</p>
                    ) : prescriptions.length === 0 ? (
                        <p className="text-[var(--txt)]">No prescriptions available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                                    <tr>
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Type</th>
                                        <th className="border border-gray-300 p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map((prescription) => (
                                        <tr key={prescription.id} className="even:bg-gray-100 odd:bg-white">
                                            <td className="border border-gray-300 p-2">{prescription.name || "N/A"}</td>
                                            <td className="border border-gray-300 p-2">{prescription.type || "N/A"}</td>
                                            <td className="border border-gray-300 p-2 flex gap-2">
                                                <button
                                                    className="bg-blue-500 text-white p-1 rounded-md"
                                                    onClick={() => setEditingPrescription(prescription)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white p-1 rounded-md"
                                                    onClick={() => handleDeletePrescription(prescription.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Prescriptions;

