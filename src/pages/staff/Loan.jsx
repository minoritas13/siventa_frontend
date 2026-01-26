import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Search } from "lucide-react";
import { MdAssignmentReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Loan = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [loadingLoan, setLoadingLoan] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("terbaru");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        setLoadingLoan(true);

        const [itemsRes, categoriesRes, loansRes] = await Promise.all([
          api.get("/items"),
          api.get("/categories"),
          api.get("/loans"),
        ]);

        if (!isMounted) return;

        const items = Array.isArray(itemsRes?.data?.data)
          ? itemsRes.data.data
          : [];

        const mappedItems = items.map((item) => ({
          id: item.id,
          kode: item.kode,
          nama: item.name,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          kategoriId: Array.isArray(item.kategori_id)
            ? item.kategori_id[0]
            : item.kategori_id,
          kategoriNama: Array.isArray(item.kategori_id)
            ? item.kategori_id[1]
            : "Tanpa Kategori",
          stock: item.stock ?? 0,
          status: item.stock > 0 ? `Tersedia ${item.stock}` : "Habis",
          createdAt: item.created_at,
        }));

        const loansRaw = Array.isArray(loansRes?.data?.data)
          ? loansRes.data.data
          : [];

        const mappedLoans = loansRaw
          .filter((loan) => loan.status !== "dikembalikan")
          .map((loan) => ({
            id: loan.id,
            loan_date: loan.loan_date,
            return_date: loan.return_date,
            loan_items: loan.loan_items ?? [],
          }));

        setInventoryData(mappedItems);
        setCategories(categoriesRes?.data?.data ?? []);
        setDataPinjaman(mappedLoans);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        if (isMounted) setLoadingLoan(false);
      }
    };

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  /* ================= FILTER & SORT ================= */
  const filteredInventory = inventoryData
    .filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        String(item.kategoriId) === String(selectedCategory);

      return matchSearch && matchCategory;
    })
    .sort((a, b) =>
      sortBy === "terbaru"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  /* ================= HANDLE RETURN ================= */
  const handleReturn = async (loanId) => {
    try {
      await api.put(`/loan/update/${loanId}`);
      setDataPinjaman((prev) => prev.filter((l) => l.id !== loanId));
    } catch (error) {
      console.error("Gagal mengembalikan barang:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-12 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Peminjaman Aset</h1>
          <p className="text-sm text-gray-500">
            Ajukan dan kelola peminjaman barang kantor.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="flex-1">
            <div className="bg-white border rounded-xl p-4 mb-8 flex flex-wrap gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau kode aset..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-xs"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg text-xs"
              >
                <option value="all">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg text-xs"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow border overflow-hidden"
                >
                  <img
                    src={item.asset}
                    alt={item.nama}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4">
                    <div className="flex justify-between text-[10px] mb-2">
                      <span className="uppercase text-gray-400">
                        {item.kategoriNama}
                      </span>
                      <span
                        className={`px-2 rounded text-white ${
                          item.stock > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm mb-4">
                      {item.nama}
                    </h3>

                    <button
                      onClick={() => navigate(`/loan/form/${item.id}`)}
                      className="w-full py-2 bg-[#991B1F] text-white rounded-lg"
                    >
                      + Pinjam Barang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-[320px]">
            <div className="bg-white p-6 rounded-2xl border shadow sticky top-24">
              <h2 className="font-bold mb-4">
                Status Peminjaman ({dataPinjaman.length})
              </h2>

              {loadingLoan ? (
                <p className="text-xs text-gray-400 text-center">
                  Memuat data...
                </p>
              ) : dataPinjaman.length === 0 ? (
                <p className="text-xs text-gray-400 text-center">
                  Tidak ada peminjaman aktif
                </p>
              ) : (
                dataPinjaman.map((loan) => (
                  <React.Fragment key={loan.id}>
                    {loan.loan_items.map((li) => (
                      <div
                        key={li.id}
                        className="border rounded-xl p-4 mb-3"
                      >
                        <p className="text-xs font-bold mb-2">
                          {li.item?.name}
                        </p>

                        <button
                          onClick={() => handleReturn(loan.id)}
                          className="w-full py-2 text-[10px] bg-[#991B1F] text-white rounded-lg flex items-center justify-center gap-2"
                        >
                          <MdAssignmentReturn size={14} />
                          Kembalikan
                        </button>
                      </div>
                    ))}
                  </React.Fragment>
                ))
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loan;
