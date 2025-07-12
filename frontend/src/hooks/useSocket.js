// src/hooks/useSocket.js
import { useEffect } from 'react';
import { socket } from '../lib/socket';
import useAuthStore from '../store/authStore';
import useNotificationStore from '../store/notificationStore';

export const useSocketManager = () => {
    const { user, token } = useAuthStore();
    
    useEffect(() => {
        if (token && user?.id) {
            // Only connect if not already connected
            if (!socket.connected) {
                socket.connect();
            }

            const onConnect = () => {
                console.log('Socket connected! Joining room:', user.id);
                socket.emit('join_room', user.id);
            };
            
            const onNewNotification = (notification) => {
                console.log('Frontend received new_notification event:', notification);
                // Use the action from the store to add the new notification
                useNotificationStore.getState().addNotification(notification);
            };

            // Register event listeners
            socket.on('connect', onConnect);
            socket.on('new_notification', onNewNotification);

            // Cleanup function to run when the component unmounts or deps change
            return () => {
                socket.off('connect', onConnect);
                socket.off('new_notification', onNewNotification);
            };
        } else {
            // If there's no token, ensure the socket is disconnected
            if (socket.connected) {
                socket.disconnect();
            }
        }
    }, [token, user?.id]); // Rerun this effect if the user logs in/out
};