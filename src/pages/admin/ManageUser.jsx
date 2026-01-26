import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Users, Search, Filter, Trash2, ChevronDown, UserPlus } from 'lucide-react';
import api from '../../services/api';

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/user');
        setUsers(res.data.data ?? []);
      } catch (error) {
        console.error('Gagal mengambil data user:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-black font-sans">Manajemen Pengguna</h1>
            <p className="text-gray-500 text-xs md:text-sm">
              Kelola data akses, peran, dan status akun pengguna SIVENTA.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#991B1F] text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm hover:scale-105 transition-all">
            <UserPlus size={18} />
            Tambah User
          </button>
        </header>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama staf atau email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1F]/10 focus:border-[#991B1F]"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1 md:flex-none flex items-center justify-between gap-6 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-600 cursor-pointer">
              <span>Role: Semua</span>
              <ChevronDown size={16} />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Table */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="bg-[#991B1F]/10 p-2 rounded-lg text-[#991B1F]">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-gray-800">Daftar Pengguna Sistem</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b">
                  <th className="px-8 py-5">Nama Pengguna</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5 text-center">Role</th>
                  <th className="px-8 py-5 text-center">Status Akun</th>
                  <th className="px-8 py-5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src={
                              user.photo
                                ? user.photo
                                : `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`
                            }
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{user.name}</p>
                          <p className="text-[11px] text-gray-400 uppercase">
                            {user.divisi}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-4 text-sm text-gray-600 font-medium">
                      {user.email}
                    </td>

                    <td className="px-8 py-4 text-center">
                      <span className="bg-[#991B1F] text-white text-[10px] px-5 py-1.5 rounded-full font-bold">
                        {user.role.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-8 py-4 text-center">
                      <span className="bg-green-100 text-green-600 border border-green-200 text-[10px] px-5 py-1.5 rounded-full font-extrabold">
                        AKTIF
                      </span>
                    </td>

                    <td className="px-8 py-4 text-center">
                      <button className="p-2.5 bg-red-50 text-[#991B1F] hover:bg-[#991B1F] hover:text-white rounded-xl">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50/30 border-t flex justify-between items-center">
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Menampilkan {users.length} Total Pengguna
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageUser;
