import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Initialize socket connection for real-time notifications
        const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3001');

        newSocket.on('bloodRequest', (data) => {
            const notification = {
                id: Date.now(),
                type: 'blood-request',
                title: 'Urgent Blood Request',
                message: `${data.bloodType} blood needed in ${data.location}`,
                timestamp: new Date(),
                urgent: data.urgent || false
            };

            addNotification(notification);

            if (data.urgent) {
                toast.error(notification.message, {
                    duration: 6000,
                    position: 'top-right',
                });
            } else {
                toast(notification.message, {
                    duration: 4000,
                    position: 'top-right',
                });
            }
        });

        newSocket.on('donorMatch', (data) => {
            const notification = {
                id: Date.now(),
                type: 'donor-match',
                title: 'Donor Match Found',
                message: `Compatible donor found for your request`,
                timestamp: new Date(),
                urgent: false
            };

            addNotification(notification);
            toast.success(notification.message, {
                duration: 5000,
                position: 'top-right',
            });
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const value = {
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        clearAll,
        unreadCount: notifications.filter(n => !n.read).length
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
