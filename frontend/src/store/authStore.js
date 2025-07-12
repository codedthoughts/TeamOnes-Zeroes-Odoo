import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: ({ token, user }) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: 'stackit-auth-storage', // key in localStorage
        }
    )
);

export default useAuthStore;