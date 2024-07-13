import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

const Nav_Bar = () => {
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
      <header className="bg-[#c03c38] text-white py-2 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Icon */}
          <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerOpen}
      sx={{ display: { xs: 'block', sm: 'none' } }} // MUI system for responsive display
    >
      <MenuIcon />
    </IconButton>


          {/* Logo (Visible on all screen sizes) */}
          <Link to="/" className="text-white text-2xl font-bold no-underline">
            Blood Donation
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white no-underline hover:underline">
              Home
            </Link>
            <Link to="/Search_Donors" className="text-white no-underline hover:underline">
              Search Donors
            </Link>
            {user ? (
              <>
                <Link to="/Blood_Request" className="text-white no-underline hover:underline">
                  Blood Request
                </Link>
                <Button variant="contained" color="primary" onClick={handleClick}>
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
                <Link to="/Register" className="text-white no-underline hover:underline">
                  Register
                </Link>
                <Link to="/Login" className="text-white no-underline hover:underline">
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
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleDrawerClose}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
          <div className="text-xl font-bold mb-4">
            <Link to="/" className="text-[#c03c38] no-underline">
              Blood Donation
            </Link>
          </div>
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

export default Nav_Bar;
