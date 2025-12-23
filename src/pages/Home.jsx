import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  // Data dummy untuk tabel
  const dataPinjaman = [
    { nama: "Laptop Lenovo IP100-OGID", jumlah: 3, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Aktif" },
    { nama: "Kamera Canon D1200 + Tripod", jumlah: 1, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Aktif" },
    { nama: "Laptop Lenovo IP100-OGID", jumlah: 2, masuk: "18 Desember 2025", tenggat: "20 Desember 2025", status: "Segera" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-12 py-10">
        {/* Header Welcome */}
        <section className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800">Selamat Siang Andi!</h1>
          <p className="text-gray-500 text-sm">Temukan barang dan ringkasan status inventaris anda</p>
        </section>

        {/* Stats Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
          <StatCard title="Jumlah Barang" value="33" subValue="Tersedia" />
          <StatCard title="Status Pinjaman" value="2" subValue="Diajukan" />
          <StatCard title="Notifikasi" value="1" subValue="Masuk" />
          <StatCard title="Riwayat" value="2" subValue="Masuk" />
        </section>

        {/* Tabel Daftar Barang Pinjaman */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-gray-800">Daftar Barang Pinjaman</h2>
            <button className="text-[#991B1F] text-xs font-bold hover:underline">Lihat Semua</button>
          </div>

          <div className="border border-black rounded-l overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black text-sm font-bold text-gray-700">
                  <th className="py-4 px-6">Nama Barang</th>
                  <th className="py-4 px-6 text-center">Jumlah</th>
                  <th className="py-4 px-6 text-center">Tanggal Masuk</th>
                  <th className="py-4 px-6 text-center">Tenggat</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {dataPinjaman.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-medium text-gray-800">{item.nama}</td>
                    <td className="py-5 px-6 text-center">{item.jumlah}</td>
                    <td className="py-5 px-6 text-center">{item.masuk}</td>
                    <td className="py-5 px-6 text-center">{item.tenggat}</td>
                    <td className="py-5 px-6 text-center">
                      <span className={`px-4 py-1 rounded-md text-[10px] font-bold text-white shadow-sm ${
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Sub-komponen untuk Card Statistik agar kode lebih bersih
const StatCard = ({ title, value, subValue }) => (
  <div className="bg-[#991B1F] text-white p-5 rounded-lg relative overflow-hidden shadow-md group cursor-pointer active:scale-95 transition-all">
    <p className="text-[10px] text-center font-medium mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-center mb-1">{value}</h3>
    <p className="text-[10px] text-center opacity-90">{subValue}</p>
    <span className="absolute bottom-2 right-3 text-[8px] font-bold opacity-70 group-hover:opacity-100">Lihat</span>
  </div>
);

export default Home;
