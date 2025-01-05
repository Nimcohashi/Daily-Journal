import React, { useContext, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import "../global.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/**
 * RootLayout component that wraps the application with AuthProvider.
 * This ensures that the authentication context is available throughout the app.
 */
const RootLayout = () => {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
};

/**
 * RootLayoutContent component that handles routing based on authentication state.
 * It redirects to the "getting-started" screen if the user is not authenticated.
 */
const RootLayoutContent = () => {
  const { token, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("auth/getting-started");
    }
  }, [token, isLoading]);

  if (isLoading) {
    // Show a loading screen or spinner
    return null;
  }

  return (
    // Stack navigator for the app

    <Stack>
      <Stack.Screen name="(notes)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/getting-started"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
