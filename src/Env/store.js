import create from 'zustand';
import { devtools } from "zustand/middleware";

export const useHomeStore = create(devtools(set => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),

  allFeed: null,
  setAllFeed: (url) => set({ allFeed: url })
  // increaseCount: () => set(state => ({ count: state.count + 1 })),
  // setZero: () => set({ count: 0 })
})));
