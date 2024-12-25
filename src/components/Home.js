import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import userTemp from '../images/user.png';

const Home = () => {
  const navigate = useNavigate();
  const handleCardClick = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    accountNo: '',
    initialDeposit: 0,
  });

  // Fetch customerId from localStorage
  useEffect(() => {
    const storedCustomerId = localStorage.getItem('username');
    if (storedCustomerId) {
      fetchProfile(storedCustomerId);
    } else {
      console.error('Customer ID not found');
    }
  }, []);

  // Fetch customer profile data based on customerId
  const fetchProfile = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8080/${customerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }
      const data = await response.json();
      setFormData(data); // Autofill form fields with fetched data
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // User Data
  const user = {
    name: formData.name,
    accountNumber: formData.accountNo,
    branch: 'Downtown Branch',
    email: formData.email,
    image: userTemp,
    initialDeposit: formData.initialDeposit, // Ensure this is included
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <NavBar />

      {/* User Details and Quick Stats Section */}
      <Box sx={{ flexGrow: 1, padding: 8 }}>
        <Grid container spacing={3}>
          {/* User Details */}
          <Grid item xs={12} md={8} mt={4} mb={2}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Avatar
                    alt={user.name}
                    src={userTemp}
                    sx={{
                      width: 130,
                      height: 130,
                      margin: 'auto',
                      border: '2px solid #4a90e2',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                      {user.name}
                    </Typography>
                    {user.accountNumber ? (
                      <>
                        <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                          <strong>Account Number:</strong> {user.accountNumber}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                          <strong>Branch:</strong> {user.branch}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                          <strong>Email:</strong> {user.email}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                        Account not available. Please create your account.
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Current Balance */}
          <Grid item xs={12} md={4} mt={4} mb={2}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#e8f0fe' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <AttachMoneyIcon fontSize="large" sx={{ color: '#4a90e2' }} />
                <Box>
                  <Typography variant="h6" align="right" sx={{ color: '#333' }}>
                    Current Balance
                  </Typography>
                  <Typography variant="h4" align="right" sx={{ fontWeight: 'bold', color: '#4a90e2' }}>
                    {user.initialDeposit}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Dashboard Section */}
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 4, color: '#4a90e2', fontWeight: 'bold' }}>
          Manage Your Account
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e8f0fe' },
                borderRadius: '8px',
              }}
              onClick={() => handleCardClick('/transactions')}
            >
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <PaymentIcon fontSize="large" sx={{ color: '#4a90e2' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  View Transactions
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e8f0fe' },
                borderRadius: '8px',
              }}
              onClick={() => handleCardClick('/beneficiaries')}
            >
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <AccountBalanceIcon fontSize="large" sx={{ color: '#4a90e2' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Add Beneficiaries
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e8f0fe' },
                borderRadius: '8px',
              }}
              onClick={() => handleCardClick('/transfer')}
            >
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <TransferWithinAStationIcon fontSize="large" sx={{ color: '#4a90e2' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Transfer Money
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e8f0fe' },
                borderRadius: '8px',
              }}
              onClick={() => handleCardClick('/profile')}
            >
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <EditIcon fontSize="large" sx={{ color: '#4a90e2' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Edit Profile
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Notifications Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
            Notifications <NotificationsIcon />
          </Typography>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fff' }}>
            <Typography variant="body1" sx={{ color: '#555' }}>
              - Low balance warning: Your account balance is below $500.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              - Scheduled transfer: $1000 transfer to Beneficiary A on 15th September.
            </Typography>
          </Paper>
        </Box>

        {/* Progress Bar for Spending */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
            Monthly Spending Progress
          </Typography>
          <LinearProgress variant="determinate" value={70} sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0' }} />
          <Typography variant="body2" align="right" sx={{ mt: 1, color: '#555' }}>
            70% of your spending limit reached.
          </Typography>
        </Box>
      </Box>
      <Footer sx={{ marginTop: 'auto', paddingTop: 2 }} />
    </Box>
  );
};

export default Home;
