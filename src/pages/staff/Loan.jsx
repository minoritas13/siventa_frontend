import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import { MdAssignmentReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Pastikan path api benar

const Loan = () => {
  const navigate = useNavigate();

  // State untuk Data
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // State untuk Filter
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 1. Tambahkan state baru untuk sorting
  const [sortBy, setSortBy] = useState("terbaru");

  /* ================= FETCH DATA DARI BACKEND ================= */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        const mappedData = res.data.data.map((item) => ({
          id: item.id,
          kode: item.kode,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          nama: item.name,
          kategoriId: Array.isArray(item.kategori_id) ? item.kategori_id[0] : item.kategori_id,
          kategoriNama: Array.isArray(item.kategori_id) ? item.kategori_id[1] : "Tanpa Kategori",
          stock: item.stock ?? 0,
          status: item.stock > 0 ? `Tersedia ${item.stock}` : "Habis",
          createdAt: item.created_at 
        }));
        setInventoryData(mappedData);
      } catch (error) {
        console.error("Gagal fetch items:", error);
      }
    };

    // TAMBAHKAN FUNGSI INI (Sebelumnya tidak ada di kode Anda)
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Gagal fetch kategori:", error);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  /* ================= LOGIKA FILTER ================= */
  const filteredInventory = inventoryData
    .filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        String(item.kategoriId) === String(selectedCategory);

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
    if (sortBy === "terbaru") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Tanggal besar ke kecil
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt); // Tanggal kecil ke besar
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Peminjaman Aset</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Hallo, ajukan dan kelola peminjaman barang kantor disini.
          </p>
        </header>

        {/* Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Sisi Kiri: Filter & Grid Aset */}
          <div className="flex-1 order-2 lg:order-1">

            {/* Filter & Search Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Masukkan nama barang, kode aset, atau ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#991B1F] outline-none"
                />
              </div>

              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white cursor-pointer min-w-[140px]"
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white cursor-pointer"
                  >
                    <option value="terbaru">Terbaru</option>
                    <option value="terlama">Terlama</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Aset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                    <div className="h-44 bg-gray-200 overflow-hidden">
                      <img
                        src={item.asset}
                        alt={item.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                          {item.kategoriNama}
                        </span>
                        <span className={`text-[10px] px-1 rounded font-bold text-white ${item.stock > 0 ? 'bg-[#53EC53]' : 'bg-red-500'}`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-5 leading-tight h-10 line-clamp-2">
                        {item.nama}
                      </h3>
                      <button 
                        onClick={() => navigate(`/loan/form/${item.id}`)}
                        className="w-full py-1.5 bg-[#991B1F] text-white rounded-xl text-sm font-medium hover:bg-red-800 transition shadow-lg"
                      >
                        + Pinjam Barang
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400 text-sm">
                  Tidak ada aset ditemukan.
                </div>
              )}
            </div>
          </div>

          {/* Sisi Kanan: Sidebar Status (Dummy Tetap) */}
          <aside className="w-full lg:w-[350px] order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-gray-900">Status Peminjaman</h2>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  2 Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Item Menunggu */}
                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="w-fit mb-2">
                    <span className="bg-[#FFBC41] px-2 py-0.5 rounded-full text-[10px] text-white font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Menunggu
                    </span>
                  </div>
                  <div className="flex gap-3 mt-1.5">
                    <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                      <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-[12px] font-medium text-gray-800">Kamera Canon D1200</h3>
                      <p className="text-[9px] text-black mt-0.5">Hingga 25 Desember 2025</p>
                    </div>
                  </div>
                </div>

                {/* Item Dipinjam */}
                <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-md shadow-green-50/50">
                  <div className="w-fit mb-2">
                    <span className="bg-[#53EC53] px-2 py-0.5 rounded-full text-[10px] text-white font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Sedang Dipinjam
                    </span>
                  </div>
                  <div className="flex gap-3 mb-4 mt-1.5">
                    <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                      <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[12px] font-medium text-gray-800">Kamera Canon D1200</h4>
                      <p className="text-[9px] text-black mt-0.5">Hingga 25 Desember 2025</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white p-2 rounded-lg border border-[#C4161C] flex flex-col items-start">
                      <span className="text-[10px] font-medium text-gray-400 uppercase mb-1">Pinjam</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black" />
                        <span className="text-[9px] font-medium text-black">23 Desember 2025</span>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-lg border border-[#C4161C] flex flex-col items-start">
                      <span className="text-[10px] font-medium text-[#C4161C] uppercase mb-1">Deadline</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-black" />
                        <span className="text-[9px] font-medium text-black">24 Desember 2025</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-[#991B1F] text-white text-[10px] rounded-lg font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-red-800 transition">
                    <MdAssignmentReturn size={16} />
                    Ajukan Pengembalian
                  </button>
                </div>
              </div>

              <button className="w-full text-center text-[11px] font-medium text-[#991B1F] mt-6 lg:mt-10 hover:underline">
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
