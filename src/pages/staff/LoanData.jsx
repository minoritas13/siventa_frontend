import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

const LoanData = () => {
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook useEffect untuk mengambil seluruh riwayat peminjaman dari API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const res = await api.get("/loans");
        
        // Mapping data dari API untuk menyesuaikan label status yang akan ditampilkan di tabel
        const mappedLoans = res.data.data.map((loan) => {
          let statusLabel = "Menunggu";
          if (loan.status === "dipinjam") statusLabel = "Aktif";
          if (loan.status === "dikembalikan") statusLabel = "Selesai";
          if (loan.status === "ditolak") statusLabel = "Ditolak";

          return {
            kode: loan.loan_items.map((li) => li.item?.code || "-").join(", "),
            nama: loan.loan_items.map((li) => li.item?.name).join(", "),
            masuk: loan.loan_date,
            tenggat: loan.return_date ?? "-",
            keperluan: loan.note || "-", 
            status: statusLabel,
          };
        });

        setDataPinjaman(mappedLoans);
      } catch (error) {
        console.error("Gagal memuat data pinjaman:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    // Kontainer utama dengan flex-col dan min-h-screen untuk layouting yang responsif
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      {/* Bagian Main menggunakan 'grow' untuk memastikan footer tetap di bawah saat data sedikit */}
      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        
        {/* Header Halaman */}
        <section className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-medium text-gray-800">
            Data Peminjaman Barang
          </h1>
          <p className="text-gray-500 text-xs md:text-sm font-normal">
            Temukan ringkasan riwayat dan status peminjaman inventaris anda
          </p>
        </section>

        {/* Tabel Riwayat Peminjaman */}
        <section className="mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] md:text-[11px] uppercase tracking-wider text-gray-400 font-medium border-b border-gray-100">
                    <th className="px-6 py-4">Kode Barang</th>
                    <th className="px-6 py-4">Nama Barang</th>
                    <th className="px-6 py-4 text-center">Tanggal Pinjam</th>
                    <th className="px-6 py-4 text-center">Tanggal Tenggat</th>
                    <th className="px-6 py-4">Keperluan</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-normal">
                  {/* Mapping data riwayat pinjaman ke dalam baris tabel */}
                  {dataPinjaman.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-[12px] uppercase">{item.kode}</td>
                      <td className="px-6 py-4 text-[12px] uppercase">{item.nama}</td>
                      <td className="px-6 py-4 text-center text-[12px]">{item.masuk}</td>
                      <td className="px-6 py-4 text-center text-[12px]">{item.tenggat}</td>
                      <td className="px-6 py-4 text-[12px] min-w-[150px]">{item.keperluan}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] px-4 py-1.5 rounded-full shadow-sm font-medium text-white whitespace-nowrap ${
                          item.status === "Aktif" ? "bg-blue-600" : 
                          item.status === "Menunggu" ? "bg-orange-500" : 
                          item.status === "Ditolak" ? "bg-red-500" : "bg-[#53EC53]"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {/* State jika data kosong */}
                  {!loading && dataPinjaman.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-400 text-sm font-normal">
                        Tidak ada data pinjaman
                      </td>
                    </tr>
                  )}
                  
                  {/* State saat loading data */}
                  {loading && (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-400 text-sm font-normal">
                        Memuat data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LoanData;
