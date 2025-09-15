import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useBreadcrumbStore = create(
  devtools(
    persist(
      (set) => ({
        breadcrumb: [],
        setBreadcrumb: (crumbs) => set({ breadcrumb: crumbs }),
      }),
      {
        name: "breadcrumb-storage", // key in localStorage
      }
    )
  )
);

export default useBreadcrumbStore;