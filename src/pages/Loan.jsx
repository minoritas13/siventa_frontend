import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, ChevronDown } from 'lucide-react'; 

const Loan = () => {
  const assets = Array(6).fill({
    category: 'Fotografi dan Video',
    name: 'Kamera Canon D1200 + Tripod',
    status: 'Tersedia 3',
    image: '/img/camera-canon-1300d.jpeg'
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Main Container: px disesuaikan untuk layar kecil */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Peminjaman Aset</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Hallo, Andi ajukan dan kelola peminjaman barang kantor disini.</p>
        </header>

        {/* Layout Wrapper: flex-col untuk mobile, flex-row untuk desktop (lg) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Sisi Kiri: Filter & Grid Aset */}
          <div className="flex-1 order-2 lg:order-1">
            
            {/* Filter & Search Bar: flex-col di mobile */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari aset..."
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#991B1F] outline-none"
                />
              </div>
              
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <select className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white">
                    <option>Semua Kategori</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white">
                    <option>Terbaru</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Aset: 1 kolom di HP, 2 kolom di Tablet, 3 kolom di Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {assets.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-44 bg-gray-200 overflow-hidden">
                    <img src={item.image} alt="asset" className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{item.category}</span>
                      <span className="text-[10px] px-3 py-1 rounded-full bg-green-100 text-green-600 font-bold">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-5 leading-tight">{item.name}</h3>
                    <button className="w-full py-2.5 bg-[#991B1F] text-white rounded-xl text-sm font-bold hover:bg-red-800 transition shadow-lg">
                      + Pinjam Barang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sisi Kanan: Sidebar Status (Pindah ke atas saat mobile: order-1) */}
          <aside className="w-full lg:w-[320px] order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-gray-900">Status Peminjaman</h2>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">2 Aktif</span>
              </div>

              {/* Flex row di tablet/mobile agar hemat tempat, col di desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Menunggu */}
                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex gap-3">
                    <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                      <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] text-orange-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Menunggu
                      </span>
                      <h4 className="text-[11px] font-bold text-gray-800 mt-1">Kamera Canon D1200</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5 italic">Hingga 25 Des 2025</p>
                    </div>
                </div>

                {/* Dipinjam */}
                <div className="p-4 border border-green-100 rounded-xl bg-white shadow-md shadow-green-50/50">
                   <div className="flex gap-3 mb-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                        <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Sedang Dipinjam
                        </span>
                        <h4 className="text-[11px] font-bold text-gray-800 mt-1">Kamera Canon D1200</h4>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg text-center">
                        <p className="text-[8px] text-gray-400 uppercase font-bold">Pinjam</p>
                        <p className="text-[9px] font-bold text-gray-700">23 Des</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded-lg border border-red-100 text-center">
                        <p className="text-[8px] text-red-400 uppercase font-bold">Deadline</p>
                        <p className="text-[9px] font-bold text-red-600">24 Des</p>
                      </div>
                   </div>
                   <button className="w-full py-2 bg-[#991B1F] text-white text-[10px] rounded-lg font-bold uppercase tracking-wide">
                      Kembalikan
                   </button>
                </div>
              </div>

              <button className="w-full text-center text-[11px] font-bold text-gray-400 mt-6 lg:mt-10 hover:text-gray-600 underline underline-offset-4">
                Lihat Riwayat Lengkap
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loan;
