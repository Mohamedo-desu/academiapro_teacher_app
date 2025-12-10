import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const notes = () => {
  return (
    <View style={styles.container}>
      <Text>notes</Text>
    </View>
  );
};

export default notes;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
