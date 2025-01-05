import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Note from "../../components/note";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { getServerUrl } from "../../constants/api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const api = getServerUrl();
    const fetchUser = async () => {
      try {
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
      }
    };

    const fetchNotes = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api}/notes/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchNotes();
  }, [token]);


  const handleEditPress = (note) => {
    router.push({
      pathname: "/edit-note",
      params: { note: JSON.stringify(note) },
    });
  };

  const handleDeletePress = (note) => {
    const api = getServerUrl();
    const deleteNote = async () => {
      try {
        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `${api}/notes/delete/${note._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        setNotes(notes.filter((n) => n._id !== note._id));

        if (response.status === 200) {
          alert("Note deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteNote();
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
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

          {notes.map((note) => (
            <Note
              key={note._id}
              name={note.title}
              details={note.content}
              updatedAt={new Date(note.updatedAt).toLocaleString()}
              onDeletePress={() => handleDeletePress(note)}
              onNotePress={() => handleEditPress(note)}
            />
          ))}
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
