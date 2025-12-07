import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUnistyles } from "react-native-unistyles";

const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    Regular: Nunito_400Regular,
    Medium: Nunito_500Medium,
    Bold: Nunito_700Bold,
    SemiBold: Nunito_600SemiBold,
  });
  const { theme } = useUnistyles();

  const statusStyle =
    theme.colors.background === "#121212"
      ? "light"
      : theme.colors.background === "#FFFFFF"
      ? "dark"
      : "auto";

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={false}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen name="(main)" />
        </Stack.Protected>
      </Stack>
      <SystemBars style={statusStyle} />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
