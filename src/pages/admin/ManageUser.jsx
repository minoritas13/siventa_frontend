import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Users, Search, Trash2 } from 'lucide-react';
import api from '../../services/api';

const ManageUser = () => {
  // --- STATE MANAGEMENT ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- FETCH DATA USER ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/user');
      const userData = res.data.data ?? [];
      setUsers(userData);
    } catch (error) {
      console.error('Gagal mengambil data user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- SISTEM HAPUS USER ---
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`);
    
    if (confirmDelete) {
      try {
        await api.delete(`/user/${id}`);
        // Update state lokal agar user yang dihapus hilang dari tabel tanpa reload full
        setUsers(users.filter((user) => user.id !== id));
        alert("User berhasil dihapus");
      } catch (error) {
        console.error("Gagal menghapus user:", error);
        alert("Gagal menghapus user. Silakan coba lagi.");
      }
    }
  };

  // --- LOGIKA PENCARIAN ---
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigasi */}
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header Halaman */}
        <header className="mb-8">
          <h1 className="text-xl md:text-2xl font-medium text-black">Manajemen Pengguna</h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Kelola data akses, peran, dan status akun pengguna SIVENTA.
          </p>
        </header>

        {/* Toolbar Pencarian */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama staf atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1F]/10 focus:border-[#C4161C] shadow-sm"
            />
          </div>
        </div>

        {/* Tabel Daftar Pengguna */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <Users size={20} className="text-[#C4161C]" />
            <h3 className="font-medium text-gray-800">Daftar Pengguna Sistem</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-medium border-b border-gray-100">
                  <th className="px-6 py-4">Profil Pengguna</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4 text-center">Peran / Role</th>
                  <th className="px-6 py-4 text-center">Status Akun</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400 text-sm">
                      Memuat data pengguna...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                            <img
                              src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=C4161C&color=fff`}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
                              {user.divisi || 'STAFF'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] px-4 py-1.5 rounded-full font-medium shadow-sm inline-block min-w-[80px] ${
                          user.role?.toLowerCase() === 'admin' 
                          ? 'bg-[#C4161C] text-white' 
                          : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-100 text-green-600 border border-green-200 text-[10px] px-4 py-1.5 rounded-full font-medium shadow-sm">
                          Aktif
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {/* Tombol Hapus dengan fungsi handleDelete */}
                        <button 
                          onClick={() => handleDelete(user.id, user.name)}
                          className="p-2.5 bg-red-50 text-[#C4161C] hover:bg-[#C4161C] hover:text-white rounded-xl transition-all active:scale-90 shadow-sm border border-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">
                      Data pengguna tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Tabel */}
          <div className="p-5 bg-gray-50/50 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              Total Entitas: {filteredUsers.length} User Terdaftar
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageUser;
