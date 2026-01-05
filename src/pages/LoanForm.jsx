import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Calendar, X, AlertCircle } from 'lucide-react'; 

const LoanForm = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
                <header className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Peminjaman Aset</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">Hallo, Andi silakan lengkapi formulir di bawah ini untuk mengajukan peminjaman aset.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    
                    {/* Sisi Kiri: Form Pengajuan */}
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            {/* Header Form */}
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                                <div className="bg-[#991B1F] p-2 rounded-lg text-white">
                                    <Search size={18} />
                                </div>
                                <h2 className="font-bold text-gray-800">Formulir Pengajuan Aset</h2>
                            </div>

                            <form className="p-6 md:p-8 space-y-6">
                                {/* Pilih Barang */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700">Pilih Barang</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            placeholder="Masukkan nama barang, kode aset, atau..." 
                                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none transition-all"
                                        />
                                    </div>

                                    {/* Barang yang Dipilih (Selected Item Card) */}
                                    <div className="relative flex items-center gap-4 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            <img src="/img/camera-canon-1300d.jpeg" alt="Selected" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Kamera</span>
                                                <span className="text-[10px] text-gray-400 font-medium">KAMERA CANON D1200</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-800">Kamera Canon D1200</h4>
                                            <p className="text-[11px] text-gray-500 italic leading-none">Tersedia 3 Unit</p>
                                        </div>
                                        <button type="button" className="p-1 hover:bg-red-100 rounded-full transition-colors">
                                            <X size={18} className="text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Tanggal Pinjam & Kembali */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Calendar size={16} className="text-[#991B1F]" /> Tanggal Pinjam
                                        </label>
                                        <input 
                                            type="date" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Calendar size={16} className="text-[#991B1F]" /> Tanggal Kembali
                                        </label>
                                        <input 
                                            type="date" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Keperluan */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700">Keperluan Peminjaman</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="Jelaskan keperluan peminjaman secara singkat..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="w-full md:w-auto px-10 py-3 bg-[#991B1F] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 transition-all flex items-center justify-center gap-2">
                                        Ajukan Peminjaman
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Riwayat Peminjaman Pribadi Section (Bottom) */}
                        <div className="mt-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-[#991B1F] p-2 rounded-lg text-white">
                                    <Calendar size={18} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Riwayat Peminjaman Pribadi</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Riwayat 1 */}
                                <div className="bg-white p-5 border border-gray-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                                            <img src="/img/camera-canon-1300d.jpeg" alt="History" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">Kamera Canon D1200</h4>
                                            <p className="text-[11px] text-gray-400 font-medium">KAMERA • 1 Unit</p>
                                            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                                                <Calendar size={12} /> 18 Desember - 20 Desember 2025
                                            </p>
                                        </div>
                                    </div>
                                    <span className="self-start md:self-center px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wider text-center">
                                        Dikembalikan
                                    </span>
                                </div>

                                {/* Riwayat 2 */}
                                <div className="bg-white p-5 border border-gray-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm opacity-80">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                                            <img src="/img/laptop.jpeg" alt="History" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">Laptop Asus i5 AG700</h4>
                                            <p className="text-[11px] text-gray-400 font-medium">LAPTOP • 1 Unit</p>
                                            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                                                <Calendar size={12} /> 10 Desember - 12 Desember 2025
                                            </p>
                                        </div>
                                    </div>
                                    <span className="self-start md:self-center px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider text-center">
                                        Terlambat
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sisi Kanan: Sidebar Status & Bantuan */}
                    <aside className="w-full lg:w-[320px] order-1 lg:order-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-gray-900">Status Peminjaman</h2>
                                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">2 Aktif</span>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex gap-3">
                                    <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                                        <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] text-orange-500 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Menunggu
                                        </span>
                                        <h4 className="text-[11px] font-bold text-gray-800 mt-1 leading-tight">Kamera Canon D1200 + Tripod</h4>
                                    </div>
                                </div>
                                <div className="p-4 border border-green-100 rounded-xl bg-white shadow-md shadow-green-50/50 flex gap-3">
                                    <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                                        <img src="/img/camera-canon-1300d.jpeg" alt="mini" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Sedang Dipinjam
                                        </span>
                                        <h4 className="text-[11px] font-bold text-gray-800 mt-1 leading-tight">Kamera Canon D1200 + Tripod</h4>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full text-center text-[11px] font-bold text-gray-400 mt-8 hover:text-gray-600 underline underline-offset-4">
                                Lihat Riwayat Lengkap
                            </button>
                        </div>

                        {/* Butuh Bantuan Card */}
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                            <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-sm">
                                <AlertCircle size={18} /> Butuh Bantuan?
                            </div>
                            <p className="text-[11px] text-gray-600 leading-relaxed">
                                Jika mengalami kendala saat mengisi formulir, silakan hubungi admin pengelola barang di Gedung Utama.
                            </p>
                            <button className="text-[11px] text-red-700 font-bold mt-3 underline">Hubungi via WhatsApp</button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoanForm;
