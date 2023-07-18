import { create } from 'zustand';

export const useAppStore = create((set) => ({
  username: '',
  isLoading: true,
  isMaker: false,
  setUsername: (username) => set({ username }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsMaker: (isMaker) => set({ isMaker }),
  resetStore: () => set({ username: '', isLoading: true, isMaker: false })
}));
