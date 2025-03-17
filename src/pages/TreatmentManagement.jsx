import { useEffect, useState } from "react";

const Treatments = () => {
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTreatment, setNewTreatment] = useState({ name: "", price: "" });
    const [editingTreatment, setEditingTreatment] = useState(null);

    const fetchTreatments = async () => {
        try {
            const response = await fetch("http://localhost:8000/doc/treatment/", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
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

    const addTreatment = async () => {
        try {
            const response = await fetch("http://localhost:8000/doc/treatment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTreatment)
            });
            if (!response.ok) throw new Error("Failed to add treatment");
            fetchTreatments();
            setNewTreatment({ name: "", price: "" });
        } catch (err) {
            setError(err.message);
        }
    };

    const updateTreatment = async () => {
        try {
            const response = await fetch("http://localhost:8000/doc/treatment/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: editingTreatment.id, treatment: editingTreatment })
            });
            if (!response.ok) throw new Error("Failed to update treatment");
            fetchTreatments();
            setEditingTreatment(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteTreatment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/doc/treatment/${id}/`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete treatment");
            fetchTreatments();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-[var(--txt)] mb-6">Treatments</h1>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">Treatments List</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                    {loading ? (
                        <p className="text-[var(--txt)]">Loading treatments...</p>
                    ) : error ? (
                        <p className="text-red-600">Error: {error}</p>
                    ) : treatments.length === 0 ? (
                        <p className="text-[var(--txt)]">No treatments available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                                    <tr>
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Price</th>
                                        <th className="border border-gray-300 p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treatments.map((treatment) => (
                                        <tr key={treatment.id} className="even:bg-gray-100 odd:bg-white">
                                            <td className="border border-gray-300 p-2">{treatment.name || "N/A"}</td>
                                            <td className="border border-gray-300 p-2">₹{treatment.price || "N/A"}</td>
                                            <td className="border border-gray-300 p-2">
                                                <button onClick={() => setEditingTreatment(treatment)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                                <button onClick={() => deleteTreatment(treatment.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">{editingTreatment ? "Edit Treatment" : "Add Treatment"}</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingTreatment ? editingTreatment.name : newTreatment.name}
                        onChange={(e) => editingTreatment ? setEditingTreatment({ ...editingTreatment, name: e.target.value }) : setNewTreatment({ ...newTreatment, name: e.target.value })}
                        className="block w-full border p-2 rounded mt-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editingTreatment ? editingTreatment.price : newTreatment.price}
                        onChange={(e) => editingTreatment ? setEditingTreatment({ ...editingTreatment, price: e.target.value }) : setNewTreatment({ ...newTreatment, price: e.target.value })}
                        className="block w-full border p-2 rounded mt-2"
                    />
                    <button
                        onClick={editingTreatment ? updateTreatment : addTreatment}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {editingTreatment ? "Update Treatment" : "Add Treatment"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Treatments;
