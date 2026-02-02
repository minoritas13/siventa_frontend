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
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          nama: item.name,
          kategori: item.category?.name || item.category_id?.name || "-",
          stock: item.stock ?? 0,
          status: (item.stock ?? 0) > 0 ? "Tersedia" : "Tidak Tersedia",
          kode: item.code,
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
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#C4161C] rounded-md text-[11px] font-bold text-[#C4161C] hover:bg-gray-50 transition-all w-full sm:w-auto"
          >
            <FaDownload className="text-xs" /> Eksport PDF
          </button>
          {/* Navigasi langsung ke halaman Loan */}
          <button 
            onClick={() => navigate("/loan")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#C4161C] text-white rounded-md text-[11px] font-bold hover:bg-[#AA1419] transition-all shadow-sm w-full sm:w-auto"
          >
            <FaPlus className="text-xs" /> Pinjam Barang
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                {/* Header mengikuti style Home/Admin: bg-gray-50 & uppercase */}
                <tr className="bg-gray-50 text-[10px] md:text-[11px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="py-4 px-6">Kode Barang</th>
                  <th className="py-4 px-6">Nama Barang</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6 text-center">Jumlah</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-gray-400 text-sm">
                      Memuat data inventaris...
                    </td>
                  </tr>
                ) : (
                  displayedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-[12px] uppercase">
                          {item.kode}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[12px] uppercase">
                          {item.nama}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[12px] uppercase">{item.kategori}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="px-6 py-4 text-[12px]">{item.stock} Unit</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {/* Status Badge dalam bentuk Kapsul (Rounded Full) */}
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-medium text-white shadow-sm inline-block whitespace-nowrap ${
                          item.status === "Tersedia" ? "bg-[#53EC53]" : "bg-red-500"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => navigate(`/loan/form/${item.id}`)}
                          className="p-2.5 bg-gray-50 rounded-lg text-gray-400 hover:text-[#AA1419] hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                          title="Lihat Detail"
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
              className="text-[#C4161C] text-xs font-bold hover:underline transition-all"
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
