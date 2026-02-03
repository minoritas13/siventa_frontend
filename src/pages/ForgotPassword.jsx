import { useState } from "react";
import api from "../services/api"; // axios instance

export default function ForgotPassword() {
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
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h2>Lupa Password</h2>

      <form onSubmit={submitForgotPassword}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button disabled={loading} style={{ width: "100%", padding: 10, backgroundColor: "red" }}>
          {loading ? "Mengirim..." : "Kirim Link Reset"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 12, fontSize: 14 }}>{message}</p>
      )}
    </div>
  );
}
