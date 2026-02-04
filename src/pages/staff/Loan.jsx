import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Calendar } from "lucide-react"; 
import { MdAssignmentReturn } from "react-icons/md";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

const Loan = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [loadingLoan, setLoadingLoan] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("terbaru");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Mengambil semua data yang dibutuhkan (Barang, Kategori, dan Riwayat Pinjam)
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

        // Mapping Data Inventaris
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

        // Mapping Data Pinjaman untuk Sidebar Status
        const mappedLoans = (loansRes?.data?.data || []).map((loan) => ({
          id: loan.id,
          status: loan.status, 
          loan_items: loan.loan_items ?? [],
          updated_at: loan.updated_at,
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

  // Filter 3 Peminjaman Terbaru untuk ditampilkan di sidebar kanan
  const latestLoans = [...dataPinjaman]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 3);

  // Logika Pencarian, Filter Kategori, dan Pengurutan Barang
  const filteredInventory = inventoryData
    .filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                          item.kode.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "all" || String(item.kategoriId) === String(selectedCategory);
      return matchSearch && matchCategory;
    })
    .sort((a, b) => sortBy === "terbaru" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

  // Fungsi untuk mengajukan pengembalian barang
  const handleReturn = async (loanId) => {
    const confirmReturn = window.confirm("Apakah Anda yakin ingin mengajukan pengembalian?");
    if (!confirmReturn) return;

    try {
      await api.put(`/loan/update/${loanId}`, { status: "dikembalikan" });
      alert("Pengembalian berhasil diajukan!");
      window.location.reload(); 
    } catch (error) {
      alert("Terjadi kesalahan saat memproses pengembalian.");
    }
  };

  // Helper untuk label dropdown kategori
  const getCategoryLabel = () => {
    if (selectedCategory === "all") return "SEMUA KATEGORI";
    const cat = categories.find(c => String(c.id) === String(selectedCategory));
    return cat ? cat.category.toUpperCase() : "SEMUA KATEGORI";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800" onClick={() => setOpenDropdown(null)}>
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-8 md:py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-800">Peminjaman Aset</h1>
          <p className="text-sm text-gray-500 mt-1 font-normal">Kelola dan ajukan peminjaman inventaris SIVENTA.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- BAGIAN KIRI: DAFTAR INVENTARIS --- */}
          <div className="flex-1">
            {/* Toolbar: Search, Filter & Sort */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3 mb-8 shadow-sm flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari aset atau kode..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-[#C4161C]/10 outline-none transition-all font-normal"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto relative font-medium">
                {/* Dropdown Kategori */}
                <div className="relative flex-1 sm:flex-none w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border-none rounded-xl text-[11px] font-medium text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <span className="truncate">{getCategoryLabel()}</span>
                    <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${openDropdown === 'category' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'category' && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                      <div 
                        onClick={() => { setSelectedCategory("all"); setOpenDropdown(null); }}
                        className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 ${selectedCategory === "all" ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                      >
                        SEMUA KATEGORI
                      </div>
                      {categories.map((cat) => (
                        <div 
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setOpenDropdown(null); }}
                          className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 border-t border-gray-50 ${String(selectedCategory) === String(cat.id) ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                        >
                          {cat.category.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropdown Sort */}
                <div className="relative flex-1 sm:flex-none w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border-none rounded-xl text-[11px] font-medium text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <span>{sortBy.toUpperCase()}</span>
                    <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'sort' && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                      <div 
                        onClick={() => { setSortBy("terbaru"); setOpenDropdown(null); }}
                        className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 ${sortBy === "terbaru" ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                      >
                        TERBARU
                      </div>
                      <div 
                        onClick={() => { setSortBy("terlama"); setOpenDropdown(null); }}
                        className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 border-t border-gray-50 ${sortBy === "terlama" ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                      >
                        TERLAMA
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Grid Kartu Aset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInventory.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.asset} alt={item.nama} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-medium text-white shadow-sm ${item.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                        {item.stock > 0 ? `TERSEDIA: ${item.stock}` : "HABIS"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">{item.kategoriNama}</p>
                    <h3 className="font-medium text-gray-800 text-sm mb-1 uppercase leading-tight h-10 line-clamp-2">{item.nama}</h3>
                    <p className="text-[10px] font-mono text-gray-400 mb-5 font-normal">{item.kode}</p>

                    <button
                      onClick={() => navigate(`/loan/form/${item.id}`)}
                      className="w-full py-3 bg-[#C4161C] text-white rounded-xl text-[11px] font-medium hover:opacity-90 transition-all shadow-sm active:scale-95"
                    >
                      + PINJAM BARANG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- BAGIAN KANAN: SIDEBAR STATUS --- */}
          <aside className="w-full lg:w-[340px]">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="font-medium text-gray-800 text-lg">Status Peminjaman</h2>
                <span className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                  {dataPinjaman.filter(l => l.status === 'dipinjam').length} Aktif
                </span>
              </div>

              <div className="space-y-6">
                {loadingLoan ? (
                  <p className="text-center py-10 text-xs text-gray-400 font-normal">Memuat aktivitas...</p>
                ) : latestLoans.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl text-xs text-gray-400 font-normal">
                    Belum ada riwayat peminjaman aktif.
                  </div>
                ) : (
                  latestLoans.map((loan) => (
                    loan.loan_items.map((li) => {
                      const isWaiting = loan.status === "menunggu" || loan.status === "pending";
                      const isBorrowed = loan.status === "dipinjam";
                      const isReturned = loan.status === "dikembalikan" || loan.status === "selesai";

                      return (
                        <div key={li.id} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden transition-all duration-300">
                          {/* Badge Status */}
                          <div className="px-4 pt-3">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium text-white flex items-center gap-1.5 w-fit ${
                              isBorrowed ? "bg-[#53EC53]" : isWaiting ? "bg-orange-400" : "bg-blue-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full bg-white ${!isReturned ? 'animate-pulse' : ''}`} />
                              {isBorrowed ? "Sedang Dipinjam" : isWaiting ? "Menunggu" : "Selesai"}
                            </span>
                          </div>

                          {/* Info Barang dalam Sidebar */}
                          <div className="p-4 flex gap-3">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-50 shadow-inner">
                              <img 
                                src={li.item?.photo || "/img/camera-canon-1300d.jpeg"} 
                                alt="thumb" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <h3 className="text-xs font-medium text-gray-800 leading-tight mb-1 uppercase truncate font-medium">
                                {li.item?.name}
                              </h3>
                              <p className="text-[9px] font-mono text-gray-400 font-normal">{li.item?.code}</p>
                            </div>
                          </div>

                          {/* Tombol Aksi Pengembalian */}
                          {isBorrowed && (
                            <div className="px-4 pb-4">
                              <button
                                onClick={() => handleReturn(loan.id)}
                                className="w-full py-2.5 bg-[#C4161C] text-white rounded-lg text-[10px] font-medium flex items-center justify-center gap-2 hover:bg-[#AA1419] transition-all shadow-sm active:scale-95"
                              >
                                <MdAssignmentReturn size={14} />
                                Ajukan Pengembalian
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ))
                )}

                {/* Tautan Riwayat Lengkap */}
                <div className="pt-6 border-t border-gray-50 text-center">
                   <button 
                    onClick={() => navigate("/loan-data")}
                    className="text-[11px] font-medium text-red-700 hover:text-red-900 transition-colors underline decoration-dotted font-medium"
                   >
                    Lihat Riwayat Lengkap
                   </button>
                </div>
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
