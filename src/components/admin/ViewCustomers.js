import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Paper, 
  CircularProgress, 
  Alert, 
  Button, 
  TablePagination, 
  Box, 
  Grid 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Correct import for ArrowBackIcon

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customer data.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleBackClick = () => {
    navigate('/admin-home'); // Replace '/admin-home' with your actual route
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <div className="text-center my-4"><CircularProgress /></div>;
  if (error) return <Alert severity="error" className="text-center">{error}</Alert>;

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        {/* Header Section with back button */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Customer Details
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackClick}
              sx={{ borderColor: '#1e88e5', color: '#1e88e5', '&:hover': { backgroundColor: '#1e88e54d' } }}
            >
              Back to Admin Home
            </Button>
          </Grid>
        </Grid>

        {/* Table Container */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Customer Table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Account Number</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.userName}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.accountNo}</TableCell>
                  <TableCell>${customer.initialDeposit.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={customers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
      <Footer />
    </>
  );
};

export default ViewCustomers;
