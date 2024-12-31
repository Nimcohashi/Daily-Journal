import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const GettingStarted = () => {
  return (
    <SafeAreaView>
      <View className=" bg-white flex flex-col items-center justify-between h-screen py-5">
        <Image
          source={require("../../assets/notes.png")}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          className="mt-32"
        />

        <Text className="text-4xl text-red-600 font-bold">My Notes</Text>

        <Text className="text-grey-600 text-2xl font-semibold">
          Welcome to the My Notes
        </Text>
        <View className="items-center w-full mb-11">
          <Link href="/auth/login" asChild>
            <TouchableOpacity
              style={{
                borderWidth: 1.5,
              }}
              className="border border-yellow-500 px-4 py-3 rounded-full w-[85%] mb-2"
            >
              <Text className="text-yellow-500 font-medium text-xl text-center">
                Log In
              </Text>
            </TouchableOpacity>
          </Link>
          {/* <Link href="(tabs)" asChild> */}
          <Link href="/auth/register" asChild>
            <TouchableOpacity className="bg-yellow-500 text-white px-4 py-3 rounded-full w-[85%] mb-10">
              <Text className="text-white font-medium text-xl text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default GettingStarted;
