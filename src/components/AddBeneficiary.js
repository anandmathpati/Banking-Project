import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { TextField, Button, Grid, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddBeneficiary = () => {
  const [beneficiary, setBeneficiary] = useState({
    name: '',
    bankName: '',
    accountNumber: '',
    transferLimit: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/beneficiaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beneficiary),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Beneficiary added successfully:', beneficiary);
          setSubmitted(true);
        } else {
          console.error('Failed to add beneficiary');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleReset = () => {
    setBeneficiary({
      name: '',
      bankName: '',
      accountNumber: '',
      transferLimit: '',
    });
    setSubmitted(false);
  };

  const handleBack = () => {
    navigate('/home'); // Navigate to home or previous page
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '90vh', mt: 4}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ color: '#1976d2', fontWeight: 'bold' }}
          >
            Add Beneficiary
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
        {submitted ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Beneficiary added successfully!
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={beneficiary.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={beneficiary.bankName}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={beneficiary.accountNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Maximum Transfer Limit"
                  name="transferLimit"
                  type="number"
                  value={beneficiary.transferLimit}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                  Add Beneficiary
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default AddBeneficiary;
