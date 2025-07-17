import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
    label,
    error,
    type = 'text',
    placeholder,
    className = '',
    required = false,
    disabled = false,
    icon,
    rightIcon,
    ...props
}, ref) => {
    const baseClasses = 'w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';

    const errorClasses = error
        ? 'border-error-500 bg-error-50 text-error-900'
        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400';

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed'
        : '';

    const classes = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{icon}</span>
                    </div>
                )}

                <motion.input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={`${classes} ${icon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
                    disabled={disabled}
                    whileFocus={{ scale: 1.01 }}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className="text-gray-400">{rightIcon}</span>
                    </div>
                )}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-error-600"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
