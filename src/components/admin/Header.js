// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Banking App</h1>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            {/* <Link style={styles.link} to="/">Home</Link> */}
          </li>
          <li style={styles.navItem}>
            {/* <Link style={styles.link} to="/about">About</Link> */}
          </li>
          <li style={styles.navItem}>
            {/* <Link style={styles.link} to="/services">Services</Link> */}
          </li>
          <li style={styles.navItem}>
            {/* <Link style={styles.link} to="/contact">Contact</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#003366',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Header;
