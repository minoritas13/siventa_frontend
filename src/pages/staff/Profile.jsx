import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Mail, Phone, Camera, Lock, LogOut, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // =========================
  // STATE USER
  // =========================
  const [user, setUser] = useState(null);

  // =========================
  // FETCH /me
  // =========================
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/me");
        const userData = res.data.data || res.data;
        setUser(userData);
      } catch (error) {
        console.error("Gagal fetch /me:", error);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Akun</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola informasi pribadi dan keamanan akun anda.
            </p>
          </div>
          <button
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-1.5 border border-[#991B1F] text-[#991B1F] rounded-lg text-sm font-semibold hover:bg-red-50 transition"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SISI KIRI */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                <img
                  // Gunakan avatar placeholder berdasarkan nama jika foto belum ada
                  src={user?.photo ? `${process.env.REACT_APP_API_URL}/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=991B1F&color=fff`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-50"
                />
                <button className="absolute bottom-1 right-1 bg-[#991B1F] text-white p-2 rounded-full border-2 border-white hover:bg-red-700 transition">
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-gray-900 h-7">
                {user?.name || ""}
              </h2>

              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                {user?.role || "Staff"} - {user?.divisi || "Uji Coba"}
              </p>

              <div className="mt-6">
                <span className="bg-blue-600 text-white text-[10px] md:text-[11px] px-6 py-2 rounded-md font-medium inline-block">
                  Status : Aktif
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Kontak Cepat</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#991B1F] p-2.5 rounded-full text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Email Kantor</p>
                    <p className="text-sm text-gray-700 font-medium truncate h-5">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#991B1F] p-2.5 rounded-full text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Nomor Telepon</p>
                    <p className="text-sm text-gray-700 font-medium">+62 852 7235 2530</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Informasi Pribadi</h3>
                <button className="text-[#991B1F] text-xs font-semibold hover:underline">Edit Data</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Nama Lengkap</label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Email</label>
                  <input
                    type="text"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Unit Kerja/Divisi</label>
                  <input
                    type="text"
                    value={user?.divisi || ""}
                    readOnly
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Jabatan</label>
                  <input
                    type="text"
                    value={user?.role === 'admin' ? 'Administrator' : 'Staff'}
                    readOnly
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-medium text-gray-400 uppercase">Alamat Kantor</label>
                  <textarea
                    readOnly
                    rows="2"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none resize-none"
                    defaultValue="Jl. Abdi Negara No.2, Gulak Galik, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35214"
                  />
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
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Ubah password anda secara berkala.</p>
                </div>
              </div>

              <div className="space-y-6">
                <input type="password" placeholder="Masukkan password saat ini" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="password" placeholder="Password baru" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
                  <input type="password" placeholder="Konfirmasi password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
                </div>
                <button className="bg-[#991B1F] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm shadow-md active:scale-95 transition-all">
                  <Save size={14} /> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
