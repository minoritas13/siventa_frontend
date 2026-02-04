import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Search, Plus, Download, Trash2, Eye, Archive } from "lucide-react";
import api from "../../services/api";
import { STORAGE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ManageAsset = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-asset/${id}`);
  };

  const handleAddAsset = () => {
    navigate("/add-asset");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus aset ini?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/item/delete/${id}`);

      // update state tanpa reload
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus aset", error);
      alert("Terjadi kesalahan saat menghapus aset");
    }
  };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data aset", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      {console.log(items)}

      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Manajemen Aset
            </h1>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl">
              Kelola seluruh aset dan inventaris Kantor Berita ANTARA.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#C4161C] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#AA1419]">
            <Download size={16} />
            Ekspor CSV
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
          <h3 className="font-bold text-sm text-gray-700 mb-4">Cari Aset</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari nama atau kode aset..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C4161C] transition-all"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-[#C4161C] text-white px-6 py-2.5 rounded-lg text-sm font-medium"
              onClick={handleAddAsset}
            >
              <Plus size={18} />
              Tambah Aset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 flex items-center gap-2 text-[#C4161C]">
            <Archive size={20} />
            <h2 className="font-bold text-gray-800">Daftar Barang</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase">
                  <th className="px-6 py-4">Kode Barang</th>
                  <th className="px-6 py-4 text-center">Nama Barang</th>
                  <th className="px-6 py-4 text-center">Kategori</th>
                  <th className="px-6 py-4 text-center">Kondisi</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-sm text-gray-400"
                    >
                      Memuat data...
                    </td>
                  </tr>
                )}

                {!loading && items.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-sm text-gray-400"
                    >
                      Data aset tidak tersedia
                    </td>
                  </tr>
                )}

                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-[11px] font-medium uppercase text-gray-600">
                      {item.code}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.photo
                              ? `${STORAGE_URL}/${item.photo}`
                              : "/img/camera-canon-1300d.jpeg"
                          }
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="text-sm font-bold text-gray-700">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {item.category?.name || "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-4 py-1 rounded-full text-[10px] text-white
                        ${
                          item.condition === "baik"
                            ? "bg-blue-600"
                            : "bg-red-600"
                        }`}
                      >
                        {item.condition}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-1.5 bg-blue-600 text-white rounded"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-1.5 bg-[#C4161C] text-white rounded"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageAsset;
