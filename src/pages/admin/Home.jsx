import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Package, CheckCircle, Wrench, Bell, Box } from "lucide-react";
import api from "../../services/api";

const Home = () => {
  // =============================
  // STATE
  // =============================
  const [stats, setStats] = useState([
    {
      label: "Total Aset",
      value: "0",
      icon: <Box size={20} />,
      bg: "bg-[#C4161C]",
    },
    {
      label: "Aset Aktif",
      value: "0",
      icon: <CheckCircle size={20} />,
      bg: "bg-[#C4161C]",
    },
    {
      label: "Aset Rusak",
      value: "0",
      icon: <Wrench size={20} />,
      bg: "bg-[#C4161C]",
    },
    {
      label: "Dipinjam",
      value: "0",
      icon: <Package size={20} />,
      bg: "bg-[#C4161C]",
    },
  ]);
  const [pinjaman, setPinjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tes,setTes] = useState([]);

  // =============================
  // FETCH DATA (LOGIKA BACKEND)
  // =============================
  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        setLoading(true);

        // Ambil data items dan loans secara paralel
        const [itemsRes, loansRes] = await Promise.all([
          api.get("/items"),
          api.get("/allLoans"),
        ]);

        const allItems = itemsRes.data.data || [];
        const allLoans = loansRes.data.data || [];

        setTes(allLoans);

        // 1. Hitung Statistik
        const totalAset = allItems.length;
        const asetAktif = allItems.filter(
          (item) => item.condition === "baik"
        ).length;
        const asetRusak = allItems.filter(
          (item) => item.condition === "rusak ringan"
        ).length;
        const totalDipinjam = allLoans.filter(
          (loan) => loan.status === "dipinjam"
        ).length;

        setStats([
          {
            label: "Total Aset",
            value: totalAset.toString(),
            icon: <Box size={20} />,
            bg: "bg-[#C4161C]",
          },
          {
            label: "Aset Aktif",
            value: asetAktif.toString(),
            icon: <CheckCircle size={20} />,
            bg: "bg-[#C4161C]",
          },
          {
            label: "Aset Rusak",
            value: asetRusak.toString(),
            icon: <Wrench size={20} />,
            bg: "bg-[#C4161C]",
          },
          {
            label: "Dipinjam",
            value: totalDipinjam.toString(),
            icon: <Package size={20} />,
            bg: "bg-[#C4161C]",
          },
        ]);

        // 2. Mapping Data Tabel Pinjaman
        const mappedPinjaman = allLoans.map((loan) => {
          // 1. Tentukan warna berdasarkan status string dari backend
          let statusColor = "bg-gray-400";
          if (loan.status === "dipinjam") statusColor = "bg-[#53EC53]"; // Hijau
          if (loan.status === "menunggu") statusColor = "bg-[#FBBF24]"; // Kuning
          if (loan.status === "terlambat") statusColor = "bg-[#FF0000]"; // Merah

          return {
            // 2. Ambil nama staff dari relasi user
            staff: loan.user?.name || "User Tidak Dikenal",

            // 3. Ambil divisi (jika ada di tabel user)
            divisi: loan.user?.division || "Staff Biro",

            kode: loan.loan_items?.map((li) => li.item?.code || "-").join(", "),
            barang: loan.loan_items
              ?.map((li) => li.item?.name || "Aset Terhapus")
              .join(", "),
            pinjam: loan.loan_date,
            kembali: loan.return_date ?? "Belum Kembali",

            // Format status agar huruf kapital di awal (Selesai, Dipinjam, dsb)
            status: loan.status.charAt(0).toUpperCase() + loan.status.slice(1),
            color: statusColor,
            text: "text-white",

            // 4. Gunakan foto user jika ada, jika tidak pakai UI Avatars
            foto: loan.user?.photo_url || null,
          };
        });

        setPinjaman(mappedPinjaman);
    
      } catch (error) {
        console.error("Gagal memuat dashboard admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header Dashboard */}
        <header className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-black">
            Dashboard Admin
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Pantau dan kelola seluruh inventaris SIVENTA.
          </p>
        </header>

        {console.log(tes)}

        {/* Section Ringkasan Aset */}
        <section className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-black mb-6">
            Ringkasan Global
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} text-white rounded-xl p-5 flex items-center gap-4 shadow-sm transition-transform hover:scale-105`}
              >
                <div className="bg-white text-[#991B1F] p-3 rounded-full flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[11px] font-medium opacity-90 uppercase tracking-tight leading-none mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Daftar Pinjaman Seluruh Staff */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-[#C4161C]" />
              <h3 className="font-bold text-gray-800">
                Log Aktivitas Pinjaman
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-225">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Staff Peminjam</th>
                  <th className="px-6 py-4">Kode Barang</th>
                  <th className="px-6 py-4">Nama Barang</th>
                  <th className="px-6 py-4">Tanggal Pinjam</th>
                  <th className="px-6 py-4">Tanggal Kembali</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">
                      Memuat data aktivitas...
                    </td>
                  </tr>
                ) : pinjaman.length > 0 ? (
                  pinjaman.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                            <img
                              src={
                                item.foto ||
                                `https://ui-avatars.com/api/?name=${item.staff}&background=C4161C&color=fff`
                              }
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              {item.staff}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium">
                              {item.divisi}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase">
                        {item.kode}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {item.barang}
                      </td>
                      <td className="px-6 py-4 text-[12px] text-gray-600">
                        {item.pinjam}
                      </td>
                      <td className="px-6 py-4 text-[12px] text-gray-600">
                        {item.kembali}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`${item.color} ${item.text} text-[10px] px-4 py-1.5 rounded-full shadow-sm`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">
                      Belum ada aktivitas pinjaman.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
