import React, { useEffect, useState } from "react";
import { FaDownload, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Tambahkan untuk navigasi
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ItemData = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await api.get("/items");

        // SESUAIKAN DENGAN LOGIKA LOANFORM
        const mappedData = res.data.data.map((item) => ({
          id: item.id,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg", // Fallback sama dengan LoanForm
          nama: item.name,
          kategori: item.kategori_id?.[1] ?? "-",
          stock: item.stock ?? 0, // Ambil nilai stok asli
          status: (item.stock ?? 0) > 0 ? "Tersedia" : "Tidak Tersedia", // Logika ketersediaan
          kode: item.kode,
        }));

        setInventoryData(mappedData);
      } catch (error) {
        console.error("Gagal fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const limit = 3;
  const displayedItems = isExpanded 
    ? inventoryData 
    : inventoryData.slice(0, limit);

  const exportPDF = () => {
    if (!inventoryData || inventoryData.length === 0) {
      alert("Data tidak ditemukan.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("DAFTAR INVENTARIS BARANG", 14, 15);

      const tableColumn = ["No", "Kode", "Nama Barang", "Kategori", "Stok", "Status"];
      const tableRows = inventoryData.map((item, index) => [
        index + 1,
        item.kode,
        item.nama,
        item.kategori,
        `${item.stock} Unit`,
        item.status,
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: "grid",
        headStyles: { fillColor: [153, 27, 31] },
      });

      doc.save(`Laporan_Inventaris_${Date.now()}.pdf`);
    } catch (error) {
      alert("Gagal membuat PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10 grow">
        <section className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Data Barang</h1>
          <p className="text-gray-500 text-xs md:text-sm max-w-2xl">
            Daftar lengkap inventaris kantor berdasarkan stok terbaru yang tersedia.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
          <button
            onClick={exportPDF}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded-md text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-all w-full sm:w-auto"
          >
            <FaDownload className="text-xs" /> Eksport PDF
          </button>
          {/* Navigasi langsung ke halaman Loan */}
          <button 
            onClick={() => navigate("/loan")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#991B1F] text-white rounded-md text-[11px] font-bold hover:bg-[#7f1619] transition-all shadow-sm w-full sm:w-auto"
          >
            <FaPlus className="text-xs" /> Pinjam Barang
          </button>
        </div>

        <div className="border border-black rounded-xl overflow-hidden shadow-sm mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-black text-[13px] font-bold text-gray-700 bg-white">
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6">Nama Barang</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Stok Tersedia</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-600 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-gray-400">Memuat data...</td>
                  </tr>
                ) : (
                  displayedItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={item.asset}
                            alt="asset"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div className="flex flex-col">
                          <span>{item.nama}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{item.kode}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{item.kategori}</td>
                      <td className="py-4 px-6 font-normal">{item.stock} Unit</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold text-white shadow-sm inline-block whitespace-nowrap ${
                          item.status === "Tersedia" ? "bg-green-500" : "bg-red-500"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => navigate(`/loan/form/${item.id}`)}
                          className="p-2 text-gray-600 hover:text-[#991B1F] transition-colors"
                        >
                          <FaEye className="text-base" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!loading && inventoryData.length > limit && (
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#991B1F] text-xs font-bold hover:underline transition-all"
            >
              {isExpanded ? "Tampilkan Sedikit" : `Lihat Semua (${inventoryData.length} Barang)`}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ItemData;
