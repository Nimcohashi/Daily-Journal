import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";

const NewNote = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Heading title="New note" onBackPress={() => router.back()} />

        {/* Note input section */}

        <View className="flex flex-col p-5">
          <View className="flex flex-col">
            <TextInput
              placeholder="Title...."
              className="border border-yellow-400 px-4 py-3 text-lg rounded-md w-full my-2  mb-2"
            />

            <TextInput
              placeholder="Content...."
              className="border border-yellow-400 px-4 text-justify py-3 text-lg rounded-md w-full my-2 max-h-[30vh] overflow-auto mb-2"
              multiline={true}
              numberOfLines={7}
              style={{ height: 200 }}
            />
          </View>

          <View className="flex justify-center flex-col items-center mb-2 w-full py-3 content-center">
            <Text className="text-red-500 my-2">Error message</Text>

            <TouchableOpacity
              onPress={() => {}}
              className="bg-yellow-400 px-4 py-3 rounded-full w-4/5 mb-2"
            >
              <Text className="text-white font-medium text-xl text-center">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewNote;
