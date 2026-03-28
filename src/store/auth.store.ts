import { create } from 'zustand';

interface AuthState {
  accessToken:     string | null;
  isAuthenticated: boolean;
  login:  (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:     typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('access_token') : false,

  login: (accessToken) => {
    localStorage.setItem('access_token', accessToken);
    set({ accessToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({ accessToken: null, isAuthenticated: false });
  },
}));