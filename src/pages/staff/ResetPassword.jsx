import React from "react";
import Navbar from "../../components/Navbar"; // Memastikan Navbar terimport
import Footer from "../../components/Footer"; // Memastikan Footer terimport
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";

function ResetPassword() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Password berhasil direset, silakan login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset gagal");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return <p>Link reset password tidak valid</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <form onSubmit={submitResetPassword}>
          <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-center text-2xl font-bold mb-6 text-black">
              Reset Password
            </h2>

            <div className="space-y-5">
              {/* Input Kata Sandi Baru */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="Password Baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Input Konfirmasi Kata Sandi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#991B1F] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Tombol Masuk */}
            <button disabled={loading} className="w-full py-3 bg-[#991B1F] hover:opacity-90 text-white font-semibold rounded-lg transition-all shadow-md active:scale-[0.98] mt-6">
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;
