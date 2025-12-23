import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white border-b border-black sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
        {/* Tulisan SIVENTA */}
        <h1 className="text-lg font-bold leading-none">
            <span className="text-[#991B1F]">SIVE</span>
            <span className="text-black">NTA</span>
        </h1>
        
        {/* Gambar Logo Antara Lampung */}
        <img 
            src="/logo-antara-lampung.png" 
            alt="Logo Antara Lampung" 
            className="h-10 w-auto object-contain mt-1" 
        />
        </div>
      </div>

      {/* Menu Navigasi */}
      <div className="flex gap-8 text-sm text-gray-700">
        <a href="#" className="hover:text-[#991B1F] transition-colors">Beranda</a>
        <a href="#" className="hover:text-[#991B1F] transition-colors">Data Barang</a>
        <a href="#" className="hover:text-[#991B1F] transition-colors">Peminjaman</a>
        <a href="#" className="hover:text-[#991B1F] transition-colors">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
