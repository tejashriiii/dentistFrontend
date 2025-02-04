// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PatientRegisterForm from "./components/PatientRegisterForm";
import CredentialsForm from "./components/CredentialsForm";
import Payment from "./components/Payment";
import TreatmentDashboard from "./components/TreatmentDashboard";
import PatientAppointmentForm from "./components/PatientAppointmentForm";
import Prescriptions from "./components/Prescriptions";
import FollowUp from "./components/FollowUp";
import Home from "./pages/Home";
import DentalChart from "./components/DentalChart";



const App = () => {
  const [patients, setPatients] = React.useState([]);
  const [xrayPrices, setXrayPrices] = React.useState({
    1: 50, 2: 60, 3: 70, // Default X-ray prices
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
        <nav className="bg-[#87ab87] p-4 flex justify-between ">
          <div>
            <Link to="/" className="text-[#3d4243] mr-4 ">
              Dashboard
            </Link>
          </div>
          <div>
            <Link to="/register" className="text-[#3d4243] p-2">
              Register Patient
            </Link>
            <Link to="/login" className="text-[#3d4243] p-2">
              Login
            </Link>
            <Link to="/signup" className="text-[#3d4243] p-2">
              Signup
            </Link>
            <Link to="/payment" className="text-[#3d4243] p-2">
              Payment
            </Link>
            <Link to="/treatmentdashboard" className="text-[#3d4243] p-2">
              Treatment Dashboard
            </Link>
            <Link to="/appointment" className="text-[#3d4243] p-2">
              Appointment
            </Link>
            <Link to="/prescriptions" className="text-[#3d4243] p-2">
              Prescrip
            </Link>
            <Link to="/followup" className=" p-2">
              followup
            </Link>
            <Link to="/Home" className=" p-2">
              Home page
            </Link>
            <Link to="/dental-chart" className="text-[#3d4243] p-2">Dental Chart</Link> {/* Added Link */}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard patients={patients} />} />
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
          <Route path="/payment" element={<Payment />} />
          <Route path="/treatmentdashboard" element={<TreatmentDashboard />} />
          <Route path="/appointment" element={<PatientAppointmentForm />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/followUp" element={<FollowUp userType="doctor" />} />
          <Route path="/Home" element={<Home />} />
          <Route 
            path="/dental-chart" 
            element={<DentalChart xrayPrices={xrayPrices} updatePrice={updatePrice} isAdmin={isAdmin} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;