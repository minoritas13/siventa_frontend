import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Package, CheckCircle, Wrench, Bell, Box } from 'lucide-react';

const ManageUser = () => {
  // Data dummy kartu ringkasan sesuai desain (Horizontal)
  const stats = [
    { label: 'Total Aset', value: '40', icon: <Box size={20} />, bg: 'bg-[#991B1F]' },
    { label: 'Aset Aktif', value: '35', icon: <CheckCircle size={20} />, bg: 'bg-[#991B1F]' },
    { label: 'Aset Rusak', value: '5', icon: <Wrench size={20} />, bg: 'bg-[#991B1F]' },
    { label: 'Dipinjam', value: '10', icon: <Package size={20} />, bg: 'bg-[#991B1F]' },
  ];

  // Data dummy tabel pinjaman sesuai kolom di desain
  const pinjaman = [
    { staff: 'Budi Santoso', divisi: 'Redaksi Foto', kode: 'CAM CANON D1200-001', barang: 'Sony Alpha A7 III', pinjam: '12 Oktober 2025', kembali: '14 Oktober 2025', status: 'Selesai', color: 'bg-[#53EC53]', text: 'text-white', foto: '/foto-andi.png' },
    { staff: 'Siti Aminah', divisi: 'Redaksi Video', kode: 'CAM CANON D1200-001', barang: 'DJI Ronin S', pinjam: '13 Oktober 2025', kembali: '21 Oktober 2025', status: 'Selesai', color: 'bg-[#53EC53]', text: 'text-white', foto: '/foto-andi.png' },
    { staff: 'Rizky Pratama', divisi: 'IT Support', kode: 'CAM CANON D1200-001', barang: 'MacBook Pro M2', pinjam: '12 Oktober 2025', kembali: '21 Oktober 2025', status: 'Selesai', color: 'bg-[#53EC53]', text: 'text-white', foto: '/foto-andi.png' },
    { staff: 'Anton Wijaya', divisi: 'Redaksi Video', kode: 'CAM CANON D1200-001', barang: 'Sennheiser Mic Kit', pinjam: '12 Oktober 2025', kembali: '21 Oktober 2025', status: 'Terlambat', color: 'bg-[#FF0000]', text: 'text-white', foto: '/foto-andi.png' },
    { staff: 'Dewi Lestari', divisi: 'Koresponden', kode: 'CAM CANON D1200-001', barang: 'Lensa Canon 70-200mm', pinjam: '12 Oktober 2025', kembali: '21 Oktober 2025', status: 'Dipinjam', color: 'bg-[#FBBF24]', text: 'text-white', foto: '/foto-andi.png' },
    { staff: 'Anton Wijaya', divisi: 'Redaksi Video', kode: 'CAM CANON D1200-001', barang: 'Sennheiser Mic Kit', pinjam: '12 Oktober 2025', kembali: '21 Oktober 2025', status: 'Terlambat', color: 'bg-[#FF0000]', text: 'text-white', foto: '/foto-andi.png' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header Dashboard */}
        <header className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-black">Dashboard Overview</h1>
          <p className="text-gray-500 text-xs md:text-sm">Selamat datang kembali, pantau inventaris kantor hari ini.</p>
        </header>

        {/* Section Ringkasan Aset (Kartu Horizontal sesuai Desain) */}
        <section className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-black mb-6">Ringkasan Aset</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bg} text-white rounded-xl p-5 flex items-center gap-4 shadow-sm`}>
                <div className="bg-white text-[#991B1F] p-3 rounded-full flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[11px] font-medium opacity-90 uppercase tracking-tight leading-none mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Daftar Pinjaman */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-[#991B1F]" />
              <h3 className="font-bold text-gray-800">Daftar Pinjaman</h3>
            </div>
            <button className="text-[#991B1F] text-xs font-bold hover:underline">
              Lihat Semua
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Staff Peminjam</th>
                  <th className="px-6 py-4">Kode Barang</th>
                  <th className="px-6 py-4">Nama Barang</th>
                  <th className="px-6 py-4">Tanggal Pinjam</th>
                  <th className="px-6 py-4">Tanggal Kembali</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pinjaman.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Container Foto Profil */}
                        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                          {item.foto ? (
                            <img 
                              src={item.foto} 
                              alt={item.staff} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            // Fallback jika foto tidak ada (menggunakan inisial atau UI Avatars)
                            <img 
                              src={`https://ui-avatars.com/api/?name=${item.staff}&background=random`} 
                              alt="avatar" 
                            />
                          )}
                        </div>
                        
                        {/* Informasi Staff */}
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">{item.staff}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{item.divisi}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase tracking-tighter">
                      {item.kode}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {item.barang}
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-600">
                      {item.pinjam}
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-600">
                      {item.kembali}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`${item.color} ${item.text} text-[10px] font-normal px-4 py-1.5 rounded-full shadow-sm`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageUser;
