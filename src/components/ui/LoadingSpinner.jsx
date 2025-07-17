import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    message = 'Loading...',
    fullScreen = false
}) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const colors = {
        primary: 'text-primary-600',
        secondary: 'text-secondary-600',
        white: 'text-white',
        gray: 'text-gray-600',
    };

    const containerClasses = fullScreen
        ? 'fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 flex items-center justify-center z-50'
        : 'flex items-center justify-center p-4';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className={`${sizes[size]} ${colors[color]}`}
                >
                    <svg fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </motion.div>
                {message && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-600 dark:text-gray-400"
                    >
                        {message}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;
