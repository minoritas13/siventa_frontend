import React, { useEffect, useState } from "react";
import { FaSearch, FaDownload, FaPlus, FaEye } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ItemData = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");

        const mappedData = res.data.data.map((item) => ({
          id: item.id,
          asset: item.photo, // ?? "/img/camera-canon-1300d.jpeg", // fallback
          nama: item.name,
          kategori: item.kategori_id?.[1] ?? "-",
          jumlah: "1 Unit", // statis dulu
          status: item.kondisi === "baik" ? "Tersedia" : "Dipinjam",
        }));

        setInventoryData(mappedData);
      } catch (error) {
        console.error("Gagal fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const exportPDF = () => {
    if (!inventoryData || inventoryData.length === 0) {
      alert("Data tidak ditemukan atau belum dimuat dari server.");
      return;
    }

    try {
      const doc = new jsPDF();

      // 1. Tambahkan Judul atau Header
      doc.setFontSize(16);
      doc.text("DAFTAR INVENTARIS BARANG", 14, 15);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Tanggal Unduh: ${new Date().toLocaleDateString("id-ID")}`,
        14,
        22
      );

      // 2. Siapkan Kolom dan Baris
      const tableColumn = ["No", "Nama Barang", "Kategori", "Jumlah", "Status"];
      const tableRows = inventoryData.map((item, index) => [
        index + 1,
        item.nama || "-",
        item.kategori || "-",
        item.jumlah || "-",
        item.status || "-",
      ]);

      // 3. Eksekusi Pembuatan Tabel
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: "grid",
        headStyles: {
          fillColor: [153, 27, 31],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 10 },
        },
      });

      // 4. Download File
      doc.save(`Laporan_Inventaris_${Date.now()}.pdf`);
    } catch (error) {
      console.error("Kesalahan PDF Detail:", error);
      alert("Gagal membuat PDF. Silakan cek koneksi atau data.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10 flex-grow">
        <section className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Data Barang
          </h1>
          <p className="text-gray-500 text-xs md:text-sm max-w-2xl">
            Daftar lengkap inventaris kantor, cek ketersediaan, dan ajukan
            peminjaman barang kantor.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
          <button
            onClick={exportPDF}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-black rounded-md text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-all w-full sm:w-auto"
          >
            <FaDownload className="text-xs" /> Eksport PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#991B1F] text-white rounded-md text-[11px] font-bold hover:bg-[#7f1619] transition-all shadow-sm w-full sm:w-auto">
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
                  <th className="py-4 px-6">Jumlah</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-600 bg-white">
                {inventoryData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                  >
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
                      {item.nama}
                    </td>
                    <td className="py-4 px-6">{item.kategori}</td>
                    <td className="py-4 px-6">{item.jumlah}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold text-white shadow-sm inline-block whitespace-nowrap ${
                          item.status === "Tersedia"
                            ? "bg-green-500"
                            : "bg-orange-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-2 text-gray-600 hover:text-[#991B1F] transition-colors">
                        <FaEye className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="text-[#991B1F] text-xs font-bold hover:underline">
            Lihat Semua
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItemData;
