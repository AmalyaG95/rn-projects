import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Constants from "expo-constants";

import SafeScreen from "@/components/safe-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const publishableKey =
    // process.env may be available in dev, but when building with EAS you should
    // provide the key via build-time env or eas secrets exposed through `extra`.
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    // `Constants.expoConfig.extra` is populated from app.json `extra` or EAS build envs
    (Constants.expoConfig &&
      Constants.expoConfig.extra &&
      Constants.expoConfig.extra.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) ||
    // As a last resort, undefined — Clerk will throw if missing in production.
    undefined;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
