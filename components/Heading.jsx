import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const Heading = ({ title, onBackPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onBackPress}
        className=" bg-yellow-400 m-5 rounded-3xl justify-between flex flex-row p-5 "
      >
        <AntDesign name="arrowleft" size={25} color="white" />
        <Text className="text-2xl text-white text-center shadow-orange-400 font-bold">
          {title}
        </Text>
        <Text> </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Heading;
