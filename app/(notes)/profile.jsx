import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Heading title="Profile" />

        <View className="flex flex-col p-5">
          <View className="flex flex-col items-center">
            <Image
              source={require("../../assets/avatar.png")}
              className="w-24 h-24 rounded-full"
            />
            <View className="flex flex-col">
              <Text className="text-xl text-gray-950 font-bold text-center mt-4">
                User Name
              </Text>
              <Text className=" text-gray-950 text-center mt-2">
                +252 63 4566669
              </Text>
              <Text className=" text-gray-950 text-center mt-2">
                Registered on{" "}
              </Text>
            </View>
          </View>

          <View className="flex flex-col mt-5">
            <TouchableOpacity className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2">
              <View className="flex flex-row items-center space-x-2">
                <AntDesign name="user" size={30} color="black" />
                <Text className="text-gray-950 text-lg ml-4">Profile</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2">
              <View className="flex flex-row items-center space-x-2">
                <AntDesign name="key" size={30} color="black" />
                <Text className="text-gray-950 text-lg ml-4">
                  Change Password
                </Text>
              </View>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2"
              onPress={() => {
                Alert.alert(
                  "Confirm Logout",
                  "Do you really want to log out?",
                  [
                    { text: "No", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => {
                        signOut();
                      },
                    },
                  ]
                );
              }}
            >
              <View className="flex flex-row items-center space-x-2">
                <AntDesign name="logout" size={30} color="red" />
                <Text className=" text-red-600 text-lg ml-4">Logout</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Profile;
