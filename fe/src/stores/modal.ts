import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (newStatus: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (newStatus: boolean) => set({ isOpen: newStatus }),
}));
