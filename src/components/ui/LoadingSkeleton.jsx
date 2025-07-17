import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => (
    <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`bg-gray-300 dark:bg-gray-700 rounded ${width} ${height} ${className}`}
    />
);

const CardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
        <LoadingSkeleton height="h-6" width="w-3/4" className="mb-4" />
        <LoadingSkeleton height="h-4" width="w-full" className="mb-2" />
        <LoadingSkeleton height="h-4" width="w-5/6" className="mb-2" />
        <LoadingSkeleton height="h-4" width="w-2/3" className="mb-4" />
        <LoadingSkeleton height="h-8" width="w-24" />
    </div>
);

const ListSkeleton = ({ items = 5 }) => (
    <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <LoadingSkeleton width="w-12" height="h-12" className="rounded-full" />
                <div className="flex-1 space-y-2">
                    <LoadingSkeleton width="w-1/4" height="h-4" />
                    <LoadingSkeleton width="w-1/2" height="h-3" />
                </div>
                <LoadingSkeleton width="w-16" height="h-8" />
            </div>
        ))}
    </div>
);

const TableSkeleton = ({ rows = 5, columns = 4 }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
                {Array.from({ length: columns }).map((_, index) => (
                    <LoadingSkeleton key={index} width="flex-1" height="h-4" />
                ))}
            </div>
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex space-x-4">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <LoadingSkeleton key={colIndex} width="flex-1" height="h-4" />
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const ProfileSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6 mb-6">
            <LoadingSkeleton width="w-20" height="h-20" className="rounded-full" />
            <div className="flex-1 space-y-2">
                <LoadingSkeleton width="w-1/3" height="h-6" />
                <LoadingSkeleton width="w-1/4" height="h-4" />
                <LoadingSkeleton width="w-1/2" height="h-4" />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <LoadingSkeleton width="w-1/3" height="h-3" />
                    <LoadingSkeleton width="w-2/3" height="h-4" />
                </div>
            ))}
        </div>
    </div>
);

export {
    LoadingSkeleton,
    CardSkeleton,
    ListSkeleton,
    TableSkeleton,
    ProfileSkeleton
};
