import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
const Home = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--txt)]">
      
      <Header/>
      {/* Welcome Section */}
      <div className="flex justify-between items-center p-8 pt-14">
        <div>
        <h1 className="text-7xl font-bold">Welcome to OJAS Dental Clinic</h1>
        <p className="text-2xl text-gray-600 py-4">Providing quality care for your smile</p>
          
        </div>
        <img src="./src/assets/dentist.jpg" alt="Dentist" className="w-1/2 h-auto rounded-lg" />
      </div>

      {/* Features Section */}


      <div className="flex justify-between items-center my-14 px-10 bg-gradient-to-b from-[var(--bg)] to-[var(--lightgreen)] pb-5 ">
        
            {[
              { name: "RCT", img: "./src/assets/toothrct.jpg" },
              { name: "Episectomy", img: "./src/assets/toothepisectomy.jpg" },
              { name: "Scaling", img: "./src/assets/toothscaling.jpg" },
              { name: "Cavity Filling", img: "./src/assets/toothcavityfilling.png" },
              { name: "Orthodontic Treatment", img: "./src/assets/toothorthodontic.jpg" },
            ].map((feature, index) => (
              <div key={index} className="relative group p-5 ">
            {/* Feature Circle */}
            <div className="w-52 h-52  flex items-center justify-center bg-[var(--darkgreen)] text-white text-lg font-bold rounded-full shadow-md transition-all duration-300 group-hover:w-60 group-hover:h-60 group-hover:bg-[var(--darkergreen)]">
              {feature.name}
            </div>

            

            {/* Hover Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <div className="flex justify-between items-center bg-[var(--lightgreen)] px-8 shadow h-56">
        
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
      <footer className="bg-[var(--lightgreen)] text-[var(--txt)] p-4  text-center">
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
