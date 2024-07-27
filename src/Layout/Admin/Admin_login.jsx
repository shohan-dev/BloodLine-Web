import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container, Grid, Typography, Button, TextField } from '@mui/material';
import Admin from './Admin';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (email === 'shohan@admin' && password === 'passisadminreally') {
        setUser({ email: 'admin' });
        navigate('/admin');
      } else {
        setError('Username or Password is incorrect');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      {isLoading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ClipLoader color="#d73636" loading={true} size={150} aria-label="Loading Spinner" />
        </div>
      )}
      {!user ? (
        <Container maxWidth="xs" className="shadow-xl rounded-xl">
          <Grid container spacing={2} style={{ padding: '20px', marginTop: '250px', display: isLoading ? 'none' : 'block' }}>
            <Typography variant="h4" align="center">Admin Login</Typography>
            <TextField
              fullWidth
              label="Username"
              name="email"
              margin="normal"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{ fontSize: '15px', padding: '15px 30px', marginTop: '10px' }}
                onClick={handleEmailSignIn}
              >
                Login
              </Button>
            </Grid>
            {error && <Typography variant="body1" color="error" style={{ marginLeft: '10px' }}>{error}</Typography>}
          </Grid>
        </Container>
      ) : (
        <Admin />
      )}
    </div>
  );
};

export default AdminLogin;
