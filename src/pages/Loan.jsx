import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Loan = () => {
  const navigate = useNavigate();

  // =============================
  // STATE
  // =============================
  const [inventoryData, setInventoryData] = useState([]);
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [loadingLoan, setLoadingLoan] = useState(true);

  // =============================
  // FETCH DATA (PARALLEL)
  // =============================
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoadingLoan(true);

        const [itemsRes, loansRes] = await Promise.all([
          api.get("/items"),
          api.get("/loans"),
        ]);

        if (!isMounted) return;

        // =============================
        // ITEMS (AMAN)
        // =============================
        const itemsRaw = Array.isArray(itemsRes?.data?.data)
          ? itemsRes.data.data
          : [];

        const mappedItems = itemsRaw.map((item) => ({
          id: item.id,
          kode: item.kode,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          nama: item.name,
          kategori: item.kategori_id?.[1] ?? "-",
          kondisi: item.kondisi === "baik" ? "null" : "Dipinjam",
          stock: item.stock ?? 0,
          status: item.stock > 0 ? "Tersedia" : "Tidak Tersedia",
          photo: item.photo,
          name: item.name,
        }));

        // =============================
        // LOANS (FIX TOTAL)
        // =============================
        const rawLoans = loansRes?.data?.data;
        const loansArray = Array.isArray(rawLoans)
          ? rawLoans
          : rawLoans
          ? [rawLoans]
          : [];

        const mappedLoans = loansArray
          .filter((loan) => loan?.status !== "dikembalikan")
          .map((loan) => ({
            id: loan.id,
            status: loan.status,
            loan_items: Array.isArray(loan.loan_items)
              ? loan.loan_items.map((li) => ({
                  ...li,
                  item:
                    li.item ??
                    mappedItems.find((it) => it.id === li.item_id) ??
                    null,
                }))
              : [],
          }));

        setInventoryData(mappedItems);
        setDataPinjaman(mappedLoans);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        if (isMounted) setLoadingLoan(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // =============================
  // HANDLER
  // =============================
  const handleReturn = async (loanId) => {
    try {
      await api.put(`/loan/update/${loanId}`);
      setDataPinjaman((prev) => prev.filter((loan) => loan.id !== loanId));
    } catch (error) {
      console.error("Gagal mengembalikan barang:", error);
    }
  };

  // =============================
  // RENDER (TIDAK DIUBAH)
  // =============================
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main className="grow max-w-7xl mx-auto w-full px-4 md:px-12 py-6 md:py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Peminjaman Aset
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Hallo, Andi ajukan dan kelola peminjaman barang kantor disini.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Filter */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari aset..."
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#991B1F] outline-none"
                />
              </div>

              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <select className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white">
                    <option>Semua Kategori</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select className="appearance-none w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs text-gray-600 bg-white">
                    <option>Terbaru</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Aset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {inventoryData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="h-44 bg-gray-200 overflow-hidden">
                    <img
                      src={item.asset}
                      alt="asset"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                        {item.kode}
                      </span>

                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-bold ${
                          item.status === "Tersedia"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 mb-5 leading-tight">
                      {item.nama}
                    </h3>

                    <button
                      onClick={() => navigate(`/loan/form/${item.id}`)}
                      className="w-full py-2.5 bg-[#991B1F] text-white rounded-xl text-sm font-bold hover:bg-red-800 transition shadow-lg"
                    >
                      + Pinjam Barang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-[320px] order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-gray-900">Status Peminjaman</h2>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {dataPinjaman.length} Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {loadingLoan ? (
                  <p className="text-xs text-gray-400 text-center">
                    Memuat data peminjaman...
                  </p>
                ) : dataPinjaman.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center">
                    Tidak ada barang yang sedang dipinjam
                  </p>
                ) : (
                  dataPinjaman.map((loan) =>
                    loan.loan_items.map((li) => (
                      <div
                        key={li.id}
                        className="p-4 border border-green-100 rounded-xl bg-white shadow-md shadow-green-50/50"
                      >
                        <div className="flex gap-3 mb-4">
                          <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={
                                li.item?.photo ??
                                "/img/camera-canon-1300d.jpeg"
                              }
                              alt="mini"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-green-600 font-bold">
                              Sedang Dipinjam
                            </span>
                            <h4 className="text-[11px] font-bold text-gray-800">
                              {li.item?.name}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => handleReturn(loan.id)}
                          className="w-full py-2 bg-[#991B1F] text-white text-[10px] rounded-lg font-bold uppercase"
                        >
                          Kembalikan
                        </button>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loan;
