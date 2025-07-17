import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NotificationBell from '../notifications/NotificationBell';
import Button from '../ui/Button';

const ModernNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, userProfile, isAuthenticated } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const navigationItems = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Find Donors', path: '/search-donors', icon: '🔍' },
        { name: 'Blood Requests', path: '/view-blood-requests', icon: '🩸' },
        { name: 'Request Blood', path: '/blood-request', icon: '📝' },
        { name: 'About Us', path: '/about', icon: 'ℹ️' },
    ];

    const userMenuItems = [
        { name: 'Profile', path: '/profile', icon: '👤' },
        { name: 'History', path: '/history', icon: '📋' },
        { name: 'Emergency Guidelines', path: '/emergency-guidelines', icon: '🚨' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
    ];

    const handleLogout = () => {
        // Implement logout logic
        navigate('/');
    };

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                            >
                                🩸
                            </motion.div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                BloodLine
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActivePath(item.path)
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* Notifications */}
                                <NotificationBell />

                                {/* Emergency Request Button */}
                                <Button
                                    variant="error"
                                    size="sm"
                                    onClick={() => navigate('/emergency-request')}
                                    className="hidden sm:flex animate-pulse"
                                >
                                    🚨 Emergency
                                </Button>

                                {/* Profile Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {userProfile?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Profile Dropdown */}
                                    <AnimatePresence>
                                        {isProfileMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                                            >
                                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {userProfile?.name || user?.email}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {userProfile?.bloodGroup && `Blood Type: ${userProfile.bloodGroup}`}
                                                    </p>
                                                </div>

                                                {userMenuItems.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={() => setIsProfileMenuOpen(false)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <span>{item.icon}</span>
                                                        <span>{item.name}</span>
                                                    </Link>
                                                ))}

                                                <div className="border-t border-gray-200 dark:border-gray-700">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <span>🚪</span>
                                                        <span>Sign Out</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate('/login')}
                                    size="sm"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => navigate('/register')}
                                    size="sm"
                                >
                                    Register
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-gray-200 dark:border-gray-700"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActivePath(item.path)
                                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                ))}

                                {isAuthenticated && (
                                    <>
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                            {userMenuItems.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <span>{item.icon}</span>
                                                    <span>{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                navigate('/emergency-request');
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 mt-2 bg-red-600 text-white rounded-lg text-base font-medium hover:bg-red-700 transition-colors"
                                        >
                                            <span>🚨</span>
                                            <span>Emergency Request</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default ModernNavbar;
