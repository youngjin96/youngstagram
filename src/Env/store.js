import create from 'zustand';
import { devtools } from "zustand/middleware";

const store = (set) => ({
  userId: "",
  setUserId: (id) => set({ userId: id }),
  
  userImage: "",
  setUserImage: (url) => set({ userImage: url })
  // increaseCount: () => set(state => ({ count: state.count + 1 })),
  // setZero: () => set({ count: 0 })
});

export const useStore = create(devtools(store));