import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {Search, Download, FileText, Filter, ChevronLeft, ChevronRight, ClipboardList, Box } from "lucide-react";
import api from "../../services/api";
import { STORAGE_URL } from "../../services/api";

const Report = () => {
  const [activeTab, setActiveTab] = useState("inventaris");
  const [item, setItem] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [itemRes, loanRes] = await Promise.all([
        api.get("/items"),
        api.get("/allLoans"),
      ]);

      const mappedData = itemRes.data.data.map((item) => ({
        id: item.id,
        kode_barang: item.code,
        nama_barang: item.name,
        kategori: item.category?.name ?? "-",
        jumlah_barang: item.stock,
        kondisi: item.condition,
        umur_barang: `${item.umur_barang} tahun`,
        tanggal_perolehan: item.tanggal_perolehan,
        nilai_perolehan: Number(item.nilai_perolehan).toLocaleString("id-ID"),
        deskripsi: item.description,
        foto: item.photo,
        dibuat_pada: item.created_at,
        diperbarui_pada: item.updated_at,
      }));

      const dataPeminjaman = loanRes.data.data.flatMap((loan) =>
        loan.loan_items.map((loanItem) => ({
          staff: loan.user?.name ?? "-",
          divisi: "-", 
          kode: loanItem.item?.code ?? "-",
          barang: loanItem.item?.name ?? "-",
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
          foto: loanItem.item?.photo
            ? `/storage/${loanItem.item.photo}`
            : "/foto-default.png",
        }))
      );

      setItem(mappedData);
      setLoan(dataPeminjaman);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
              Manajemen Laporan
            </h1>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mt-1">
              Kelola laporan inventaris dan peminjaman secara berkala.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#C4161C] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md hover:bg-[#AA1419] transition-all active:scale-95">
            <Download size={16} />
            Ekspor CSV
          </button>
        </div>

        {console.log(loan)}

        {/* Container Utama Laporan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 px-6 pt-5 gap-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("inventaris")}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "inventaris"
                  ? "border-[#C4161C] text-[#C4161C]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Box size={18} /> Laporan Inventaris
            </button>
            <button
              onClick={() => setActiveTab("peminjaman")}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "peminjaman"
                  ? "border-[#C4161C] text-[#C4161C]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <ClipboardList size={18} /> Laporan Peminjaman
            </button>
          </div>

          {/* Search & Filter Section */}
          <div className="p-5 flex flex-col md:flex-row gap-4 items-center bg-white">
            <div className="relative w-full md:w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari nama staf atau barang ..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4161C] transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {activeTab === "inventaris" && (
                <select className="flex-1 md:w-44 p-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 focus:outline-none shadow-sm cursor-pointer">
                  <option>Semua Kategori</option>
                </select>
              )}

              <select className="flex-1 md:w-40 p-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 focus:outline-none shadow-sm cursor-pointer">
                <option>Status</option>
              </select>

              <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-y border-gray-100">
                  {activeTab === "inventaris" ? (
                    <>
                      <th className="px-6 py-4">Kode Barang</th>
                      <th className="px-6 py-4">Nama Barang</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4">Nilai Perolehan</th>
                      <th className="px-6 py-4">Tanggal Perolehan</th>
                      <th className="px-6 py-4">Umur Barang</th>
                      <th className="px-6 py-4 text-center">Kondisi</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">Peminjam</th>
                      <th className="px-6 py-4">Kode Barang</th>
                      <th className="px-6 py-4">Nama Barang</th>
                      <th className="px-6 py-4">Tgl Pinjam</th>
                      <th className="px-6 py-4">Tgl Kembali</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === "inventaris"
                  ? item.map((item, id) => (
                      <tr
                        key={id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="px-6 py-5 text-[11px] font-medium text-gray-500 uppercase tracking-tighter">
                          {item.kode_barang}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                item.foto
                                  ? `${STORAGE_URL}/${item.foto}`
                                  : "/img/camera-canon-1300d.jpeg"
                              }
                              alt={item.nama_barang}
                              className="w-10 h-10 rounded-lg object-cover shadow-sm border border-gray-100 shrink-0"
                            />
                            <span className="text-xs font-bold text-gray-800">
                              {item.nama_barang}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium italic">
                          {item.kategori}
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium italic">
                          {item.nilai_perolehan}
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium italic">
                          {item.tanggal_perolehan}
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium italic">
                          {item.umur_barang}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`px-5 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
                              item.kondisi === "baik"
                                ? "bg-blue-600"
                                : "bg-red-600"
                            }`}
                          >
                            {item.kondisi}
                          </span>
                        </td>
                      </tr>
                    ))
                  : loan.map((item, id) => (
                      <tr
                        key={id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                              <img
                                src={
                                  item.foto
                                    ? `${STORAGE_URL}/${item.foto}`
                                    : "/img/default.png"
                                }
                                alt={item.staff}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${item.staff}&background=C4161C&color=fff`;
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800 leading-tight">
                                {item.staff}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium">
                                {item.divisi}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[11px] font-medium text-gray-500 uppercase tracking-tighter">
                          {item.kode}
                        </td>
                        <td className="px-6 py-5 text-xs font-bold text-gray-700">
                          {item.barang}
                        </td>
                        <td className="px-6 py-5 text-[11px] text-gray-600">
                          {item.pinjam}
                        </td>
                        <td className="px-6 py-5 text-[11px] text-gray-600">
                          {item.kembali}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm uppercase ${
                              item.status === "dipinjam"
                                ? "bg-green-400"
                                : item.status === "terlambat"
                                ? "bg-red-600"
                                : "bg-orange-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-medium gap-4">
            <p className="text-center sm:text-left">
              Menampilkan 1 sampai 5 dari 5 data laporan
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                Sebelumnya
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 border border-red-200 text-[#C4161C] rounded-xl hover:bg-red-50 transition-all font-bold">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
