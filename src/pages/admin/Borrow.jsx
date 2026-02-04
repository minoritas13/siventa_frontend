import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Download,
  Clock,
  AlertCircle,
  Check,
  X,
  Eye,
  Filter,
  History,
  ClipboardPlus,
} from "lucide-react";
import api from "../../services/api";

const Borrow = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("pengajuan");
  const [loans, setLoan] = useState([]);

  // --- FETCH DATA DARI API ---
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/allLoans");

        // Mapping data agar sesuai dengan kebutuhan tampilan tabel
        const mappedLoans = res.data.data.map((loan) => ({
          id: loan.id,
          staff: loan.user?.name ?? "-",
          divisi: "-", // Divisi bisa disesuaikan jika field tersedia di API
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

  // --- LOGIKA FILTER TAB ---
  const filteredLoans = React.useMemo(() => {
    if (activeTab === "pengajuan") {
      return loans.filter((item) => item.status === "menunggu");
    }
    if (activeTab === "riwayat") {
      return loans.filter((item) => item.status !== "menunggu");
    }
    return loans;
  }, [activeTab, loans]);

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
  const countPending = loans.filter(l => l.status === "menunggu").length;
  const countHistory = loans.filter(l => l.status !== "menunggu").length;

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
              Kelola seluruh pengajuan, pemantauan status, dan riwayat peminjaman barang inventaris kantor.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#C4161C] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-sm hover:bg-[#AA1419] transition-colors">
            <Download size={16} />
            Ekspor CSV
          </button>
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
            <p className="text-xs font-medium opacity-90">Menunggu Persetujuan</p>
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
              onClick={() => setActiveTab("pengajuan")}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "pengajuan" ? "border-[#C4161C] text-gray-800" : "border-transparent text-gray-400"
              }`}
            >
              <ClipboardPlus size={18} /> Pengajuan Peminjaman{" "}
              <span className="bg-red-100 text-[#C4161C] text-[10px] px-1.5 py-0.5 rounded-full">
                {countPending}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("riwayat")}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "riwayat" ? "border-[#C4161C] text-gray-800" : "border-transparent text-gray-400"
              }`}
            >
              <History size={18} /> Riwayat Peminjaman{" "}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === "riwayat" ? "bg-red-100 text-[#C4161C]" : "bg-gray-100 text-gray-400"
                }`}
              >
                {countHistory}
              </span>
            </button>
          </div>

          {/* Bar Pencarian & Filter */}
          <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Cari nama staf atau barang..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none font-normal"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="flex-1 md:w-40 p-2 bg-white border border-gray-100 rounded-lg text-sm text-gray-500 focus:outline-none font-medium">
                <option>Semua Divisi</option>
              </select>
              <button className="p-2 border border-gray-100 rounded-lg text-gray-400">
                <Filter size={18} />
              </button>
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
                {filteredLoans.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                          <p className="text-xs font-medium text-gray-800 leading-tight">{item.staff}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{item.divisi}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-700">{item.barang}</p>
                    </td>

                    {activeTab === "pengajuan" ? (
                      <>
                        <td className="px-6 py-4">
                          <p className="text-[11px] text-gray-600 font-medium">{item.pinjam}</p>
                          <p className="text-[10px] text-red-500 font-medium">s/d {item.kembali}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded font-medium">
                            {item.note}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-[11px] text-gray-600 font-medium">{item.pinjam}</td>
                        <td className="px-6 py-4 text-[11px] text-gray-600 font-medium">{item.kembali}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                            item.status === "dikembalikan" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {activeTab === "pengajuan" ? (
                          <>
                            <button className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                              <X size={18} />
                            </button>
                            <button
                              className="bg-blue-600 text-white flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium hover:bg-blue-700 transition-all"
                              onClick={() => handleUpdateStatus(item.id, "dipinjam")}
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Tabel / Navigasi Halaman */}
          <div className="p-5 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-500 font-medium">
            <p>Menampilkan {filteredLoans.length} data</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Sebelumnya
              </button>
              <button className="px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Borrow;
