import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native-unistyles";
import { getFromLocalStorage } from "./src/store/storage";

/* --------------------------------------------
   Base unit (only responsive base you export)
--------------------------------------------- */
export const BASE_UNIT = 5;

/* --------------------------------------------
   Colors (light theme)
--------------------------------------------- */
export const colors = {
  primary: "#1ad649",
  secondary: "#da8404",
  tertiary: "#2196F3",

  onPrimary: "#FFFFFF",
  onSecondary: "#FFFFFF",

  background: "#FFFFFF",
  onBackground: "#000000",

  surface: "#F5F5F5",
  onSurface: "#000000",

  overlay: "rgba(0,0,0,0.8)",
  overlayLight: "rgba(255, 255, 255, 0.1)",

  error: "#D32F2F",
  success: "#388E3C",

  warning: "#FBC02D",
  info: "#1976D2",

  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey400: "#BDBDBD",
  grey500: "#757575",
  grey600: "#616161",
  grey700: "#424242",
  grey800: "#212121",
  grey900: "#121212",
};

/* --------------------------------------------
   Colors (dark theme)
--------------------------------------------- */
export const darkColors = {
  ...colors,
  background: "#121212",
  onBackground: "#FFFFFF",

  surface: "#1E1E1E",
  onSurface: "#FFFFFF",

  grey100: "#1E1E1E",
  grey200: "#2C2C2C",
  grey300: "#383838",
  grey400: "#424242",
  grey500: "#616161",
  grey600: "#757575",
  grey700: "#9E9E9E",
  grey800: "#BDBDBD",
  grey900: "#E0E0E0",
};

/* --------------------------------------------
   Typography scale (responsive)
--------------------------------------------- */
export const fontSizes = {
  xs: moderateScale(11),
  sm: moderateScale(13),
  md: moderateScale(15),
  lg: moderateScale(17),
  xl: moderateScale(20),
  "2xl": moderateScale(24),
  "3xl": moderateScale(28),
};

/* --------------------------------------------
   Spacing scale (responsive)
--------------------------------------------- */
export const spacing = {
  xs: moderateScale(BASE_UNIT * 0.5),
  sm: moderateScale(BASE_UNIT),
  md: moderateScale(BASE_UNIT * 2),
  lg: moderateScale(BASE_UNIT * 3),
  xl: moderateScale(BASE_UNIT * 4),
  "2xl": moderateScale(BASE_UNIT * 6),
  "3xl": moderateScale(BASE_UNIT * 8),
};

/* --------------------------------------------
   Border radius scale (responsive)
--------------------------------------------- */
export const radii = {
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(20),
  round: moderateScale(999),
};

/* --------------------------------------------
   Shadow tokens (useful for real-estate UI)
--------------------------------------------- */
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
};

/* --------------------------------------------
   Actual Unistyles Themes
--------------------------------------------- */
const lightTheme = {
  colors,
  spacing,
  radii,
  shadows,
  fontSizes,

  // responsive gap()
  gap: (v: number) => moderateScale(v * BASE_UNIT),

  paddingHorizontal: spacing.md,
};

const darkTheme = {
  colors: darkColors,
  spacing,
  radii,
  shadows,
  fontSizes,

  gap: (v: number) => moderateScale(v * BASE_UNIT),

  paddingHorizontal: spacing.md,
};

/* --------------------------------------------
   Breakpoints
--------------------------------------------- */
const breakpoints = { phone: 0, largePhone: 400, tablet: 768 };

/* --------------------------------------------
   Register with Unistyles
--------------------------------------------- */
StyleSheet.configure({
  settings: {
    initialTheme: () => {
      const { theme } = getFromLocalStorage(["theme"]);
      return theme ?? "light";
    },
  },
  themes: { light: lightTheme, dark: darkTheme },
  breakpoints,
});

/* --------------------------------------------
   Types for Unistyles
--------------------------------------------- */
const appThemes = { light: lightTheme, dark: darkTheme };

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
