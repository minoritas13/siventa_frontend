import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const dataPinjaman = [
    { nama: "Laptop Lenovo IP100-OGID", jumlah: 3, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Aktif" },
    { nama: "Kamera Canon D1200 + Tripod", jumlah: 1, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Aktif" },
    { nama: "Laptop Lenovo IP100-OGID", jumlah: 2, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Segera" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      {/* Kontainer Utama: px disesuaikan untuk mobile (4) dan desktop (12) */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10 flex-grow">
        
        {/* Header Welcome */}
        <section className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Selamat Siang Andi!</h1>
          <p className="text-gray-500 text-xs md:text-sm">Temukan barang dan ringkasan status inventaris anda</p>
        </section>

        {/* Stats Cards Section: 
            grid-cols-2 (HP), md:grid-cols-4 (Desktop) 
        */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          <StatCard title="Jumlah Barang" value="33" subValue="Tersedia" />
          <StatCard title="Status Pinjaman" value="2" subValue="Diajukan" />
          <StatCard title="Notifikasi" value="1" subValue="Masuk" />
          <StatCard title="Riwayat" value="2" subValue="Masuk" />
        </section>

        {/* Tabel Daftar Barang Pinjaman */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Daftar Barang Pinjaman</h2>
          </div>

          {/* Wrapper Tabel untuk Horizontal Scroll di Mobile */}
          <div className="border border-black rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-black text-xs md:text-sm font-bold text-gray-700 bg-white">
                    <th className="py-4 px-4 md:px-6">Nama Barang</th>
                    <th className="py-4 px-4 text-center">Jumlah</th>
                    <th className="py-4 px-4 text-center whitespace-nowrap">Tanggal Masuk</th>
                    <th className="py-4 px-4 text-center">Tenggat</th>
                    <th className="py-4 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm text-gray-600">
                  {dataPinjaman.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none">
                      <td className="py-4 md:py-5 px-4 md:px-6 font-medium text-gray-800">{item.nama}</td>
                      <td className="py-4 md:py-5 px-4 text-center">{item.jumlah}</td>
                      <td className="py-4 md:py-5 px-4 text-center">{item.masuk}</td>
                      <td className="py-4 md:py-5 px-4 text-center">{item.tenggat}</td>
                      <td className="py-4 md:py-5 px-4 text-center">
                        <span className={`px-3 md:px-4 py-1 rounded-md text-[9px] md:text-[10px] font-bold text-white shadow-sm inline-block whitespace-nowrap ${
                          item.status === "Aktif" ? "bg-green-500" : "bg-orange-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lihat Semua Link */}
          <div className="flex justify-end mb-6">
            <button className="text-[#991B1F] text-xs font-bold hover:underline transition-all">
              Lihat Semua
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Sub-komponen StatCard yang responsif
const StatCard = ({ title, value, subValue }) => (
  <div className="bg-[#991B1F] text-white p-4 md:p-5 rounded-lg relative overflow-hidden shadow-md group cursor-pointer active:scale-95 transition-all">
    <p className="text-[9px] md:text-[10px] text-center font-medium mb-1 uppercase tracking-wider">{title}</p>
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-1">{value}</h3>
    <p className="text-[9px] md:text-[10px] text-center opacity-80">{subValue}</p>
    {/* Label "Lihat" disembunyikan di HP agar tidak berantakan, muncul di Desktop */}
    <span className="hidden md:block absolute bottom-2 right-3 text-[8px] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
      Lihat
    </span>
  </div>
);

export default Home;
