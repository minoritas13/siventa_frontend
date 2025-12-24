import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, Camera, Lock, LogOut, Save } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Perubahan: px-4 untuk mobile, px-12 untuk desktop */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        
        {/* Header Section: flex-col di mobile, flex-row di desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Akun</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola informasi pribadi dan keamanan akun anda.</p>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition">
            <LogOut size={16} /> Keluar
          </button>
        </div>

        {/* Grid System: grid-cols-1 di mobile, grid-cols-12 di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kolom Kiri: Ringkasan Profile & Kontak */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card Utama Profile */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                <img 
                  src="/foto-andi.png" 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-gray-50"
                />
                <button className="absolute bottom-1 right-1 bg-red-600 text-white p-2 rounded-full border-2 border-white hover:bg-red-700 transition">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Andi Budi Waseso</h2>
              <p className="text-xs text-gray-400 mt-1">Staff Redaksi - Departemen Redaksi</p>
              <div className="mt-6">
                <span className="bg-blue-600 text-white text-[10px] md:text-[11px] px-6 py-2 rounded-md font-medium inline-block">
                  Status : Aktif
                </span>
              </div>
            </div>

            {/* Card Kontak Cepat */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">Kontak Cepat</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-2.5 rounded-full text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Email Kantor</p>
                    <p className="text-sm text-gray-700 font-medium truncate">budi@antara.co.id</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-2.5 rounded-full text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Nomor Telepon</p>
                    <p className="text-sm text-gray-700 font-medium">+62 852 7235 2530</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail Informasi & Keamanan */}
          <div className="lg:col-span-8 space-y-8">
            {/* Form Informasi Pribadi */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Informasi Pribadi</h3>
                <button className="text-red-600 text-xs font-semibold hover:underline tracking-tight">Edit Data</button>
              </div>
              
              {/* grid-cols-1 di mobile, grid-cols-2 di tablet/desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Nama Lengkap</label>
                  <input type="text" value="Andi Budi Waseso" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-default" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">NIK</label>
                  <input type="text" value="180827543234550" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-default" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Unit Kerja/Divisi</label>
                  <input type="text" value="Departemen Redaksi" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-default" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Jabatan</label>
                  <input type="text" value="Staff Redaksi" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-default" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Alamat Kantor</label>
                  <textarea readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-default resize-none" rows="2">
                    Jl. Abdi Negara No.2, Gulak Galik, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35214
                  </textarea>
                </div>
              </div>
            </div>

            {/* Form Keamanan Akun */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-2.5 rounded-full text-white shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Keamanan Akun</h3>
                  <p className="text-[10px] text-gray-400 font-medium">Ubah password anda secara berkala untuk keamanan.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Password Saat Ini</label>
                  <input type="password" placeholder="Masukkan password saat ini" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-1 focus:ring-red-600 outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-gray-400 uppercase">Password Baru</label>
                    <input type="password" placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-1 focus:ring-red-600 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-gray-400 uppercase">Konfirmasi Password Baru</label>
                    <input type="password" placeholder="Ulangi password baru" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-1 focus:ring-red-600 outline-none" />
                  </div>
                </div>
                <button className="w-full md:w-auto bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-md">
                  <div className="bg-white/20 p-1 rounded">
                    <Save size={14} />
                  </div>
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
