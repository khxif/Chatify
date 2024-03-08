import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSelectedUserStore =  create<SelectedUserStore, [["zustand/persist", SelectedUserStore]]>(
    persist(
      (set) => ({
        selectedUser: null,
        setSelectedUser: (selectedUser) => set({ selectedUser }),
      }),
      {
        name: "selectedUser",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
