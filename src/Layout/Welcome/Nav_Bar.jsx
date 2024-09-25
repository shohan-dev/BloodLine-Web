import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { Button, Menu, MenuItem, Drawer, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setUser(userAuth);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleProfile = () => {
    navigate('/Profile');
    handleClose();
  };

  const handleHistory = () => {
    navigate('/History');
    handleClose();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem('userSession');
        handleClose();
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Search Donors', path: '/Search_Donors' },
    user ? { text: 'Blood Request', path: '/Blood_Request' } : null,
    user ? { text: 'Profile', path: '/Profile', onClick: handleProfile } : null,
    user ? { text: 'History', path: '/History', onClick: handleHistory } : null,
    user ? { text: 'Log Out', onClick: handleLogout } : null,
    !user ? { text: 'Register', path: '/Register' } : null,
    !user ? { text: 'Login', path: '/Login' } : null,
  ].filter(Boolean);

  return (
    <div>
      <header className="bg-[#d32f2f] text-white py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: 'block', sm: 'none' } }} // MUI system for responsive display
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
         
          <Link to="/" className="text-white text-3xl font-bold" style={{ textDecoration: 'none' }}>
            Blood Donation
           
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white text-lg" style={{ textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/Search_Donors" className="text-white text-lg" style={{ textDecoration: 'none' }}>
              Search Donors
            </Link>
            {user ? (
              <>
                <Link to="/Blood_Request" className="text-white text-lg" style={{ textDecoration: 'none' }}>
                  Blood Request
                </Link>
                <Button variant="outlined" color="inherit" onClick={handleClick}>
                  {user.email}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleHistory}>History</MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/Register" className="text-white text-lg" style={{ textDecoration: 'none' }}>
                  Register
                </Link>
                <Link to="/Login" className="text-white text-lg" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <div className="w-64 p-4">
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={handleDrawerClose}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" className="text-[#d32f2f] font-bold mb-4">
            <Link to="/" className="no-underline" style={{ textDecoration: 'none', color: '#d32f2f' }}>
              Blood Donation
            </Link>
          </Typography>
          <nav>
            <ul className="list-none p-0">
              {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Button
                    fullWidth
                    className="text-left"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        navigate(item.path);
                      }
                      handleDrawerClose();
                    }}
                  >
                    {item.text}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;
