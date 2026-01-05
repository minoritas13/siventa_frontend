import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemData from './pages/ItemData';
import Loan from './pages/Loan';
import LoanForm from './pages/LoanForm';
import Profile from './pages/Profile';
import Help from './pages/Help';

import HomeAdmin from './pages/admin/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item-data" element={<ItemData />} />
                <Route path="/loan" element={<Loan />} />
                <Route path="/loan/form" element={<LoanForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
                
                <Route path="/admin/home" element={<HomeAdmin />} />
            </Routes>
        </Router>
    );
}

export default App;
