import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const settings = () => {
  return (
    <View style={styles.container}>
      <Text>settings</Text>
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
}));
