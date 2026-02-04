import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Search, Download, Box, ClipboardList, ChevronDown } from "lucide-react";
import api from "../../services/api";
import { STORAGE_URL } from "../../services/api";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Report = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("inventaris");
  const [item, setItem] = useState([]);
  const [loan, setLoan] = useState([]);
  const [categories, setCategories] = useState([]);

  // --- STATE FILTER & SEARCH ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  // --- FETCH DATA DARI API ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemRes, loanRes, catRes] = await Promise.all([
          api.get("/items"),
          api.get("/allLoans"),
          api.get("/categories"),
        ]);

        setCategories(catRes.data.data || []);

        const mappedData = (itemRes.data.data || []).map((item) => ({
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
        }));

        const dataPeminjaman = (loanRes.data.data || []).flatMap((loan) =>
          (loan.loan_items || []).map((loanItem) => ({
            staff: loan.user?.name ?? "-",
            kode: loanItem.item?.code ?? "-",
            barang: loanItem.item?.name ?? "-",
            pinjam: new Date(loan.loan_date).toLocaleDateString("id-ID", {
              day: "2-digit", month: "long", year: "numeric",
            }),
            kembali: loan.return_date
              ? new Date(loan.return_date).toLocaleDateString("id-ID", {
                  day: "2-digit", month: "long", year: "numeric",
                })
              : "-",
            status: loan.status,
            foto: loanItem.item?.photo ? loanItem.item.photo : null,
          }))
        );

        setItem(mappedData);
        setLoan(dataPeminjaman);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      }
    };

    fetchData();
  }, []);

  // --- LOGIKA FILTERING DATA ---
  const filteredItems = item.filter((val) => {
    const matchSearch = val.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        val.kode_barang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = filterKategori === "" || val.kategori === filterKategori;
    const matchStatus = filterStatus === "" || val.kondisi.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchKategori && matchStatus;
  });

  const filteredLoans = loan.filter((val) => {
    const matchSearch = val.barang.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        val.staff.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "" || val.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setFilterKategori("");
    setFilterStatus("");
    setOpenDropdown(null);
  };

  // --- FUNGSI EKSPOR KE CSV ---
  const handleExport = async () => {
    const dataToExport = activeTab === "inventaris" ? filteredItems : filteredLoans;
    
    if (dataToExport.length === 0) {
      alert("Tidak ada data untuk diekspor");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(activeTab === "inventaris" ? "Inventaris" : "Peminjaman");

    // 1. Definisikan Kolom & Header
    const columns = activeTab === "inventaris" 
      ? [
          { header: "KODE BARANG", key: "kode_barang", width: 15 },
          { header: "NAMA BARANG", key: "nama_barang", width: 30 },
          { header: "KATEGORI", key: "kategori", width: 20 },
          { header: "NILAI PEROLEHAN", key: "nilai_perolehan", width: 20 },
          { header: "TGL PEROLEHAN", key: "tanggal_perolehan", width: 18 },
          { header: "UMUR", key: "umur_barang", width: 12 },
          { header: "KONDISI", key: "kondisi", width: 15 },
        ]
      : [
          { header: "PEMINJAM", key: "staff", width: 25 },
          { header: "KODE", key: "kode", width: 15 },
          { header: "BARANG", key: "barang", width: 30 },
          { header: "TGL PINJAM", key: "pinjam", width: 18 },
          { header: "TGL KEMBALI", key: "kembali", width: 18 },
          { header: "STATUS", key: "status", width: 15 },
        ];

    worksheet.columns = columns;

    // 2. Desain Header (Warna Merah SIVENTA & Teks Putih)
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'C4161C' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 11
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // 3. Masukkan Data & Desain Baris
    dataToExport.forEach((item) => {
      const row = worksheet.addRow(item);
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = {
          top: { style: 'thin', color: { argb: 'E5E7EB' } },
          left: { style: 'thin', color: { argb: 'E5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
          right: { style: 'thin', color: { argb: 'E5E7EB' } }
        };
        cell.font = { size: 10 };
      });
      row.height = 20;
    });

    // 4. Proses Unduh
    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = activeTab === "inventaris" ? "Laporan_Inventaris_Siventa.xlsx" : "Laporan_Peminjaman_Siventa.xlsx";
    saveAs(new Blob([buffer]), fileName);
  };

  return (
    <div 
      className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans"
      onClick={() => setOpenDropdown(null)}
    >
      <Sidebar />

      <main 
        className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-medium text-gray-800 leading-tight">Manajemen Laporan</h1>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mt-1">Kelola laporan inventaris dan peminjaman secara berkala.</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-[#C4161C] text-white px-5 py-2.5 rounded-lg text-xs font-medium shadow-md hover:bg-[#AA1419] transition-all active:scale-95"
          >
            <Download size={16} /> Ekspor CSV
          </button>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* TABS */}
          <div className="flex border-b border-gray-100 px-6 pt-5 gap-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleTabChange("inventaris")}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "inventaris" ? "border-[#C4161C] text-[#C4161C]" : "border-transparent text-gray-400"
              }`}
            >
              <Box size={18} /> Laporan Inventaris
            </button>
            <button
              onClick={() => handleTabChange("peminjaman")}
              className={`pb-4 text-sm font-medium flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === "peminjaman" ? "border-[#C4161C] text-[#C4161C]" : "border-transparent text-gray-400"
              }`}
            >
              <ClipboardList size={18} /> Laporan Peminjaman
            </button>
          </div>

          {/* TOOLBAR: SEARCH & CUSTOM DROPDOWNS */}
          <div className="p-5 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Cari data laporan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4161C] transition-all font-normal"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Dropdown Kategori */}
              {activeTab === "inventaris" && (
                <div className="relative flex-1 md:w-44">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'kategori' ? null : 'kategori')}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <span className="truncate">{filterKategori || "Semua Kategori"}</span>
                    <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${openDropdown === 'kategori' ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === 'kategori' && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div 
                        onClick={() => { setFilterKategori(""); setOpenDropdown(null); }}
                        className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 ${filterKategori === "" ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                      >
                        Semua Kategori
                      </div>
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {categories.map((cat) => (
                          <div 
                            key={cat.id}
                            onClick={() => { setFilterKategori(cat.category); setOpenDropdown(null); }}
                            className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 border-t border-gray-50 capitalize ${filterKategori === cat.category ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                          >
                            {cat.category.toLowerCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dropdown Status / Kondisi */}
              <div className="relative flex-1 md:w-40">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <span className="truncate">
                    <span className="capitalize">
                      {filterStatus.toLowerCase() || (activeTab === "inventaris" ? "Semua kondisi" : "Status")}
                    </span>
                  </span>
                  <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${openDropdown === 'status' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'status' && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div 
                      onClick={() => { setFilterStatus(""); setOpenDropdown(null); }}
                      className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 ${filterStatus === "" ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                    >
                      {activeTab === "inventaris" ? "Semua Kondisi" : "Semua Status"}
                    </div>
                    {(activeTab === "inventaris" 
                      ? ["baik", "rusak ringan", "rusak berat"] 
                      : ["menunggu", "dipinjam", "selesai"]
                    ).map((status) => (
                      <div 
                        key={status}
                        onClick={() => { setFilterStatus(status); setOpenDropdown(null); }}
                        className={`px-4 py-3 text-[11px] font-medium cursor-pointer hover:bg-gray-50 border-t border-gray-50 capitalize ${filterStatus === status ? "text-[#C4161C] bg-red-50" : "text-gray-600"}`}
                      >
                        {status === "selesai" && activeTab === "peminjaman" ? "Dikembalikan" : status.toLowerCase()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="overflow-x-auto" style={{ minHeight: openDropdown ? '400px' : 'auto' }}>
            <table className="w-full text-left min-w-[850px]">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] uppercase font-medium text-gray-400 tracking-wider border-y border-gray-100">
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
                {(activeTab === "inventaris" ? filteredItems : filteredLoans).map((data, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    {activeTab === "inventaris" ? (
                      <>
                        <td className="px-6 py-5 text-[11px] font-medium text-gray-500 uppercase">{data.kode_barang}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img src={data.foto ? `${STORAGE_URL}/${data.foto}` : "/img/camera-canon-1300d.jpeg"} className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" alt="item" />
                            <span className="text-xs font-medium text-gray-800 uppercase">{data.nama_barang}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium">{data.kategori}</td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium">Rp {data.nilai_perolehan}</td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium">{data.tanggal_perolehan}</td>
                        <td className="px-6 py-5 text-xs text-gray-600 font-medium">{data.umur_barang}</td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-5 py-1.5 rounded-full text-[10px] font-medium text-white shadow-sm uppercase ${data.kondisi === "baik" ? "bg-blue-600" : "bg-red-600"}`}>
                            {data.kondition || data.kondisi}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                              <img src={`https://ui-avatars.com/api/?name=${data.staff}&background=C4161C&color=fff`} className="w-full h-full object-cover" alt="staff" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-800 leading-tight">{data.staff}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[11px] font-medium text-gray-500">{data.kode}</td>
                        <td className="px-6 py-5 text-xs font-medium text-gray-700">{data.barang}</td>
                        <td className="px-6 py-5 text-[11px] text-gray-600">{data.pinjam}</td>
                        <td className="px-6 py-5 text-[11px] text-gray-600">{data.kembali}</td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-medium text-white shadow-sm uppercase ${
                            data.status === "dipinjam" ? "bg-green-400" : data.status === "terlambat" ? "bg-red-600" : "bg-orange-400"
                          }`}>
                            {data.status === "selesai" ? "dikembalikan" : data.status}
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
