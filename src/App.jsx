"use client"

// App.jsx
// ok add this all in header and not here

import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ReceptionDashboard from "./pages/ReceptionDashboard"
import PatientRegisterForm from "./pages/PatientRegisterForm"
import CredentialsForm from "./pages/CredentialsForm"
import PatientAppointmentForm from "./pages/PatientAppointmentForm"
import Home from "./pages/Home"
import DailyTreatment from "./pages/DailyTreatment"
import ProtectedRoute from "./components/ProtectedRoute"
import Unauthorized from "./components/Unauthorized"
import SendMessage from "./pages/SendMessage"
import { ToastContainer } from "react-toastify"
import TreatmentManagement from "./pages/TreatmentManagement.jsx"
import PrescriptionManagement from "./pages/PrescriptionManagement.jsx"
import PatientDatabase from "./pages/PatientDatabase.jsx"
import DoctorDashboard from "./pages/DoctorDashboard.jsx"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header.jsx"
import QuickActionButton from "./components/QuickActionButton"
import {
  CalendarPlus,
  UserPlus,
  Search,
  ClipboardList,
  Hospital,
  BriefcaseMedical,
  HomeIcon as House,
  UserCheck,
  LogIn,
  Mail,
} from "lucide-react" // Lucide icons
import { getUserRole } from "./utils/auth.js"
import PatientDashboard from "./pages/PatientDashboard"

const App = () => {
  const doctorActions = [
    {
      type: "link",
      text: "Dashboard",
      icon: House,
      path: "/doctordashboard",
    },
    {
      type: "link",
      text: "Register Patient",
      icon: UserPlus,
      path: "/register",
    },
    {
      type: "link",
      text: "Signup",
      icon: UserCheck,
      path: "/signup",
    },
    {
      type: "link",
      text: "Login",
      icon: LogIn,
      path: "/login",
    },
    {
      type: "link", // navigates to a route
      text: "Schedule Appointment",
      icon: CalendarPlus,
      path: "/appointment",
    },
    {
      type: "link",
      text: "Search Patient",
      icon: Search,
      path: "/patientdb",
    },
    {
      type: "link",
      text: "View Daily Treatments",
      icon: ClipboardList,
      path: "/dailytreat",
    },
    {
      type: "link",
      text: "Manage Treatments",
      icon: Hospital,
      path: "/treatmentcrud",
    },
    {
      type: "link",
      text: "Manage Prescriptions",
      icon: BriefcaseMedical,
      path: "/prescriptioncrud",
    },
  ]

  const adminActions = [
    {
      type: "link",
      text: "Dashboard",
      icon: House,
      path: "/admindashboard",
    },
    {
      type: "link",
      text: "Register Patient",
      icon: UserPlus,
      path: "/register",
    },
    {
      type: "link",
      text: "Signup",
      icon: UserCheck,
      path: "/signup",
    },
    {
      type: "link",
      text: "Login",
      icon: LogIn,
      path: "/login",
    },
    {
      type: "link", // navigates to a route
      text: "Send Reminder",
      icon: Mail,
      path: "/sendmessage",
    },
    {
      type: "link",
      text: "Search Patient",
      icon: Search,
      path: "/patientdb",
    },
  ]

  const patientActions = [
    {
      type: "link",
      text: "Signup",
      icon: UserCheck,
      path: "/signup",
    },
    {
      type: "link",
      text: "Login",
      icon: LogIn,
      path: "/login",
    },
  ]

  const [patients, setPatients] = React.useState([])
  const [userRole, setUserRole] = React.useState(getUserRole())
  const [showQuickActions, setShowQuickActions] = React.useState(false)
  const [quickActionOptions, setQuickActionOptions] = React.useState(patientActions)
  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient])
  }

  React.useEffect(() => {
    if (userRole === "admin") {
      setQuickActionOptions(adminActions)
    } else if (userRole === "dentist") {
      setQuickActionOptions(doctorActions)
    } else {
      setQuickActionOptions(patientActions)
    }
  }, [userRole])

  React.useEffect(() => {
    const handleRoleChange = () => {
      setUserRole(getUserRole()) // this will trigger the effect that updates quickActionOptions
    }

    window.addEventListener("roleChanged", handleRoleChange)
    return () => {
      window.removeEventListener("roleChanged", handleRoleChange)
    }
  }, [])

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <div>
        <Header className="hidden md:flex" />

        <Routes>
          <Route path="/admindashboard" element={<ReceptionDashboard patients={patients} />} />
          <Route element={<ProtectedRoute allowedRoles={["admin", "dentist"]} />}>
            <Route path="/register" element={<PatientRegisterForm addPatient={addPatient} />} />
          </Route>
          <Route path="/login" element={<CredentialsForm formAction="login" />} />
          <Route path="/signup" element={<CredentialsForm formAction="signup" />} />
          <Route path="/appointment" element={<PatientAppointmentForm />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute allowedRoles={["dentist"]} />}>
            <Route path="/dailytreat" element={<DailyTreatment />} />
            <Route path="/doctordashboard" element={<DoctorDashboard />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/patientdashboard" element={<PatientDashboard />} />
          </Route>
          <Route path="/sendmessage" element={<SendMessage />} />
          <Route path="/treatmentcrud" element={<TreatmentManagement />} />
          <Route path="/prescriptioncrud" element={<PrescriptionManagement />} />
          <Route path="/patientdb" element={<PatientDatabase />} />
        </Routes>
      </div>

      <QuickActionButton
        className="fixed md:hidden"
        setShowQuickActions={setShowQuickActions}
        showQuickActions={showQuickActions}
        actions={quickActionOptions}
      />
    </Router>
  )
}

export default App

