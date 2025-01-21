// Import necessary components and libraries
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

/**
 * Heading component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display in the heading
 * @param {function} props.onBackPress - Function to call when the back button is pressed
 * 
 * @returns {JSX.Element} The rendered Heading component
 */
const Heading = ({ title, onBackPress }) => { // object destructuring to get the props values from index.jsx
  return (
    <View>
      <TouchableOpacity
        onPress={onBackPress}
        className=" bg-blue-400 m-5 rounded-3xl justify-between flex flex-row p-5 "
      >
        {/* Back arrow icon */}
        <AntDesign name="arrowleft" size={25} color="white" />
        
        {/* Title text */}
        <Text className="text-2xl text-white text-center shadow-orange-400 font-bold">
          {title}
        </Text>
        
        {/* Placeholder for spacing */}
        <Text> </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Heading;
