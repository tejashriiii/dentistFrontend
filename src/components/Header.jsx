import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <header className="flex justify-between p-5 bg-[var(--darkgreen)]">
        <img src="./src/assets/logo.svg" alt="Logo" className="w-18 h-16" />
        <div className="flex items-center space-x-4">
          <Link to="/register" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Register</Link>
          <Link to="/login" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Login</Link>
          <Link to="/contactus" className="px-4 py-2 text-lg text-[var(--txt)] rounded hover:bg-[var(--darkergreen)]">Contact Us</Link>  
        </div>
      </header>
    </div>
  )
}

export default Header