import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useData {
  user: any | null;
  jwt: string | null;
  login: (data: any) => Promise<void>;
  loginJwt: (data: any) => Promise<void>;
  register: (data: any, jwt: string) => Promise<void>;
  logout: () => void;
}

export const useData = create<useData>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      login: async (data: any) => {
        set({
          user: data
        });
      },
      loginJwt: async (data: string) => {
        set({
          jwt: data
        });
      },
      register: async (data: any, jwt: string) => {
        set({
          user: data,
          jwt
        });
      },
      logout: () => {
        set({
          user: null,
          jwt: null
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);