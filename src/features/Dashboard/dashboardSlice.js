import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useSidebarStore = create(
  subscribeWithSelector((set) => ({
    selectedTab: "map",

    selectSidebarTab: (tab) => {
      set({ selectedTab: tab });
    },
  })),
);
