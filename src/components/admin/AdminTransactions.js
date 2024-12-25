import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllTransactions');
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transaction data.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleBackClick = () => {
    navigate('/admin-home');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
        {/* Header with left-aligned heading and right-aligned back button */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              All Transactions
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

        {/* Table Container */}
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Transactions Table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Customer ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Account Number</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Bank Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => {
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.transactionDate}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.customerId}</TableCell>
                        <TableCell>{transaction.accountNumber || '-'}</TableCell>
                        <TableCell>{transaction.bankName || '-'}</TableCell>
                        <TableCell>{transaction.transactionType}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default AdminTransactions;
