import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Loan = () => {
  const navigate = useNavigate();

  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");

        const mappedData = res.data.data.map((item) => ({
          id: item.id,
          kode: item.kode,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          nama: item.name,
          kategoriId: item.category_id, // 🔥 PENTING
          stock: item.stock ?? 0,
          status: item.stock > 0 ? "Tersedia" : "Tidak Tersedia",
        }));

        setInventoryData(mappedData);
      } catch (error) {
        console.error("Gagal fetch items:", error);
      }
    };

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

  /* ================= FILTER LOGIC ================= */
  const filteredInventory = inventoryData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" ||
      Number(item.kategoriId) === Number(selectedCategory);

    return matchSearch && matchCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Peminjaman Aset
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Hallo, ajukan dan kelola peminjaman barang kantor disini.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Filter */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari aset..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#991B1F] outline-none"
                />
              </div>

              {/* Category */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Grid Aset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInventory.length === 0 && (
                <p className="col-span-full text-center text-sm text-gray-400">
                  Aset tidak ditemukan
                </p>
              )}

              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="h-44 bg-gray-200 overflow-hidden">
                    <img
                      src={item.asset}
                      alt="asset"
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        {item.kode}
                      </span>
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-bold ${
                          item.status === "Tersedia"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 mb-4">
                      {item.nama}
                    </h3>

                    <button
                      onClick={() => navigate(`/loan/form/${item.id}`)}
                      className="w-full py-2.5 bg-[#991B1F] text-white rounded-xl text-sm font-bold hover:bg-red-800 transition"
                    >
                      + Pinjam Barang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="w-full lg:w-[320px] order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="font-bold text-gray-900 mb-4">
                Status Peminjaman
              </h2>
              <p className="text-sm text-gray-400 italic">
                Data contoh (dummy)
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loan;
