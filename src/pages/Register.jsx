import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // ===== STATE FORM =====
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===== HANDLER INPUT =====
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===== HANDLER SUBMIT =====
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi kata sandi tidak cocok.");
      setLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError("Anda harus menyetujui Ketentuan Penggunaan.");
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });

      alert("Pendaftaran berhasil! Silakan masuk.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Pendaftaran gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 font-sans py-10">
      <div className="w-full max-w-xl border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-3xl font-bold mb-8 text-black">
          Daftar SIVENTA
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-[#C4161C] text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Row Kata Sandi & Ulangi Kata Sandi */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Kata sandi
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ulangi kata sandi
              </label>
              <input
                type="password"
                name="password_confirmation"
                required
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Ulangi Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] outline-none"
              />
            </div>
          </div>

          {/* Input Nama Lengkap */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama lengkap
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Checkbox Ketentuan */}
          <div className="flex items-center gap-2 mt-6 mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#C4161C] focus:ring-[#C4161C]"
            />
            <label htmlFor="terms" className="text-sm text-black">
              Saya menerima Ketentuan Penggunaan
            </label>
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C4161C] hover:bg-[#AA1419] text-white font-bold rounded-md transition-all shadow-md active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-sm text-gray-800 font-medium">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="text-[#C4161C] cursor-pointer hover:underline font-medium"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}

export default Register;
