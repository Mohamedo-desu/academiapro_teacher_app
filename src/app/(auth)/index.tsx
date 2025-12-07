import AnimatedCheckbox from "@/src/components/AnimatedCheckbox";
import Input from "@/src/components/common/Input";
import ToggleTheme from "@/src/components/ToggleTheme";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/src/store/storage";
import { colors } from "@/unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof schema>;

const AuthIndex = () => {
  const [remember, setRemember] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // On submit button press
  const onSubmitPress = async () => {
    setShakeKey((prev) => prev + 1);

    const isValid = await trigger();
    if (!isValid) return;

    handleSubmit(async (data) => {
      if (remember) {
        saveToLocalStorage([
          { key: "login_form", value: JSON.stringify(data) },
        ]);
      } else {
        deleteFromLocalStorage(["login_form"]);
      }

      console.log("Submitted:", data);
    })();
  };

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const { login_form } = getFromLocalStorage(["login_form"]);

        if (login_form) {
          const parsed = JSON.parse(login_form);
          setValue("email", parsed.email);
          setValue("password", parsed.password);
          setRemember(true);
        }
      } catch (err) {
        console.log("Failed to load saved login data:", err);
      }
    };

    loadSavedData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.toggleThemeWrapper}>
        <ToggleTheme />
      </View>
      <View style={styles.bodyWrapper}>
        {/* Logo + Title */}
        <View style={styles.headerWrapper}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="account-school"
              size={50}
              color={colors.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>AcademiaPro - Master</Text>
            <Text style={styles.appSubtitle}>
              Empowering Teachers, Inspiring Students
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formWrapper}>
          {/* Email */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                shouldShake={shakeKey}
              />
            )}
            name="email"
          />

          {/* Password */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                shouldShake={shakeKey}
              />
            )}
            name="password"
          />

          {/* Remember + Forgot Password */}
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <AnimatedCheckbox value={remember} onChange={setRemember} />

              <Text style={styles.rememberText}>Remember Me</Text>
            </View>

            <Pressable onPress={() => console.log("Forgot password")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onSubmitPress}
        style={styles.submitButton}
        activeOpacity={0.5}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.navigate("/(auth)/create-account")}
        style={styles.CreateAccountButton}
        activeOpacity={0.5}
      >
        <Text style={styles.CreateAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthIndex;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.paddingHorizontal * 2,
    gap: theme.gap(5),
    paddingBottom: rt.insets.bottom,
  },
  toggleThemeWrapper: {
    position: "absolute",
    top: rt.insets.top,
    right: theme.paddingHorizontal * 2,
    width: "100%",
    alignItems: "flex-end",
  },
  bodyWrapper: { width: "100%", gap: theme.gap(5) },
  headerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: theme.gap(5),
  },

  logoCircle: {
    padding: theme.paddingHorizontal * 2,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.grey200,
    outlineOffset: 4,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: theme.colors.primary,
  },

  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  appTitle: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSizes.xl,
    fontFamily: "Bold",
  },

  appSubtitle: {
    color: theme.colors.onBackground,
    fontFamily: "Regular",
    fontSize: theme.fontSizes.xs,
  },

  formWrapper: {
    width: "100%",
    gap: theme.gap(3),
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.gap(2),
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap(1),
  },

  rememberText: {
    color: theme.colors.onBackground,
    fontFamily: "Regular",
    fontSize: theme.fontSizes.sm,
  },

  forgotPassword: {
    color: colors.primary,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.sm,
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: theme.spacing["3xl"],
    borderRadius: theme.radii.sm,
    justifyContent: "center",
    alignItems: "center",
    // boxShadow: `0px 2px 2px ${theme.colors.primary}`,
  },
  CreateAccountButton: {
    backgroundColor: "transparent",
    width: "100%",
    height: theme.spacing["3xl"],
    borderRadius: theme.radii.sm,
    justifyContent: "center",
    alignItems: "center",
    outlineWidth: 1,
    outlineOffset: 3,
    outlineColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
  },
  submitButtonText: {
    color: theme.colors.onPrimary,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
    includeFontPadding: false,
    textAlignVertical: "center",
    verticalAlign: "middle",
  },
  CreateAccountButtonText: {
    color: theme.colors.primary,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
    includeFontPadding: false,
    textAlignVertical: "center",
    verticalAlign: "middle",
  },
}));
