import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" bg-white flex flex-col p-5 h-screen">
          {/* Header */}
          <View className=" flex flex-row justify-between p-5 bg-slate-200 rounded-3xl my-2">
            <View className=" flex flex-col justify-center">
              <Text className="text-xl text-gray-950 font-bold">User Name</Text>
              <Text className=" text-gray-950 ">+252 63 4566669</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/user.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </View>

          {/* Notes */}
          <View className="flex flex-col my-10 bg-yellow-50 p-4 rounded-3xl">
            {/* Notes content */}
            <View className="display flex flex-col mx-1 justify-between">
              <Text className=" font-semibold text-xl  text-gray-950">
                Note Name
              </Text>
              <Text className=" text-gray-950 font-normal text-justify my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                nihil consequuntur, quam ullam aspernatur voluptatum ad qui
                laboriosam veritatis debitis numquam, veniam unde esse eos sed
                eum. Rem, laborum facere?
              </Text>
            </View>
            {/* Notes button icons */}
            <View className="flex flex-row justify-end">
              <Image
                source={require("../../assets/delete.png")}
                style={{ width: 25, height: 25 }}
                className="mx-2"
              />
              <Image
                source={require("../../assets/edit.png")}
                style={{ width: 25, height: 25 }}
                className="mx-2"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
