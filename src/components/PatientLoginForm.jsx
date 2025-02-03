// import React, { useState } from 'react';

// const PatientLoginForm = () => {
//   const [formData, setFormData] = useState({
//     mobileNumber: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login Data Submitted:', formData);
//     // Here you can handle login, e.g., send data to an API to verify credentials
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-bold text-purple-700 mb-6">
//         Patient Login
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-purple-600">
//             Mobile Number
//           </label>
//           <input
//             type="number"
//             // fix its length to 10
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-purple-600">
//             Password
//           </label>
//           <input
//             type="password"
//             // add special char required?
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PatientLoginForm;

import React, { useState } from 'react';

const PatientLoginForm = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data Submitted:', formData);

    // Prepare the data to be sent
    const dataToSend = {
      phonenumber: formData.mobileNumber,
      password: formData.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        // Handle error responses here (e.g., show a message to the user)
      } else {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
        // Handle successful login (e.g., store token, redirect user)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors here
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Patient Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            maxLength={10} // Limit input length to 10
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default PatientLoginForm;
