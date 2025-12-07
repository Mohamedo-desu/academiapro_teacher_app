import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useRef } from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

const AnimatedView = Animated.createAnimatedComponent(View);

export const TAB_BAR_HEIGHT = 64; // px, adjust as needed

interface MyTabBarProps extends BottomTabBarProps {
  scrollY: SharedValue<number>;
}

const MyTabBar: React.FC<MyTabBarProps> = ({ scrollY, ...tabBarProps }) => {
  const insets = useSafeAreaInsets();
  const lastScrollY = useRef(0);
  const visibleValue = useRef(true);

  const animatedStyle = useAnimatedStyle(() => {
    // Determine direction
    let visible = visibleValue.current;
    if (scrollY.value > lastScrollY.current + 10) {
      visible = false;
    } else if (scrollY.value < lastScrollY.current - 10 || scrollY.value <= 0) {
      visible = true;
    }
    lastScrollY.current = scrollY.value;
    visibleValue.current = visible;

    const hideY = TAB_BAR_HEIGHT + insets.bottom;
    return {
      transform: [
        { translateY: withTiming(visible ? 0 : hideY, { duration: 220 }) },
      ],
    };
  });

  return (
    <AnimatedView
      style={[styles.tabBar, animatedStyle, { paddingBottom: insets.bottom }]}
    >
      <BottomTabBar {...tabBarProps} />
    </AnimatedView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: rt.insets.bottom + theme.gap(4),
    height: TAB_BAR_HEIGHT,
    borderRadius: theme.radii.xl,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    zIndex: 100,
  },
}));

export default MyTabBar;
