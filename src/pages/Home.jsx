

// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      {/* Header */}
      <header className="flex justify-between p-4 bg-[ #87ab87]">
        <img src="logo.png" alt="Logo" className="w-20 h-12" />
        <div className="flex items-center space-x-4">
          <Link to="/register" className="text-[#3d4243]">Register</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/contactus" className="text-white">Contact Us</Link>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="flex justify-between items-center p-8">
        <div>
          <h1 className="text-6xl font-bold  mb-4">Welcome to OJAS Dental Clinic</h1>
          <p className="text-2xl mb-4">
            We are here to provide the best dental care with a personalized touch.
          </p>
          <Link to="/contactus" className="bg-[#87ab87] text-white px-4 py-4 rounded">
            Contact Us
          </Link>
        </div>
        <img src="./src/assets/dentistImage.png" alt="Dentist" className="w-1/3 h-auto rounded-lg" />
      </div>

      {/* Treatments Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-9 p-8 px-20  ">
        <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
          <h3 className="text-xl">Teeth thing</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
          <h3 className="text-xl">Root Canal</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
          <h3 className="text-xl">Braces</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#87ab87] h-36 w-36 rounded-full text-white">
          <h3 className="text-xl">Cavity Filling</h3>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex justify-between items-center p-8">
        <div className="w-1/2">
          <img src="map.jpg" alt="Map" className="w-full h-auto rounded-lg" />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">Our Location</h2>
          <p className="text-lg">1234 Dental Street, Clinic Building, City, State, 12345</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#87ab87] text-white p-4">
        <div className="flex justify-center space-x-6">
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

