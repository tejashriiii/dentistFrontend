// import React, { useState } from 'react';

// const Prescriptions = () => {
//   const [medicines] = useState([
//     'Sensiclave 625',
//     'Ordent',
//     'Zerodol SP',
//     'Injection - Voveron painkiller',
//     'Metrogill 400',
//     'Capsule Rabemac DSR',
//   ]);
  
//   const [pastes] = useState([
//     'Vantage',
//     'Senquel F',
//     'Thermokind F',
//     'Add Others',
//     'Mouthwashes - CLoveHexPlus',
//     'Bitaden Gargle',
//   ]);

//   const [gels] = useState([
//     'MetroHEx',
//     'Annabelle',
//   ]);

//   const [prescriptions, setPrescriptions] = useState([]);

//   const addPrescription = (e) => {
//     e.preventDefault();
    
//     const formData = new FormData(e.target);
//     const newPrescription = {
//       medicine: formData.get('medicine'),
//       paste: formData.get('paste'),
//       gel: formData.get('gel'),
//       dosage: formData.getAll('dosage'),
//       days: formData.get('days'),
//     };

//     setPrescriptions([...prescriptions, newPrescription]);
//   };

//   const removePrescription = (index) => {
//     const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
//     setPrescriptions(updatedPrescriptions);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Add Prescription</h1>
//       <form onSubmit={addPrescription}>
//         <div className="flex space-x-4 mb-4">
//           {/* Medicine Dropdown */}
//           <div>
//             <label className="block text-lg font-medium">Medicine</label>
//             <select name="medicine" className="border p-2 rounded w-full" required>
//               {medicines.map((med, index) => (
//                 <option key={index} value={med}>
//                   {med}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Paste Dropdown */}
//           <div>
//             <label className="block text-lg font-medium">Paste</label>
//             <select name="paste" className="border p-2 rounded w-full">
//               {pastes.map((paste, index) => (
//                 <option key={index} value={paste}>
//                   {paste}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Gel Dropdown */}
//           <div>
//             <label className="block text-lg font-medium">Gel</label>
//             <select name="gel" className="border p-2 rounded w-full">
//               {gels.map((gel, index) => (
//                 <option key={index} value={gel}>
//                   {gel}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Dosage Checkbox */}
//         <div className="mb-4">
//           <label className="block text-lg font-medium">Dosage</label>
//           {['OD', 'BD', 'TDS', 'HALF BD', 'HALF TDS'].map((dosage, index) => (
//             <div key={index}>
//               <input type="checkbox" name="dosage" value={dosage} id={dosage} />
//               <label htmlFor={dosage}>{dosage}</label>
//             </div>
//           ))}
//         </div>

//         {/* Days Section */}
//         <div className="mb-4">
//           <label className="block text-lg font-medium">Days</label>
//           <select name="days" className="border p-2 rounded w-full">
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="7">7</option>
            
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-[var(--darkgreen)] text-white py-2 px-4 rounded"
//         >
//           Add Prescription
//         </button>
//       </form>

//       {/* Display prescriptions */}
//       <div className="mt-6">
//         <h2 className="text-xl font-bold">Prescriptions</h2>
//         <ul className="list-disc pl-6">
//           {prescriptions.map((prescription, index) => (
//             <li key={index} className="flex justify-between items-center">
//               <div>
//                 <strong>{prescription.medicine}</strong><br />
//                 {prescription.paste && <span>Paste: {prescription.paste}</span>}<br />
//                 {prescription.gel && <span>Gel: {prescription.gel}</span>}<br />
//                 <span>Dosage: {prescription.dosage.join(', ')}</span><br />
//                 <span>Days: {prescription.days}</span>
//               </div>
//               <button
//                 onClick={() => removePrescription(index)}
//                 className="bg-red-600 text-white rounded-full p-1 py-0.5"
//               >
//                 x
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Prescriptions;
import React, { useState } from 'react';

const Prescriptions = () => {
  const [medicines, setMedicines] = useState([
    'Sensiclave 625',
    'Ordent',
    'Zerodol SP',
    'Injection - Voveron painkiller',
    'Metrogill 400',
    'Capsule Rabemac DSR',
  ]);
  
  const [pastes, setPastes] = useState([
    'Vantage',
    'Senquel F',
    'Thermokind F',
    'Mouthwashes - CLoveHexPlus',
    'Bitaden Gargle',
  ]);
  
  const [gels, setGels] = useState([
    'MetroHEx',
    'Annabelle',
  ]);
  
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const handleCheckboxChange = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: prev[item] ? undefined : { dosage: 'OD', days: 3 },
    }));
  };

  const handleChange = (item, field, value) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: { ...prev[item], [field]: value },
    }));
  };

  const addPrescription = () => {
    const newPrescriptions = Object.entries(selectedItems)
      .filter(([_, values]) => values)
      .map(([name, values]) => ({ name, ...values }));
    setPrescriptions(newPrescriptions);
  };

  const addNewItem = (category, setCategory) => {
    const newItem = prompt(`Enter new ${category}:`);
    if (newItem) setCategory((prev) => [...prev, newItem]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Prescription</h1>
      {[['Medicine', medicines, setMedicines], ['Paste', pastes, setPastes], ['Gel', gels, setGels]].map(([label, list, setList]) => (
        <div key={label} className="mb-4">
          <h2 className="text-lg font-semibold">{label}s</h2>
          {list.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!selectedItems[item]}
                onChange={() => handleCheckboxChange(label, item)}
              />
              <span>{item}</span>
              {selectedItems[item] && (
                <>
                  <div className="ml-4">
                    <label>Dosage: </label>
                    {['OD', 'BD', 'TDS', 'HALF BD', 'HALF TDS'].map((d) => (
                      <label key={d} className="ml-2">
                        <input
                          type="radio"
                          name={`dosage-${item}`}
                          value={d}
                          checked={selectedItems[item]?.dosage === d}
                          onChange={(e) => handleChange(item, 'dosage', e.target.value)}
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                  <div className="ml-4">
                    <label>Days: </label>
                    {[3, 5, 7].map((d) => (
                      <label key={d} className="ml-2">
                        <input
                          type="radio"
                          name={`days-${item}`}
                          value={d}
                          checked={selectedItems[item]?.days === d}
                          onChange={(e) => handleChange(item, 'days', parseInt(e.target.value))}
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <button
            className="bg-[var(--darkgreen)] text-[var(--txt)] p-1 rounded ml-2"
            onClick={() => addNewItem(label, setList)}
          >
            +
          </button>
        </div>
      ))}

      <button onClick={addPrescription} className="bg-[var(--darkgreen)] text-white p-2 rounded">Save Prescription</button>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Prescriptions</h2>
        <ul className="list-disc pl-6">
          {prescriptions.map((p, index) => (
            <li key={index}>
              <strong>{p.name}</strong> - Dosage: {p.dosage}, Days: {p.days}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Prescriptions;
