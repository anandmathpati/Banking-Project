import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  Box,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            component="div" 
            gutterBottom 
            sx={{ color: '#1976d2', fontWeight: 'bold' }}
          >
            Transactions
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
        <Paper>
          <Table sx={{ minWidth: 650 }} aria-label="transactions table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#343a40' }}>
                <TableCell sx={{ color: '#ffffff' }}>Date</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Beneficiary Name</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Transaction ID</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Amount</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Available Balance</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Transaction Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell>{transaction.transactionDate}</TableCell>
                    <TableCell>{transaction.beneficiary}</TableCell>
                    <TableCell>{transaction.transactionId}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>${transaction.balance}</TableCell> 
                    <TableCell sx={{ color: 'green' }}>Sent</TableCell> 
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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

export default Transactions;
