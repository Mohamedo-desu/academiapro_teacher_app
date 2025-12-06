import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  StyleSheet,
  UnistylesRuntime,
  withUnistyles,
} from "react-native-unistyles";

const ThemeItems = [
  { label: "Light", value: "light", icon: "sun" },
  { label: "Dark", value: "dark", icon: "moon" },
  { label: "System", value: "system", icon: "settings" },
];

const UniThemeIcon = withUnistyles(Feather, (theme) => ({
  color: theme.colors.onSurface,
}));

const UpdateTheme = (value: string) => {
  const currentTheme = UnistylesRuntime.themeName;

  if (currentTheme === value) return;

  if (value === "light") {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme("light");
  } else if (value === "dark") {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme("dark");
  } else {
    UnistylesRuntime.setAdaptiveThemes(true);
  }
};

const ToggleTheme = () => {
  const [activeTheme, setActiveTheme] = useState(UnistylesRuntime.themeName);
  const [expanded, setExpanded] = useState(false);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(expanded ? 1 : 0, { duration: 350 });
  }, [expanded]);

  // container expand animation
  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [55, 190]),
    paddingHorizontal: interpolate(progress.value, [0, 1], [0, 10]),
    justifyContent: "center",
  }));

  // collapsed icon animation
  const collapsedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.3], [1, 0], "clamp"),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 0.7]) }],
  }));

  // expanded row animation
  const expandedRowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.3, 1], [0, 1], "clamp"),
    transform: [{ scale: interpolate(progress.value, [0.3, 1], [0.8, 1]) }],
  }));

  // stagger per item (safe hooks)
  const itemAnimatedStyles = ThemeItems.map((_, index) =>
    useAnimatedStyle(() => {
      const start = 0.45 + index * 0.1;
      const end = start + 0.35;

      return {
        opacity: interpolate(progress.value, [start, end], [0, 1], "clamp"),
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [start, end],
              [8, 0],
              "clamp"
            ),
          },
          {
            scale: interpolate(progress.value, [start, end], [0.7, 1], "clamp"),
          },
        ],
      };
    })
  );

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* COLLAPSED BUTTON — always rendered but only clickable when collapsed */}
      <Animated.View
        style={[collapsedStyle, styles.centerWrapper]}
        pointerEvents={expanded ? "none" : "auto"}
      >
        <TouchableOpacity
          style={[styles.themeItem, styles.activeItem]}
          activeOpacity={0.8}
          onPress={() => setExpanded(true)}
        >
          <UniThemeIcon
            name={ThemeItems.find((i) => i.value === activeTheme)!.icon as any}
            size={22}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* EXPANDED ROW — always rendered but only clickable when expanded */}

      <Animated.View
        style={[expandedRowStyle, styles.row]}
        pointerEvents={expanded ? "auto" : "none"}
      >
        {ThemeItems.map((item, idx) => (
          <Animated.View key={item.value} style={itemAnimatedStyles[idx]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.themeItem}
              onPress={() => {
                setActiveTheme(item.value);
                UpdateTheme(item.value);
                setExpanded(false);
              }}
            >
              <UniThemeIcon name={item.icon as any} size={22} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default ToggleTheme;

const styles = StyleSheet.create((theme) => ({
  container: {
    height: 55,
    overflow: "hidden",
    borderRadius: theme.radii.md,
  },

  centerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  row: {
    flex: 1, // fill container vertically
    flexDirection: "row",
    justifyContent: "space-between", // evenly spread horizontally
    alignItems: "center", // center vertically
  },
  themeItem: {
    width: 46,
    height: 46, // smaller than container height
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  activeItem: {
    backgroundColor: theme.colors.surface,
  },
}));
