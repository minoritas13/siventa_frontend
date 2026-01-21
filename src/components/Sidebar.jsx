import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, FileText, LogOut, Menu, X, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext"; 
import api from "../services/api"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  
  // State untuk data profil (User Object)
  const [user, setUser] = useState(null);

  // =============================
  // FETCH DATA USER (IDENTIK DENGAN PROFILE)
  // =============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/me");
        // Mengambil data dari res.data.data atau res.data sesuai struktur API Anda
        const userData = res.data.data || res.data;
        setUser(userData);
      } catch (error) {
        console.error("Gagal mengambil profil sidebar:", error);
      }
    };
    fetchProfile();
  }, []);

  // =============================
  // LOGIKA LOGOUT
  // =============================
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      await logout();
      navigate("/login");
    }
  };

  const menuUtama = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Kelola Aset", path: "/manage-asset", icon: <Package size={18} /> },
    { name: "Peminjaman", path: "/borrow", icon: <ClipboardList size={18} /> },
    { name: "Laporan", path: "/report", icon: <FileText size={18} /> },
  ];

  const menuLainnya = [
    { name: "Pengguna", path: "/manage-user", icon: <Users size={18} /> },
  ];

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <button onClick={() => setIsOpen(true)} className="text-[#991B1F]">
          <Menu size={26} />
        </button>
        <h1 className="font-black text-[#991B1F] tracking-tight pr-3">SIVENTA</h1>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* SIDEBAR ASIDE */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-[280px] h-screen bg-[#991B1F] flex flex-col text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* LOGO SECTION */}
        <div className="p-8 text-center border-b border-white/20 relative">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 md:hidden text-white/70 hover:text-white">
            <X size={20} />
          </button>
          <div className="bg-white inline-block px-4 py-0.5 mb-2 rounded-sm">
            <h1 className="text-[#991B1F] text-2xl font-black tracking-tighter">
              <span>SIVE</span><span className="text-black">NTA</span>
            </h1>
          </div>
          <p className="text-[10px] leading-tight font-normal tracking-widest">Sistem Inventaris Biro ANTARA Lampung</p>
        </div>

        {/* NAV LINKS */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-8">
            <p className="text-[10px] font-medium uppercase opacity-60 mb-4 ml-4 tracking-widest">MENU UTAMA</p>
            <nav className="space-y-1">
              {menuUtama.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-6 py-3 rounded-xl transition-all font-bold ${isActive ? "bg-white text-[#991B1F] shadow-md" : "hover:bg-white/10 text-white"}`}
                >
                  {item.icon} <span className="text-[15px]">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase opacity-60 mb-4 ml-4 tracking-widest">LAINNYA</p>
            <nav className="space-y-1">
              {menuLainnya.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-6 py-3 rounded-xl transition-all font-bold ${isActive ? "bg-white text-[#991B1F] shadow-lg" : "hover:bg-white/10 text-white"}`}
                >
                  {item.icon} <span className="text-[15px]">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* FOOTER USER INFO (DISAMAKAN DENGAN HALAMAN PROFILE) */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-gray-200 shrink-0">
              {/* LOGIKA FOTO IDENTIK DENGAN PROFILE */}
              <img 
                src={user?.photo 
                    ? `${process.env.REACT_APP_API_URL}/storage/${user.photo}` 
                    : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ffffff&color=991B1F`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="truncate">
              <h2 className="text-[12px] font-bold leading-none truncate">
                {user?.name || "Loading..."}
              </h2>
              <p className="text-[10px] opacity-60 truncate mt-1">
                {user?.email || "Memuat email..."}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white hover:text-[#991B1F] text-white py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
