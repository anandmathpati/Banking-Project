import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { TextField, Button, Typography, Box, Alert, CircularProgress, Grid, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AccountOpening = () => {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    address: '',
    phoneNumber: '',
    email: '',
    initialDeposit: '',
    role: '', // Add role to formData
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Form Validation function
  const validateForm = () => {
    const { phoneNumber, initialDeposit } = formData;
    const phoneRegex = /^[0-9]{10}$/;
    const depositAmount = parseFloat(initialDeposit);
    
    if (!phoneRegex.test(phoneNumber)) {
      setMessage('Phone number must be 10 digits');
      return false;
    }

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setMessage('Initial deposit must be a positive number');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/accountopening', formData);
      setMessage(response.data);

      // Reset form data
      setFormData({
        name: '',
        userName: '',
        address: '',
        phoneNumber: '',
        email: '',
        initialDeposit: '',
        role: '',
      });
    } catch (error) {
      setMessage('Error opening account: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate back to Admin Home
  const handleBackClick = () => {
    navigate('/admin-home'); // Replace '/admin-home' with your actual route
  };

  // Function to reset the form
  const handleReset = () => {
    setFormData({
      name: '',
      userName: '',
      address: '',
      phoneNumber: '',
      email: '',
      initialDeposit: '',
      role: '',
    });
    setMessage(''); // Clear message
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        {/* Header with left-aligned heading and right-aligned back button */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Account Opening
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

        {/* Message Alert */}
        {message && (
          <Alert severity={message.startsWith('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {/* Account Opening Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* First row with Name, Username, and Address fields */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>

            {/* Second row with Phone Number, Email, and Role fields */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ maxLength: 10 }}
                helperText="Enter a 10-digit phone number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Role"
                name="role"
                select
                value={formData.role}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                helperText="Please select the role"
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
            </Grid>

            {/* Third row with Initial Deposit */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Initial Deposit"
                name="initialDeposit"
                type="number"
                value={formData.initialDeposit}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                helperText="Enter the amount to deposit"
              />
            </Grid>
          </Grid>

          {/* Submit and Reset Buttons */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                
                disabled={isLoading}
                sx={{
                  '&:hover': {
                    backgroundColor: '#1e88e5',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Open Account'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AccountOpening;
