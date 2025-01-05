import { View, Text } from "react-native";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Stack, useRouter } from "expo-router";
import "../../global.css";

const NotesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new-note" options={{ headerShown: false }} />
      <Stack.Screen name="edit-note" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NotesLayout;
