import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResetPassword() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Lupa Kata Sandi
          </h2>

          <div className="space-y-5">

            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Input Kata Sandi Baru */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Kata Sandi Baru
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Input Konfirmasi Kata Sandi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Tombol Masuk */}
          <button className="w-full py-3 bg-[#C4161C] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98] mt-6">
            Konfirmasi Kata Sandi
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
