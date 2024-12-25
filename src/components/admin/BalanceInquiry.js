import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../Footer';

const BalanceInquiry = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setAccountNumber(e.target.value);
    setError('');
    setBalance(null);
  };

  const handleCheckBalance = async () => {
    if (!accountNumber) {
      setError('Please enter a valid account number.');
      return;
    }
  
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8080/balance/${accountNumber}`);
      console.log(response.data);  // Should now be just a number (the balance)
      setBalance(response.data);   // Set balance directly
    } catch (err) {
      console.log(err);  // Log any error for debugging
      setError('Account not found or error occurred while fetching balance.');
    } finally {
      setLoading(false);
    }
  };  
  

  return (
    <>
    <NavBar />
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 5, textAlign: 'center', width: 400 }}>
        <AccountBalanceIcon sx={{ fontSize: 50, color: '#4a90e2', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Balance Inquiry
        </Typography>

        <TextField
          label="Account Number"
          variant="outlined"
          fullWidth
          value={accountNumber}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
          error={!!error}
          helperText={error}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckBalance}
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Check Balance'}
        </Button>

        {balance !== null && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Current Balance</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
              ${balance}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
    <Footer />
    </>
  );
};

export default BalanceInquiry;
