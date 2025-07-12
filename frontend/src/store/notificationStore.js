// src/store/notificationStore.js
import { create } from 'zustand';

const useNotificationStore = create((set) => ({
    notifications: [],
    // This action adds a new notification to the beginning of the array
    addNotification: (notification) => set((state) => ({ 
        notifications: [notification, ...state.notifications] 
    })),
    // This action clears all notifications
    clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;