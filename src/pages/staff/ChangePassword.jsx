import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api"
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.put("/change-password", {
        current_password: currentPassword,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Password berhasil diubah");
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setLoading(false);
      navigate("/profile")
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            Ganti Kata Sandi
          </h2>

          <div className="space-y-5">
            {/* Input Kata Sandi Lama */}
            <form onSubmit={submitChangePassword}>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Kata Sandi Lama
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Input Kata Sandi Baru */}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Kata Sandi Baru
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password Baru"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Input Konfirmasi Kata Sandi */}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  required
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Konfirmasi Password Baru"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#C4161C] focus:border-transparent outline-none transition-all"
                />
              </div>

              {message && (
                <p className="mt-4 text-sm text-center text-green-600">
                  {message}
                </p>
              )}

              <button disabled={loading} className="w-full py-3 bg-[#C4161C] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98] mt-6">
                {loading ? "Memproses..." : "Simpan Password"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ChangePassword;
