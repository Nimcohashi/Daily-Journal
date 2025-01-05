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
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading";
import axios from "axios";
import { getServerUrl } from "../../constants/api";
import { AuthContext } from "../context/AuthContext";

const EditNote = () => {
  const router = useRouter();

  const { token } = useContext(AuthContext);

  const { note } = useLocalSearchParams();
  const parsedNote = note ? JSON.parse(note) : {};

  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [noteId, setNoteId] = useState(parsedNote._id || "");
  const [title, setTitle] = useState(parsedNote.title || "");
  const [content, setContent] = useState(parsedNote.content || "");

  const handleSave = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    setUpdateLoading(true);
    const api = getServerUrl();
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${api}/notes/update/${noteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title,
          content,
        },
      };
      const response = await axios.request(config);

      if (response.status !== 200) {
        throw new Error("Failed to save note");
      }

      router.push("/(notes)");
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const api = getServerUrl();
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${api}/notes/delete/${noteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);

      if (response.status !== 200) {
        throw new Error("Failed to delete note");
      }

      router.push("/(notes)");
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Heading title="Edit note" onBackPress={() => router.back()} />

        {/* Note input section */}

        <View className="flex flex-col p-5">
          <View className="flex flex-col">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title...."
              className="border border-yellow-400 px-4 py-3 text-lg rounded-md w-full my-2  mb-2"
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Content...."
              className="border border-yellow-400 px-4 text-justify py-3 text-lg rounded-md w-full my-2 max-h-[30vh] overflow-auto mb-2"
              multiline={true}
              numberOfLines={7}
              style={{ height: 200 }}
            />
          </View>

          <View className="flex justify-center flex-col items-center mb-2 w-full py-3 content-center">
            <Text className="text-red-500 my-2">{error}</Text>
            <View className="flex flex-row justify-between">
              {updateLoading ? (
                <ActivityIndicator size="large" color="#FFD700" />
              ) : (
                <TouchableOpacity
                  onPress={handleSave}
                  className=" flex flex-row bg-yellow-400 px-4 py-3 rounded-full  mx-6 mb-2"
                >
                  <AntDesign name="edit" size={24} color="white" />
                  <Text className="text-white font-medium mx-4 text-xl text-center">
                    Update
                  </Text>
                </TouchableOpacity>
              )}

              {deleteLoading ? (
                <ActivityIndicator size="large" color="#FF0000" />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete Note",
                      "Are you sure you want to delete this note?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        { text: "OK", onPress: handleDelete },
                      ]
                    )
                  }
                  className="flex flex-row bg-red-500 px-4 py-3 rounded-full mx-6 mb-2"
                >
                  <AntDesign name="delete" size={24} color="white" />
                  <Text className="text-white font-medium mx-4 text-xl text-center">
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default EditNote;
