import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";
import axios from "axios";
import { getServerUrl } from "../../constants/api";
import { AuthContext } from "../context/AuthContext";

const NewNote = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    setLoading(true);
    const api = getServerUrl();

    const saveNote = async () => {
      try {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${api}/notes/create`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            title,
            content,
          },
        };

        const response = await axios.request(config);

        if (response.status === 201) {
          router.push("/(notes)");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    saveNote();
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Heading title="New note" onBackPress={() => router.back()} />

        {/* Note input section */}

        <View className="flex flex-col p-5">
          <View className="flex flex-col">
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Title...."
              className="border border-yellow-400 px-4 py-3 text-lg rounded-md w-full my-2  mb-2"
            />

            <TextInput
              value={content}
              onChangeText={(text) => setContent(text)}
              placeholder="Content...."
              className="border border-yellow-400 px-4 text-justify py-3 text-lg rounded-md w-full my-2 max-h-[30vh] overflow-auto mb-2"
              multiline={true}
              numberOfLines={7}
              style={{ height: 200 }}
            />
          </View>

          <View className="flex justify-center flex-col items-center mb-2 w-full py-3 content-center">
            <Text className="text-red-500 my-2">{error}</Text>

            {loading ? (
             <ActivityIndicator size="large" color="#FF0000" />
            ) : (
              <TouchableOpacity
                onPress={handleSave}
                className="bg-yellow-400 px-4 py-3 rounded-full w-4/5 mb-2"
              >
                <Text className="text-white font-medium text-xl text-center">
                  Save
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewNote;
