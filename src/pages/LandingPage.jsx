import React from "react";
import Navbar from "../components/NavbarGuest";
import Footer from "../components/Footer";

function LandingPage() {
  const Card = ({ children }) => (
    <div className="bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-50">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* Section Tentang */}
        <section id="tentang" className="text-center">
          <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
            <span>Tentang</span>
            <span className="flex">
            <span className="text-[#991B1F]">SIVE</span>
            <span className="text-black">NTA</span>
            </span>
        </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            <Card>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Sistem Inventaris ANTARA merupakan sistem informasi internal yang dirancang untuk membantu kantor Berita ANTARA dalam mengelola, memantau, dan mendokumentasikan seluruh aset serta barang inventaris secara terpusat, terstruktur, dan transparan. Sistem ini dikembangkan untuk mendukung efektivitas kerja, akuntabilitas aset, serta kebutuhan pelaporan sesuai dengan standar pengelolaan barang milik perusahaan/BUMN.
              </p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                Melalui sistem ini, seluruh proses pengelolaan inventaris mulai dari pencatatan barang masuk, peminjaman, pengembalian, hingga pemantauan kondisi barang dapat dilakukan secara digital, sehingga meminimalkan kesalahan pencatatan manual dan meningkatkan efisiensi operasional.
              </p>
            </Card>
          </div>
        </section>

        {/* Section Tujuan & Manfaat */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Tujuan */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                <span>Tujuan</span>
                <span className="flex">
                <span className="text-[#991B1F]">SIVE</span>
                <span className="text-black">NTA</span>
                </span>
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center italic">Sistem Inventaris ANTARA dikembangkan dengan tujuan untuk:</p>
            <Card>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                <li>Menyediakan data inventaris yang akurat dan terkini.</li>
                <li>Mempermudah pengelolaan aset kantor secara terpusat.</li>
                <li>Meningkatkan transparansi dan akuntabilitas penggunaan barang.</li>
                <li>Mendukung proses audit dan pelaporan inventaris.</li>
                <li>Memastikan ketersediaan barang operasional bagi pegawai.</li>
              </ol>
            </Card>
          </section>

          {/* Manfaat */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                <span>Manfaat</span>
                <span className="flex">
                <span className="text-[#991B1F]">SIVE</span>
                <span className="text-black">NTA</span>
                </span>
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center italic">Sistem Inventaris ANTARA dikembangkan dengan tujuan untuk:</p>
            <Card>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                <li>Menyediakan data inventaris yang akurat dan terkini.</li>
                <li>Mempermudah pengelolaan aset kantor secara terpusat.</li>
                <li>Meningkatkan transparansi dan akuntabilitas penggunaan barang.</li>
                <li>Mendukung proses audit dan pelaporan inventaris.</li>
                <li>Memastikan ketersediaan barang operasional bagi pegawai.</li>
              </ol>
            </Card>
          </section>
        </div>

        {/* Section Fitur Utama */}
        <section className="text-center">
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                <span>Fitur Utama</span>
                <span className="flex">
                <span className="text-[#991B1F]">SIVE</span>
                <span className="text-black">NTA</span>
                </span>
            </h2>
            <p className="text-sm text-gray-500 mb-8 italic">Sistem Inventaris ANTARA menyediakan beberapa fitur utama, antara lain:</p>
            <div className="max-w-4xl mx-auto">
            <Card>
              <ul className="text-sm text-gray-600 space-y-3 text-left list-disc list-outside ml-5">
                <li><span className="font-bold">Dashboard Informasi</span>, untuk menampilkan ringkasan kondisi inventaris secara real-time.</li>
                <li><span className="font-bold">Manajemen Data Barang</span>, untuk menambah, mengubah, dan mengelola data aset.</li>
                <li><span className="font-bold">Peminjaman dan Pengembalian Barang</span>, yang dilengkapi dengan proses persetujuan dan pencatatan riwayat.</li>
                <li><span className="font-bold">Laporan Inventaris</span>, yang dapat diakses oleh pihak berwenang untuk kebutuhan monitoring dan evaluasi.</li>
                <li><span className="font-bold">Manajemen Pengguna</span>, dengan pengaturan hak akses sesuai peran masing-masing pengguna.</li>
              </ul>
            </Card>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
