import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#4a90e2', color: '#fff', p: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        © 2024 BankApp. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
