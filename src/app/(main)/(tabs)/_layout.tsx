import MyTabBar from "@/src/components/MyTabBar";
import { Feather } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { createContext } from "react";
import { useSharedValue } from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";

interface TabIconProps {
  name: keyof typeof Feather.glyphMap;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  return <Feather name={name} size={size} color={color} />;
};

// Context to provide scrollY to all tab screens
export const TabScrollYContext = createContext<any>(null);

const TabLayout = () => {
  const { theme } = useUnistyles();
  const scrollY = useSharedValue(0);

  const commonScreenOptions: BottomTabNavigationOptions = {
    headerShown: true,
    tabBarStyle: {
      backgroundColor: theme.colors.primary,
      borderTopWidth: 1,
      borderTopColor: theme.colors.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.onPrimary,
    tabBarBadgeStyle: {
      backgroundColor: theme.colors.primary,
      fontFamily: "Regular",
      fontSize: theme.fontSizes.md,
      includeFontPadding: false,
      textAlign: "center",
      textAlignVertical: "center",
    },
    headerTitleAlign: "center",
    tabBarActiveTintColor: theme.colors.onPrimary,
    tabBarInactiveTintColor: "rgba(0,0,0,.4)",
    tabBarItemStyle: {
      borderRadius: theme.radii.lg,
    },

    tabBarLabelStyle: {
      fontFamily: "Bold",
    },
    headerTitleStyle: {
      fontFamily: "Bold",
    },
    tabBarHideOnKeyboard: true,
  };

  return (
    <TabScrollYContext.Provider value={scrollY}>
      <Tabs
        screenOptions={commonScreenOptions}
        tabBar={(props) => <MyTabBar {...props} scrollY={scrollY} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="home" color={color} size={size} />
            ),
            headerTitle: "My Dashboard",
          }}
        />
        <Tabs.Screen
          name="classes"
          options={{
            title: "Classes",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="book" color={color} size={size} />
            ),
            headerTitle: "My Classes",
          }}
        />
        <Tabs.Screen
          name="assignments"
          options={{
            title: "Assignments",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="clipboard" color={color} size={size} />
            ),
            headerTitle: "Manage Assignments",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="folder" color={color} size={size} />
            ),
            headerTitle: "Browse Library",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="settings" color={color} size={size} />
            ),
            headerTitle: "Manage Settings",
          }}
        />
      </Tabs>
    </TabScrollYContext.Provider>
  );
};

export default TabLayout;
