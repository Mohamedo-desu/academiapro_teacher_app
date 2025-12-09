import ToggleTheme from "@/src/components/ToggleTheme";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.toggleThemeWrapper}>
        <ToggleTheme />
      </View>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleThemeWrapper: {
    position: "absolute",
    top: rt.insets.top,
    right: theme.paddingHorizontal * 2,
    width: "100%",
    alignItems: "flex-end",
  },
}));
