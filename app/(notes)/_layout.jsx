// Import necessary modules and components
import React from "react";
import { Stack } from "expo-router";
import "../../global.css"; // Import the global styles

// Define the layout for the Notes section of the app
const NotesLayout = () => {
  return (
    <Stack>
      {/* Define the screens within the Notes section */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new-note" options={{ headerShown: false }} />
      <Stack.Screen name="edit-note" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NotesLayout;
