import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const assignments = () => {
  return (
    <View style={styles.container}>
      <Text>assignments</Text>
    </View>
  );
};

export default assignments;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
