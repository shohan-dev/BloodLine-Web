import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import ModernNavbar from './components/navigation/ModernNavbar';

// Pages - Renamed imports to fix naming issues
import BloodRequest from './Layout/Users/Blood_Request';
import Profile from './Layout/Users/Profile';
import Register from './Layout/Users/Register';
import SearchDonors from './Layout/Welcome/Search_Donors';
import Home from './Layout/Welcome/Home';
import AboutUs from './Layout/Welcome/About_Us';
import Error404 from './Layout/Welcome/Error_404';
import AdminLogin from './Layout/Admin/Admin_login';
import Login from './Layout/Users/Login';
import History from './Layout/Users/History';
import Admin from './Layout/Admin/Admin';
import Test1 from './Layout/Users/Test/Test1';
import ThemeDemo from './Layout/Users/Test/ThemeDemo';

// Modern Components
import ModernHome from './Layout/Welcome/ModernHome';
import EnhancedBloodRequest from './Layout/Users/EnhancedBloodRequest';
import EmergencyRequest from './Layout/Users/EmergencyRequest';
import EmergencyGuidelines from './Layout/Users/EmergencyGuidelines';
import ViewBloodRequests from './Layout/Users/ViewBloodRequests';

// Protected Route Components
import ProtectedRouteUser from './Layout/Users/ProtectedRoute_User';
import ProtectedRouteAdmin from './Layout/Admin/ProtectedRoute_Admin';

// Create a query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    },
  },
});

// Create theme based on mode
const createCustomTheme = (isDark) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: '#dc2626',
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    secondary: {
      main: isDark ? '#94a3b8' : '#64748b',
    },
    background: {
      default: isDark ? '#0f172a' : '#f8fafc',
      paper: isDark ? '#1e293b' : '#ffffff',
    },
    text: {
      primary: isDark ? '#f1f5f9' : '#1f2937',
      secondary: isDark ? '#94a3b8' : '#6b7280',
    },
    divider: isDark ? '#334155' : '#e2e8f0',
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
          '&:hover': {
            boxShadow: '0 4px 8px rgba(220, 38, 38, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: isDark
            ? '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          borderRadius: '12px',
          border: isDark ? '1px solid #334155' : 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            '& fieldset': {
              borderColor: isDark ? '#475569' : '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#64748b' : '#9ca3af',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#1f2937',
          boxShadow: isDark
            ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
            : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Theme wrapper component
const ThemeWrapper = ({ children }) => {
  const { isDark } = useTheme();
  const theme = createCustomTheme(isDark);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <ThemeWrapper>
              <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
                <BrowserRouter>
                  <ModernNavbar />

                  <main className="flex-1">
                    <Routes>
                      {/* Public Routes - Using Modern Components */}
                      <Route path="/" element={<ModernHome />} />
                      <Route path="/search-donors" element={<SearchDonors />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      {/* Legacy Routes for compatibility */}
                      <Route path="/Search_Donors" element={<SearchDonors />} />
                      <Route path="/Login" element={<Login />} />
                      <Route path="/Register" element={<Register />} />
                      <Route path="/Home" element={<Home />} />
                      <Route path="/About_Us" element={<AboutUs />} />

                      {/* Test Route */}
                      <Route path="/test" element={<Test1 />} />
                      <Route path="/Test" element={<Test1 />} />
                      <Route path="/theme-demo" element={<ThemeDemo />} />

                      {/* Emergency Routes - Protected */}
                      <Route
                        path="/emergency-request"
                        element={
                          <ProtectedRouteUser>
                            <EmergencyRequest />
                          </ProtectedRouteUser>
                        }
                      />
                      <Route path="/emergency-guidelines" element={<EmergencyGuidelines />} />

                      {/* Blood Requests View - Public Route */}
                      <Route path="/view-blood-requests" element={<ViewBloodRequests />} />
                      <Route path="/blood-requests" element={<ViewBloodRequests />} />

                      {/* User Routes - Enhanced with Protection */}
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
                            <EnhancedBloodRequest />
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

                      {/* Admin Routes with Protection */}
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
            </ThemeWrapper>
          </NotificationProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
