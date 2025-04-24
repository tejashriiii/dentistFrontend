// import {
//   CalendarPlus,
//   UserPlus,
//   Search,
//   ClipboardList,
//   Hospital,
//   BriefcaseMedical,
// } from "lucide-react"; // Lucide icons
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PatientRegisterForm from "./PatientRegisterForm"; // Assuming this component exists

// const DentistDashboard = () => {
//   // State variables for appointments, follow-ups, loading, errors, and UI controls
//   const [appointments, setAppointments] = useState([]);
//   const [followups, setFollowups] = useState([]);
//   const [appointmentsLoading, setAppointmentsLoading] = useState(true);
//   const [followupsLoading, setFollowupsLoading] = useState(true);
//   const [appointmentsError, setAppointmentsError] = useState(null);
//   const [followupsError, setFollowupsError] = useState(null);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAppointments();
//     fetchFollowups();
//   }, []);

//   // Fetch appointments from the same endpoint as patient dashboard
//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/p/complaints/`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//           },
//         },
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch appointments");
//       }
//       const data = await response.json();
//       const appointmentList = Array.isArray(data.complaints)
//         ? data.complaints
//         : [data];
//       setAppointments(appointmentList);
//     } catch (err) {
//       setAppointmentsError(err.message);
//     } finally {
//       setAppointmentsLoading(false);
//     }
//   };

//   // Fetch follow-ups from the same endpoint as patient dashboard
//   const fetchFollowups = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/p/followup/`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//           },
//         },
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch follow-ups");
//       }
//       const data = await response.json();
//       const followupList = Array.isArray(data.followups)
//         ? data.followups
//         : [data];
//       setFollowups(followupList);
//     } catch (err) {
//       setFollowupsError(err.message);
//     } finally {
//       setFollowupsLoading(false);
//     }
//   };

//   // Quick Action Button component

//   // Action Cards component
//   const ActionCards = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//       {/* Register Patient */}
//       <button
//         onClick={() => setIsRegisterModalOpen(true)}
//         className="bg-white rounded-lg shadow-md p-6 hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <UserPlus className="h-8 w-8" />
//           </div>
//           <div className="text-left">
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               Register Patient
//             </h3>
//             <p className="text-gray-600">Add a new patient to the system</p>
//           </div>
//         </div>
//       </button>

//       {/* Schedule Appointment */}
//       <Link
//         to="/appointment"
//         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <CalendarPlus className="h-8 w-8" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               Schedule Appointment
//             </h3>
//             <p className="text-gray-600">Book a new appointment</p>
//           </div>
//         </div>
//       </Link>

//       {/* Search Patient */}
//       <Link
//         to="/patientdb"
//         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <Search className="h-8 w-8" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               Search Patient
//             </h3>
//             <p className="text-gray-600">Find patient records</p>
//           </div>
//         </div>
//       </Link>

//       {/* View Daily Treatments */}
//       <Link
//         to="/dailytreat"
//         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <ClipboardList className="h-8 w-8" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               View Daily Treatments
//             </h3>
//             <p className="text-gray-600">Manage today's treatments</p>
//           </div>
//         </div>
//       </Link>

//       {/* Manage Treatments */}
//       <Link
//         to="/treatmentcrud"
//         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <Hospital className="h-8 w-8" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               Manage Treatments
//             </h3>
//             <p className="text-gray-600">Manage treatment details</p>
//           </div>
//         </div>
//       </Link>

//       {/* Manage Prescriptions */}
//       <Link
//         to="/prescriptioncrud"
//         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//       >
//         <div className="flex items-center gap-4">
//           <div className="bg-[var(--darkgreen)] p-4 rounded-full text-white">
//             <BriefcaseMedical className="h-8 w-8" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-[var(--darkergreen)]">
//               Manage Prescriptions
//             </h3>
//             <p className="text-gray-600">Manage prescription records</p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
//   // Dashboard Stats component
//   const DashboardStats = () => (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-white">
//             Today's Appointments
//           </h3>
//           <p className="text-3xl font-bold text-white">{appointments.length}</p>
//         </div>
//         <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-white">
//             Today's Follow-ups
//           </h3>
//           <p className="text-3xl font-bold text-white">{followups.length}</p>
//         </div>
//       </div>
//     </div>
//   );

//   // Main render
//   return (
//     <div className="min-h-screen flex justify-center bg-gray-100 p-6">
//       <div className="w-2/3">
//         <h1 className="text-3xl font-bold text-center text-[var(--txt)] my-10">
//           Dentist Dashboard
//         </h1>
//         <ActionCards />
//         <DashboardStats />

//         {/* Appointments Section */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">
//             Appointments
//           </h2>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             {appointmentsLoading ? (
//               <p className="text-[var(--txt)]">Loading appointments...</p>
//             ) : appointmentsError ? (
//               <p className="text-red-600">Error: {appointmentsError}</p>
//             ) : appointments.length === 0 ? (
//               <p className="text-[var(--txt)]">No appointments for today.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
//                     <tr>
//                       <th className="border border-gray-300 p-2">Name</th>
//                       <th className="border border-gray-300 p-2">
//                         Phone Number
//                       </th>
//                       <th className="border border-gray-300 p-2">Age</th>
//                       <th className="border border-gray-300 p-2">Complaint</th>
//                       <th className="border border-gray-300 p-2">Time</th>
//                       <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.map((appointment, index) => (
//                       <tr key={index} className="even:bg-gray-100 odd:bg-white">
//                         <td className="border border-gray-300 p-2">
//                           {appointment.name || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {appointment.phonenumber || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {appointment.age || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {appointment.complaint || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {appointment.time
//                             ? appointment.time.split(".")[0].slice(0, 5)
//                             : "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           <Link
//                             to={`/dailytreatment/${appointment.id}`}
//                             className="text-blue-500 hover:underline"
//                           >
//                             View Treatment
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Follow-ups Section */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold text-[var(--darkergreen)] mb-4">
//             Follow-ups
//           </h2>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             {followupsLoading ? (
//               <p className="text-[var(--txt)]">Loading follow-ups...</p>
//             ) : followupsError ? (
//               <p className="text-red-600">Error: {followupsError}</p>
//             ) : followups.length === 0 ? (
//               <p className="text-[var(--txt)]">No follow-ups for today.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                   <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
//                     <tr>
//                       <th className="border border-gray-300 p-2">Name</th>
//                       <th className="border border-gray-300 p-2">
//                         Phone Number
//                       </th>
//                       <th className="border border-gray-300 p-2">Age</th>
//                       <th className="border border-gray-300 p-2">Follow-up</th>
//                       <th className="border border-gray-300 p-2">Time</th>
//                       <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {followups.map((followup, index) => (
//                       <tr key={index} className="even:bg-gray-100 odd:bg-white">
//                         <td className="border border-gray-300 p-2">
//                           {followup.name || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {followup.phonenumber || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {followup.age || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {followup.followup || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {followup.time
//                             ? followup.time.split(".")[0].slice(0, 5)
//                             : "N/A"}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           <Link
//                             to={`/dailytreatment/${followup.id}`}
//                             className="text-blue-500 hover:underline"
//                           >
//                             View Treatment
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Patient Registration Modal */}
//         {isRegisterModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-[var(--txt)]">
//                   Register Patient
//                 </h2>
//                 <button
//                   onClick={() => setIsRegisterModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <PatientRegisterForm />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DentistDashboard;
import {
  CalendarPlus,
  UserPlus,
  Search,
  ClipboardList,
  Hospital,
  BriefcaseMedical,
} from "lucide-react"; // Lucide icons
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientRegisterForm from "./PatientRegisterForm"; // Assuming this component exists

const DentistDashboard = () => {
  // State variables for appointments, follow-ups, loading, errors, and UI controls
  const [appointments, setAppointments] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [followupsLoading, setFollowupsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [followupsError, setFollowupsError] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchAppointments();
    fetchFollowups();
  }, []);

  // Fetch appointments from the same endpoint as patient dashboard
  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/complaints/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      const appointmentList = Array.isArray(data.complaints)
        ? data.complaints
        : [data];
      setAppointments(appointmentList);
    } catch (err) {
      setAppointmentsError(err.message);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Fetch follow-ups from the same endpoint as patient dashboard
  const fetchFollowups = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/p/followup/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch follow-ups");
      }
      const data = await response.json();
      const followupList = Array.isArray(data.followups)
        ? data.followups
        : [data];
      setFollowups(followupList);
    } catch (err) {
      setFollowupsError(err.message);
    } finally {
      setFollowupsLoading(false);
    }
  };

  // Action Cards component
  const ActionCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {/* Register Patient */}
      <button
        onClick={() => setIsRegisterModalOpen(true)}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <UserPlus className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              Register Patient
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Add a new patient to the system</p>
          </div>
        </div>
      </button>

      {/* Schedule Appointment */}
      <Link
        to="/appointment"
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <CalendarPlus className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              Schedule Appointment
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Book a new appointment</p>
          </div>
        </div>
      </Link>

      {/* Search Patient */}
      <Link
        to="/patientdb"
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <Search className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              Search Patient
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Find patient records</p>
          </div>
        </div>
      </Link>

      {/* View Daily Treatments */}
      <Link
        to="/dailytreat"
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <ClipboardList className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              View Daily Treatments
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Manage today's treatments</p>
          </div>
        </div>
      </Link>

      {/* Manage Treatments */}
      <Link
        to="/treatmentcrud"
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <Hospital className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              Manage Treatments
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Manage treatment details</p>
          </div>
        </div>
      </Link>

      {/* Manage Prescriptions */}
      <Link
        to="/prescriptioncrud"
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[var(--darkgreen)] p-2 sm:p-4 rounded-full text-white">
            <BriefcaseMedical className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--darkergreen)]">
              Manage Prescriptions
            </h3>
            <p className="text-sm sm:text-base text-gray-600">Manage prescription records</p>
          </div>
        </div>
      </Link>
    </div>
  );
  // Dashboard Stats component
  const DashboardStats = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Today's Appointments
          </h3>
          <p className="text-3xl font-bold text-white">{appointments.length}</p>
        </div>
        <div className="bg-[var(--darkgreen)] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">
            Today's Follow-ups
          </h3>
          <p className="text-3xl font-bold text-white">{followups.length}</p>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-3 sm:p-6">
      <div className="w-full sm:w-4/5 md:w-2/3">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[var(--txt)] my-6 sm:my-10">
          Dentist Dashboard
        </h1>
        <ActionCards />
        <DashboardStats />

        {/* Appointments Section */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--darkergreen)] mb-4">
            Appointments
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {appointmentsLoading ? (
              <p className="text-[var(--txt)]">Loading appointments...</p>
            ) : appointmentsError ? (
              <p className="text-red-600">Error: {appointmentsError}</p>
            ) : appointments.length === 0 ? (
              <p className="text-[var(--txt)]">No appointments for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Name</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                        Phone Number
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">Age</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Complaint</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Time</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {appointment.name || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                          {appointment.phonenumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                          {appointment.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {appointment.complaint || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {appointment.time
                            ? appointment.time.split(".")[0].slice(0, 5)
                            : "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          <Link
                            to={`/dailytreatment/${appointment.id}`}
                            className="text-blue-500 hover:underline text-sm sm:text-base"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Follow-ups Section */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--darkergreen)] mb-4">
            Follow-ups
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {followupsLoading ? (
              <p className="text-[var(--txt)]">Loading follow-ups...</p>
            ) : followupsError ? (
              <p className="text-red-600">Error: {followupsError}</p>
            ) : followups.length === 0 ? (
              <p className="text-[var(--txt)]">No follow-ups for today.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-[var(--darkgreen)] text-[var(--txt)]">
                    <tr>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Name</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                        Phone Number
                      </th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">Age</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Follow-up</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Time</th>
                      <th className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followups.map((followup, index) => (
                      <tr key={index} className="even:bg-gray-100 odd:bg-white">
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {followup.name || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                          {followup.phonenumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base hidden sm:table-cell">
                          {followup.age || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {followup.followup || "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          {followup.time
                            ? followup.time.split(".")[0].slice(0, 5)
                            : "N/A"}
                        </td>
                        <td className="border border-gray-300 p-1 sm:p-2 text-xs sm:text-base">
                          <Link
                            to={`/dailytreatment/${followup.id}`}
                            className="text-blue-500 hover:underline text-sm sm:text-base"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Patient Registration Modal */}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--txt)]">
                  Register Patient
                </h2>
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <PatientRegisterForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DentistDashboard;