// // Home.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';


// const Home = () => {
//   return (
//     <div>
      // {/* Header */}
      // <header className="flex justify-between p-4 bg-[ #87ab87]">
      //   <img src="logo.png" alt="Logo" className="w-20 h-12" />
      //   <div className="flex items-center space-x-4">
      //     <Link to="/register" className="text-[#3d4243]">Register</Link>
      //     <Link to="/login" className="text-white">Login</Link>
      //     <Link to="/contactus" className="text-white">Contact Us</Link>
      //   </div>
      // </header>

//       {/* Welcome Section */}
      // <div className="flex justify-between items-center p-8">
      //   <div>
      //     <h1 className="text-6xl font-bold  mb-4">Welcome to OJAS Dental Clinic</h1>
      //     <p className="text-2xl mb-4">
      //       We are here to provide the best dental care with a personalized touch.
      //     </p>
      //     <Link to="/contactus" className="bg-[#87ab87] text-white px-4 py-4 rounded">
      //       Contact Us
      //     </Link>
      //   </div>
      //   <img src="./src/assets/dentistImage.png" alt="Dentist" className="w-1/3 h-auto rounded-lg" />
      // </div>

//       {/* Treatments Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-9 p-8 px-20  ">
//         <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
//           <h3 className="text-xl">Teeth thing</h3>
//         </div>
//         <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
//           <h3 className="text-xl">Root Canal</h3>
//         </div>
//         <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
//           <h3 className="text-xl">Braces</h3>
//         </div>
//         <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
//           <h3 className="text-xl">Cavity Filling</h3>
//         </div>
        
//       </div>

//       {/* Location Section */}
//       <div className="flex justify-between items-center p-8">
//         <div className="w-1/2">
//           <img src="map.jpg" alt="Map" className="w-full h-auto rounded-lg" />
//         </div>
//         <div className="w-1/2">
//           <h2 className="text-2xl font-bold mb-4">Our Location</h2>
//           <p className="text-lg">1234 Dental Street, Clinic Building, City, State, 12345</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#87ab87] text-white p-4">
        // <div className="flex justify-center space-x-6">
        //   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        //     Facebook
        //   </a>
        //   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        //     Twitter
        //   </a>
        //   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        //     Instagram
        //   </a>
        // </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--txt)]">
      {/* Navbar - Keeping Register, Login, and Appointment */}
      {/* <nav className="flex justify-between p-4 shadow-md bg-white">
        <div className="text-xl font-bold">Dental Clinic</div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded hover:bg-[var(--darkergreen)]">
            Register
          </button>
          <button className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded hover:bg-[var(--darkergreen)]">
            Login
          </button>
          <button className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded hover:bg-[var(--darkergreen)]">
            contact us
          </button>
        </div>

      </nav> */}
      {/* Header */}
      <header className="flex justify-between p-5 bg-[#87ab87]">
        <img src="./src/assets/logo.svg" alt="Logo" className="w-18 h-16" />
        <div className="flex items-center space-x-4">
          <Link to="/register" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Register</Link>
          <Link to="/login" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Login</Link>
          <Link to="/contactus" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Contact Us</Link>  
        </div>
      </header>

      {/* Welcome Section */}
      <div className="flex justify-between items-center p-4 pt-14">
        <div>
        <h1 className="text-7xl font-bold">Welcome to OJAS Dental Clinic</h1>
        <p className="text-2xl text-gray-600 py-4">Providing quality care for your smile</p>
          
        </div>
        <img src="./src/assets/dentist.jpg" alt="Dentist" className="w-1/2 h-auto rounded-lg" />
      </div>

      {/* Features Section */}


      <div className="flex justify-between items-center my-14 px-10 bg-gradient-to-b from-[var(--bg)] to-[var(--lightgreen)] ">
        
            {[
              { name: "RCT", img: "./src/assets/rct.jpg" },
              { name: "Episectomy", img: "episectomy.jpg" },
              { name: "Scaling", img: "scaling.jpg" },
              { name: "Cavity Filling", img: "cavity_filling.jpg" },
              { name: "Orthodontic Treatment", img: "./src/assets/orthodontic.jpg" },
            ].map((feature, index) => (
              <div key={index} className="relative group p-5 ">
            {/* Feature Circle */}
            <div className="w-52 h-52 flex items-center justify-center bg-[var(--darkgreen)] text-white text-lg font-bold rounded-full shadow-md transition-all group-hover:w-60 group-hover:h-60 group-hover:bg-[var(--darkergreen)]">
              {feature.name}
            </div>

            

            {/* Hover Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <img
                src={feature.img}
                alt={feature.name}
                className="w-60 h-60 rounded-full border-2 border-[var(--darkergreen)] shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>


      {/* About Doctors & Working Hours */}
      <div className="flex justify-between items-center bg-[var(--bg)] p-8 ">
      <div className="w-1/2">
          <h2 className="text-2xl font-bold">Clinic's Location:</h2>
          <p className="text-gray-600 font-bold py-2">OJAS Dental Clinic, Baran, Rajasthan. 325205.</p>
          <p className="text-gray-600 py-4">Find us easily on the given map.</p>
        </div>
        <div className="w-1/3 text-right">
          <a href="https://mapcarta.com/N7690809383" target="_blank" rel="noopener noreferrer">
            <img src="./src/assets/maps.png" alt="Clinic Map" className=" rounded shadow-md hover:opacity-80" />
          </a>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex justify-between items-center bg-[var(--lightgreen)] p-8 shadow h-56">
        
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">About Doctors:</h2>
          <h2 className="text-2xl font-bold py-2">Dr. Gupta</h2>
          <p className="text-gray-600">Experienced professional dedicated to your dental health.</p>

          
        </div>
        <div className="w-1/2 text-right">
          <h2 className="text-2xl font-bold">Working Hours</h2>
          <p className="text-gray-600 font-bold py-2">9:00 AM - 7:00 PM</p>
        </div>
      </div>

      {/* Doctor Certifications */}
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Doctor's Certifications</h2>
        <img 
          src="./src/assets/clinicLogo.png" 
          alt="Doctor's Certification" 
          className="mx-auto my-4 max-w-xs rounded-lg shadow-lg" 
        />

        
      </div>

      {/* Footer */}
      <footer className="bg-[var(--lightgreen)] text-[var(--txt)] p-4 text-center">
        <p>Email: example@clinic.com | Phone: +123 456 7890</p>
        <div className="flex justify-center space-x-6 py-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
