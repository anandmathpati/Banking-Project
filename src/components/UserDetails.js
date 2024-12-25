import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   // Replace with your actual API endpoints
  //   axios.get("http://localhost:8080/userDetails").then((response) => {
  //     setUserDetails(response.data);
  //   });

  //   axios.get("http://localhost:8080/balance").then((response) => {
  //     setBalance(response.data.balance);
  //   });
  // }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item>
            <div
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="User Profile"
                  className="img-fluid rounded-circle me-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="text-start">
                  <h2 className="card-title h5">User Details</h2>
                  <p className="card-text">
                    <strong>Name:</strong> Anand Mathpati
                  </p>
                  <p className="card-text">
                    <strong>Account Number:</strong> 3456123567
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> anandmathpati@gmail.com
                  </p>
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <div style={{ cursor: "pointer", transition: "transform 0.2s" }}>
              <h2 className="card-title h5">Available Balance</h2>
              <p className="card-text">
                <strong>Balance:</strong> 1000
              </p>
              <button className="btn btn-primary">View Transactions</button>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
