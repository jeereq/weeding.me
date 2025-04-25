import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
          },
          isLoading: false,
        });
      },
      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: {
            id: '1',
            email,
            name,
          },
          isLoading: false,
        });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);