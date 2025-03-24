import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--txt)] min-h-screen">
      <Header />

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 pt-16 md:pt-20">
        <div className="md:w-1/2 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">Welcome to OJAS Dental Clinic</h1>
          <p className="text-xl md:text-2xl text-gray-600 py-4">Providing quality care for your smile</p>
          <Link to="/appointment" className="inline-block mt-4 bg-[var(--darkgreen)] text-white px-6 py-3 rounded-full hover:bg-[var(--darkergreen)] transition-colors duration-300">
            Book an Appointment
          </Link>
        </div>
        <img 
          src="./src/assets/dentist.jpg" 
          alt="Dentist" 
          className="md:w-1/2 h-auto rounded-lg mt-8 md:mt-0 shadow-lg transform hover:scale-105 transition-transform duration-300" 
        />
      </section>

      {/* Features Section */}
      <section className="my-14 px-6 md:px-10 bg-gradient-to-b from-[var(--bg)] to-[var(--lightgreen)] py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { name: "RCT", img: "./src/assets/toothrct.jpg" },
            { name: "Episectomy", img: "./src/assets/toothepisectomy.jpg" },
            { name: "Scaling", img: "./src/assets/toothscaling.jpg" },
            { name: "Cavity Filling", img: "./src/assets/toothcavityfilling.png" },
            { name: "Orthodontic Treatment", img: "./src/assets/toothorthodontic.jpg" },
          ].map((feature, index) => (
            <div key={index} className="relative group p-4">
              <div className="w-48 h-48 md:w-52 md:h-52 flex items-center justify-center bg-[var(--darkgreen)] text-white text-lg font-bold rounded-full shadow-md transition-all duration-300 group-hover:w-56 group-hover:h-56 group-hover:bg-[var(--darkergreen)]">
                {feature.name}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  src={feature.img}
                  alt={feature.name}
                  className="w-56 h-56 rounded-full border-4 border-[var(--darkergreen)] shadow-lg object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Doctors & Working Hours */}
      <section className="flex flex-col md:flex-row justify-between items-center bg-[var(--bg)] p-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Clinic's Location</h2>
          <p className="text-gray-600 font-bold text-lg">OJAS Dental Clinic, Baran, Rajasthan. 325205.</p>
          <p className="text-gray-600 py-4">Find us easily on the map below.</p>
        </div>
        <div className="md:w-1/3">
          <a href="https://mapcarta.com/N7690809383" target="_blank" rel="noopener noreferrer">
            <img 
              src="./src/assets/maps.png" 
              alt="Clinic Map" 
              className="rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300 w-full" 
            />
          </a>
        </div>
      </section>

      {/* Doctor Info & Hours */}
      <section className="flex flex-col md:flex-row justify-between items-center bg-[var(--lightgreen)] px-8 py-12 shadow">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">About Our Doctors</h2>
          <h3 className="text-2xl font-semibold py-2">Dr. Gupta</h3>
          <p className="text-gray-600 text-lg">Experienced professional dedicated to your dental health.</p>
        </div>
        <div className="md:w-1/2 text-center md:text-right">
          <h2 className="text-3xl font-bold mb-2">Working Hours</h2>
          <p className="text-gray-600 font-bold text-lg py-2">9:00 AM - 7:00 PM</p>
        </div>
      </section>

      {/* Doctor Certifications */}
      <section className="text-center py-12 bg-[var(--bg)]">
        <h2 className="text-3xl font-bold mb-6">Doctor's Certifications</h2>
        <img 
          src="./src/assets/clinicLogo.png" 
          alt="Doctor's Certification" 
          className="mx-auto my-4 max-w-xs rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
        />
      </section>

      {/* Footer */}
      <footer className="bg-[var(--lightgreen)] text-[var(--txt)] p-6 text-center">
        <p className="text-lg">Email: example@clinic.com | Phone: +123 456 7890</p>
        <div className="flex justify-center space-x-6 py-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--darkergreen)] transition-colors">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--darkergreen)] transition-colors">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--darkergreen)] transition-colors">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
