import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { getServerUrl } from "../../constants/api";

const Profile = () => {
  const { signOut, token } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const api = getServerUrl();

        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api}/user/fetch-user`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Heading title="Profile" onBackPress={() => router.back()} />

        <View className="flex flex-col p-5">
          <View className="flex flex-col items-center">
            <Image
              source={require("../../assets/avatar.png")}
              className="w-24 h-24 rounded-full"
            />

            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            <View className="flex flex-col">
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
                  ).toLocaleDateString()}`}
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
