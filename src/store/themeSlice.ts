// src/store/slices/themeSlice.ts

import type { StateCreator } from "zustand";

/**
 * Supported theme types
 */
export type ThemeMode = "light" | "dark" | "system";

/**
 * Theme slice state & actions
 */
export interface ThemeSlice {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

/**
 * Zustand slice creator (fully typed)
 */
export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set
) => ({
  theme: "light",
  setTheme: (theme) =>
    set(() => ({
      theme,
    })),
});
