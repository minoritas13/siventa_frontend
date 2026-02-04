import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavbarGuest from "../components/NavbarGuest";
import Footer from "../components/Footer";
import api from "../services/api";

function ResetPassword() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const submitResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Password berhasil direset, silakan login");
      setIsError(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset gagal");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Link reset password tidak valid atau sudah kadaluwarsa.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <NavbarGuest />

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <form 
          onSubmit={submitResetPassword} 
          className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm bg-white"
        >
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Reset Password
          </h2>

          {/* Feedback Message dengan gaya yang sama seperti Login Error */}
          {message && (
            <div className={`mb-4 p-3 border-l-4 text-sm ${
              isError 
                ? "bg-red-50 border-[#C4161C] text-[#C4161C]" 
                : "bg-green-50 border-green-500 text-green-700"
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Kata Sandi Baru
              </label>
              <input
                type="password"
                required
                placeholder="Password Baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                required
                placeholder="Konfirmasi Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-[#C4161C] hover:bg-[#A31217] disabled:bg-gray-400 text-white font-medium rounded-lg transition-all shadow-md active:scale-[0.98] mt-6"
          >
            {loading ? "Memproses..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Sudah ingat password Anda?{" "}
          <Link
            to="/login"
            className="text-[#C4161C] hover:underline font-medium"
          >
            Masuk sekarang
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;
