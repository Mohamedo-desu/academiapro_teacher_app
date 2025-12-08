import React, { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { UnistylesRuntime } from "react-native-unistyles";

import { colors } from "@/unistyles";
import { saveToLocalStorage } from "../store/storage";
import { useStore } from "../store/store";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const theme = useStore((s) => s.theme); // "light" | "dark" | "system"
  const systemScheme = useColorScheme();

  // Resolve actual theme
  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      return systemScheme === "dark" ? "dark" : "light";
    }
    return theme;
  }, [theme, systemScheme]);

  // Sync Unistyles runtime
  useEffect(() => {
    const current = UnistylesRuntime.themeName;

    if (theme === "system") {
      UnistylesRuntime.setAdaptiveThemes(true);
    } else {
      UnistylesRuntime.setAdaptiveThemes(false);
      if (current !== theme) {
        UnistylesRuntime.setTheme(theme);
      }
    }

    UnistylesRuntime.setRootViewBackgroundColor(colors.primary);
    saveToLocalStorage([{ key: "theme", value: theme }]);
  }, [theme]);

  // --- Sync Paper ---
  const paperTheme = useMemo(() => {
    const base = resolvedTheme === "dark" ? MD3DarkTheme : MD3LightTheme;

    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
      },
      roundness: 0,
    };
  }, [resolvedTheme]);

  const statusStyle = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <PaperProvider theme={paperTheme}>
      {children}
      <SystemBars style={statusStyle} />
    </PaperProvider>
  );
}
