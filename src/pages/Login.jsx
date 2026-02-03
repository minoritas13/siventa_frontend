import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const user = await login(email, password);
      
      if (user && user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-2xl font-bold mb-6 text-black">
          Masuk SIVENTA
        </h2>

        {/* ERROR MESSAGE */}
        {error && <div className="mb-4 text-sm text-[#C4161C]">{error}</div>}

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 mb-6">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-[#C4161C] focus:ring-[#C4161C]"
          />
          <span className="text-sm text-gray-600">Tetap masuk</span>
        </div>

        {/* Tombol Masuk */}
        <button onClick={handleLogin}disabled={loading} className="w-full py-3 bg-[#C4161C] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98]">
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {/* Lupa Kata Sandi */}
        <div className="mt-4">
          <Link
            to="/reset-password"
            className="text-sm text-[#C4161C] hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>
      </form>

      {/* Link Daftar */}
      <p className="mt-8 text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-[#C4161C] cursor-pointer hover:underline font-medium"
        >
          Daftar dong Bestie
        </Link>
      </p>
    </div>
  );
}

export default Login;
