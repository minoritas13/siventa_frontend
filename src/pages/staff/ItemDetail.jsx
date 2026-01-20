import React from "react";
import { ChevronLeft, Info, Tag, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const navigate = useNavigate();

  // Data dummy aset utama
  const item = {
    id: 1,
    nama: "Kamera Canon D1200 + Tripod",
    kode: "LKBN-CAM-001",
    kategori: "Fotografi dan Video",
    stock: 3,
    status: "Tersedia",
    deskripsi: "Kamera ini digunakan untuk kegiatan liputan diluar yang diperkenankan digunakan untuk kebutuhan liputan kantor Berita Antara Biro Lampung. Kondisi lensa bersih dan sudah termasuk tripod portabel.",
    asset: "/img/camera-canon-1300d.jpeg", 
  };

  // Data dummy barang serupa (Mengikuti struktur halaman Peminjaman)
  const similarItems = [
    { id: 2, nama: "Kamera SONY HRX-NX100", kode: "LKBN-CAM-002", asset: "/img/camera-canon-1300d.jpeg", status: "Tersedia" },
    { id: 3, nama: "Laptop Lenovo IdeaPad", kode: "LKBN-LAP-012", asset: "/img/camera-canon-1300d.jpeg", status: "Tidak Tersedia" },
    { id: 4, nama: "Tripod Kamera Excell", kode: "LKBN-ACC-005", asset: "/img/camera-canon-1300d.jpeg", status: "Tersedia" },
    { id: 5, nama: "Microphone Wireless RODE", kode: "LKBN-AUD-009", asset: "/img/camera-canon-1300d.jpeg", status: "Tersedia" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] font-sans">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#991B1F] transition-colors mb-8 text-xs md:text-sm font-bold group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Jelajah Aset
        </button>

        {/* SECTION DETAIL BARANG */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-[2rem] p-4 shadow-sm sticky top-24">
              <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50">
                <img src={item.asset} alt={item.nama} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-green-500 text-white rounded-md text-[10px] font-bold shadow-sm uppercase">
                  {item.status} : {item.stock} Unit
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{item.kode}</span>
              </div>
              <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">{item.nama}</h1>
              <div className="flex items-center gap-2 text-[#991B1F] font-bold text-sm bg-red-50 w-fit px-3 py-1 rounded-md">
                <Tag size={14} /> {item.kategori}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mb-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#991B1F]"></div>
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold border-b border-gray-50 pb-3">
                <Info size={18} className="text-[#991B1F]" />
                <h3 className="text-base md:text-lg">Deskripsi Inventaris</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">"{item.deskripsi}"</p>
            </div>
          </div>
        </section>

        {/* SECTION BARANG SERUPA (MENGGUNAKAN STYLE CARD HALAMAN PEMINJAMAN) */}
        <section className="border-t border-gray-100 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Barang Serupa</h2>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Lengkapi operasional anda dengan aset pendukung lainnya.</p>
            </div>
            <button className="text-[#991B1F] text-xs font-bold flex items-center gap-2 hover:underline transition-all">
              Lihat Semua <ArrowRight size={16} />
            </button>
          </div>

          {/* GRID ASET - Style Sama Persis dengan Halaman Peminjaman */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {similarItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Image Container */}
                <div className="h-44 bg-gray-200 overflow-hidden">
                  <img
                    src={item.asset}
                    alt="asset"
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                      {item.kode}
                    </span>

                    <span
                      className={`text-[10px] px-3 py-1 rounded-full font-bold ${
                        item.status === "Tersedia"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-800 mb-5 leading-tight line-clamp-1">
                    {item.nama}
                  </h3>

                  {/* Button Style Sama Persis */}
                  <button
                    onClick={() => navigate(`/loan/form/${item.id}`)}
                    className="w-full py-2.5 bg-[#991B1F] text-white rounded-xl text-sm font-bold hover:bg-red-800 transition shadow-lg"
                  >
                    + Pinjam Barang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetail;
