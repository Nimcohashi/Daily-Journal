// Import necessary modules and components
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";
import { AuthContext } from "../context/AuthContext"; // Import the authentication context
import axios from "axios"; // Import axios for making API requests
import { getServerUrl } from "../../constants/api"; // Import the server URL

const Profile = () => {
  // Get signOut function and token from AuthContext
  const { signOut, token } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  // Fetch user data when the component mounts or token changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Show loading indicator

        const api = getServerUrl(); // Get server URL

        let config = {
          method: "get", // HTTP GET method
          maxBodyLength: Infinity,
          url: `${api}/user/fetch-user`,
          headers: {
            Authorization: `Bearer ${token}`, // Set authorization header
          },
        };
        const response = await axios.request(config); // Make API request
        setUser(response.data); // Set user data
      } catch (error) {
        console.log(error); // Log any errors
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchUser(); // Call fetchUser function
  }, [token]); // Fetch user data when token changes

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {/* Heading component with back button */}
        <Heading title="Profile" onBackPress={() => router.back()} />

        <View className="flex flex-col p-5">
          <View className="flex flex-col items-center">
            {/* User avatar */}
            <Image
              source={require("../../assets/avatar.png")}
              className="w-24 h-24 rounded-full"
            />

            {/* Show loading indicator if data is being fetched */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            <View className="flex flex-col">
              {/* Display user information */}
              <Text className="text-xl text-gray-950 font-bold text-center mt-4">
                {user?.fullName}
              </Text>
              <Text className=" text-gray-950 text-center mt-2">
                {user?.phone}
              </Text>
              <Text className=" text-gray-950 text-center mt-2">
                {user &&
                  `Registered on ${new Date(
                    user.createdAt
                  ).toLocaleDateString()}`}{" "}
              </Text>
            </View>
          </View>

          <View className="flex flex-col mt-5">
            {/* Profile option */}
            <TouchableOpacity className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2">
              <View className="flex flex-row items-center space-x-2">
                <AntDesign name="user" size={30} color="blue" />
                <Text className="text-gray-950 text-lg ml-4">Profile</Text>
              </View>
              <AntDesign name="arrowright" size={24} color="blue" />
            </TouchableOpacity>
            {/* Change Password option */}
            <TouchableOpacity className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2">
              <View className="flex flex-row items-center space-x-2">
                <AntDesign name="key" size={30} color="blue" />
                <Text className="text-gray-950 text-lg ml-4">
                  Change Password
                </Text>
              </View>
              <AntDesign name="arrowright" size={24} color="blue" />
            </TouchableOpacity>
            {/* Logout option */}
            <TouchableOpacity
              className="flex flex-row mx-1 my-2 items-center justify-between bg-slate-50 rounded-xl p-2"
              onPress={() => {
                Alert.alert(
                  // Show confirmation dialog
                  "Confirm Logout",
                  "Do you really want to log out?",
                  [
                    { text: "No", style: "cancel" }, // Cancel button
                    {
                      text: "Yes",
                      onPress: () => {
                        signOut(); // Call signOut function
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
