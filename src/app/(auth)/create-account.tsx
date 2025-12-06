import Input from "@/src/components/common/Input";
import { colors } from "@/unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";

/* -------------------------------------------------
 CREATE ACCOUNT SCHEMA
---------------------------------------------------*/
export const schema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, { message: "At least 6 characters" }),
});

type CreateAccountForm = z.infer<typeof schema>;

/* -------------------------------------------------
 COMPONENT
---------------------------------------------------*/
const CreateAccount = () => {
  const [shakeKey, setShakeKey] = useState(0);

  const passwordRef = useRef<TextInput | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  /* -------------------------------------------------
  SUBMIT HANDLER
  ---------------------------------------------------*/
  const onSubmitPress = async () => {
    setShakeKey((prev) => prev + 1);

    const isValid = await trigger();
    if (!isValid) return;

    handleSubmit(async (data) => {
      console.log("Create Account Submitted:", data);

      // redirect to login after account creation
      router.navigate("/(auth)");
    })();
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyWrapper}>
        {/* HEADER */}
        <View style={styles.headerWrapper}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="account-plus"
              size={50}
              color={colors.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>Create Your Account</Text>
            <Text style={styles.appSubtitle}>Join AcademiaPro today</Text>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.formWrapper}>
          {/* Full Name */}
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.fullName?.message}
                shouldShake={shakeKey}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
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
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                shouldShake={shakeKey}
              />
            )}
          />
        </View>
      </View>

      {/* SUBMIT */}
      <TouchableOpacity
        onPress={onSubmitPress}
        style={styles.submitButton}
        activeOpacity={0.5}
      >
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* GO TO LOGIN */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.CreateAccountButton}
        activeOpacity={0.5}
      >
        <Text style={styles.CreateAccountButtonText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

/* -------------------------------------------------
 STYLES
---------------------------------------------------*/
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.paddingHorizontal * 2,
    gap: theme.gap(10),
    paddingBottom: rt.insets.bottom,
  },
  toggleThemeWrapper: {
    position: "absolute",
    top: rt.insets.top + theme.paddingHorizontal,
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
    padding: 20,
    borderRadius: 100,
    backgroundColor: theme.colors.grey200,
    outlineOffset: 4,
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
    gap: theme.gap(2),
  },

  submitButton: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: theme.spacing["3xl"],
    padding: theme.paddingHorizontal,
    borderRadius: theme.radii.sm,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: `0px 2px 2px ${theme.colors.primary}`,
  },

  CreateAccountButton: {
    backgroundColor: "transparent",
    width: "100%",
    height: theme.spacing["3xl"],
    padding: theme.paddingHorizontal,
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
  },

  CreateAccountButtonText: {
    color: theme.colors.primary,
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
  },
}));
