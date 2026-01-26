import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Search, Filter, Calendar } from "lucide-react"; // Tambahan ikon untuk estetika
import { MdAssignmentReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Loan = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [loadingLoan, setLoadingLoan] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("terbaru");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      try {
        setLoadingLoan(true);
        const [itemsRes, categoriesRes, loansRes] = await Promise.all([
          api.get("/items"),
          api.get("/categories"),
          api.get("/loans"),
        ]);

        if (!isMounted) return;

        const mappedItems = (itemsRes?.data?.data || []).map((item) => ({
          id: item.id,
          kode: item.code,
          nama: item.name,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          kategoriNama: item.category?.name ?? "Tanpa Kategori",
          kategoriId: item.category?.id ?? item.category_id,
          stock: item.stock ?? 0,
          createdAt: item.created_at,
        }));

        const mappedLoans = (loansRes?.data?.data || [])
          .filter((loan) => loan.status !== "dikembalikan")
          .map((loan) => ({
            id: loan.id,
            loan_items: loan.loan_items ?? [],
            return_date: loan.return_date,
          }));

        setInventoryData(mappedItems);
        setCategories(categoriesRes?.data?.data ?? []);
        setDataPinjaman(mappedLoans);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        if (isMounted) setLoadingLoan(false);
      }
    };
    fetchAll();
    return () => { isMounted = false; };
  }, []);

  /* ================= FILTER & SORT ================= */
  const filteredInventory = inventoryData
    .filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                          item.kode.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "all" || String(item.kategoriId) === String(selectedCategory);
      return matchSearch && matchCategory;
    })
    .sort((a, b) => sortBy === "terbaru" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

  const handleReturn = async (loanId) => {
    try {
      await api.put(`/loan/update/${loanId}`);
      setDataPinjaman((prev) => prev.filter((l) => l.id !== loanId));
    } catch (error) { console.error("Gagal mengembalikan:", error); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-8 md:py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Peminjaman Aset</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola dan ajukan peminjaman inventaris SIVENTA.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            {/* SEARCH & FILTER BAR - Style Desain Tabel */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3 mb-8 shadow-sm flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari aset atau kode..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-[#991B1F]/20 outline-none transition-all"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-50 border-none rounded-xl text-[11px] font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <option value="all">SEMUA KATEGORI</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.category.toUpperCase()}</option>)}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-50 border-none rounded-xl text-[11px] font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <option value="terbaru">TERBARU</option>
                  <option value="terlama">TERLAMA</option>
                </select>
              </div>
            </div>

            {/* ASSET GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInventory.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.asset} alt={item.nama} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold text-white shadow-sm ${item.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                        {item.stock > 0 ? `TERSEDIA: ${item.stock}` : "HABIS"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.kategoriNama}</p>
                    <h3 className="font-bold text-gray-800 text-sm mb-1 uppercase leading-tight h-10 line-clamp-2">{item.nama}</h3>
                    <p className="text-[10px] font-mono text-gray-400 mb-5">{item.kode}</p>

                    <button
                      onClick={() => navigate(`/loan/form/${item.id}`)}
                      className="w-full py-3 bg-[#C4161C] text-white rounded-xl text-[11px] font-bold hover:opacity-90 transition-all shadow-sm active:scale-95"
                    >
                      + PINJAM BARANG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR STATUS - Style Card Login/Home */}
          <aside className="w-full lg:w-[340px]">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Calendar size={18} className="text-[#C4161C]" />
                <h2 className="font-bold text-gray-800">Status Pinjaman</h2>
                <span className="ml-auto bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-full font-bold">
                  {dataPinjaman.length}
                </span>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {loadingLoan ? (
                  <p className="text-center py-10 text-xs text-gray-400 italic">Memuat aktivitas...</p>
                ) : dataPinjaman.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                    <p className="text-xs text-gray-400">Belum ada pinjaman aktif</p>
                  </div>
                ) : (
                  dataPinjaman.map((loan) => (
                    loan.loan_items.map((li) => (
                      <div key={li.id} className="group bg-gray-50 rounded-2xl p-4 border border-transparent hover:border-red-100 transition-all">
                        <p className="text-[10px] font-mono text-gray-400 uppercase mb-1">{li.item?.code}</p>
                        <p className="text-xs font-bold text-gray-800 mb-3 uppercase line-clamp-1">{li.item?.name}</p>
                        
                        <button
                          onClick={() => handleReturn(loan.id)}
                          className="w-full py-2.5 text-[10px] font-bold bg-white text-[#C4161C] border border-red-100 rounded-xl flex items-center justify-center gap-2 hover:bg-[#AA1419] hover:text-white transition-all shadow-sm"
                        >
                          <MdAssignmentReturn size={14} />
                          KEMBALIKAN
                        </button>
                      </div>
                    ))
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loan;
