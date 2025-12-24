import React from "react";
import { FaSearch, FaDownload, FaPlus, FaEye } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ItemData = () => {
  const inventoryData = [
    {
      id: 1,
      asset: "/img/camera-canon-1300d.jpeg",
      nama: "Laptop Lenovo IP100-OGID",
      kategori: "Fotografi dan Video",
      jumlah: "3 Unit",
      status: "Tersedia",
    },
    {
      id: 2,
      asset: "/img/camera-canon-1300d.jpeg",
      nama: "Kamera Canon D1200 + Tripod",
      kategori: "Komputer dan Laptop",
      jumlah: "1 Unit",
      status: "Tersedia",
    },
    {
      id: 3,
      asset: "/img/camera-canon-1300d.jpeg",
      nama: "Laptop Lenovo IP100-OGID",
      kategori: "Furniture",
      jumlah: "2 Unit",
      status: "Dipinjam",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      {/* Padding horizontal disesuaikan (px-4 di mobile, px-12 di desktop) */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10 flex-grow">
        
        {/* Header Section */}
        <section className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Data Barang</h1>
          <p className="text-gray-500 text-xs md:text-sm max-w-2xl">
            Daftar lengkap inventaris kantor, cek ketersediaan, dan ajukan peminjaman barang kantor.
          </p>
        </section>

        {/* Action Buttons: Stack vertikal di mobile, horizontal di desktop */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded-md text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-all w-full sm:w-auto">
            <FaDownload className="text-xs" /> Eksport PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#991B1F] text-white rounded-md text-[11px] font-bold hover:bg-[#7f1619] transition-all shadow-sm w-full sm:w-auto">
            <FaPlus className="text-xs" /> Pinjam Barang
          </button>
        </div>

        {/* Filter & Search Bar: Responsif Stack */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Cari nama barang..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#991B1F] outline-none"
            />
          </div>
          
          <div className="flex w-full lg:w-auto gap-2">
            <select className="flex-1 lg:flex-none px-4 py-2.5 border border-gray-300 rounded-lg text-[11px] md:text-xs text-gray-600 focus:ring-2 focus:ring-[#991B1F] outline-none bg-white">
              <option>Kategori</option>
              <option>Elektronik</option>
              <option>Furniture</option>
            </select>

            <select className="flex-1 lg:flex-none px-4 py-2.5 border border-gray-300 rounded-lg text-[11px] md:text-xs text-gray-600 focus:ring-2 focus:ring-[#991B1F] outline-none bg-white">
              <option>Terbaru</option>
              <option>Terlama</option>
            </select>
          </div>
        </div>

        {/* Inventory Table Wrapper: overflow-x-auto adalah kunci responsivitas tabel */}
        <div className="border border-black rounded-xl overflow-hidden shadow-sm mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-black text-[13px] font-bold text-gray-700 bg-white">
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6">Nama Barang</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Jumlah</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-600 bg-white">
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={item.asset} alt="asset" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">{item.nama}</td>
                    <td className="py-4 px-6">{item.kategori}</td>
                    <td className="py-4 px-6">{item.jumlah}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold text-white shadow-sm inline-block whitespace-nowrap ${
                        item.status === "Tersedia" ? "bg-green-500" : "bg-orange-400"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-2 text-gray-600 hover:text-[#991B1F] transition-colors">
                        <FaEye className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lihat Semua Link */}
        <div className="flex justify-end mb-6">
          <button className="text-[#991B1F] text-xs font-bold hover:underline">
            Lihat Semua
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemData;
