import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

const Input = ({
  label,
  placeholder,
  secureTextEntry,
  onBlur,
  onChangeText,
  value,
  error,
  shouldShake,
}: {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  error?: string;
  shouldShake?: number;
}) => {
  const [focused, setFocused] = useState(false);

  // SHARED VALUE FOR SHAKE
  const shake = useSharedValue(0);

  // Shake animation when form is submitted but input has an error
  useEffect(() => {
    if (error) {
      // Only shake if it's actually invalid
      shake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-7, { duration: 50 }),
        withTiming(7, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [shouldShake]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <View style={styles.inputContainer}>
      {/* Label */}
      <Text style={styles.inputLabel}>{label}</Text>

      {/* Input + Shake wrapper */}
      <Animated.View style={[animatedStyle]}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.input(focused, !!error)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onFocus={() => setFocused(true)}
          onChangeText={onChangeText}
          value={value}
        />
      </Animated.View>

      {/* Error Text */}
      {error && (
        <Animated.Text entering={fadeInUp} style={styles.errorText}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
};

export default Input;

/* Reanimated entering animation */
const fadeInUp = () => {
  "worklet";
  return {
    initialValues: {
      opacity: 0,
      transform: [{ translateY: -5 }],
    },
    animations: {
      opacity: withTiming(1, { duration: 250 }),
      transform: [{ translateY: withTiming(0, { duration: 250 }) }],
    },
  };
};

const styles = StyleSheet.create((theme) => ({
  inputContainer: {
    gap: theme.gap(2),
  },

  inputLabel: {
    color: theme.colors.onBackground,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
  },

  input: (focused: boolean, hasError: boolean) => ({
    height: theme.spacing["3xl"],
    backgroundColor: focused
      ? theme.colors.tertiary + "20"
      : hasError
      ? theme.colors.error + "20"
      : theme.colors.surface,
    borderRadius: theme.radii.sm,
    fontSize: theme.fontSizes.md,
    fontFamily: "Regular",
    padding: theme.paddingHorizontal,
    outlineWidth: 1,
    outlineOffset: 3,
    outlineColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.grey400,
  }),

  errorText: {
    color: theme.colors.error,
    fontFamily: "Regular",
    fontSize: theme.fontSizes.xs,
    alignSelf: "flex-start",
  },
}));
