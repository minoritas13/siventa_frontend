import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import { MdAssignmentReturn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Loan = () => {
  const navigate = useNavigate();

  // =============================
  // STATE
  // =============================
  const [inventoryData, setInventoryData] = useState([]);
  const [dataPinjaman, setDataPinjaman] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingLoan, setLoadingLoan] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("terbaru");

  // =============================
  // FETCH DATA
  // =============================
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        setLoadingLoan(true);

        const [itemsRes, loansRes, categoriesRes] = await Promise.all([
          api.get("/items"),
          api.get("/loans"),
          api.get("/categories"),
        ]);

        if (!isMounted) return;

        // =============================
        // ITEMS
        // =============================
        const itemsRaw = Array.isArray(itemsRes?.data?.data)
          ? itemsRes.data.data
          : [];

        const mappedItems = itemsRaw.map((item) => ({
          id: item.id,
          kode: item.code,
          asset: item.photo ?? "/img/camera-canon-1300d.jpeg",
          nama: item.name,
          kategoriId: item.category_id,
          kategoriNama: item.category?.category ?? "Tanpa Kategori",
          stock: item.stock ?? 0,
          status: item.stock > 0 ? `Tersedia ${item.stock}` : "Habis",
          createdAt: item.created_at,
        }));

        // =============================
        // LOANS
        // =============================
        const loansRaw = Array.isArray(loansRes?.data?.data)
          ? loansRes.data.data
          : [];

        const mappedLoans = loansRaw
          .filter((loan) => loan.status !== "dikembalikan")
          .map((loan) => ({
            id: loan.id,
            status: loan.status,
            loan_date: loan.loan_date,
            return_date: loan.return_date,
            note: loan.note,
            user: loan.user ?? null,
            loan_items: Array.isArray(loan.loan_items)
              ? loan.loan_items.map((li) => ({
                  id: li.id,
                  qty: li.qty,
                  item: li.item
                    ? {
                        id: li.item.id,
                        name: li.item.name,
                        photo: li.item.photo,
                        code: li.item.code,
                      }
                    : null,
                }))
              : [],
          }));

        setInventoryData(mappedItems);
        setDataPinjaman(mappedLoans);
        setCategories(categoriesRes.data.data ?? []);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        if (isMounted) setLoadingLoan(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, []);

  // =============================
  // HANDLER RETURN
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
  // FILTER & SORT
  // =============================
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
    .sort((a, b) => {
      return sortBy === "terbaru"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  // =============================
  // RENDER
  // =============================
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Navbar />
      {/* SELURUH JSX ANDA TIDAK DIUBAH */}
      <Footer />
    </div>
  );
};

export default Loan;
