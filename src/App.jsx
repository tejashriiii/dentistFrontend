// // App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Dashboard from './components/Dashboard'; // Import the Dashboard component
// import PatientRegisterForm from './components/PatientRegisterForm';
// import PatientLoginForm from './components/PatientLoginForm';

// const App = () => {
//   const [patients, setPatients] = React.useState([]);

//   const addPatient = (newPatient) => {
//     setPatients([...patients, newPatient]);
//   };

//   return (
//     <Router>
//       <div>
//         <nav className="bg-purple-600 p-4 flex justify-between ">
//           <div>
//             <Link to="/" className="text-white mr-4 ">Dashboard</Link>
//           </div>
//           <div >
//           <Link to="/register" className="text-white p-2">Register Patient</Link>
//           <Link to="/login" className="text-white p-2">Login Patient</Link>
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Dashboard patients={patients} />} />
//           <Route path="/register" element={<PatientRegisterForm addPatient={addPatient} />} />
//           <Route path="/login" element={<PatientLoginForm />} />
//         </Routes>
        
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Payment from "./components/Payment"; // Import the Payment component

const App = () => {
  return (
    <Router>
      <div>
        <nav className="bg-purple-600 p-4 flex justify-between">
          <div>
            <Link to="/payment" className="text-white font-bold text-lg">
              Payment
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
