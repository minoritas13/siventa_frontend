import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Context & Keamanan
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import Halaman Publik
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

// Import Halaman Staff
import Home from "./pages/staff/Home";
import ItemData from "./pages/staff/ItemData";
import Loan from "./pages/staff/Loan";
import LoanForm from "./pages/staff/LoanForm";
import Profile from "./pages/staff/Profile";
import Help from "./pages/staff/Help";
import ItemDetail from "./pages/staff/ItemDetail";
import ChangePassword from "./pages/staff/ChangePassword";
import LoanData from "./pages/staff/LoanData";

// Import Halaman Admin
import HomeAdmin from "./pages/admin/Home";
import ManageAsset from "./pages/admin/ManageAsset";
import Borrow from "./pages/admin/Borrow";
import Report from "./pages/admin/Report";
import ManageUser from "./pages/admin/ManageUser";
import AddAsset from "./pages/admin/AddAsset";
import EditAsset from "./pages/admin/EditAsset";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- Rute Publik --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* --- Rute Staff (Satu Baris) --- */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={["staff"]}><Home /></ProtectedRoute>} />
          <Route path="/item-data" element={<ProtectedRoute allowedRoles={["staff"]}><ItemData /></ProtectedRoute>} />
          <Route path="/loan" element={<ProtectedRoute allowedRoles={["staff"]}><Loan /></ProtectedRoute>} />
          <Route path="/loan/form/:id" element={<ProtectedRoute allowedRoles={["staff"]}><LoanForm /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["staff"]}><Profile /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute allowedRoles={["staff"]}><Help /></ProtectedRoute>} />
          <Route path="/item-detail/:id" element={<ProtectedRoute allowedRoles={["staff"]}><ItemDetail /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute allowedRoles={["staff"]}><ChangePassword /></ProtectedRoute>} />
          <Route path="/loan-data" element={<ProtectedRoute allowedRoles={["staff"]}><LoanData /></ProtectedRoute>} />

          {/* --- Rute Admin (Satu Baris) --- */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><HomeAdmin /></ProtectedRoute>} />
          <Route path="/manage-asset" element={<ProtectedRoute allowedRoles={["admin"]}><ManageAsset /></ProtectedRoute>} />
          <Route path="/borrow" element={<ProtectedRoute allowedRoles={["admin"]}><Borrow /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute allowedRoles={["admin"]}><Report /></ProtectedRoute>} />
          <Route path="/manage-user" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUser /></ProtectedRoute>} />
          <Route path="/add-asset" element={<ProtectedRoute allowedRoles={["admin"]}><AddAsset /></ProtectedRoute>} />
          <Route path="/edit-asset/:id" element={<ProtectedRoute allowedRoles={["admin"]}><EditAsset /></ProtectedRoute>} />

          {/* --- Fallback --- */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
