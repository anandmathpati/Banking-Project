import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { styled } from '@mui/material/styles';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Welcome message
  const adminName = 'Admin John'; // You can dynamically set this based on the logged-in admin

  // Styled Card for hover effect
  const DashboardCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#e8f0fe',
    },
    borderRadius: '12px',
  }));

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        {/* Welcome Message */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4a90e2' }}>
            Welcome, {adminName}
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            Manage and oversee all system functionalities with ease.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* View Customer Details */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/customers')}>
              <PeopleIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                View Customer Details
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                View all customer details, excluding sensitive information.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* Account Opening */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/account-opening')}>
              <AccountCircleIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Account Opening
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Perform the account opening process for new customers.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* View Transactions */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/transactions')}>
              <PaymentIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                View Transactions
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                View all transactions in the system on the dashboard.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* Perform Transactions */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/perform-transactions')}>
              <AttachMoneyIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Perform Transactions
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Perform transactions like withdrawal, deposit, transfer, KYC verification, and balance inquiries.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* KYC Verification */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/kyc-verification')}>
              <VerifiedUserIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                KYC Verification
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Verify the KYC status of customers and approve pending requests.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* Balance Inquiry */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/balance-inquiry')}>
              <AccountBalanceIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Balance Inquiry
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Check the current balance of a specific customer.
              </Typography>
            </DashboardCard>
          </Grid>

          {/* Additional Admin Features */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/reports')}>
              <PaymentIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                View Reports
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Access various system reports and logs.
              </Typography>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard elevation={3} onClick={() => handleNavigation('/admin/settings')}>
              <AccountCircleIcon fontSize="large" sx={{ color: '#4a90e2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                System Settings
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                Manage system configurations and settings.
              </Typography>
            </DashboardCard>
          </Grid> */}
        </Grid>
      </Box>

      <Footer />
    </>
  );
};

export default AdminDashboard;
