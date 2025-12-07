import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const library = () => {
  return (
    <View style={styles.container}>
      <Text>library</Text>
    </View>
  );
};

export default library;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
