import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NavbarGuest = () => {
  // State untuk mengontrol tampilan menu pada perangkat mobile
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk membuka/tutup menu mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function untuk styling link navigasi aktif vs tidak aktif
  const navLinkStyles = ({ isActive }) => {
    return `transition-colors duration-200 ${
      isActive 
        ? "text-[#C4161C] font-medium"
        : "text-gray-700 hover:text-[#AA1419]"
    }`;
  };

  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        
        {/* --- Bagian Logo --- */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-medium leading-none">
              <span className="text-[#C4161C]">SIVE</span>
              <span className="text-black">NTA</span>
            </h1>
            <img 
              src="/logo-antara-lampung.png" 
              alt="Logo Antara Lampung" 
              className="h-8 md:h-10 w-auto object-contain mt-1" 
            />
          </div>
        </div>

        {/* --- Menu Navigasi Desktop --- */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <NavLink to="/" className={navLinkStyles}>Tentang</NavLink>
          <NavLink to="/register" className={navLinkStyles}>Daftar</NavLink>
          <NavLink to="/login" className={navLinkStyles}>Masuk</NavLink>
        </div>

        {/* --- Tombol Hamburger (Hanya Mobile) --- */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- Menu Navigasi Mobile (Dropdown) --- */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
          <NavLink to="/" onClick={toggleMenu} className={navLinkStyles}>Tentang</NavLink>
          <NavLink to="/register" onClick={toggleMenu} className={navLinkStyles}>Daftar</NavLink>
          <NavLink to="/login" onClick={toggleMenu} className={navLinkStyles}>Masuk</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavbarGuest;
