import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"; // Add this import
import "react-toastify/dist/ReactToastify.css"; // Add this import

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTreatment, setNewTreatment] = useState({ name: "", price: "" });
  const [editingTreatment, setEditingTreatment] = useState(null);

  // Fetch treatments from the API
  const fetchTreatments = async () => {
    try {
      const response = await fetch("http://localhost:8000/doc/treatment/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
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

  // Add a new treatment
  const addTreatment = async () => {
    if (!newTreatment.name || !newTreatment.price) {
      setError("Name and price are required");
      toast.error("Name and price are required"); // Added toast
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/doc/treatment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(newTreatment),
      });
      if (!response.ok) throw new Error("Failed to add treatment");
      await fetchTreatments();
      setNewTreatment({ name: "", price: "" });
      toast.success("Treatment added successfully!"); // Added toast
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Added toast
    }
  };

  // Update an existing treatment
  const updateTreatment = async () => {
    if (!editingTreatment.name || !editingTreatment.price) {
      setError("Name and price are required");
      toast.error("Name and price are required"); // Added toast
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/doc/treatment/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ id: editingTreatment.id, treatment: editingTreatment }),
      });
      if (!response.ok) throw new Error("Failed to update treatment");
      await fetchTreatments();
      setEditingTreatment(null);
      toast.success("Treatment updated successfully!"); // Added toast
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Added toast
    }
  };

  // Delete a treatment
  const deleteTreatment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/doc/treatment/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete treatment");
      await fetchTreatments();
      toast.success("Treatment deleted successfully!"); // Added toast
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Added toast
    }
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingTreatment(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-[var(--txt)] mb-6">Manage Treatments</h1>
      <div className="mt-8">
        {/* Treatments List Section */}
        <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4 text-center">Treatments List</h2>
        <div className="bg-white rounded-lg shadow-md p-4 max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-[var(--darkgreen)]" size={24} />
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : treatments.length === 0 ? (
            <p className="text-[var(--txt)] text-center">No treatments available.</p>
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
                        <button
                          onClick={() => setEditingTreatment(treatment)}
                          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTreatment(treatment.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

        {/* Add/Edit Treatment Form */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold">
            {editingTreatment ? "Edit Treatment" : "Add Treatment"}
          </h2>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[var(--txt)]">Name</label>
              <input
                type="text"
                placeholder="Enter treatment name"
                value={editingTreatment ? editingTreatment.name : newTreatment.name}
                onChange={(e) =>
                  editingTreatment
                    ? setEditingTreatment({ ...editingTreatment, name: e.target.value })
                    : setNewTreatment({ ...newTreatment, name: e.target.value })
                }
                className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--txt)]">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={editingTreatment ? editingTreatment.price : newTreatment.price}
                onChange={(e) =>
                  editingTreatment
                    ? setEditingTreatment({ ...editingTreatment, price: e.target.value })
                    : setNewTreatment({ ...newTreatment, price: e.target.value })
                }
                className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={editingTreatment ? updateTreatment : addTreatment}
                className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
              >
                {editingTreatment ? "Update Treatment" : "Add Treatment"}
              </button>
              {editingTreatment && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
