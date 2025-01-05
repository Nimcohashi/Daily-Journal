import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Note from "../../components/note";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const sampleNotes = [
  {
    _id: "676cf2dc4160fd8864e54606",
    title: "Note 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus reiciendis sunt ab! Ab, inventore quis! Quis eius dicta porro ipsa repellendus tenetur debitis, totam magni similique repudiandae impedit provident doloremque.",
    createdBy: "676cf2dc4160fd8864e54606",
    createdAt: "2024-12-26T06:08:28.400+00:00",
    updatedAt: "2024-12-26T06:08:28.400+00:00",
  },
  {
    _id: "676ce26f4160fd8864e545f9",
    title: "Note 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus reiciendis sunt ab! Ab, inventore quis! Quis eius dicta porro ipsa repellendus tenetur debitis, totam magni similique repudiandae impedit provident doloremque.",
    createdBy: "676cf2dc4160fd8864e54606",
    createdAt: "2024-12-26T06:08:28.400+00:00",
    updatedAt: "2024-12-26T06:08:28.400+00:00",
  },
  {
    _id: "676cf31c4160fd8864e5460a",
    title: "Note 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus reiciendis sunt ab! Ab, inventore quis! Quis eius dicta porro ipsa repellendus tenetur debitis, totam magni similique repudiandae impedit provident doloremque.",
    createdBy: "676cf2dc4160fd8864e54606",
    createdAt: "2024-12-26T06:08:28.400+00:00",
    updatedAt: "2024-12-26T06:08:28.400+00:00",
  },
  {
    _id: "676cf31c4160fd8864825460a",
    title: "Note 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus reiciendis sunt ab! Ab, inventore quis! Quis eius dicta porro ipsa repellendus tenetur debitis, totam magni similique repudiandae impedit provident doloremque.",
    createdBy: "676cf2dc4160fd8864e54606",
    createdAt: "2024-12-26T06:08:28.400+00:00",
    updatedAt: "2024-12-26T06:08:28.400+00:00",
  },
];

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className=" flex flex-col p-5">
          {/* Header */}
          <View className=" flex flex-row mb-5 justify-between p-5 bg-slate-200 rounded-3xl my-2">
            <View className=" flex flex-col justify-center">
              <Text className="text-xl text-gray-950 font-bold">User Name</Text>
              <Text className=" text-gray-950 ">+252 63 4566669</Text>
            </View>
            <View>
              <Link href="/profile" asChild>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/user.png")}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Notes */}

          {sampleNotes.map((note) => (
            <Note
              key={note._id}
              name={note.title}
              details={note.content}
              updatedAt={new Date(note.updatedAt).toLocaleString()}
              onDeletePress={() => console.log("Delete Pressed")}
              onEditPress={() => console.log("Edit Pressed")}
              onNotePress={() => console.log("Note Pressed")}
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
