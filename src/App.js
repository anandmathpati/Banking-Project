import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Added Navigate
import Home from './components/Home';
import Transactions from './components/Transactions';
import AddBeneficiary from './components/AddBeneficiary';
import TransferMoney from './components/TransferMoney';
import Profile from './components/Profile';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ViewCustomers from './components/admin/ViewCustomers';
import AccountOpening from './components/admin/AccountOpening';
import AdminTransactions from './components/admin/AdminTransactions';
import PerformTransactions from './components/admin/PerformTransactions';
import KYCVerification from './components/admin/KYCVerification ';
import BalanceInquiry from './components/admin/BalanceInquiry';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <main style={styles.main}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/beneficiaries" element={<ProtectedRoute><AddBeneficiary /></ProtectedRoute>} />
            <Route path="/transfer" element={<ProtectedRoute><TransferMoney /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin-home" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            {/* Additional admin routes */}
            <Route path="/admin/customers" element={<ProtectedRoute><ViewCustomers /></ProtectedRoute>} />
            <Route path="/admin/account-opening" element={<ProtectedRoute><AccountOpening /></ProtectedRoute>} />
            <Route path="/admin/transactions" element={<ProtectedRoute><AdminTransactions /></ProtectedRoute>} />
            <Route path="/admin/perform-transactions" element={<ProtectedRoute><PerformTransactions /></ProtectedRoute>} />
            <Route path="/admin/kyc-verification" element={<ProtectedRoute><KYCVerification /></ProtectedRoute>} />
            <Route path="/admin/balance-inquiry" element={<ProtectedRoute><BalanceInquiry /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
      return <Navigate to="/login" />;
  }
  return children;
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    // Add any styles you need here for the main container
  },
};

export default App;
