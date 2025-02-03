// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import PatientRegisterForm from './components/PatientRegisterForm';
import PatientLoginForm from './components/PatientLoginForm';
import Payment from "./components/Payment";
import TreatmentDashboard from "./components/TreatmentDashboard";
import PatientAppointmentForm from "./components/PatientAppointmentForm";
import Prescriptions from './components/Prescriptions';


const App = () => {
  const [patients, setPatients] = React.useState([]);

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <Router>
      <div>
        <nav className="bg-purple-600 p-4 flex justify-between ">
          <div>
            <Link to="/" className="text-white mr-4 ">Dashboard</Link>
          </div>
          <div >
          <Link to="/register" className="text-white p-2">Register Patient</Link>
          <Link to="/login" className="text-white p-2">Login Patient</Link>
          <Link to="/payment" className="text-white p-2">Payment</Link>
          <Link to="/treatmentdashboard" className="text-white p-2">Treatment Dashboard</Link>
          <Link to="/appointment" className="text-white p-2">Appointment</Link>
          <Link to="/prescriptions" className="text-white p-2">Prescrip</Link>
          
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard patients={patients} />} />
          <Route path="/register" element={<PatientRegisterForm addPatient={addPatient} />} />
          <Route path="/login" element={<PatientLoginForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/treatmentdashboard" element={<TreatmentDashboard />} />
          <Route path="/appointment" element={<PatientAppointmentForm />} />
          <Route path="/prescriptions" element={< Prescriptions/>} />
          
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
