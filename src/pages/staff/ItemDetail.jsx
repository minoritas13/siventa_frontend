import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Plus } from "lucide-react"; // Ikon plus untuk tombol sesuai gambar

const ItemDetail = () => {
  const navigate = useNavigate();

  // Data utama sesuai gambar
  const item = {
    nama: "Kamera Canon D1200 + Tripod",
    kategori: "Fotografi dan Video",
    stock: 3,
    status: "Tersedia",
    deskripsi: "Kamera ini digunakan untuk kegiatan liputan diluar yang diperkenankan digunakan untuk kebutuhan liputan.",
    asset: "/img/camera-canon-1300d.jpeg", 
  };

  // Data barang serupa sesuai gambar
  const similarItems = [
    { id: 1, nama: "Kamera Canon D1200 + Tripod", kategori: "Fotografi dan Video", status: "Tersedia", stock: 3, asset: "/img/camera-canon-1300d.jpeg" },
    { id: 2, nama: "Kamera SONY HRX-NX100", kategori: "Fotografi dan Video", status: "Terpinjam", stock: 0, asset: "/img/camera-sony.jpeg" },
    { id: 3, nama: "Laptop Lenovo IdeaPad", kategori: "Elektronik", status: "Rusak", stock: 0, asset: "/img/laptop.jpeg" },
    { id: 4, nama: "Tripod Kamera", kategori: "Fotografi dan Video", status: "Rusak", stock: 0, asset: "/img/tripod.jpeg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-10">
        {/* HEADER JUDUL HALAMAN */}
        <header className="mb-10">
          <h1 className="text-2xl font-bold mb-1">Detail Barang</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Daftar lengkap inventaris kantor, cek ketersediaan, dan ajukan peminjaman barang kantor.
          </p>
        </header>

        {/* SECTION DETAIL (Layout Sesuai Foto) */}
        <section className="flex flex-col md:flex-row gap-10 mb-20">
          {/* Sisi Kiri: Gambar Besar */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
              <img src={item.asset} alt={item.nama} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Sisi Kanan: Info & Deskripsi */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 bg-[#53EC53] text-white text-[11px] font-bold rounded-md mb-3">
                {item.status} : {item.stock}
              </span>
              <h2 className="text-2xl font-bold mb-1">{item.nama}</h2>
              <p className="text-sm text-gray-500 font-medium">{item.kategori}</p>
            </div>

            <div className="mt-1">
              <h3 className="text-sm font-bold mb-3">Deskripsi Barang</h3>
              <div className="p-5 border border-red-200 rounded-xl min-h-[130px] bg-white flex">
                <p className="text-sm leading-relaxed text-gray-700">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION BARANG SERUPA */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Barang Serupa</h2>
            <p className="text-sm text-gray-500">
              Daftar lengkap inventaris kantor, cek ketersediaan, dan ajukan peminjaman barang kantor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.map((sItem, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-50 relative">
                  <img src={sItem.asset} alt={sItem.nama} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-4 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{sItem.kategori}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded text-white font-bold uppercase ${
                      sItem.status === "Tersedia" ? "bg-[#53EC53]" : 
                      sItem.status === "Terpinjam" ? "bg-orange-400" : "bg-red-500"
                    }`}>
                      {sItem.status === "Tersedia" ? `${sItem.status}: ${sItem.stock}` : sItem.status}
                    </span>
                  </div>
                  
                  <h4 className="text-[11px] font-bold mb-4 grow line-clamp-2 uppercase">
                    {sItem.nama}
                  </h4>

                  <button 
                    onClick={() => navigate(`/loan/form/${sItem.id}`)}
                    className="w-full py-2 bg-[#C4161C] text-white text-[10px] font-bold rounded flex items-center justify-center gap-2 hover:bg-[#AA1419] transition-all"
                  >
                    <Plus size={14} /> PINJAM BARANG
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
