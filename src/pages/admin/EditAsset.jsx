import React from 'react';
import { Camera, Save } from 'lucide-react';
import Sidebar from '../../components/Sidebar'; // Sesuaikan path-nya

const EditAsset = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Formulir Tambah Aset</h1>
          <p className="text-gray-500">Tambah atau edit detail barang inventaris</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Upload Foto */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Barang</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer aspect-square">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Camera className="text-white" size={24} />
              </div>
              <p className="text-center font-medium text-gray-800">Klik Untuk Upload</p>
              <p className="text-center text-xs text-gray-400 mt-1">atau drag and drop foto di sini</p>
            </div>
          </div>

          {/* Kolom Kanan: Detail Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Kode Barang */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kode Barang</label>
              <input
                type="text"
                placeholder="Camera sony-HD-1280"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Nama Barang */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Barang</label>
              <input
                type="text"
                placeholder="Masukkan nama barang lengkap (ex; camera sony 1280)"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none appearance-none bg-white">
                <option>Pilih Kategori</option>
                <option>Elektronik</option>
                <option>Furniture</option>
                <option>Kendaraan</option>
              </select>
            </div>

            {/* Kondisi & Status (Grid 2 Kolom) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kondisi</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none appearance-none bg-white">
                  <option>Pilih Kondisi</option>
                  <option>Baik</option>
                  <option>Rusak Ringan</option>
                  <option>Rusak Berat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status Ketersediaan</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none appearance-none bg-white">
                  <option>Pilih Status</option>
                  <option>Tersedia</option>
                  <option>Dipinjam</option>
                  <option>Dalam Perbaikan</option>
                </select>
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Tambahan</label>
              <textarea
                rows="4"
                placeholder="Keterangan kondisi atau kelengkapan lainnya"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
              ></textarea>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4">
              <button className="px-8 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                Batal
              </button>
              <button className="px-8 py-2 bg-red-700 text-white rounded-md flex items-center gap-2 hover:bg-red-800 transition-colors">
                <Save size={18} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditAsset;
