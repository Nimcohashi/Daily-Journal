// Import necessary libraries and components
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

// Define the GettingStarted component
const GettingStarted = () => {
  return (
    // Use SafeAreaView to ensure content is within safe area boundaries
    <SafeAreaView>
      <View className=" bg-white flex flex-col items-center justify-between h-screen py-5">
        {/* Display the logo image */}
        <Image
          source={require("../../assets/download (3).png")}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          className="mt-32"
        />

        {/* Display the main title */}
        <Text className="text-4xl text-blue-600 font-bold">Journal</Text>

        {/* Display the welcome message */}
        <Text className="text-grey-600 text-2xl font-semibold">
          Welcome to the Journal
        </Text>
        
        {/* Display the login and create account buttons */}
        <View className="items-center w-full mb-11">
          <Link href="/auth/login" asChild>
            <TouchableOpacity
              style={{
                borderWidth: 1.5,
              }}
              className="border border-blue-500 px-4 py-3 rounded-full w-[85%] mb-2"
            >
              <Text className="text-blue-500 font-medium text-xl text-center">
                Log In
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/auth/register" asChild>
            <TouchableOpacity className="bg-blue-500 text-white px-4 py-3 rounded-full w-[85%] mb-10">
              <Text className="text-white font-medium text-xl text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Display the status bar */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

// Export the GettingStarted component as the default export
export default GettingStarted;
