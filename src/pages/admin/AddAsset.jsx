import React, { useEffect, useState, useRef } from "react";
import { Camera, Save } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddAsset = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [form, setForm] = useState({
    category_id: "",
    code: "",
    name: "",
    photo: null,
    stock: "",
    condition: "",
    description: "",
    umur_barang: "",
    tanggal_perolehan: "",
    nilai_perolehan: "",
  });

  /* =========================
     FETCH KATEGORI
  ========================= */
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data.data ?? res.data);
      })
      .catch(() => {
        console.error("Gagal mengambil kategori");
      });
  }, []);

  /* =========================
     HANDLER
  ========================= */
  const handleBack = () => {
    navigate("/manage-asset");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      photo: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    try {
      await api.post("/item/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/manage-asset");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Formulir Tambah Aset
          </h1>
          <p className="text-gray-500">Tambah detail barang inventaris</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KODE BARANG */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Kode Barang
            </label>
            <input
              type="text"
              name="code"
              required
              value={form.code}
              onChange={handleChange}
              placeholder="Contoh: Camera sony HD-1280"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* TANGGAL PEROLEHAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tanggal Perolehan
            </label>
            <input
              type="date"
              name="tanggal_perolehan"
              required
              value={form.tanggal_perolehan || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* NAMA BARANG */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Barang
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama barang lengkap"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* NILAI PEROLEHAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nilai Perolehan
            </label>
            <input
              type="number"
              name="nilai_perolehan"
              required
              value={form.nilai_perolehan || ""}
              onChange={handleChange}
              placeholder="Masukkan nilai barang"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="category_id"
              required
              value={form.category_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* UMUR BARANG */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Umur Barang
            </label>
            <input
              type="number"
              name="umur_barang"
              required
              value={form.umur_barang || ""}
              onChange={handleChange}
              placeholder="Masukkan umur barang"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* KONDISI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Kondisi
            </label>
            <select
              name="condition"
              required
              value={form.condition}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
            >
              <option value="">Pilih Kondisi</option>
              <option value="baik">Baik</option>
              <option value="rusak ringan">Rusak Ringan</option>
              <option value="rusak berat">Rusak Berat</option>
            </select>
          </div>

          {/* JUMLAH BARANG */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Jumlah Barang (opsional)
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Masukkan jumlah"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* FOTO BARANG (FIXED) */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Foto Barang
            </label>

            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-dashed border-gray-300 rounded-md p-6 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ) : (
                <>
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Camera size={18} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-500">
                    atau drag and drop upload gambar disini
                  </span>
                </>
              )}
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deskripsi Tambahan
            </label>
            <textarea
              rows="6"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Keterangan kondisi atau kelengkapan lainnya"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-2 bg-red-700 text-white rounded-md flex items-center gap-2 hover:bg-red-800 transition-colors"
          >
            <Save size={18} />
            Simpan
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddAsset;
