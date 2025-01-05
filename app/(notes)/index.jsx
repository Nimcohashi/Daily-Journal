// Import necessary modules and components
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Note from "../../components/note"; // Import the Note component to display notes
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { getServerUrl } from "../../constants/api"; // Import the server URL
import { AuthContext } from "../context/AuthContext"; // Import the authentication context

/**
 * Home component that displays user information and a list of notes.
 * Allows refreshing, editing, and deleting notes.
 */
const Home = () => {
  const { token } = useContext(AuthContext); // Get the authentication token from context

  const router = useRouter();
  const [user, setUser] = useState(null); // State to store user information
  const [notes, setNotes] = useState([]); // State to store notes
  const [refreshing, setRefreshing] = useState(false); // State to handle refresh control
  const [loading, setLoading] = useState(false); // State to handle loading indicator

  // Fetch user information from the server
  const fetchUser = async () => {
    const api = getServerUrl(); // Get the server URL
    try {
      let config = {
        // Axios request configuration
        method: "get",
        maxBodyLength: Infinity,
        url: `${api}/user/fetch-user`, // API endpoint to fetch user information
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with the token
        },
      };
      const response = await axios.request(config); // Send the request to the server
      setUser(response.data); // Set the user state with the response data
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch notes from the server and sort them by updated date
  const fetchNotes = async () => {
    const api = getServerUrl(); // Get the server URL
    setLoading(true); // Set loading state to true
    try {
      let config = {
        // Axios request configuration
        method: "get", // HTTP GET method
        maxBodyLength: Infinity,
        url: `${api}/notes/`, // API endpoint to fetch notes
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with the token
        },
      };
      const response = await axios.request(config); // Send the request to the server
      const sortedNotes = response.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      ); // Sort notes by updated date
      setNotes(sortedNotes); // Set the notes state with the sorted notes
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch user and notes when the component mounts or token changes
  useEffect(() => {
    fetchUser(); // Fetch user information
    fetchNotes(); // Fetch notes
  }, [token]); // Fetch data when the token changes

  // Handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    await fetchUser(); // Fetch user information
    await fetchNotes(); // Fetch notes
    setRefreshing(false);
  };

  // Navigate to the edit note screen with the selected note
  const handleEditPress = (note) => {
    router.push({
      pathname: "/edit-note", // Navigate to the edit note screen
      params: { note: JSON.stringify(note) }, // Pass the selected note as a parameter
    });
  };

  // Delete the selected note from the server and update the state
  const handleDeletePress = (note) => {
    const api = getServerUrl(); // Get the server URL
    const deleteNote = async () => {
      try {
        let config = {
          // Axios request configuration
          method: "delete", // HTTP DELETE method
          maxBodyLength: Infinity,
          url: `${api}/notes/delete/${note._id}`, // API endpoint to delete a note by ID
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header with the token
          },
        };
        const response = await axios.request(config); // Send the request to the server
        setNotes(notes.filter((n) => n._id !== note._id)); // Update the notes state by filtering out the deleted note

        if (response.status === 200) {
          alert("Note deleted successfully"); // Show an alert message if the note is deleted successfully
          fetchNotes(); // Fetch notes after deleting a note
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteNote(); // Delete the note
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {loading && (
        <View className="absolute inset-0 justify-center items-center z-10">
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#FFD700"]}
            onRefresh={onRefresh}
          /> // Add pull-to-refresh functionality
        }
      >
        <View className=" flex flex-col p-5">
          {/* Header */}
          <Link href="/profile" asChild>
            <TouchableOpacity className=" flex flex-row mb-5 justify-between p-5 bg-slate-200 rounded-3xl my-2">
              <View className=" flex flex-col justify-center">
                <Text className="text-xl text-gray-950 font-bold">
                  {user?.fullName}
                </Text>
                <Text className=" text-gray-950 ">{user?.phone}</Text>
              </View>

              <Image
                source={require("../../assets/user.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </Link>
          {/* Notes */}
          {notes.length === 0 && !loading && (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-gray-500">No notes available.</Text>
              <Text className="text-lg text-gray-500">
                Create a new note by clicking the "+" button below.
              </Text>
            </View>
          )}
          {notes.map(
            (
              note // Map through the notes array
            ) => (
              // Display each note using the Note component

              <Note
                key={note._id} // Unique key for each note
                name={note.title} // Note title
                details={note.content} // Note content
                updatedAt={new Date(note.updatedAt).toLocaleString()} // Note updated date
                onDeletePress={() => handleDeletePress(note)} // Delete note function
                onNotePress={() => handleEditPress(note)} // Edit note function
              />
            )
          )}
        </View>
      </ScrollView>

      <Link href="/new-note" asChild>
        <TouchableOpacity
          className="absolute right-5 bottom-5 bg-white  rounded-full"
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            elevation: 5,
          }}
        >
          <Image
            source={require("../../assets/plus.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </Link>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;
