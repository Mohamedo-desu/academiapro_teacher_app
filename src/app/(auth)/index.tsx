import Input from "@/src/components/common/Input";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/src/store/storage";
import { colors } from "@/unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
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
  const [passwordSecure, setPasswordSecure] = useState(false);

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

          if (parsed.password) {
            setPasswordSecure(true); // Mask if password exists
          }
        }
      } catch (err) {
        console.log("Failed to load saved login data:", err);
      }
    };

    loadSavedData();
  }, []);

  return (
    <View style={styles.container}>
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
                label="School Email Address"
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
                secureTextEntry={passwordSecure && !!value}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  // Only disable secure if fully cleared
                  if (text.length === 0 && passwordSecure) {
                    setPasswordSecure(false);
                  }
                }}
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
              <Checkbox
                value={remember}
                onValueChange={setRemember}
                color={remember ? colors.primary : undefined}
              />
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
    </View>
  );
};

export default AuthIndex;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.paddingHorizontal * 2,
    gap: theme.gap(10),
  },
  bodyWrapper: { width: "100%", gap: theme.gap(10) },
  headerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: theme.gap(10),
  },

  logoCircle: {
    padding: 20,
    borderRadius: 100,
    backgroundColor: theme.colors.overlay,
    outlineOffset: 3,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: theme.colors.primary,
  },

  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: theme.gap(1),
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
    padding: theme.paddingHorizontal,
    borderRadius: theme.radii.sm,
    justifyContent: "center",
    alignItems: "center",
    experimental_backgroundImage: `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
  },
  submitButtonText: {
    color: theme.colors.onPrimary,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
  },
}));
