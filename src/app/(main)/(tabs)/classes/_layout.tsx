import { Stack } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

const _layout = () => {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: theme.colors.onPrimary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Classes",
          headerTitle: "My Classes",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          headerTitle: String(route.params?.id ?? "Class Details"),
          headerShadowVisible: false,
        })}
      />
    </Stack>
  );
};

export default _layout;
