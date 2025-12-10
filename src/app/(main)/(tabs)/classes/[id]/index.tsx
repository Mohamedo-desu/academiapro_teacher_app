import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const ClassDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  console.log(id);

  return (
    <View style={styles.container}>
      <Text>ClassDetailsScreen</Text>
    </View>
  );
};

export default ClassDetailsScreen;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
