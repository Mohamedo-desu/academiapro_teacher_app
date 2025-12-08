import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProvider from "../providers/ThemeProvider";

/* --------------------------------------------
   Root Layout Component
--------------------------------------------- */
const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Regular: Nunito_400Regular,
    Medium: Nunito_500Medium,
    SemiBold: Nunito_600SemiBold,
    Bold: Nunito_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={false}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={true}>
            <Stack.Screen name="(main)" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
