/**
 * Note component to display a note with its details and actions.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.name - The name/title of the note.
 * @param {string} props.details - The details/content of the note.
 * @param {function} props.onDeletePress - Function to call when delete button is pressed.
 * @param {function} props.onNotePress - Function to call when note is pressed.
 * @param {string} props.updatedAt - The last updated timestamp of the note.
 */

import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

const Note = ({ // object destructuring to get the props values from index.jsx
  name, 
  details,
  onDeletePress,
  onNotePress,
  updatedAt,
}) => {
  return (
    <View className="flex flex-col my-3 bg-yellow-50 p-4 rounded-3xl">
      {/* Notes content */}
      <View className="display flex flex-col mx-1 justify-between">
        <TouchableOpacity onPress={onNotePress}>
          <Text className="font-semibold text-xl text-gray-950">{name}</Text>

          <Text className="text-gray-950 font-normal text-justify my-2">
            {details}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes footer */}
      <View className="flex flex-row justify-between">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-950 font-normal text-justify my-2">
            {updatedAt}
          </Text>
        </View>
        {/* Notes button icons */}
        <View className="flex flex-row justify-end">
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
                  { text: "OK", onPress: onDeletePress },
                ]
              )
            }
          >
            <Image
              source={require("../assets/delete.png")}
              style={{ width: 25, height: 25 }}
              className="mx-2"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Note;
