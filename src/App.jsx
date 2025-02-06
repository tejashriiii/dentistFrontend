// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReceptionDashboard from "./components/ReceptionDashboard";
import PatientRegisterForm from "./components/PatientRegisterForm";
import CredentialsForm from "./components/CredentialsForm";
import PatientAppointmentForm from "./components/PatientAppointmentForm";
import FollowUp from "./components/FollowUp";
import Home from "./pages/Home";
import DailyTreatment from "./pages/DailyTreatment";

const App = () => {
  const [patients, setPatients] = React.useState([]);
  const [xrayPrices, setXrayPrices] = React.useState({
    1: 50,
    2: 60,
    3: 70, // Default X-ray prices
  });

  const isAdmin = true; // Change this based on user role (main admin/staff)

  // Function to update X-ray price (Admins only)
  const updatePrice = (tooth, price) => {
    setXrayPrices((prev) => ({ ...prev, [tooth]: Number(price) }));
  };

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <Router>
      <div>
        <nav className="bg-[var(--darkgreen)] p-4 flex justify-between ">
          <div>
            <Link to="/" className="mr-4 ">
              Admin Dashboard
            </Link>
            <Link to="/Home" className="p-2">
              HomePage
            </Link>
            <Link to="/dailytreat" className="p-2">
              docDailyTreatment
            </Link>
          </div>
          <div>
            <Link to="/register" className="p-2">
              Register Patient
            </Link>
            <Link to="/login" className="p-2">
              Login
            </Link>
            <Link to="/signup" className="p-2">
              Signup
            </Link>
            <Link to="/appointment" className="p-2">
              Appointment
            </Link>
            <Link to="/followup" className="p-2">
              followup
            </Link>

          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ReceptionDashboard patients={patients} />} />
          <Route
            path="/register"
            element={<PatientRegisterForm addPatient={addPatient} />}
          />
          <Route
            path="/login"
            element={<CredentialsForm formAction="login" />}
          />
          <Route
            path="/signup"
            element={<CredentialsForm formAction="signup" />}
          />
          <Route path="/appointment" element={<PatientAppointmentForm />} />
          <Route path="/followUp" element={<FollowUp userType="doctor" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/dailytreat" element={<DailyTreatment />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
