import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Note = ({
  name,
  details,
  onDeletePress,
  onEditPress,
  onNamePress,
  updatedAt,
}) => {
  return (
    <View className="flex flex-col my-3 bg-yellow-50 p-4 rounded-3xl">
      {/* Notes content */}
      <View className="display flex flex-col mx-1 justify-between">
        <TouchableOpacity onPress={onNamePress}>
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
          <TouchableOpacity onPress={onDeletePress}>
            <Image
              source={require("../assets/delete.png")}
              style={{ width: 25, height: 25 }}
              className="mx-2"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEditPress}>
            <Image
              source={require("../assets/edit.png")}
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
