import React from "react";

function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 font-sans py-10">
      <div className="w-full max-w-xl border border-gray-200 rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-3xl font-bold mb-8 text-black">
          Daftar SIVENTA
        </h2>

        {/* Google Button */}
        <div className="flex justify-start mb-6">
          <button className="w-1/2 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="truncate text-black">Sign in with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="text-center mb-6">
          <span className="text-black text-sm">atau daftar</span>
        </div>

        <div className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Row Kata Sandi & Ulangi Kata Sandi */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kata sandi</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ulangi kata sandi</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
              />
            </div>
          </div>

          {/* Input Nama Lengkap */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama lengkap</label>
            <input
              type="text"
              placeholder="Nama lengkap"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Checkbox Ketentuan */}
        <div className="flex items-center gap-2 mt-6 mb-6">
          <input 
            type="checkbox" 
            id="terms"
            className="w-4 h-4 rounded border-gray-300 accent-[#991B1F] focus:ring-[#991B1F]" 
          />
          <label htmlFor="terms" className="text-sm text-black">
            Saya menerima Ketentuan Penggunaan
          </label>
        </div>

        {/* Tombol Daftar */}
        <button className="w-full py-3 bg-[#991B1F] hover:bg-[#7f1619] text-white font-bold rounded-md transition-all shadow-md active:scale-[0.98]">
          Daftar
        </button>

        {/* Lupa Kata Sandi */}
        <div className="mt-4">
          <a href="#" className="text-sm text-[#991B1F] hover:underline">
            Lupa kata sandi?
          </a>
        </div>
      </div>

      {/* Link ke Halaman Login */}
      <p className="mt-8 text-sm text-gray-800 font-medium">
        Sudah punya akun?{" "}
        <span className="text-[#991B1F] cursor-pointer hover:underline">
          Masuk
        </span>
      </p>
    </div>
  );
}

export default Register;
