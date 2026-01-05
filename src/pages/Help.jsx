import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, MessageSquare, ChevronDown } from 'lucide-react'; // Import icons

const Help = () => {
    // State untuk FAQ (untuk simulasi accordion)
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "Berapa lama batas peminjaman?",
            answer: "Batas peminjaman standar adalah 3 hari kerja. Namun, jika ada keperluan khusus, Anda bisa mengajukan perpanjangan dengan konfirmasi admin."
        },
        {
            question: "Bagaimana cara meriset password?",
            answer: "Untuk meriset password, Anda bisa menghubungi admin secara langsung atau menggunakan fitur 'Lupa Password' di halaman login (jika tersedia)."
        },
        {
            question: "Bagaimana melakukan peminjaman?",
            answer: "Peminjaman dilakukan melalui halaman 'Peminjaman' di sistem SIVENTA. Pilih barang, tentukan tanggal, isi keperluan, lalu ajukan."
        },
        {
            question: "Bagaimana jika barang yang dipinjam rusak?",
            answer: "Jika barang yang dipinjam rusak, segera laporkan ke admin dengan detail kerusakan dan kronologisnya untuk penanganan lebih lanjut."
        },
        {
            question: "Bagaimana melihat riwayat peminjaman?",
            answer: "Riwayat peminjaman dapat dilihat di halaman 'Peminjaman' pada bagian bawah, atau melalui halaman 'Profile' Anda."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
                <header className="mb-8 md:mb-12">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        Butuh Bantuan dengan Admin Inventaris Kantor?
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-2">
                        Isi formulir di bawah ini atau cari jawaban cepat di bagian FAQ.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* Sisi Kiri: Formulir Kontak */}
                    <div className="flex-1">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            {/* Header Formulir */}
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                                <div className="bg-[#991B1F] p-2 rounded-lg text-white">
                                    <MessageSquare size={18} />
                                </div>
                                <h2 className="font-bold text-gray-800">Formulir Kontak</h2>
                            </div>

                            <form className="p-6 md:p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Nama Lengkap & Email Kantor */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="namaLengkap" className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            id="namaLengkap"
                                            placeholder="Masukkan nama lengkap anda" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="emailKantor" className="text-sm font-semibold text-gray-700">Email Kantor</label>
                                        <input 
                                            type="email" 
                                            id="emailKantor"
                                            placeholder="nama@antara.ac.id" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Subjek / Kategori Masalah */}
                                <div className="space-y-2">
                                    <label htmlFor="subjek" className="text-sm font-semibold text-gray-700">Subjek / Kategori Masalah</label>
                                    <div className="relative">
                                        <select 
                                            id="subjek"
                                            className="appearance-none w-full px-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-[#991B1F] outline-none"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="peminjaman">Masalah Peminjaman</option>
                                            <option value="akun">Masalah Akun</option>
                                            <option value="teknis">Kendala Teknis</option>
                                            <option value="lain-lain">Lain-lain</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Pesan Anda */}
                                <div className="space-y-2">
                                    <label htmlFor="pesan" className="text-sm font-semibold text-gray-700">Pesan Anda</label>
                                    <textarea 
                                        id="pesan"
                                        rows="6" 
                                        placeholder="Jelaskan kendala atau pertanyaan anda secara detail."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#991B1F] outline-none resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="w-full md:w-auto px-10 py-3 bg-[#991B1F] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 transition-all flex items-center justify-center gap-2">
                                        Ajukan Pesan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sisi Kanan: Kontak Langsung & FAQ */}
                    <aside className="w-full lg:w-[380px] space-y-8">
                        {/* Kontak Langsung */}
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                            <h2 className="font-bold text-gray-900 mb-5">Kontak Langsung</h2>
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-200 p-3 rounded-full text-red-700 shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700">Email Admin</p>
                                        <a href="mailto:admin@antara.co.id" className="text-xs text-red-600 hover:underline">
                                            admin@antara.co.id
                                        </a>
                                    </div>
                                </div>
                                {/* Telepon */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-200 p-3 rounded-full text-red-700 shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700">Telepon</p>
                                        <a href="tel:+6281234567890" className="text-xs text-red-600 hover:underline">
                                            021-9978-88653
                                        </a>
                                    </div>
                                </div>
                                {/* Lokasi */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-200 p-3 rounded-full text-red-700 shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700">Lokasi Kantor</p>
                                        <p className="text-xs text-gray-600 leading-snug">
                                            Jl. Abdi Negara No.2, Gulak Galik, IBAH
                                            Antara LT Gedung Lampung, Lampung
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Singkat */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="font-bold text-gray-900 mb-5">FAQ Singkat</h2>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                                        <button 
                                            className="w-full flex justify-between items-center p-4 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleFaq(index)}
                                        >
                                            {faq.question}
                                            <ChevronDown 
                                                size={18} 
                                                className={`transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#991B1F]' : 'text-gray-500'}`} 
                                            />
                                        </button>
                                        <div 
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                openFaq === index ? 'max-h-40 opacity-100 py-3 px-4' : 'max-h-0 opacity-0'
                                            } bg-gray-50 text-xs text-gray-600 border-t border-gray-100`}
                                        >
                                            {faq.answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Help;
