import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  Grid
} from "@mui/material";
import BankSphereLogo from '../images/BankSphereLogo.png';

export default function RegisterPage() {
  // Backend endpoint
  const url = "http://localhost:8080/register";
  
  // Form state
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  // Validation states
  const [invalid, setInvalid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    setInvalid(false);
    setPasswordMatch(true);
  };

  // Handle checkbox change
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // Handle registration form submission
  const handleRegister = async () => {
    // Check if passwords match
    if (register.password !== register.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post(url, {
        username: register.username,
        password: register.password,
      });

      if (response.status === 200) {
        // Registration successful, navigate to login page
        navigate("/");
      } else {
        // Registration failed, show error
        setInvalid(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setInvalid(true);
    }
  };

  // Navigate to login page
  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #0062E6, #33AEFF)",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 16px",
      }}
    >
      <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
        <img src={BankSphereLogo} alt="BankSphere Logo" style={{ height: '80px', marginBottom: '10px' }} />
      </IconButton>

      <Box sx={{ maxWidth: 400, width: "100%" }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
            Register Account
          </Typography>

          {/* Registration Form */}
          <form>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Customer ID"
              variant="outlined"
              value={register.username}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value={register.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={register.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            {/* Error handling for password mismatch */}
            {!passwordMatch && (
              <Typography color="error" sx={{ mb: 2 }}>
                Passwords do not match
              </Typography>
            )}

            {/* Error handling for invalid registration */}
            {invalid && (
              <Typography color="error" sx={{ mb: 2 }}>
                Registration failed, please try again.
              </Typography>
            )}

            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={handleTermsChange} />}
              label="I agree to the terms and conditions"
              sx={{ mb: 3 }}
            />

            {/* Register and Sign In buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegister}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={navigateToLogin}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
