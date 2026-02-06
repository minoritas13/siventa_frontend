import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Download,
  Clock,
  AlertCircle,
  Check,
  X,
  Eye,
  History,
  ClipboardPlus,
} from "lucide-react";
import api from "../../services/api";

const Borrow = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("pengajuan");
  const [loans, setLoan] = useState([]);
  const [search, setSearch] = useState("");

  // --- FETCH DATA DARI API ---
  const fetchItems = async () => {
    try {
      const res = await api.get("/allLoans");

      // Mapping data agar sesuai dengan kebutuhan tampilan tabel
      const mappedLoans = res.data.data.map((loan) => ({
        id: loan.id,
        staff: loan.user?.name ?? "-",
        divisi: "-",
        barang: loan.loan_items
          .map((li) => li.item?.name)
          .filter(Boolean)
          .join(", "),
        pinjam: new Date(loan.loan_date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        kembali: loan.return_date
          ? new Date(loan.return_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "-",
        status: loan.status,
        note: loan.note,
        foto: loan.loan_items[0]?.item?.photo
          ? `/storage/${loan.loan_items[0].item.photo}`
          : "/foto-default.png",
      }));

      setLoan(mappedLoans);
    } catch (error) {
      console.error("Gagal mengambil data aset", error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/allLoans");

        const mappedLoans = res.data.data.map((loan) => ({
          id: loan.id,
          staff: loan.user?.name ?? "-",
          divisi: "-",

          barang: loan.loan_items
            .map((li) => li.item?.name)
            .filter(Boolean)
            .join(", "),

          pinjam: new Date(loan.loan_date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),

          kembali: loan.return_date
            ? new Date(loan.return_date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "-",

          status: loan.status,
          note: loan.note,

          foto: loan.loan_items[0]?.item?.photo
            ? `/storage/${loan.loan_items[0].item.photo}`
            : "/foto-default.png",
        }));

        setLoan(mappedLoans);
      } catch (error) {
        console.error("Gagal mengambil data aset", error);
      }
    };

    fetchItems();
  }, []);

  // --- LOGIKA FILTER TAB & SEARCH ---
  const filteredLoans = useMemo(() => {
    // 1. Filter berdasarkan tab aktif terlebih dahulu
    let baseData = loans;
    if (activeTab === "pengajuan") {
      baseData = loans.filter((item) => item.status === "menunggu");
    } else if (activeTab === "riwayat") {
      baseData = loans.filter((item) => item.status !== "menunggu");
    }

    // 2. Filter berdasarkan kata kunci pencarian (Nama Staf atau Nama Barang)
    return baseData.filter(
      (item) =>
        item.staff.toLowerCase().includes(search.toLowerCase()) ||
        item.barang.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeTab, loans, search]);

  // --- FUNGSI UPDATE STATUS (SETUJU/KEMBALI) ---
  const handleUpdateStatus = async (loanId, status) => {
    const confirmText =
      status === "dipinjam"
        ? "Setujui peminjaman ini?"
        : "Konfirmasi pengembalian barang?";

    if (!window.confirm(confirmText)) return;

    try {
      const payload =
        status === "dikembalikan"
          ? { status, return_date: new Date().toISOString().slice(0, 10) }
          : { status };

      await api.put(`/loan/update/${loanId}`, payload);

      // Update state lokal tanpa reload halaman
      setLoan((prev) =>
        prev.map((loan) => (loan.id === loanId ? { ...loan, status } : loan))
      );
    } catch (error) {
      alert(error.response?.data?.message || "Gagal memperbarui status");
    }
  };

  // --- PERHITUNGAN BADGE STATISTIK ---
  const countPending = loans.filter((l) => l.status === "menunggu").length;
  const countHistory = loans.filter((l) => l.status !== "menunggu").length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header Manajemen */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-medium text-gray-800">
              Manajemen Peminjaman
            </h1>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mt-1">
              Kelola seluruh pengajuan, pemantauan status, dan riwayat
              peminjaman barang inventaris kantor.
            </p>
          </div>
        </div>

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#C4161C] text-white rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
            <div className="bg-green-400 text-[10px] font-medium px-2 py-0.5 rounded absolute top-4 right-4 text-green-900">
              Terbaru
            </div>
            <div className="bg-white/20 p-2 rounded-full mb-3">
              <Clock size={24} />
            </div>
            <p className="text-xs font-medium opacity-90">
              Menunggu Persetujuan
            </p>
            <p className="text-3xl font-medium mt-1">{countPending}</p>
          </div>
          <div className="bg-[#C4161C] text-white rounded-xl p-6 flex flex-col items-center">
            <div className="bg-white/20 p-2 rounded-full mb-3">
              <AlertCircle size={24} />
            </div>
            <p className="text-xs font-medium opacity-90">Total Riwayat</p>
            <p className="text-3xl font-medium mt-1">{countHistory}</p>
          </div>
        </div>

        {/* Kontainer Utama Tabel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Navigasi */}
          <div className="flex border-b border-gray-100 px-4 md:px-6 pt-4 gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => {
                setActiveTab("pengajuan");
                setSearch("");
              }}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "pengajuan"
                  ? "border-[#C4161C] text-gray-800"
                  : "border-transparent text-gray-400"
              }`}
            >
              <ClipboardPlus size={18} /> Pengajuan Peminjaman{" "}
              <span className="bg-red-100 text-[#C4161C] text-[10px] px-1.5 py-0.5 rounded-full">
                {countPending}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("riwayat");
                setSearch("");
              }}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "riwayat"
                  ? "border-[#C4161C] text-gray-800"
                  : "border-transparent text-gray-400"
              }`}
            >
              <History size={18} /> Riwayat Peminjaman{" "}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === "riwayat"
                    ? "bg-red-100 text-[#C4161C]"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {countHistory}
              </span>
            </button>
          </div>

          {/* Bar Pencarian & Filter */}
          <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari nama staf atau barang..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none font-normal"
              />
            </div>
          </div>

          {/* Bagian Tabel Data */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase font-medium text-gray-400 tracking-wider">
                  <th className="px-6 py-4">Peminjam</th>
                  <th className="px-6 py-4">Nama Barang</th>
                  {activeTab === "pengajuan" ? (
                    <>
                      <th className="px-6 py-4">Jadwal Pinjam</th>
                      <th className="px-6 py-4">Keperluan</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">Tanggal Pinjam</th>
                      <th className="px-6 py-4">Tanggal Kembali</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLoans.length > 0
                  ? filteredLoans.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                              <img
                                src={`https://ui-avatars.com/api/?name=${item.staff}&background=C4161C&color=fff`}
                                alt={item.staff}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${item.staff}&background=C4161C&color=fff`;
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-800 leading-tight">
                                {item.staff}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-xs font-medium text-gray-700 uppercase">
                            {item.barang}
                          </p>
                        </td>

                        {activeTab === "pengajuan" ? (
                          <>
                            <td className="px-6 py-4">
                              <p className="text-[11px] text-gray-600 font-medium">
                                {item.pinjam}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded font-medium">
                                {item.note}
                              </span>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 text-[11px] text-gray-600 font-medium">
                              {item.pinjam}
                            </td>
                            <td className="px-6 py-4 text-[11px] text-gray-600 font-medium">
                              {item.kembali}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                                  item.status === "dikembalikan"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-orange-100 text-orange-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </>
                        )}

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {activeTab === "pengajuan" ? (
                              <>
                                <button
                                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "ditolak")
                                  }
                                >
                                  <X size={18} />
                                </button>
                                <button
                                  className="bg-blue-600 text-white flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium hover:bg-blue-700 transition-all"
                                  onClick={() =>
                                    handleUpdateStatus(item.id, "dipinjam")
                                  }
                                >
                                  <Check size={14} /> Setujui
                                </button>
                              </>
                            ) : (
                              <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                                <Eye size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Borrow;
