import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import Nav_Bar from './Nav_Bar';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add error state
  console.log("working...");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError(null); // Clear any previous errors on successful login
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); // Update the user state on successful login
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        setError(error.message); // Set the error message on failure
      });
  };

  const handleEmailSignIn = () => {
    if (!email || !password) {
      setError("Required fields are empty");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user); // Update the user state on successful login
        setError(null); // Clear any previous errors
        console.log(user.email);
      })
      .catch((error) => {
        setError(error.message); // Set the error message on failure
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Clear the user state on sign-out
      })
      .catch((error) => {
        setError(error.message); // Set the error message on failure
      });
  };

  return (
    <div>
      <Nav_Bar></Nav_Bar>
      <Container maxWidth="xs">
        <Grid elevation={3} style={{ padding: '20px', marginTop: '250px' }}>
          {user ? (
            <div>
              <Typography variant="h4" align="center">Welcome, {user.email}</Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSignOut}
                style={{ marginTop: '15px' }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h4" align="center">Login</Typography>
             
              <TextField
                fullWidth
                label="Email or Phone Number"
                name='email'
                margin="normal"
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name='password'
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: 'primary',
                    color: 'white',
                    fontSize: '15px',
                    padding: '15px 30px',
                    marginTop: '10px',
                  }}
                  onClick={handleEmailSignIn}
                  required
                >
                  Login
                </Button>
              </Grid>
              <IconButton onClick={handleGoogleSignIn} style={{ marginTop: '15px', marginRight: '10px' }}>
                <GoogleIcon />
              </IconButton>
              {error && <Typography variant="body1" color="error" marginLeft={10}>Username or Passwrod is in incorect</Typography>}
              <div className="flex justify-end ">
                <p>
                  Don't have an account?<a href="/register" className="text-black hover:text-blue-500">  Register
                  </a>
                </p>
              </div>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
