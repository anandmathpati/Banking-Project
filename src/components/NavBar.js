import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import BankShereLogo from '../images/BankSphereLogo.png';
import userTemp from '../images/user.png';

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const navigate = useNavigate(); // For navigation

  React.useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Clear user data and navigate to login page
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  // Define pages based on user role
  const pages = role === 'Admin' 
    ? [
        { name: 'Home', link: '/admin-home' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
      ]
    : [
        { name: 'Home', link: '/home' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
      ];

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#1976d2' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
            <img src={BankShereLogo} alt="BankSphere Logo" style={{ height: '40px' }} />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button key={page.name} href={page.link} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={userTemp} />
              </IconButton>
            </Tooltip>
            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" color="inherit">
                {username}
              </Typography>
              <Typography variant="body2" color="inherit">
                {role}
              </Typography>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
