import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Component/firebaseConfig';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import ModernNavbar from './components/navigation/ModernNavbar';

// Pages
import Home from './Layout/Welcome/Home';
import SearchDonors from './Layout/Welcome/Search_Donors';
import BloodRequest from './Layout/Users/Blood_Request';
import Profile from './Layout/Users/Profile';
import Register from './Layout/Users/Register';
import Login from './Layout/Users/Login';
import History from './Layout/Users/History';
import AdminLogin from './Layout/Admin/Admin_login';
import Admin from './Layout/Admin/Admin';
import Error404 from './Layout/Welcome/Error_404';
import Test1 from './Layout/Users/Test/Test1';

// Protected Route Components
import ProtectedRouteUser from './Layout/Users/ProtectedRoute_User';
import ProtectedRouteAdmin from './Layout/Admin/ProtectedRoute_Admin';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a query client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

// Enhanced Material-UI theme
const customTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#dc2626',
            50: '#fef2f2',
            100: '#fee2e2',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
        },
        secondary: {
            main: '#64748b',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2937',
            secondary: '#6b7280',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    borderRadius: '12px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CustomThemeProvider>
                <AuthProvider>
                    <NotificationProvider>
                        <ThemeProvider theme={customTheme}>
                            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                                <BrowserRouter>
                                    <ModernNavbar />

                                    <main className="flex-1">
                                        <Routes>
                                            {/* Public Routes */}
                                            <Route path="/" element={<Home />} />
                                            <Route path="/search-donors" element={<SearchDonors />} />
                                            <Route path="/login" element={<Login />} />
                                            <Route path="/register" element={<Register />} />

                                            {/* Legacy Routes for compatibility */}
                                            <Route path="/Search_Donors" element={<SearchDonors />} />
                                            <Route path="/Login" element={<Login />} />
                                            <Route path="/Register" element={<Register />} />

                                            {/* Test Route */}
                                            <Route path="/test" element={<Test1 />} />
                                            <Route path="/Test" element={<Test1 />} />

                                            {/* Protected User Routes */}
                                            <Route
                                                path="/profile"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <Profile />
                                                    </ProtectedRouteUser>
                                                }
                                            />
                                            <Route
                                                path="/Profile"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <Profile />
                                                    </ProtectedRouteUser>
                                                }
                                            />
                                            <Route
                                                path="/blood-request"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <BloodRequest />
                                                    </ProtectedRouteUser>
                                                }
                                            />
                                            <Route
                                                path="/Blood_Request"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <BloodRequest />
                                                    </ProtectedRouteUser>
                                                }
                                            />
                                            <Route
                                                path="/history"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <History />
                                                    </ProtectedRouteUser>
                                                }
                                            />
                                            <Route
                                                path="/History"
                                                element={
                                                    <ProtectedRouteUser>
                                                        <History />
                                                    </ProtectedRouteUser>
                                                }
                                            />

                                            {/* Admin Routes */}
                                            <Route path="/admin/login" element={<AdminLogin />} />
                                            <Route path="/Admin_login" element={<AdminLogin />} />
                                            <Route
                                                path="/admin"
                                                element={
                                                    <ProtectedRouteAdmin>
                                                        <Admin />
                                                    </ProtectedRouteAdmin>
                                                }
                                            />
                                            <Route
                                                path="/Admin"
                                                element={
                                                    <ProtectedRouteAdmin>
                                                        <Admin />
                                                    </ProtectedRouteAdmin>
                                                }
                                            />

                                            {/* 404 Route */}
                                            <Route path="*" element={<Error404 />} />
                                        </Routes>
                                    </main>

                                    {/* Toast Notifications */}
                                    <Toaster
                                        position="top-right"
                                        toastOptions={{
                                            duration: 4000,
                                            style: {
                                                background: '#363636',
                                                color: '#fff',
                                            },
                                            success: {
                                                duration: 3000,
                                                theme: {
                                                    primary: '#22c55e',
                                                    secondary: '#ffffff',
                                                },
                                            },
                                            error: {
                                                duration: 5000,
                                                theme: {
                                                    primary: '#ef4444',
                                                    secondary: '#ffffff',
                                                },
                                            },
                                        }}
                                    />
                                </BrowserRouter>
                            </div>
                        </ThemeProvider>
                    </NotificationProvider>
                </AuthProvider>
            </CustomThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
