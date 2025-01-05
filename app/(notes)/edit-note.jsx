import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router"; // Import the useRouter hook from Expo Router
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../components/Heading"; // Import the Heading component to display the page heading
import axios from "axios"; // Import axios for API calls
import { getServerUrl } from "../../constants/api"; // Import the server URL
import { AuthContext } from "../context/AuthContext"; // Import the authentication context

/**
 * EditNote component allows users to edit and delete their notes.
 */
const EditNote = () => {
  const router = useRouter();

  const { token } = useContext(AuthContext); // Get the authentication token from context

  const { note } = useLocalSearchParams(); // Get the note ID from the URL
  const parsedNote = note ? JSON.parse(note) : {}; // Parse the note object

  // State variables
  const [updateLoading, setUpdateLoading] = useState(false); // State to handle update loading
  const [deleteLoading, setDeleteLoading] = useState(false); // State to handle delete loading
  const [error, setError] = useState("");
  const [noteId, setNoteId] = useState(parsedNote._id || ""); // State to store the note ID
  const [title, setTitle] = useState(parsedNote.title || ""); // State to store the note title
  const [content, setContent] = useState(parsedNote.content || ""); // State to store the note content

  /**
   * Handles saving the updated note.
   */
  const handleSave = async () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    setUpdateLoading(true);
    const api = getServerUrl(); // Get the server URL
    try {
      let config = {
        method: "put", // HTTP PUT method
        maxBodyLength: Infinity,
        url: `${api}/notes/update/${noteId}`, // API endpoint to update the note
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with the token
        },
        data: {
          // Request body data
          title, // Updated note title
          content, // Updated note content
        },
      };
      const response = await axios.request(config); // Send the request to the server

      if (response.status !== 200) {
        // Check if the response status is not 200
        throw new Error("Failed to save note");
      }

      router.push("/(notes)"); // Redirect to the notes page
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  /**
   * Handles deleting the note.
   */
  const handleDelete = async () => {
    setDeleteLoading(true);
    const api = getServerUrl(); // Get the server URL
    try {
      let config = {
        method: "delete", // HTTP DELETE method
        maxBodyLength: Infinity,
        url: `${api}/notes/delete/${noteId}`, // API endpoint to delete a note by ID
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with the token
        },
      };
      const response = await axios.request(config); // Send the request to the server

      if (response.status !== 200) {
        // Check if the response status is not 200
        throw new Error("Failed to delete note");
      }

      router.push("/(notes)"); // Redirect to the notes page
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
        {/* Display the page heading */}
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
              {updateLoading || deleteLoading ? (
                <ActivityIndicator size="large" color="#FFD700" />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={handleSave}
                    className=" flex flex-row bg-yellow-400 px-5 py-3 rounded-full  mx-6 mb-2"
                  >
                    <AntDesign name="edit" size={24} color="white" />
                    <Text className="text-white font-medium mx-4 text-xl text-center">
                      Update
                    </Text>
                  </TouchableOpacity>

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
                    className="flex flex-row bg-red-500 px-5 py-3 rounded-full mx-6 mb-2"
                  >
                    <AntDesign name="delete" size={24} color="white" />
                    <Text className="text-white font-medium mx-4 text-xl text-center">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </>
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
