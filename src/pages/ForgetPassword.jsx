import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 font-sans">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-2xl font-bold mb-6 text-black">
          Riset Password
        </h2>

        <div className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email / Username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Input Kata Sandi Baru */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama lengkap
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Input Konfirmasi Kata Sandi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama lengkap
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Tombol Masuk */}
        <button className="w-full py-3 bg-[#991B1F] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98] mt-6">
          Konfirmasi Kata Sandi
        </button>

        {/* Link Lupa Kata Sandi */}
        <div className="mt-4">
          <Link to="/login" className="text-sm text-[#991B1F] hover:underline">
            Masuk Akun
          </Link>
        </div>
      </div>

      {/* Link Daftar */}
      <p className="mt-8 text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          to="/login"
          className="text-sm text-[#991B1F] cursor-pointer hover:underline font-bold"
        >
          Daftar dong Bestie
        </Link>
      </p>
    </div>
  );
}

export default ForgetPassword;
