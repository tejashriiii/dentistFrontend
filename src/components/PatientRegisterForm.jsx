// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PatientRegisterForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNumber: "",
//     address: "",
//     dob: "",
//     gender: "M",
//   });

//   toast.configure();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = {
//       phonenumber: formData.mobileNumber,
//       details: {
//         name: formData.name,
//         address: formData.address,
//         gender: formData.gender,
//         date_of_birth: formData.dob,
//       },
//     };
//     console.log(JSON.stringify(dataToSend));

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/ad/details/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error:", errorData);
//         toast.error(`Registration failed: ${errorData.error || "Unknown error"}`);
//       } else {
//         const responseData = await response.json();
//         console.log("Login successful:", responseData);
//         toast.success("Registration successful!");
//         setFormData({
//           name: "",
//           mobileNumber: "",
//           address: "",
//           dob: "",
//           gender: "M",
//         });
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       toast.error("Network error! Please try again later.");
//     }
//   };

//   return (
//     <div className="max-w-md my-auto mx-auto p-6 bg-[var(--bg)] rounded-lg shadow-lg mt-2">
//       <h2 className="text-2xl font-bold text-[var(--txt)] mb-6">
//         Patient Registration
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-[var(--txt)]">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-[#3d4243]">
//             Mobile Number
//           </label>
//           <input
//             type="tel"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-[var(--txt)]">
//             Address
//           </label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-[var(--txt)]">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-[var(--txt)]">
//             Gender
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
//           >
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//             <option value="T">Transgender</option>
//             <option value="O">Other</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-[var(--darkgreen)] text-white p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default PatientRegisterForm;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    dob: "",
    gender: "M",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      phonenumber: formData.mobileNumber,
      details: {
        name: formData.name,
        address: formData.address,
        gender: formData.gender,
        date_of_birth: formData.dob,
      },
    };
    console.log(JSON.stringify(dataToSend));

    try {
      const response = await fetch(`http://127.0.0.1:8000/ad/details/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Registration failed!");
      } else {
        toast.success("Patient registered successfully!");
        setFormData({
          name: "",
          mobileNumber: "",
          address: "",
          dob: "",
          gender: "M",
        });
      }
    } catch (error) {
      toast.error("Network error! Please try again.");
    }
  };

  return (
    <div className="max-w-md my-auto mx-auto p-6 bg-[var(--bg)] rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-bold text-[var(--txt)] mb-6">
        Patient Registration
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3d4243]">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--txt)]">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-[var(--darkgreen)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="T">Transgender</option>
            <option value="O">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--darkgreen)] text-white p-2 rounded-md hover:bg-[var(--darkergreen)] hover:cursor-pointer duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default PatientRegisterForm;
