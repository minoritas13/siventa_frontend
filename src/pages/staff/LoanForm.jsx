import React, { useEffect, useState } from "react"; // 1. Pastikan useState & useEffect diimpor
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Calendar, ClipboardList } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const LoanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);

  // ===== LOGIC STATE =====
  const [loanDate, setLoanDate] = useState("");
  const [returnDate, setReturnDate] = useState(""); // 2. Tambahkan state tanggal kembali
  const [note, setNote] = useState("");
  const [qty] = useState(1); 
  const [loading, setLoading] = useState(false);

  // ===== FETCH ITEM =====
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/item/${id}`);
        const data = res.data.data;

        setItem({
          id: data.id,
          name: data.name,
          // 3. Akses kategori dengan lebih aman
          kategori: data.category?.name || data.kategori_id?.[1] || "-", 
          stock: data.stock ?? 0,
          kode: data.code || data.kode,
          // 4. Pastikan path foto benar (tambahkan URL API jika perlu)
          photo: data.photo 
            ? `${process.env.REACT_APP_API_URL}/storage/${data.photo}` 
            : "/img/camera-canon-1300d.jpeg",
          deskripsi: data.deskripsi,
        });
      } catch (error) {
        console.error("Gagal mengambil detail item:", error);
      }
    };

    fetchItem();
  }, [id]);

  // ===== SUBMIT LOAN =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loanDate || !returnDate) {
      alert("Tanggal pinjam dan tanggal kembali wajib diisi");
      return;
    }

    if (item && qty > item.stock) {
      alert("Jumlah melebihi stok tersedia");
      return;
    }

    const payload = {
      loan_date: loanDate,
      return_date: returnDate, // 5. Sertakan tanggal kembali dalam payload
      note: note,
      items: [
        {
          item_id: item.id,
          qty: qty,
        },
      ],
    };

    try {
      setLoading(true);
      await api.post("/loan/store", payload);
      alert("Peminjaman berhasil diajukan");
      navigate("/loan"); 
    } catch (error) {
      console.error("Gagal mengajukan peminjaman:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat mengajukan peminjaman");
    } finally {
      setLoading(false);
    }
  };

  if (!item) return <div className="p-20 text-center">Memuat data aset...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Peminjaman Aset</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Hallo, silakan lengkapi formulir di bawah ini untuk mengajukan peminjaman aset.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="bg-[#991B1F] p-2 rounded-lg text-white">
                  <ClipboardList size={18} />
                </div>
                <h2 className="font-bold text-gray-800">Formulir Pengajuan Aset</h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="space-y-3">
                  <div className="relative flex items-center gap-4 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <img src={item.photo} alt="Selected" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {item.kategori}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">{item.kode}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                      <p className="text-[11px] text-gray-500">Tersedia {item.stock} Unit</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-[#991B1F]" /> Tanggal Pinjam
                    </label>
                    <input
                      type="date"
                      required
                      value={loanDate}
                      onChange={(e) => setLoanDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#991B1F]"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-[#991B1F]" /> Tanggal Kembali
                    </label>
                    <input
                      type="date"
                      required
                      value={returnDate} // 6. Hubungkan dengan state returnDate
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#991B1F]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700">Keperluan Peminjaman</label>
                  <textarea
                    rows="4"
                    required
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Liputan acara peresmian gedung..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#991B1F] resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={item.stock === 0 || loading}
                    className="w-full md:w-auto px-10 py-3 bg-[#991B1F] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {loading ? "Mengajukan..." : "Ajukan Peminjaman"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoanForm;
