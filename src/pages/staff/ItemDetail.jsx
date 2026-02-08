import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Plus } from "lucide-react";
import api from "../../services/api";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook useEffect untuk mengambil detail barang dan barang serupa berdasarkan kategori
  useEffect(() => {
    const fetchDetailAndSimilar = async () => {
      try {
        setLoading(true);
        // Mengambil detail barang yang dipilih
        const resDetail = await api.get(`/item/${id}`);
        const currentItem = resDetail.data.data;
        setItem(currentItem);

        // Mengambil semua barang untuk memfilter barang dengan kategori yang sama (Barang Serupa)
        const resAll = await api.get("/items");
        const allItems = resAll.data.data;
        const filtered = allItems.filter(
          (val) => val.category_id === currentItem.category_id && val.id !== currentItem.id
        );
        setSimilarItems(filtered);
        
        // Memastikan halaman scroll ke atas saat berpindah detail barang
        window.scrollTo(0, 0); 
      } catch (error) {
        console.error("Gagal memuat data detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailAndSimilar();
  }, [id]);

  // Loading state
  if (loading) return <div className="p-20 text-center font-medium">Memuat Detail Barang...</div>;
  
  // Error state jika barang tidak ditemukan
  if (!item) return <div className="p-20 text-center font-medium text-[#C4161C]">Barang tidak ditemukan.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      
      {/* Konten Utama */}
      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-10">
        
        {/* --- Bagian Detail Barang (Atas) --- */}
        <section className="flex flex-col md:flex-row gap-10 mb-20">
          {/* Foto Barang */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
              <img 
                src={item.photo ? `${process.env.REACT_APP_API_URL}/storage/${item.photo}` : "/img/camera-canon-1300d.jpeg"} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Informasi Detail Teks */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="mb-6">
              <span className={`inline-block px-4 py-1 text-white text-[11px] font-medium rounded-md mb-3 ${item.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                {item.stock > 0 ? `Tersedia : ${item.stock}` : "Stok Habis"}
              </span>
              <h2 className="text-2xl font-medium mb-1 uppercase">{item.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{item.category?.name || "Kategori Umum"}</p>
            </div>

            <div className="mt-1">
              <h3 className="text-sm font-medium mb-3">Deskripsi Barang</h3>
              <div className="p-5 border border-[#C4161C] rounded-xl min-h-[130px] bg-white">
                <p className="text-sm leading-relaxed text-gray-700 font-normal">
                  {item.deskripsi || "Belum ada deskripsi untuk barang ini."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Bagian Barang Serupa (Bawah) --- */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-1">Barang Serupa</h2>
            <p className="text-sm text-gray-500 font-normal">Koleksi lainnya di kategori {item.category?.name}.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.length > 0 ? (
              similarItems.slice(0, 4).map((sItem) => (
                <div key={sItem.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
                  
                  {/* Gambar Barang Serupa */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={sItem.photo ? `${process.env.REACT_APP_API_URL}/storage/${sItem.photo}` : "/img/camera-canon-1300d.jpeg"} 
                      alt={sItem.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-medium text-white shadow-sm ${sItem.stock > 0 ? "bg-[#53EC53]" : "bg-red-500"}`}>
                        {sItem.stock > 0 ? `TERSEDIA: ${sItem.stock}` : "HABIS"}
                      </span>
                    </div>
                  </div>

                  {/* Info Barang Serupa */}
                  <div className="p-5 flex flex-col grow">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">
                      {sItem.category?.name || "Kategori"}
                    </p>
                    <h3 className="font-medium text-gray-800 text-sm mb-1 uppercase leading-tight h-10 line-clamp-2">
                      {sItem.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400 mb-5 font-normal">
                      {sItem.code || "KODE-BARANG"}
                    </p>

                    <button
                      onClick={() => navigate(`/loan/form/${sItem.id}`)}
                      className="w-full mt-auto py-3 bg-[#C4161C] text-white rounded-xl text-[11px] font-medium hover:opacity-90 transition-all shadow-sm active:scale-95"
                    >
                      + PINJAM BARANG
                    </button>
                    
                    <button
                      onClick={() => navigate(`/item-detail/${sItem.id}`)}
                      className="w-full mt-2 py-1.5 text-[#C4161C] text-[10px] font-medium hover:underline"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-400 font-normal">Tidak ada barang serupa lainnya.</p>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItemDetail;
