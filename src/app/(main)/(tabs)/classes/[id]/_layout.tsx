import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const _layout = () => {
  const { theme } = useUnistyles();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 3,
        },
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarInactiveTintColor: "rgba(255,255,255,.5)",

        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontFamily: "Bold",
        },

        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.onPrimary,
          height: 2,
          borderRadius: theme.radii.sm,
        },

        tabBarAccessibilityLabel: "Top navigation tabs",

        lazy: true,
        lazyPreloadDistance: 1,
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note-multiple" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="assignments"
        options={{
          title: "Homework",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="draw-pen" color={color} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default _layout;
