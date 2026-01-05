import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Handshake, 
  FileText, 
  Users, 
  LogOut, 
  Plus, 
  Box, 
  CheckCircle, 
  Settings, 
  ArrowLeftRight 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Aset', value: 40, icon: <Box className="w-6 h-6" />, color: 'bg-red-700' },
    { label: 'Aset Aktif', value: 35, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-red-700' },
    { label: 'Aset Rusak', value: 5, icon: <Settings className="w-6 h-6" />, color: 'bg-red-700' },
    { label: 'Dipinjam', value: 10, icon: <ArrowLeftRight className="w-6 h-6" />, color: 'bg-red-700' },
  ];

  const loanData = [
    { staff: 'Budi Santoso', role: 'Redaksi', item: 'Kamera Canon EOS 5D', date: '20 Okt 2023', status: 'Overdue' },
    { staff: 'Siti Aminah', role: 'Fotografer', item: 'Lensa Sony 70-200mm', date: '21 Okt 2023', status: 'Overdue' },
    { staff: 'Rudi Hartono', role: 'Video', item: 'Tripod Manfrotto', date: '22 Okt 2023', status: 'Overdue' },
    { staff: 'Dewi Persik', role: 'Jurnalis', item: 'Mic Wireless Set', date: '23 Okt 2023', status: 'Overdue' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white flex flex-col">
        <div className="p-6 text-center border-b border-red-800">
          <h1 className="text-2xl font-bold bg-white text-black py-1 px-4 inline-block rounded">SIVENTA</h1>
          <p className="text-[10px] mt-2 leading-tight opacity-80 uppercase tracking-wider">Sistem Inventaris Biro ANTARA Lampung</p>
        </div>

        <nav className="flex-1 mt-6 px-4">
          <div className="mb-4">
            <p className="text-xs font-semibold opacity-50 mb-2 uppercase ml-2">Menu Utama</p>
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <SidebarItem icon={<Package size={20} />} label="Kelola Aset" />
            <SidebarItem icon={<Handshake size={20} />} label="Peminjaman" />
            <SidebarItem icon={<FileText size={20} />} label="Laporan" />
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold opacity-50 mb-2 uppercase ml-2">Lainnya</p>
            <SidebarItem icon={<Users size={20} />} label="Pengguna" />
          </div>
        </nav>

        {/* User Profile Area */}
        <div className="p-4 border-t border-red-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border border-white">
               <img src="https://via.placeholder.com/40" alt="avatar" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Admin Inventaris LKBN Antara</p>
              <p className="text-[10px] opacity-70 truncate">admin@antara.co.id</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-red-700 w-fit px-3 py-1 rounded-md text-sm font-bold">
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-500">Selamat datang kembali, pantau inventaris kantor hari ini.</p>
          </div>
          <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition shadow-md">
            <Plus size={18} /> <span className="text-sm font-semibold">Input Aset Baru</span>
          </button>
        </header>

        {/* Statistik Ringkasan Aset */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Aset</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.color} text-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg`}>
                <div className="bg-white/20 p-2 rounded-full mb-2">
                  {stat.icon}
                </div>
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tabel Daftar Pinjaman */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-50">
            <div className="flex items-center gap-2">
               <div className="text-red-700"><Handshake size={20} /></div>
               <h3 className="font-bold text-gray-800">Daftar Pinjaman</h3>
            </div>
            <button className="text-red-700 text-sm font-bold hover:underline">Lihat Semua</button>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 font-bold">
              <tr>
                <th className="px-6 py-4">Staff Peminjam</th>
                <th className="px-6 py-4">Nama Barang</th>
                <th className="px-6 py-4">Tgl Kembali</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loanData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {row.staff.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{row.staff}</p>
                        <p className="text-[10px] text-gray-400">{row.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.item}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-red-50 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full border border-red-100">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

// Helper Component untuk Sidebar Item
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all mb-1 ${active ? 'bg-white text-red-700 font-bold' : 'hover:bg-red-600 text-white opacity-80'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default Dashboard;
