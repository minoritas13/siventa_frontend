import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavbarGuest";
import Footer from "../components/Footer";
import api from "../services/api";
import NavbarGuest from "../components/NavbarGuest";

function ForgotPassword() {
  // --- Logika Backend ---
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/forgot-password", { email });
      setMessage("Link reset password telah dikirim ke email Anda.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Gagal mengirim email reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <NavbarGuest/>

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Lupa Kata Sandi
          </h2>

          {/* Form ditambahkan untuk handling submit */}
          <form onSubmit={submitForgotPassword} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#C4161C] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98] mt-6 disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Link Reset"}
            </button>
          </form>

          {/* Pesan Feedback */}
          {message && (
            <p className="mt-4 text-center text-sm font-medium text-gray-600">
              {message}
            </p>
          )}
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default ForgotPassword;
