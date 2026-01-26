import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Mail, Phone, Camera, Lock, LogOut, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // =========================
  // STATE
  // =========================
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State Form Edit
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    divisi: "",
  });

  // =========================
  // FETCH DATA USER
  // =========================
  const fetchMe = async () => {
    try {
      const res = await api.get("/me");
      const userData = res.data.data || res.data;
      setUser(userData);
      
      // Sinkronkan form dengan data user dari backend
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        divisi: userData.divisi || "",
      });
    } catch (error) {
      console.error("Gagal fetch data profile:", error);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // =========================
  // HANDLERS
  // =========================
  
  // 1. Update Profile (Nama & Telepon)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/user/update", formData); // Sesuaikan endpoint backend Anda
      await fetchMe(); // Refresh data
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Update Foto Profil
  const handlePhotoClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("photo", file);

    try {
      setLoading(true);
      await api.post("/user/photo", data); // Sesuaikan endpoint backend
      await fetchMe();
      alert("Foto profil berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah foto.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Akun</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola informasi pribadi dan keamanan akun anda.</p>
          </div>
          <button
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-1.5 border border-[#991B1F] text-[#991B1F] rounded-lg text-sm font-semibold hover:bg-red-50 transition"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SISI KIRI: AVATAR & KONTAK */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                <img
                  src={user?.photo ? `${process.env.REACT_APP_API_URL}/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=991B1F&color=fff`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-50"
                />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button 
                  onClick={handlePhotoClick}
                  className="absolute bottom-1 right-1 bg-[#991B1F] text-white p-2 rounded-full border-2 border-white hover:bg-red-700 transition"
                >
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-gray-900">{user?.name || "Loading..."}</h2>
              <p className="text-xs text-gray-400 mt-1 tracking-wider">
                {user?.role || "Staff"} - {user?.divisi || "Divisi"}
              </p>

              <div className="mt-6">
                <span className="bg-blue-600 text-white text-[10px] md:text-[11px] px-6 py-2 rounded-md font-medium inline-block">
                  Status : Aktif
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 text-center lg:text-left">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Kontak Cepat</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#991B1F] p-2.5 rounded-full text-white shrink-0"><Mail size={18} /></div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Email Kantor</p>
                    <p className="text-sm text-gray-700 font-medium truncate">{user?.email || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#991B1F] p-2.5 rounded-full text-white shrink-0"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Nomor Telepon</p>
                    <p className="text-sm text-gray-700 font-medium">{formData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: FORM INFO & KEAMANAN */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Informasi Pribadi</h3>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-[#991B1F] text-xs font-semibold hover:underline"
                >
                  Edit Data
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: "Nama Lengkap", value: user?.name },
                  { label: "Email", value: user?.email },
                  { label: "Unit Kerja/Divisi", value: user?.divisi },
                  { label: "Jabatan", value: user?.role === 'admin' ? 'Administrator' : 'Staff' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <label className="text-[11px] font-medium text-gray-400 uppercase">{item.label}</label>
                    <input type="text" value={item.value || ""} readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
                  </div>
                ))}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Alamat Kantor</label>
                  <textarea readOnly rows="2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none resize-none" defaultValue="Jl. Abdi Negara No.2, Gulak Galik, Kec. Tlk. Betung Utara, Bandar Lampung" />
                </div>
              </div>
            </div>

            {/* KEAMANAN */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#991B1F] p-2.5 rounded-full text-white shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Keamanan Akun</h3>
                  <p className="text-[10px] text-gray-400 font-medium">Ubah password anda secara berkala untuk keamanan.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="Masukkan email saat ini"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-1 focus:ring-red-600 outline-none"
                  />
                </div>
                <button className="w-full md:w-auto bg-[#991B1F] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-md">
                  <Save size={18} />
                  Berikutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL EDIT PROFIL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Edit Profil</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Nomor Telepon */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Nomor Telepon</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 08123456789"
                  className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* Unit Kerja / Divisi */}
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Unit Kerja / Divisi</label>
                <select 
                  className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white"
                  value={formData.divisi}
                  onChange={(e) => setFormData({...formData, divisi: e.target.value})}
                >
                  <option value="">Pilih Divisi</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Sumber Daya Manusia">Sumber Daya Manusia (SDM)</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Operasional">Operasional</option>
                  <option value="Pemasaran">Pemasaran</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-50"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-[#991B1F] text-white rounded-xl font-bold text-sm hover:bg-red-800 transition disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Profile;
