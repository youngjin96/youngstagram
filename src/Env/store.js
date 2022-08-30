import create from 'zustand';
import { devtools } from "zustand/middleware";

export const useImageStore = create(devtools((set) => ({
  userImage: "",
  setUserImage: (url) => set({ userImage: url })
  // increaseCount: () => set(state => ({ count: state.count + 1 })),
  // setZero: () => set({ count: 0 })
})));

export const useAllFeedStore = create(devtools((set) => ({
  allFeed: null,
  setAllFeed: (url) => set({ allFeed: url })
})));
