import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const CreateAccount = () => {
  return (
    <View style={styles.container}>
      <Text>CreateAccount</Text>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
}));
