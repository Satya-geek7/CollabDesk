import { create } from "zustand";
import { persist,devtools } from "zustand/middleware";

const useStore = create(
  devtools(
  persist(
    (set) => ({
      users: [],
      session: null,
      setUser: (userData) =>
        set((state) => ({
          users: [userData, ...state.users],
        })),
      setSession: (sessionData) => set({ session: sessionData }),
      logout: () =>
        set(() => ({
          users: [],
          session: null,
        })),
    }),
    {
      name: "user-storage",
    }
  )
)
);

export default useStore;
