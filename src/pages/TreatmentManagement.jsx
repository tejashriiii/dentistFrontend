"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaSpinner,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { PencilRuler, OctagonX } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTreatment, setNewTreatment] = useState({ name: "", price: "" });
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const formRef = useRef(null);

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
      const treatmentsList = Array.isArray(data.treatments)
        ? data.treatments
        : [];
      setTreatments(treatmentsList);
      setFilteredTreatments(treatmentsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  // Apply search, sort, and filter whenever treatments, searchTerm, or sortConfig changes
  useEffect(() => {
    let result = [...treatments];

    // Apply search
    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply price range filter
    if (priceRange.min !== "") {
      result = result.filter(
        (item) => Number(item.price) >= Number(priceRange.min),
      );
    }

    if (priceRange.max !== "") {
      result = result.filter(
        (item) => Number(item.price) <= Number(priceRange.max),
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === "price") {
          return sortConfig.direction === "ascending"
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price);
        } else {
          return sortConfig.direction === "ascending"
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }
      });
    }

    setFilteredTreatments(result);
  }, [treatments, searchTerm, sortConfig, priceRange]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const addTreatment = async () => {
    if (!newTreatment.name || !newTreatment.price) {
      setError("Name and price are required");
      toast.error("Name and price are required");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doc/treatment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(newTreatment),
        },
      );
      if (!response.ok) throw new Error("Failed to add treatment");
      await fetchTreatments();
      setNewTreatment({ name: "", price: "" });
      toast.success("Treatment added successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const updateTreatment = async () => {
    if (!editingTreatment.name || !editingTreatment.price) {
      setError("Name and price are required");
      toast.error("Name and price are required");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doc/treatment/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            id: editingTreatment.id,
            treatment: editingTreatment,
          }),
        },
      );
      if (!response.ok) throw new Error("Failed to update treatment");
      await fetchTreatments();
      setEditingTreatment(null);
      toast.success("Treatment updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const deleteTreatment = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/doc/treatment/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete treatment");
      await fetchTreatments();
      toast.success("Treatment deleted successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingTreatment(null);
    setError(null);
  };

  const handleEditClick = (treatment) => {
    setEditingTreatment(treatment);
    toast.info(`Editing "${treatment.name}"`);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setSortConfig({ key: null, direction: "ascending" });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">
            Manage Treatments
          </h1>
          <Link
            to="/doctordashboard"
            className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6" ref={formRef}>
          <h2 className="text-xl font-semibold mb-5 text-[var(--txt)]">
            {editingTreatment ? "Edit Treatment" : "Add Treatment"}
          </h2>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[var(--txt)] mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter treatment name"
                value={
                  editingTreatment ? editingTreatment.name : newTreatment.name
                }
                onChange={(e) =>
                  editingTreatment
                    ? setEditingTreatment({
                        ...editingTreatment,
                        name: e.target.value,
                      })
                    : setNewTreatment({ ...newTreatment, name: e.target.value })
                }
                className="block border-[var(--lightgreen)] w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--txt)] mb-1">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter price"
                value={
                  editingTreatment ? editingTreatment.price : newTreatment.price
                }
                onChange={(e) =>
                  editingTreatment
                    ? setEditingTreatment({
                        ...editingTreatment,
                        price: e.target.value,
                      })
                    : setNewTreatment({
                        ...newTreatment,
                        price: e.target.value,
                      })
                }
                className="block border-[var(--lightgreen)] w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={editingTreatment ? updateTreatment : addTreatment}
                className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)] hover:cursor-pointer"
              >
                {editingTreatment ? "Update Treatment" : "Add Treatment"}
              </button>
              {editingTreatment && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-[var(--txt)] my-7 text-center">
          Treatments List
        </h2>

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
                  placeholder="Search treatments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 block w-full border border-[var(--lightgreen)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <input
                  type="number"
                  placeholder="Min price"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="block w-full border border-[var(--lightgreen)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max price"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="block w-full border border-[var(--lightgreen)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
                />
              </div>
              <button
                onClick={resetFilters}
                className="bg-gray-500 text-gray-100 px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <FaSpinner
                className="animate-spin text-[var(--darkgreen)]"
                size={24}
              />
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : filteredTreatments.length === 0 ? (
            <p className="text-[var(--txt)] text-center">
              {searchTerm || priceRange.min || priceRange.max
                ? "No treatments match your search criteria."
                : "No treatments available."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                  <tr>
                    <th
                      className="border border-gray-300 p-2 cursor-pointer hover:bg-[var(--darkergreen)] hover:text-[var(--bg)]"
                      onClick={() => requestSort("name")}
                    >
                      <div className="flex items-center justify-between">
                        Name
                        {sortConfig.key === "name" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="border border-gray-300 p-2 cursor-pointer hover:bg-[var(--darkergreen)] hover:text-[var(--bg)]"
                      onClick={() => requestSort("price")}
                    >
                      <div className="flex items-center justify-between text-center">
                        Price
                        {sortConfig.key === "price" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th className="border border-gray-300 p-1 sm:p-2 border-b-[var(--lightgreen)]">
                      Edit
                    </th>
                    <th className="border border-gray-300 p-1 sm:p-2 border-b-red-700">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTreatments.map((treatment) => (
                    <tr
                      key={treatment.id}
                      className="even:bg-gray-100 odd:bg-white"
                    >
                      <td className="border border-gray-300 p-2">
                        {treatment.name || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ₹{treatment.price || "N/A"}
                      </td>
                      <td
                        className="border border-[var(--lightgreen)] border-b-gray-500 text-[var(--txt)] bg-[var(--lightgreen)] hover:border-[var(--darkergreen)] hover:bg-[var(--darkergreen)] hover:cursor-pointer hover:text-white font-bold p-1 sm:p-2 text-center"
                        onClick={() => handleEditClick(treatment)}
                      >
                        <PencilRuler className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                      </td>
                      <td
                        className="border border-red-700 border-b-red-900 bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white font-bold p-1 sm:p-2 text-center"
                        onClick={() => deleteTreatment(treatment.id)}
                      >
                        <OctagonX className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
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

export default Treatments;
