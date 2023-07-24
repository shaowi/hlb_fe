import { create } from 'zustand';

const pageHasScrollBar = () => window.innerWidth > document.body.clientWidth;
export const useAppStore = create((set) => ({
  username: '',
  isLoading: true,
  isMaker: false,
  isFooterFixed: !pageHasScrollBar(),
  setUsername: (username) => set({ username }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsMaker: (isMaker) => set({ isMaker }),
  setFixedFooterIfPageHasScrollbar: () =>
    set({ isFooterFixed: !pageHasScrollBar() }),
  resetStore: () =>
    set({
      username: '',
      isLoading: true,
      isMaker: false,
      isFooterFixed: !pageHasScrollBar
    })
}));
