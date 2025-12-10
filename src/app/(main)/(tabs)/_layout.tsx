import MyTabBar from "@/src/components/MyTabBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { createContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface TabIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
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
    tabBarInactiveTintColor: "rgba(255,255,255,.5)",
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
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name={focused ? "book-education" : "book-education-outline"}
                color={color}
                size={size}
              />
            ),
            headerTitle: "My Dashboard",
          }}
        />
        <Tabs.Screen
          name="classes"
          options={{
            headerShown: false,
            title: "Classes",
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name={
                  focused
                    ? "book-open-page-variant"
                    : "book-open-page-variant-outline"
                }
                color={color}
                size={size}
              />
            ),
            headerTitle: "My Classes",
          }}
        />
        <Tabs.Screen
          name="assignments"
          options={{
            title: "Assignments",
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name={focused ? "notebook-check" : "notebook-check-outline"}
                color={color}
                size={size}
              />
            ),
            headerTitle: "Manage Assignments",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name={focused ? "library" : "library-outline"}
                color={color}
                size={size}
              />
            ),
            headerTitle: "Browse Library",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerRightContainer}
                hitSlop={12}
                activeOpacity={0.9}
              >
                {/* Cart Icon */}
                <MaterialCommunityIcons
                  name="cart-variant"
                  size={24}
                  color={theme.colors.onPrimary}
                />

                {/* Professional Badge */}
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>10</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name={focused ? "book-cog" : "book-cog-outline"}
                color={color}
                size={size}
              />
            ),
            headerTitle: "Manage Settings",
          }}
        />
      </Tabs>
    </TabScrollYContext.Provider>
  );
};

export default TabLayout;

const styles = StyleSheet.create((theme) => ({
  badgeContainer: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,

    backgroundColor: theme.colors.error,
    borderRadius: theme.radii.round,

    justifyContent: "center",
    alignItems: "center",

    ...theme.shadows.sm,
  },
  badgeText: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.xs,
    color: "#fff",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
  },
  headerRightContainer: { marginRight: theme.spacing.md },
}));
