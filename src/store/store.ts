// src/store/useStore.ts
import { create } from "zustand";
import { createThemeSlice, ThemeSlice } from "./themeSlice";

type StoreState = ThemeSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createThemeSlice(...a),
}));
