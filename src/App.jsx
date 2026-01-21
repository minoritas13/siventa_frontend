import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // 2. Import ProtectedRoute

// Import Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

// Staff Pages
import Home from './pages/staff/Home';
import ItemData from './pages/staff/ItemData';
import Loan from './pages/staff/Loan';
import LoanForm from './pages/staff/LoanForm';
import Profile from './pages/staff/Profile';
import Help from './pages/staff/Help';
import ItemDetail from './pages/staff/ItemDetail';

// Admin Pages
import HomeAdmin from './pages/admin/Home';
import ManageAsset from './pages/admin/ManageAsset';
import Borrow from './pages/admin/Borrow';
import Report from './pages/admin/Report';
import ManageUser from './pages/admin/ManageUser';
import AddAsset from './pages/admin/AddAsset';
import EditAsset from './pages/admin/EditAsset';

function App() {
  return (
    // 3. Bungkus dengan AuthProvider agar data user bisa diakses di semua halaman
    <AuthProvider>
      <Router>
        <Routes>
          {/* ============================= RUTE PUBLIK ============================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ============================= RUTE STAFF (USER) ============================= */}
          {/* Semua rute di bawah ini hanya bisa diakses jika role = staff */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={['staff']}><Home /></ProtectedRoute>} />
          <Route path="/item-data" element={<ProtectedRoute allowedRoles={['staff']}><ItemData /></ProtectedRoute>} />
          <Route path="/loan" element={<ProtectedRoute allowedRoles={['staff']}><Loan /></ProtectedRoute>} />
          <Route path="/loan/form/:id" element={<ProtectedRoute allowedRoles={['staff']}><LoanForm /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['staff']}><Profile /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute allowedRoles={['staff']}><Help /></ProtectedRoute>} />
          <Route path="/detail" element={<ProtectedRoute allowedRoles={['staff']}><ItemDetail /></ProtectedRoute>} />

          {/* ============================= RUTE ADMIN ============================= */}
          {/* Semua rute di bawah ini hanya bisa diakses jika role = admin */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><HomeAdmin /></ProtectedRoute>} />
          <Route path="/manage-asset" element={<ProtectedRoute allowedRoles={['admin']}><ManageAsset /></ProtectedRoute>} />
          <Route path="/borrow" element={<ProtectedRoute allowedRoles={['admin']}><Borrow /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute allowedRoles={['admin']}><Report /></ProtectedRoute>} />
          <Route path="/manage-user" element={<ProtectedRoute allowedRoles={['admin']}><ManageUser /></ProtectedRoute>} />
          <Route path="/add-asset" element={<ProtectedRoute allowedRoles={['admin']}><AddAsset /></ProtectedRoute>} />
          <Route path="/edit-asset" element={<ProtectedRoute allowedRoles={['admin']}><EditAsset /></ProtectedRoute>} />

          {/* FALLBACK: Jika rute tidak ditemukan, arahkan ke login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
