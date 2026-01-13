import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // sesuaikan path

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await login(email, password);

      // redirect setelah login sukses
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 font-sans">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-2xl font-bold mb-6 text-black">
          Masuk SIVENTA
        </h2>

        {/* ERROR MESSAGE */}
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        {/* Google Button */}
        <div className="flex justify-start">
          <button
            type="button"
            className="w-1/2 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="truncate text-black">Sign in with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="text-center my-6">
          <span className="text-black text-sm">atau masuk</span>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email / Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 mb-6">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-[#991B1F] focus:ring-[#991B1F]"
          />
          <span className="text-sm text-gray-600">Tetap masuk</span>
        </div>

        {/* Tombol Masuk */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-[#991B1F] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98]"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {/* Link Lupa Kata Sandi */}
        <div className="mt-4">
          <Link
            to="/forgetpassword"
            className="text-sm text-[#991B1F] hover:underline font-medium"
          >
            Lupa kata sandi?
          </Link>
        </div>
      </div>

      {/* Link Daftar */}
      <p className="mt-8 text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-[#991B1F] cursor-pointer hover:underline font-bold"
        >
          Daftar dong Bestie
        </Link>
      </p>
    </div>
  );
}

export default Login;
