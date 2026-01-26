import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

const Home = () => {
  // =============================
  // STATE
  // =============================
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState(null);

  // =============================
  // FETCH DATA
  // =============================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [loanRes, itemRes, userRes] = await Promise.all([
          api.get("/loans"),
          api.get("/items"),
          api.get("/me"),
        ]);

        const mappedLoans = loanRes.data.data.map((loan) => ({
          kode: loan.loan_items.map((li) => li.item?.code || "-").join(", "),
          nama: loan.loan_items.map((li) => li.item?.name).join(", "),
          masuk: loan.loan_date,
          tenggat: loan.return_date ?? "-",
          keperluan: loan.purpose || "-",
          status: loan.status === "dikembalikan" ? "Selesai" : "Aktif",
        }));

        setUser(userRes.data.data.name);
        setDataPinjaman(mappedLoans);
        setTotalItems(itemRes.data.data.length);
      } catch (error) {
        console.error("Gagal memuat data home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =============================
  // DERIVED DATA
  // =============================
  const pinjamanAktif = dataPinjaman.filter(
    (item) => item.status !== "dikembalikan"
  );

  const displayedData = showAll ? dataPinjaman : dataPinjaman.slice(0, 3);
  // =============================
  // RENDER
  // =============================
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        {/* Header Welcome */}
        <section className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Selamat Siang, {user}!
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Temukan barang dan ringkasan status inventaris anda
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          <StatCard
            title="Jumlah Barang"
            value={totalItems}
            subValue="Tersedia"
          />
          <StatCard
            title="Status Pinjaman"
            value={pinjamanAktif.length}
            subValue="Aktif"
          />
          <StatCard title="Notifikasi" value="1" subValue="Masuk" />
          <StatCard
            title="Riwayat"
            value={dataPinjaman.length}
            subValue="Masuk"
          />
        </section>

        {/* Tabel Daftar Barang Pinjaman */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Daftar Barang Pinjaman</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] md:text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Kode Barang</th>
                  <th className="px-6 py-4">Nama Barang</th>
                  <th className="px-6 py-4 text-center">Tanggal Pinjam</th>
                  <th className="px-6 py-4 text-center">Tanggal Tenggat</th>
                  <th className="px-6 py-4">Keperluan</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {displayedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {/* KODE */}
                    <td className="px-6 py-4 text-[12px] uppercase">
                      {item.kode}
                    </td>
                    {/* NAMA */}
                    <td className="px-6 py-4 text-[12px] uppercase">
                      {item.nama}
                    </td>
                    {/* PINJAM */}
                    <td className="px-6 py-4 text-center text-[12px]">
                      {item.masuk}
                    </td>
                    {/* TENGGAT */}
                    <td className="px-6 py-4 text-center text-[12px]">
                      {item.tenggat}
                    </td>
                    {/* KEPERLUAN */}
                    <td className="px-6 py-4 text-[12px] min-w-[150px]">
                      {item.keperluan}
                    </td>
                    {/* STATUS */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-[10px] px-4 py-1.5 rounded-full shadow-sm font-medium text-white whitespace-nowrap ${
                          item.status === "Aktif" ? "bg-orange-500" : "bg-[#53EC53]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {!loading && dataPinjaman.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400 text-sm">
                      Tidak ada data pinjaman
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Button Lihat Semua dipindah ke bawah section */}
        <div className="flex justify-end mt-4 mb-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-[#C4161C] text-xs font-medium hover:underline transition-all"
          >
            {showAll ? "Tampilkan Sedikit" : "Lihat Semua"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// =============================
// COMPONENT STAT CARD
// =============================
const StatCard = ({ title, value, subValue }) => (
  <div className="bg-[#C4161C] text-white p-4 md:p-5 rounded-lg relative overflow-hidden shadow-md group cursor-pointer active:scale-95 transition-all">
    <p className="text-[9px] md:text-[10px] text-center font-medium mb-1 uppercase tracking-wider">
      {title}
    </p>
    <h3 className="text-2xl md:text-3xl font-bold text-center mb-1">{value}</h3>
    <p className="text-[9px] md:text-[10px] text-center opacity-80">
      {subValue}
    </p>
    <span className="hidden md:block absolute bottom-2 right-3 text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
      Lihat
    </span>
  </div>
);

export default Home;

