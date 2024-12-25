import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Select, FormControl, InputLabel, MenuItem, TextField, Button, Box, Grid } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const PerformTransactions = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('withdrawal');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [message, setMessage] = useState('');

  const handleTransaction = (e) => {
    e.preventDefault();

    let msg;
    switch (transactionType) {
      case 'withdrawal':
        msg = `Withdrawal of $${amount} for customer ID ${customerId} completed.`;
        break;
      case 'deposit':
        msg = `Deposit of $${amount} for customer ID ${customerId} completed.`;
        break;
      case 'transfer':
        msg = `Transfer of $${amount} from customer ID ${customerId} to account number ${accountNumber} (${bankName}) completed.`;
        break;
      default:
        msg = '';
    }

    setMessage(msg);

    // Reset form fields
    setCustomerId('');
    setAmount('');
    setAccountNumber('');
    setBankName('');
  };

  const handleReset = () => {
    // Reset all fields
    setCustomerId('');
    setAmount('');
    setAccountNumber('');
    setBankName('');
    setMessage('');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        {/* Heading and Back Button in a Row */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4">Perform Transactions</Typography>
          <Button variant="outlined" color="primary" onClick={handleBack}>
            Back to Admin Home
          </Button>
        </Grid>
        
        {message && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'success.main' }}>
              {message}
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
          {/* Amount Field for All Transaction Types */}
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
          {/* Additional Fields for Transfer Type */}
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
          {/* Perform Transaction and Reset Buttons in a Row */}
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
