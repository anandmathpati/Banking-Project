import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Alert, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        accountNo: '',
        initialDeposit: 0,
    });
    const [initialFormData, setInitialFormData] = useState({}); // Store initial form data
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [customerId, setCustomerId] = useState(null);
    const navigate = useNavigate();

    // Fetch customerId from localStorage or use a predefined value
    useEffect(() => {
        const storedCustomerId = localStorage.getItem('username');
        if (storedCustomerId) {
            setCustomerId(storedCustomerId);
        } else {
            setError('Customer ID not found');
        }
    }, []);

    // Fetch customer profile data based on customerId
    useEffect(() => {
        if (customerId) {
            const fetchProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/${customerId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer data');
                    }
                    const data = await response.json();
                    setFormData(data); // Autofill form fields with fetched data
                    setInitialFormData(data); // Store initial form data
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    setError('Failed to fetch profile data');
                }
            };
            fetchProfile();
        }
    }, [customerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'initialDeposit' ? parseFloat(value) || 0 : value,
        }));
        setError('');
        setSuccess(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/update/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            setSuccess(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    const handleReset = () => {
        setFormData(initialFormData); // Reset to initial form data
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
                <Typography variant="h4" component="div" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Edit Profile
                </Typography>
                {success && <Alert severity="success">Profile updated successfully!</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSave}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Account Number"
                                name="accountNo"
                                value={formData.accountNo}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Available Balance"
                                name="initialDeposit"
                                type="number"
                                value={formData.initialDeposit}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" variant="contained" color="success">
                            Update Profile
                        </Button>
                        <Button type="button" variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 2 }}>
                            Reset
                        </Button>
                    </Box>
                </form>
            </Box>
            <Footer />
        </>
    );
};

export default Profile;
