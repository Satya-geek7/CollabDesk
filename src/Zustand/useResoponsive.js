import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useResponsive = create(
  devtools(
    persist(
      (set) => ({
        istoggled: null,

        setToggled: (u) => set({ istoggled: u }),
      }),
      {
        name: "responive-ui",
      }
    )
  )
);

export default useResponsive;
