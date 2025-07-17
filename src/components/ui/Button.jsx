import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    type = 'button',
    icon,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500',
        warning: 'bg-warning-600 hover:bg-warning-700 text-white focus:ring-warning-500',
        error: 'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

    const buttonContent = (
        <>
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && !loading && <span className="mr-2">{icon}</span>}
            {children}
        </>
    );

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            {...props}
        >
            {buttonContent}
        </motion.button>
    );
};

export default Button;
