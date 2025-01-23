import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface InterfaceState {
  menuBarOpen: boolean;
  setMenuBarOpen: (menuBarOpen: boolean) => void;
}

const useInterfaceStore = create<InterfaceState>()(
  devtools(
    (set) => ({
      menuBarOpen: false,
      setMenuBarOpen: (menuBarOpen: boolean) => set({ menuBarOpen }),
    }),
    { name: "interface-storage" },
  ),
);

export default useInterfaceStore;
