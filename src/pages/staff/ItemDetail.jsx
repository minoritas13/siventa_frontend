import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Plus } from "lucide-react";
import api from "../../services/api";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL
  
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailAndSimilar = async () => {
      try {
        setLoading(true);
        // 1. Ambil detail item yang diklik dari ItemData
        const resDetail = await api.get(`/item/${id}`);
        const currentItem = resDetail.data.data;
        setItem(currentItem);

        // 2. Ambil semua data barang untuk mencari yang serupa
        const resAll = await api.get("/items");
        const allItems = resAll.data.data;

        // 3. FILTER: Cari barang dengan kategori sama, tapi bukan dirinya sendiri
        const filtered = allItems.filter(
          (val) => val.category_id === currentItem.category_id && val.id !== currentItem.id
        );

        setSimilarItems(filtered);
        
        // Penting: Scroll ke atas jika pindah dari satu detail ke detail lainnya
        window.scrollTo(0, 0); 
      } catch (error) {
        console.error("Gagal memuat data detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailAndSimilar();
  }, [id]); // Re-run setiap kali ID di URL berubah

  if (loading) return <div className="p-20 text-center font-bold">Memuat Detail Barang...</div>;
  if (!item) return <div className="p-20 text-center font-bold text-red-500">Barang tidak ditemukan.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-10">
        
        {/* INFO BARANG UTAMA */}
        <section className="flex flex-col md:flex-row gap-10 mb-20">
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
              <img 
                src={item.photo ? `${process.env.REACT_APP_API_URL}/storage/${item.photo}` : "/img/camera-canon-1300d.jpeg"} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col">
            <div className="mb-6">
              <span className={`inline-block px-4 py-1 text-white text-[11px] font-bold rounded-md mb-3 ${item.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                {item.stock > 0 ? `Tersedia : ${item.stock}` : "Stok Habis"}
              </span>
              <h2 className="text-2xl font-bold mb-1 uppercase">{item.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{item.category?.name || "Kategori Umum"}</p>
            </div>

            <div className="mt-1">
              <h3 className="text-sm font-bold mb-3">Deskripsi Barang</h3>
              <div className="p-5 border border-red-200 rounded-xl min-h-[130px] bg-white">
                <p className="text-sm leading-relaxed text-gray-700">
                  {item.deskripsi || "Belum ada deskripsi untuk barang ini."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION BARANG SERUPA (Filtered Otomatis) */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Barang Serupa</h2>
            <p className="text-sm text-gray-500">Koleksi lainnya di kategori {item.category?.name}.</p>
          </div>

          {/* SECTION BARANG SERUPA (Identik dengan Style Loan.js) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.length > 0 ? (
              similarItems.slice(0, 4).map((sItem) => (
                <div key={sItem.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
                  
                  {/* GAMBAR DENGAN BADGE STATUS */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={sItem.photo ? `${process.env.REACT_APP_API_URL}/storage/${sItem.photo}` : "/img/camera-canon-1300d.jpeg"} 
                      alt={sItem.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold text-white shadow-sm ${sItem.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                        {sItem.stock > 0 ? `TERSEDIA: ${sItem.stock}` : "HABIS"}
                      </span>
                    </div>
                  </div>

                  {/* INFO ITEM */}
                  <div className="p-5 flex flex-col grow">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {sItem.category?.name || "Kategori"}
                    </p>
                    <h3 className="font-bold text-gray-800 text-sm mb-1 uppercase leading-tight h-10 line-clamp-2">
                      {sItem.name}
                    </h3>
                    {/* Tambahan Kode Barang agar sama dengan halaman Loan */}
                    <p className="text-[10px] font-mono text-gray-400 mb-5">
                      {sItem.code || "KODE-BARANG"}
                    </p>

                    {/* Tombol Pinjam Barang sesuai halaman Loan */}
                    <button
                      onClick={() => navigate(`/loan/form/${sItem.id}`)}
                      className="w-full mt-auto py-3 bg-[#C4161C] text-white rounded-xl text-[11px] font-bold hover:opacity-90 transition-all shadow-sm active:scale-95"
                    >
                      + PINJAM BARANG
                    </button>
                    
                    {/* Tombol Lihat Detail (Opsional: Jika ingin tetap ada akses ke detail) */}
                    <button
                      onClick={() => navigate(`/item-detail/${sItem.id}`)}
                      className="w-full mt-2 py-1.5 text-[#C4161C] text-[10px] font-bold hover:underline"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-400 italic">Tidak ada barang serupa lainnya.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ItemDetail;
