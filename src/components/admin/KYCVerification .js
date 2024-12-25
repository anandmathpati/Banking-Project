import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Correct import for the icon
import NavBar from '../NavBar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom'; // For navigation

const KYCVerification = () => {
  const navigate = useNavigate();

  // State for form fields
  const [customerId, setCustomerId] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  // State for success message
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Handle back navigation
  const handleBackClick = () => {
    navigate('/admin-home'); // Replace '/admin-home' with your actual route
  };

  // Handle reset button functionality
  const handleReset = () => {
    setCustomerId('');
    setDocumentType('');
    setDocumentNumber('');
  };

  // Handle verification button click
  const handleVerify = () => {
    if (customerId && documentType && documentNumber) {
      setVerificationSuccess(true); // Show success message
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setVerificationSuccess(false);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              KYC Verification
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackClick}
              sx={{ borderColor: '#1e88e5', color: '#1e88e5', '&:hover': { backgroundColor: '#1e88e54d' } }}
            >
              Back to Home
            </Button>
          </Grid>
        </Grid>

        <TextField
          label="Customer ID"
          fullWidth
          sx={{ mb: 3 }}
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        {/* Dropdown for Document Type */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Document Type</InputLabel>
          <Select
            value={documentType}
            label="Document Type"
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
            <MenuItem value="PAN Card">PAN Card</MenuItem>
            <MenuItem value="Voter ID">Voter ID</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Document Number"
          fullWidth
          sx={{ mb: 3 }}
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />

        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleVerify}>
              Verify
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              sx={{ borderColor: '#f44336', color: '#f44336', '&:hover': { backgroundColor: '#f443364d' } }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={verificationSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioned at the top center
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          KYC Verification Completed!
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default KYCVerification;
