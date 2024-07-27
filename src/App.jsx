import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Component/firebaseConfig';
import Blood_Request from './Layout/Users/Blood_Request';
import Profile from './Layout/Users/Profile';
import Register from './Layout/Users/Register';
import Search_Donors from './Layout/Welcome/Search_Donors';
import Home from './Layout/Welcome/Home';
import Error_404 from './Layout/Welcome/Error_404';
import Admin_login from './Layout/Admin/Admin_login';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Login from './Layout/Users/Login';
import { ClipLoader } from 'react-spinners';
import History from './Layout/Users/History';
import Admin from './Layout/Admin/Admin';
import Test1 from './Layout/Users/Test/Test1';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    initializeApp(firebaseConfig);

    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setIsInitializing(false);

      if (userAuth) {
        console.log('User is signed in');
        setIsAuthenticated(true);
        setUser(userAuth);
        localStorage.setItem('userSession', JSON.stringify(userAuth));
      } else {
        console.log('User is signed out');
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('userSession');
      }
    }, (error) => {
      console.error('Auth state change error:', error);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isInitializing) {
    return (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ClipLoader
          color={'#d73636'}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Test" element={<Test1 />} />
          <Route path="/Search_Donors" element={<Search_Donors />} />
          {/* Protected Routes for Users */}
          <Route
            path="/Profile"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/History"
            element={
              isAuthenticated ? (
                <History />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/Blood_Request"
            element={
              isAuthenticated ? (
                <Blood_Request />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/Login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/Register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Home />
              )
            }
          />
          {/* Admin Routes */}
          <Route
          path="/Admin/*"
          element={
            isAuthenticated ? (
              <Admin />
            ) : (
              <Admin_login/>
            )
          }
        >
            <Route index element={<Admin />} />
            <Route path='Dashboad' element={<h1>This is Dashboard Admin</h1>} />
          </Route>
          {/* Error 404 Route */}
          <Route path="*" element={<Error_404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
