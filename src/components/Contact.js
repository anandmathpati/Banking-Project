import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const Contact = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '90vh', mt: 4 }}>
        <Container>
          {/* Contact Us Title Section */}
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
              Contact Bank Sphere
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#555' }}>
              We're here to help. Get in touch with us if you have any questions or need assistance with our services.
            </Typography>
          </Paper>

          {/* Contact Details */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Reach Out to Us
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#555', mb: 1 }}>
              Email: <a href="mailto:support@banksphere.com" style={{ color: '#1976d2', textDecoration: 'none' }}>support@banksphere.com</a>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#555', mb: 1 }}>
              Phone: +123-456-7890
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#555', mb: 1 }}>
              Address: 101 Bank Sphere Avenue, Bangaluru, India
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Contact;
