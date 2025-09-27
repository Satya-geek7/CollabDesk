import { create } from "zustand";
import { persist,devtools } from "zustand/middleware";

const useStore = create(
  devtools(
  persist(
    (set) => ({
      user: [],
      session: null,
      profile: null,

      setUser: (u) => set({ user: u}),
      setSession: (s) => set({ session: s }),
      setProfile: (p) => set({profile: p}),
      
      logout: () =>
        set(() => ({
          user: [],
          session: null,
          profile: null
        })),
    }),
    {
      name: "user-storage",
    }
  )
)
);

export default useStore;
