import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const students = () => {
  return (
    <View style={styles.container}>
      <Text>students</Text>
    </View>
  );
};

export default students;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
