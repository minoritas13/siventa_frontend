import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarGuest from "../components/NavbarGuest";
import Footer from "../components/Footer";

function Register() {
  // Inisialisasi hooks untuk registrasi dan navigasi
  const { register } = useAuth();
  const navigate = useNavigate();

  // State untuk menyimpan data input form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  // State untuk UI dan validasi tambahan
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler untuk memperbarui state saat input berubah
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk memproses pendaftaran
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validasi kecocokan password
    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    // Validasi persetujuan syarat dan ketentuan
    if (!agreeTerms) {
      setError("Anda harus menyetujui Ketentuan Penggunaan.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });

      alert("Pendaftaran berhasil! Silakan masuk.");
      navigate("/register");
    } catch (err) {
      setError(err.response?.data?.message || "Pendaftaran gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header Navigasi */}
      <NavbarGuest />

      {/* Konten Utama */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-xl border border-gray-200 rounded-xl p-8 shadow-sm bg-white">
          <h2 className="text-center text-2xl font-medium mb-8 text-black">
            Daftar SIVENTA
          </h2>

          {/* Alert jika terjadi error */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-[#C4161C] text-[#C4161C] text-sm rounded-r-lg">
              {error}
            </div>
          )}

          {/* Form Pendaftaran */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama lengkap
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Nama@email.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Input Password Baris Ganda (Desktop) */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Kata sandi
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 karakter"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Ulangi kata sandi
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Konfirmasi password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] outline-none"
                />
              </div>
            </div>

            {/* Checkbox Persetujuan */}
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#C4161C] focus:ring-[#C4161C] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer select-none">
                Saya menerima <span className="text-[#C4161C] font-medium">Ketentuan Penggunaan</span>
              </label>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading || !agreeTerms}
              className={`w-full py-3 text-white font-medium rounded-md transition-all shadow-md active:scale-[0.98] 
                ${loading || !agreeTerms 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#C4161C] hover:bg-[#AA1419]"}`}
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>
        </div>

        {/* Link Kembali ke Login */}
        <p className="mt-8 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-[#C4161C] hover:underline font-medium"
          >
            Masuk di sini
          </Link>
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Register;
