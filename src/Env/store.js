import create from 'zustand';
import { devtools } from "zustand/middleware";

const store = (set) => ({
  userId: sessionStorage.getItem("user_id"),
  increaseCount: () => set(state => ({ count: state.count + 1 })),
  setZero: () => set({ count: 0 })
});

const useStore = create(devtools(store));
export default useStore;