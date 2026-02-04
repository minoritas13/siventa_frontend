import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarGuest from "../components/NavbarGuest";
import Footer from "../components/Footer";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login(email, password, remember);
      
      if (user && user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <NavbarGuest />

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm bg-white"
        >
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Masuk SIVENTA
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-[#C4161C] text-sm text-[#C4161C]">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#C4161C] focus:ring-[#C4161C]"
              />
              <span className="text-sm text-gray-600">Tetap masuk</span>
            </label>
            
            <Link
              to="/forgot-password"
              className="text-sm text-[#C4161C] hover:underline font-medium"
            >
              Lupa kata sandi?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-[#C4161C] hover:bg-[#A31217] disabled:bg-gray-400 text-white font-medium rounded-lg transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-[#C4161C] hover:underline font-medium"
          >
            Daftar dong Bestie
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
