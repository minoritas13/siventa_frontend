import React, { useEffect, useState, useRef } from "react";
import { Camera, Save } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import api, { STORAGE_URL } from "../../services/api";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State untuk menampung error per input

  const [form, setForm] = useState({
    category_id: "",
    code: "",
    name: "",
    photo: null,
    stock: "",
    condition: "",
    description: "",
    umur_barang: 0,
    tanggal_perolehan: "",
    nilai_perolehan: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryRes, itemRes] = await Promise.all([
          api.get("/categories"),
          api.get(`/item/${id}`),
        ]);

        const data = itemRes.data.data;

        setCategories(categoryRes.data.data);

        setForm({
          category_id: data.category_id ?? "",
          code: data.code ?? "",
          name: data.name ?? "",
          photo: null, // Photo null jika tidak ingin ganti gambar
          stock: data.stock ?? "",
          condition: data.condition ?? "",
          description: data.description ?? "",
          umur_barang: data.umur_barang ?? 0,
          tanggal_perolehan: data.tanggal_perolehan ?? "",
          nilai_perolehan: data.nilai_perolehan ?? "",
        });

        if (data.photo) {
          setPhotoPreview(`${STORAGE_URL}/${data.photo}`);
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
        alert("Gagal memuat data aset");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate("/manage-asset");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Hapus error saat user mulai mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // LOGIKA OTOMATIS UMUR BARANG
      if (name === "tanggal_perolehan") {
        if (value) {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          updatedForm.umur_barang = age < 0 ? 0 : age;
        } else {
          updatedForm.umur_barang = 0;
        }
      }

      return updatedForm;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrors((prev) => ({ ...prev, photo: null }));

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
    const newErrors = {};

    // Validasi field wajib
    if (!form.code) newErrors.code = "Kode barang wajib diisi";
    if (!form.name) newErrors.name = "Nama barang wajib diisi";
    if (!form.category_id) newErrors.category_id = "Kategori wajib dipilih";
    if (!form.condition) newErrors.condition = "Kondisi wajib dipilih";
    if (!form.tanggal_perolehan) newErrors.tanggal_perolehan = "Tanggal perolehan wajib diisi";
    if (!form.nilai_perolehan) newErrors.nilai_perolehan = "Nilai perolehan wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== "" && form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      formData.append("_method", "PUT");

      await api.post(`/item/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/manage-asset");
    } catch (error) {
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
      alert("Gagal menyimpan data");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 flex items-center justify-center text-gray-500 font-medium">
          Memuat data...
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">
            Formulir Edit Aset
          </h1>
          <p className="text-gray-500">Perbarui detail barang inventaris</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KODE BARANG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Contoh: Camera sony HD-1280"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none transition-all ${
                errors.code ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>

          {/* TANGGAL PEROLEHAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Perolehan <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_perolehan"
              value={form.tanggal_perolehan}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none transition-all ${
                errors.tanggal_perolehan ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.tanggal_perolehan && <p className="text-red-500 text-xs mt-1">{errors.tanggal_perolehan}</p>}
          </div>

          {/* NAMA BARANG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama barang lengkap"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none transition-all ${
                errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* NILAI PEROLEHAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nilai Perolehan <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="nilai_perolehan"
              value={form.nilai_perolehan}
              onChange={handleChange}
              placeholder="Masukkan nilai barang"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none transition-all ${
                errors.nilai_perolehan ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.nilai_perolehan && <p className="text-red-500 text-xs mt-1">{errors.nilai_perolehan}</p>}
          </div>

          {/* KATEGORI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none bg-white transition-all ${
                errors.category_id ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
          </div>

          {/* UMUR BARANG (Otomatis) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Umur Barang (Tahun)
            </label>
            <input
              type="text"
              name="umur_barang"
              readOnly
              value={form.umur_barang}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none font-semibold text-gray-600"
            />
          </div>

          {/* KONDISI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kondisi <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none bg-white transition-all ${
                errors.condition ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Kondisi</option>
              <option value="baik">Baik</option>
              <option value="rusak ringan">Rusak Ringan</option>
              <option value="rusak berat">Rusak Berat</option>
            </select>
            {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
          </div>

          {/* JUMLAH BARANG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Barang (opsional)
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Masukkan jumlah"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none"
            />
          </div>

          {/* FOTO BARANG */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Barang
            </label>

            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-dashed border-gray-300 rounded-md p-6 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-all"
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
                  <div className="w-10 h-10 bg-[#C4161C] rounded-full flex items-center justify-center">
                    <Camera size={18} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-500">
                    klik untuk ganti gambar disini
                  </span>
                </>
              )}
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Tambahan
            </label>
            <textarea
              rows="6"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Keterangan kondisi atau kelengkapan lainnya"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C4161C] focus:outline-none"
            />
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-2 border border-[#C4161C] text-[#C4161C] rounded-md hover:bg-red-50 transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#C4161C] text-white rounded-md flex items-center gap-2 hover:bg-[#AA1419] transition-colors shadow-md"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditAsset;
