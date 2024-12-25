import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 8, backgroundColor: '#f5f5f5', minHeight: '100vh', mt: 4 }}>
        <Container>
          {/* Main Title Section */}
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
              About Bank Sphere
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#555' }}>
              Welcome to Bank Sphere! We are a modern financial institution dedicated to offering convenient and secure banking services. Our focus is on delivering seamless banking experiences with the help of cutting-edge technology.
            </Typography>
          </Paper>

          {/* Mission and Vision Section */}
          <Grid container spacing={4}>
            {/* Mission */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  To provide innovative and reliable banking solutions, ensuring financial growth for our customers.
                </Typography>
              </Paper>
            </Grid>

            {/* Vision */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  To be a trusted leader in digital banking, making banking simple and accessible for everyone.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Brief History Section */}
          <Box sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#555' }}>
                Bank Sphere was established to bring easy and innovative banking solutions to everyone. Through a commitment to modern technology and customer satisfaction, we aim to make banking a hassle-free experience.
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default About;
