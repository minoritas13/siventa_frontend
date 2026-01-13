import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const login = async (email, password) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return user; // <--- Kembalikan data user di sini
  };

  // =============================
  // FUNGSI REGISTER
  // =============================
  const register = async (userData) => {
    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        role: "staff", 
        divisi: "Uji Coba" // Pastikan ejaannya huruf kecil semua
      };

      const response = await api.post("/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // =============================
  // FUNGSI LOGOUT
  // =============================
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.warn("Logout API gagal:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
    }
  };

  return (
    // JANGAN LUPA: Tambahkan 'register' ke dalam value Provider
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
