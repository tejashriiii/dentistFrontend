// import React, { useState, useEffect } from "react";

// const SearchPatients = () => {
//   const [searchName, setSearchName] = useState("");
//   const [searchPhone, setSearchPhone] = useState("");
//   const [patients, setPatients] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [patientHistory, setPatientHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const searchPatients = async () => {
//     if (!searchName && !searchPhone) {
//       setError("Please enter a name or phone number.");
//       return;
//     }

//     let url = `${import.meta.env.VITE_API_URL}/p/`;
//     if (searchName && searchPhone) {
//       url += `${searchPhone}/${searchName.replace(/\s+/g, "_").toLowerCase()}/`;
//     } else if (searchName) {
//       url += `${searchName.replace(/\s+/g, "_").toLowerCase()}/`;
//     } else if (searchPhone) {
//       url += `${searchPhone}/`;
//     }

//     try {
//       const response = await fetch(url, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//         },
//       });

//       if (!response.ok) throw new Error("Patient not found");
//       const data = await response.json();
//       console.log(data);
//       setPatients(Array.isArray(data.patients) ? data.patients : []);
//       setError("");
//     } catch (err) {
//       setError(err.message);
//       setPatients([]);
//     }
//   };

//   const fetchPatientHistory = async (patientId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/p/history/${patientId}`,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//           },
//         },
//       );

//       if (!response.ok) throw new Error("Failed to fetch patient history");
//       const data = await response.json();
//       setPatientHistory(data.history);
//     } catch (err) {
//       console.error("Error fetching patient history:", err);
//       setPatientHistory([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePatientClick = (patient) => {
//     setSelectedPatient(patient);
//     setSidebarOpen(true);
//     fetchPatientHistory(patient.id);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       searchPatients();
//     }
//   };
//   const closeSidebar = () => {
//     setSidebarOpen(false);
//     setSelectedPatient(null);
//   };

//   // Close sidebar on escape key press
//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") {
//         closeSidebar();
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   return (
//     <div className="relative max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Patients</h2>
//       <div className="flex gap-3">
//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <input
//           type="text"
//           placeholder="Enter Phone Number"
//           value={searchPhone}
//           onChange={(e) => setSearchPhone(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <button
//           onClick={searchPatients}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {patients.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Results:</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
//               <thead className="bg-[#87ab87] text-white">
//                 <tr className="text-center">
//                   <th className="p-3 border">#</th>
//                   <th className="p-3 border">Name</th>
//                   <th className="p-3 border">Date of Birth</th>
//                   <th className="p-3 border">Phone Number</th>
//                   <th className="p-3 border">Gender</th>
//                   <th className="p-3 border">Address</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {patients.map((patient, index) => (
//                   <tr
//                     key={index}
//                     className="text-center bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
//                     onClick={() => handlePatientClick(patient)}
//                   >
//                     <td className="p-3 border">{index + 1}</td>
//                     <td className="p-3 border">{patient.name}</td>
//                     <td className="p-3 border">{patient.date_of_birth}</td>
//                     <td className="p-3 border">
//                       {patient.phonenumber ?? "N/A"}
//                     </td>
//                     <td className="p-3 border">
//                       {patient.gender === "M" ? "Male" : "Female"}
//                     </td>
//                     <td className="p-3 border">{patient.address}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Patient History Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Patient History
//             </h2>
//             <button
//               onClick={closeSidebar}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {selectedPatient && (
//             <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 {selectedPatient.name}
//               </h3>
//               <p>
//                 <span className="font-medium">DOB:</span>{" "}
//                 {selectedPatient.date_of_birth}
//               </p>
//               <p>
//                 <span className="font-medium">Phone:</span>{" "}
//                 {selectedPatient.phonenumber ?? "N/A"}
//               </p>
//               <p>
//                 <span className="font-medium">Gender:</span>{" "}
//                 {selectedPatient.gender === "M" ? "Male" : "Female"}
//               </p>
//               <p>
//                 <span className="font-medium">Address:</span>{" "}
//                 {selectedPatient.address}
//               </p>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="flex justify-center items-center h-40">
//               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
//             </div>
//           ) : patientHistory.length > 0 ? (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-3">
//                 Medical History
//               </h3>
//               <div className="space-y-4">
//                 {patientHistory.map((item, index) => (
//                   <div
//                     key={index}
//                     className="border-l-4 border-green-600 pl-4 py-2"
//                   >
//                     <div className="text-sm text-gray-500 mb-1">
//                       {item.date}
//                     </div>
//                     <h4 className="font-medium text-gray-800 mb-1">
//                       {item.type}
//                     </h4>
//                     <p className="text-gray-700">{item.description}</p>
//                     {item.treatment && (
//                       <p className="mt-1 text-green-700">
//                         <span className="font-medium">Treatment:</span>{" "}
//                         {item.treatment}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-10">
//               <p className="text-gray-500">
//                 No history records found for this patient.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Overlay when sidebar is open */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={closeSidebar}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default SearchPatients;
import React, { useState, useEffect } from "react";

const SearchPatients = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchPatients = async () => {
    if (!searchName && !searchPhone) {
      setError("Please enter a name or phone number.");
      return;
    }

    let url = `${import.meta.env.VITE_API_URL}/p/`;
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) throw new Error("Patient not found");
      const data = await response.json();
      console.log(data);
      setPatients(Array.isArray(data.patients) ? data.patients : []);
      setError("");
    } catch (err) {
      setError(err.message);
      setPatients([]);
    }
  };

  const fetchPatientHistory = async (patientId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/history/${patientId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch patient history");
      const data = await response.json();
      setPatientHistory(data.history);
    } catch (err) {
      console.error("Error fetching patient history:", err);
      setPatientHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setSidebarOpen(true);
    fetchPatientHistory(patient.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPatients();
    }
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedPatient(null);
  };

  // Close sidebar on escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-4 md:mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Search Patients</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
        <input
          type="text"
          placeholder="Enter Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)] mb-2 md:mb-0"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)] mb-2 md:mb-0"
        />
        <button
          onClick={searchPatients}
          className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded-lg hover:bg-[var(--lightgreen)] transition w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-3 md:mt-4">{error}</p>}

      {patients.length > 0 && (
        <div className="mt-4 md:mt-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Results:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-[#87ab87] text-white">
                <tr className="text-center">
                  <th className="p-2 md:p-3 border text-xs md:text-base">#</th>
                  <th className="p-2 md:p-3 border text-xs md:text-base">Name</th>
                  <th className="p-2 md:p-3 border text-xs md:text-base">DOB</th>
                  <th className="p-2 md:p-3 border text-xs md:text-base">Phone</th>
                  <th className="p-2 md:p-3 border text-xs md:text-base">Gender</th>
                  <th className="p-2 md:p-3 border text-xs md:text-base">Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={index}
                    className="text-center bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    onClick={() => handlePatientClick(patient)}
                  >
                    <td className="p-2 md:p-3 border text-xs md:text-base">{index + 1}</td>
                    <td className="p-2 md:p-3 border text-xs md:text-base">{patient.name}</td>
                    <td className="p-2 md:p-3 border text-xs md:text-base">{patient.date_of_birth}</td>
                    <td className="p-2 md:p-3 border text-xs md:text-base">
                      {patient.phonenumber ?? "N/A"}
                    </td>
                    <td className="p-2 md:p-3 border text-xs md:text-base">
                      {patient.gender === "M" ? "Male" : "Female"}
                    </td>
                    <td className="p-2 md:p-3 border text-xs md:text-base whitespace-normal break-words">{patient.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patient History Sidebar - Responsive version */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 md:p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Patient History
            </h2>
            <button
              onClick={closeSidebar}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {selectedPatient && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                {selectedPatient.name}
              </h3>
              <p className="text-sm md:text-base">
                <span className="font-medium">DOB:</span>{" "}
                {selectedPatient.date_of_birth}
              </p>
              <p className="text-sm md:text-base">
                <span className="font-medium">Phone:</span>{" "}
                {selectedPatient.phonenumber ?? "N/A"}
              </p>
              <p className="text-sm md:text-base">
                <span className="font-medium">Gender:</span>{" "}
                {selectedPatient.gender === "M" ? "Male" : "Female"}
              </p>
              <p className="text-sm md:text-base">
                <span className="font-medium">Address:</span>{" "}
                {selectedPatient.address}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-t-2 border-b-2 border-[var(--darkgreen)]"></div>
            </div>
          ) : patientHistory.length > 0 ? (
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                Medical History
              </h3>
              <div className="space-y-3 md:space-y-4">
                {patientHistory.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-[var(--lightgreen)] pl-3 md:pl-4 py-2"
                  >
                    <div className="text-xs md:text-sm text-gray-500 mb-1">
                      {item.date}
                    </div>
                    <h4 className="font-medium text-sm md:text-base text-gray-800 mb-1">
                      {item.type}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-700">{item.description}</p>
                    {item.treatment && (
                      <p className="mt-1 text-xs md:text-sm bg-[var(--darkgreen)]">
                        <span className="font-medium">Treatment:</span>{" "}
                        {item.treatment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 md:py-10">
              <p className="text-gray-500 text-sm md:text-base">
                No history records found for this patient.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default SearchPatients;