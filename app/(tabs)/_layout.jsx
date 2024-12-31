import { View, Text } from "react-native";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import "../../global.css";

const TabsLayout = () => {
 
  const { token } = React.useContext(AuthContext);
  const router = useRouter();

 

  return (
    <View>
      <Text>TabsLayout</Text>

      {token ? (
        <>
          <Text>Logged in</Text>
          <Text>{token}</Text>
        </>
      ) : (
        <Text>Logged out</Text>
      )}
    </View>
  );
};

export default TabsLayout;
