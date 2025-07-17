import toast from 'react-hot-toast';

// Notification utility functions
export const showSuccess = (message, options = {}) => {
    toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#10b981',
            color: '#fff',
        },
        ...options
    });
};

export const showError = (message, options = {}) => {
    toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
            background: '#ef4444',
            color: '#fff',
        },
        ...options
    });
};

export const showWarning = (message, options = {}) => {
    toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: '⚠️',
        style: {
            background: '#f59e0b',
            color: '#fff',
        },
        ...options
    });
};

export const showInfo = (message, options = {}) => {
    toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: 'ℹ️',
        style: {
            background: '#3b82f6',
            color: '#fff',
        },
        ...options
    });
};

export const showUrgentAlert = (message, onAction) => {
    toast((t) => (
        <div className="flex flex-col space-y-2">
            <div className="font-semibold text-red-600">🚨 URGENT BLOOD REQUEST</div>
            <div>{message}</div>
            <div className="flex space-x-2">
                <button
                    onClick={() => {
                        onAction && onAction();
                        toast.dismiss(t.id);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                    Respond
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                >
                    Dismiss
                </button>
            </div>
        </div>
    ), {
        duration: 10000,
        position: 'top-center',
    });
};
