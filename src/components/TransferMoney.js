import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Alert,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TransferMoney = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [transaction, setTransaction] = useState({
    beneficiary: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch('http://localhost:8080/beneficiaries');
        if (!response.ok) {
          throw new Error('Failed to fetch beneficiaries.');
        }
        const data = await response.json();
        setBeneficiaries(data);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        setError('Error fetching beneficiaries. Please try again later.');
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedBeneficiary = beneficiaries.find(
      (b) => b.name === transaction.beneficiary
    );

    if (!selectedBeneficiary) {
      setError('Please select a valid beneficiary.');
      return;
    }

    const amount = parseFloat(transaction.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (amount > selectedBeneficiary.transferLimit) {
      setError(
        `Amount exceeds the maximum limit for ${selectedBeneficiary.name}.`
      );
      return;
    }

    const customerId = localStorage.getItem('username'); // Retrieve customer ID from localStorage
    if (!customerId) {
      setError('Customer ID not found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/transactions/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          beneficiaryId: selectedBeneficiary.beneficiaryId,
          beneficiary: selectedBeneficiary.name,
          amount: amount,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTransaction({ beneficiary: '', amount: '' });
      } else {
        const errorData = await response.json();
        setError(`Failed to add transaction: ${errorData.message}`);
      }
    } catch (error) {
      setError('An error occurred while processing the transaction.');
    }
  };

  const handleReset = () => {
    setTransaction({ beneficiary: '', amount: '' });
    setError('');
    setSuccess(false);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '90vh', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Transfer Money
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ borderColor: '#1e88e5', color: '#1e88e5', '&:hover': { backgroundColor: '#1e88e54d' } }}
          >
            Back to Home
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Beneficiary"
                name="beneficiary"
                value={transaction.beneficiary}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select Beneficiary</em>
                </MenuItem>
                {beneficiaries.map((beneficiary) => (
                  <MenuItem
                    key={beneficiary.beneficiaryId}
                    value={beneficiary.name}
                  >
                    {beneficiary.name} (Acc: {beneficiary.accountNumber})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={transaction.amount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Transfer
              </Button>
              <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Transfer successful!
            </Alert>
          )}
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default TransferMoney;
