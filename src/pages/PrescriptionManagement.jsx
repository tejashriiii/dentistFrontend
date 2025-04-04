"use client"

import { useEffect, useState, useRef } from "react"
import { FaSpinner, FaSearch, FaFilter } from "react-icons/fa"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([])
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newPrescription, setNewPrescription] = useState({
    name: "",
    type: "Gel",
  })
  const [editingPrescription, setEditingPrescription] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const formRef = useRef(null)

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/doc/prescription/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      if (!response.ok) throw new Error("Failed to fetch prescriptions")
      const data = await response.json()
      if (data.prescriptions && typeof data.prescriptions === "object") {
        const flattenedData = Object.entries(data.prescriptions).flatMap(([type, items]) =>
          items.map((item) => ({ id: item.id, name: item.name, type })),
        )
        setPrescriptions(flattenedData)
        setFilteredPrescriptions(flattenedData)
      } else {
        setPrescriptions([])
        setFilteredPrescriptions([])
      }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  // Apply search and filter whenever prescriptions, searchTerm, or filterType changes
  useEffect(() => {
    let result = [...prescriptions]

    // Apply search
    if (searchTerm) {
      result = result.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply type filter
    if (filterType !== "All") {
      result = result.filter((item) => item.type === filterType)
    }

    setFilteredPrescriptions(result)
  }, [prescriptions, searchTerm, filterType])

  const addPrescription = async () => {
    if (!newPrescription.name) {
      setError("Name is required")
      toast.error("Name is required")
      return
    }
    try {
      const response = await fetch("http://localhost:8000/doc/prescription/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(newPrescription),
      })
      if (!response.ok) throw new Error("Failed to add prescription")
      await fetchPrescriptions()
      setNewPrescription({ name: "", type: "Gel" })
      toast.success("Prescription added successfully!")
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  const updatePrescription = async () => {
    if (!editingPrescription.name) {
      setError("Name is required")
      toast.error("Name is required")
      return
    }
    try {
      const response = await fetch(`http://localhost:8000/doc/prescription/${editingPrescription.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          id: editingPrescription.id,
          prescription: {
            name: editingPrescription.name,
            type: editingPrescription.type,
          },
        }),
      })
      if (!response.ok) throw new Error("Failed to update prescription")
      await fetchPrescriptions()
      setEditingPrescription(null)
      toast.success("Prescription updated successfully!")
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  const deletePrescription = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/doc/prescription/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
      if (!response.ok) throw new Error("Failed to delete prescription")
      await fetchPrescriptions()
      toast.success("Prescription deleted successfully!")
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    }
  }

  const cancelEdit = () => {
    setEditingPrescription(null)
    setError(null)
  }

  const handleEditClick = (prescription) => {
    setEditingPrescription(prescription)
    toast.info(`Editing "${prescription.name}"`)
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Get unique prescription types for filter dropdown
  const prescriptionTypes = ["All", ...new Set(prescriptions.map((item) => item.type))]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">Manage Prescriptions</h1>
          <Link
            to="/doctordashboard"
            className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6" ref={formRef}>
          <h2 className="text-xl font-semibold">{editingPrescription ? "Edit Prescription" : "Add Prescription"}</h2>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[var(--txt)]">Name</label>
              <input
                type="text"
                placeholder="Enter prescription name"
                value={editingPrescription ? editingPrescription.name : newPrescription.name}
                onChange={(e) =>
                  editingPrescription
                    ? setEditingPrescription({
                        ...editingPrescription,
                        name: e.target.value,
                      })
                    : setNewPrescription({
                        ...newPrescription,
                        name: e.target.value,
                      })
                }
                className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--txt)]">Type</label>
              <select
                value={editingPrescription ? editingPrescription.type : newPrescription.type}
                onChange={(e) =>
                  editingPrescription
                    ? setEditingPrescription({
                        ...editingPrescription,
                        type: e.target.value,
                      })
                    : setNewPrescription({
                        ...newPrescription,
                        type: e.target.value,
                      })
                }
                className="block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              >
                <option value="Gel">Gel</option>
                <option value="Toothpaste">Toothpaste</option>
                <option value="Medication">Medication</option>
                <option value="Mouthwash">Mouthwash</option>
                <option value="Injection">Injection</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={editingPrescription ? updatePrescription : addPrescription}
                className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
              >
                {editingPrescription ? "Update Prescription" : "Add Prescription"}
              </button>
              {editingPrescription && (
                <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4 text-center">Prescriptions List</h2>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 block w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                >
                  {prescriptionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-[var(--darkgreen)]" size={24} />
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : filteredPrescriptions.length === 0 ? (
            <p className="text-[var(--txt)] text-center">
              {searchTerm || filterType !== "All"
                ? "No prescriptions match your search criteria."
                : "No prescriptions available."}
            </p>
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
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="even:bg-gray-100 odd:bg-white">
                      <td className="border border-gray-300 p-2">{prescription.name || "N/A"}</td>
                      <td className="border border-gray-300 p-2">{prescription.type || "N/A"}</td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleEditClick(prescription)}
                          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePrescription(prescription.id)}
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
      </div>
    </div>
  )
}

export default Prescriptions


