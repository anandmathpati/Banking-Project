import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Select, FormControl, InputLabel, MenuItem, TextField, Button, Box, Grid } from '@mui/material';
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../Footer';

const PerformTransactions = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('withdrawal');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();

    // Validate customerId before sending to the backend
    if (!customerId) {
      setError('Customer ID is required.');
      return;
    }

    // Construct the transaction data to send to the backend
    const transactionData = {
      transactionType,
      customerId: customerId, // Convert customer ID to a number
      amount: Number(amount),
      accountNumber: transactionType === 'transfer' ? accountNumber : null,
      bankName: transactionType === 'transfer' ? bankName : null,
    };

    try {
      // Make the POST request to the backend
      const response = await axios.post('http://localhost:8080/perform', transactionData);

      // Set the success message from the response
      setMessage(response.data);
      setError(''); // Clear any previous errors

      // Reset form fields
      setCustomerId('');
      setAmount('');
      setAccountNumber('');
      setBankName('');
    } catch (err) {
      // Handle errors and display an error message
      setError('Error performing transaction. Please try again.');
      setMessage(''); // Clear any previous success messages
    }
  };

  const handleReset = () => {
    setCustomerId('');
    setAmount('');
    setAccountNumber('');
    setBankName('');
    setMessage('');
    setError('');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4">Perform Transactions</Typography>
          <Button variant="outlined" color="primary" onClick={handleBack}>
            Back to Home
          </Button>
        </Grid>
        
        {message && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'success.main' }}>
              {message}
            </Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'error.main' }}>
              {error}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleTransaction}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="transactionTypeLabel">Transaction Type</InputLabel>
            <Select
              labelId="transactionTypeLabel"
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              label="Transaction Type"
            >
              <MenuItem value="withdrawal">Withdrawal</MenuItem>
              <MenuItem value="deposit">Deposit</MenuItem>
              <MenuItem value="transfer">Transfer</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            id="customerId"
            label="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
            required
          />

          {(transactionType === 'withdrawal' || transactionType === 'deposit' || transactionType === 'transfer') && (
            <TextField
              fullWidth
              id="amount"
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
              required
            />
          )}

          {transactionType === 'transfer' && (
            <>
              <TextField
                fullWidth
                id="accountNumber"
                label="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                id="bankName"
                label="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                required
              />
            </>
          )}

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Perform Transaction
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default PerformTransactions;
