import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BankShereLogo from '../images/BankSphereLogo.png';
import {
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton
} from "@mui/material";

export default function LoginPage() {
  const url = "http://localhost:8080/login";
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    setInvalid(false);
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(url, {
        username: login.username,
        password: login.password,
      });

      if (response.status === 200) {
        localStorage.setItem("username", login.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.data.token);
        if (response.data.role === "User") {
          navigate(`/Home`);
        } else if (response.data.role === "Admin") {
          navigate(`/admin-home`);
        } else {
          // Handle other roles if needed
        }
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setInvalid(true);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
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
      {/* <Typography
        variant="h3"
        sx={{ fontFamily: "Tilt Prism", color: "white", mb: 5, textShadow: "3px 2px 3px blue" }}
      >
        Welcome to BankApp
      </Typography> */}
      <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }} >
            <img src={BankShereLogo} alt="BankSphere Logo" style={{ height: '80px', marginBottom: '10px' }} />
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
            Sign In
          </Typography>
          <form>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Customer ID"
              variant="outlined"
              value={login.username}
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
              value={login.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            {invalid && (
              <Typography color="error" sx={{ mb: 3, fontWeight: "bold" }}>
                Invalid ID or PIN
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox id="rememberPasswordCheck" />}
              label="Remember password"
              sx={{ mb: 3 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={checkLogin}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={navigateToRegister}
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
