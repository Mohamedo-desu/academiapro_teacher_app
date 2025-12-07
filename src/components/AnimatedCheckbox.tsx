import { colors } from "@/unistyles";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

const AnimatedCheckbox = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0);

    scale.value = withTiming(1.15, {}, () => {
      scale.value = withTiming(1);
    });
  }, [value]);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.overlayLight, colors.primary]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.overlay, colors.primary]
    ),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
  }));

  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={{ padding: 4 }}
      hitSlop={10}
    >
      <Animated.View style={[styles.container, boxStyle]}>
        <Animated.View style={checkStyle}>
          <Feather name="check-square" size={14} color="#fff" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedCheckbox;

const styles = StyleSheet.create((theme) => ({
  container: {
    width: theme.gap(3.5),
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: theme.radii.sm,
    justifyContent: "center",
    alignItems: "center",
  },
}));
