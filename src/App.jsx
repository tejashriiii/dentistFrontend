// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import PatientRegisterForm from './components/PatientRegisterForm';

const App = () => {
  const [patients, setPatients] = React.useState([]);

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <Router>
      <div>
        <nav className="bg-purple-600 p-4">
          <Link to="/" className="text-white mr-4">Dashboard</Link>
          <Link to="/register" className="text-white">Register Patient</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard patients={patients} />} />
          <Route path="/register" element={<PatientRegisterForm addPatient={addPatient} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
