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

  /* ================= STATE ================= */
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    divisi: "",
  });

  /* ================= FETCH USER ================= */
  const fetchMe = async () => {
    try {
      const res = await api.get("/me");
      const data = res.data.data || res.data;

      setUser(data);
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        divisi: data.divisi || "",
      });
    } catch (error) {
      console.error("Gagal fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/user/update", formData);
      await fetchMe();
      setIsEditing(false);
      alert("Profil berhasil diperbarui");
    } catch (error) {
      alert("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PHOTO UPLOAD ================= */
  const handlePhotoClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("photo", file);

    try {
      setLoading(true);
      await api.post("/user/photo", data);
      await fetchMe();
    } catch (error) {
      alert("Gagal upload foto");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profile Akun</h1>
            <p className="text-sm text-gray-500">
              Kelola informasi pribadi dan keamanan akun anda
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-[#991B1F] text-[#991B1F] rounded-lg text-sm font-semibold hover:bg-red-50"
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={
                    user?.photo
                      ? `${process.env.REACT_APP_API_URL}/storage/${user.photo}`
                      : `https://ui-avatars.com/api/?name=${user?.name}&background=991B1F&color=fff`
                  }
                  alt="profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-100"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handlePhotoClick}
                  className="absolute bottom-2 right-2 bg-[#991B1F] p-2 rounded-full text-white"
                >
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-xs text-gray-400">
                {user?.role} - {user?.divisi}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 space-y-4">
              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-[#991B1F]" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-[#991B1F]" />
                <span className="text-sm">{user?.phone || "-"}</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between mb-6">
                <h3 className="font-bold">Informasi Pribadi</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[#991B1F] text-sm font-semibold"
                >
                  Edit Data
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input readOnly value={user?.name || ""} className="input" />
                <input readOnly value={user?.email || ""} className="input" />
                <input readOnly value={user?.divisi || ""} className="input" />
                <input readOnly value={user?.role || ""} className="input" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={18} className="text-[#991B1F]" />
                <h3 className="font-bold">Keamanan Akun</h3>
              </div>
              <button className="bg-[#991B1F] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Save size={14} /> Ubah Password
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MODAL EDIT ================= */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">Edit Profil</h3>
              <button onClick={() => setIsEditing(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input"
                placeholder="Nama"
              />
              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input"
                placeholder="Telepon"
              />
              <select
                value={formData.divisi}
                onChange={(e) =>
                  setFormData({ ...formData, divisi: e.target.value })
                }
                className="input"
              >
                <option value="">Pilih Divisi</option>
                <option>IT Support</option>
                <option>Keuangan</option>
                <option>SDM</option>
                <option>Operasional</option>
              </select>

              <button
                disabled={loading}
                className="w-full bg-[#991B1F] text-white py-2 rounded-lg"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
