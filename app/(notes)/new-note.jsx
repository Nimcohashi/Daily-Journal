import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Heading from "../../components/Heading";
import axios from "axios";
import { getServerUrl } from "../../constants/api";
import { AuthContext } from "../context/AuthContext";

/**
 * NewNote component allows users to create a new note.
 * It includes input fields for the note's title and content,
 * and a button to save the note.
 */
const NewNote = () => {
  const { token } = useContext(AuthContext); // Get the authentication token from context
  const router = useRouter(); // Get the router instance for navigation
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [title, setTitle] = useState(""); // State to manage note title
  const [content, setContent] = useState(""); // State to manage note content
  const [error, setError] = useState(""); // State to manage error messages

  /**
   * Handle save button press.
   * Validates input fields and sends a request to save the note.
   */
  const handleSave = () => {
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    setLoading(true);
    const api = getServerUrl(); // Get the server URL

    const saveNote = async () => {
      try {
        let config = {
          method: "post", // HTTP POST method
          maxBodyLength: Infinity,
          url: `${api}/notes/create`, // API endpoint to create a new note
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header with the token
          },
          data: { // Request body with note title and content
            title,
            content,
          },
        };

        const response = await axios.request(config); // Send the request to the server

        if (response.status === 201) {
          router.push("/(notes)"); // Navigate to notes list on success
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
                onPress={handleSave} // Call handleSave function on button press
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

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default NewNote;
