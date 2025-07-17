import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hover = true,
    padding = 'md',
    shadow = 'soft',
    ...props
}) => {
    const baseClasses = 'bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700';

    const paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
        none: '',
    };

    const shadows = {
        none: '',
        soft: 'shadow-soft',
        medium: 'shadow-medium',
        hard: 'shadow-hard',
    };

    const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-medium hover:-translate-y-1' : '';

    const classes = `
    ${baseClasses}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${hoverClasses}
    ${className}
  `.trim();

    const CardComponent = hover ? motion.div : 'div';
    const motionProps = hover ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
    } : {};

    return (
        <CardComponent
            className={classes}
            {...motionProps}
            {...props}
        >
            {children}
        </CardComponent>
    );
};

const CardHeader = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>
        {children}
    </div>
);

const CardBody = ({ children, className = '' }) => (
    <div className={className}>
        {children}
    </div>
);

const CardFooter = ({ children, className = '' }) => (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
