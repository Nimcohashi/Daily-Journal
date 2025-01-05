import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getServerUrl } from "../../constants/api"; // Import the getServerUrl function from the api.js file
import { Link, useRouter } from "expo-router";
import axios from "axios"; // Import the axios library  
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext from the context folder

const Login = () => {
  const { signIn } = React.useContext(AuthContext); // Get the signIn function from the AuthContext
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  async function handleSubmit() {
    // Validate input fields
    if (!phone || !password) {
      setError("Please fill out all fields");
      return;
    }
    setError("");

    setLoading(true);
    const api = getServerUrl(); // Get the server URL using the getServerUrl function

    try {
      let data = JSON.stringify({ // Create a JSON string with the user data
        phone: phone,
        password: password,
      });

      let config = { // Create a configuration object with the request data 
        method: "post",
        url: `${api}/user/login`, // Set the URL for the request
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      let response = await axios(config); // Send the request to the server

      if (response.status === 200) { // If the request is successful (status code 200)
        signIn(response.data.token); // Sign in the user with the token received from the server
        router.push("../(notes)"); // Redirect the user to the notes page
      } else {
        setError(
          response.data.message || "An error occurred. Please try again later."
        );
      }
    } catch (error) {
      // Handle any network or server errors that occur
      if (error.response) {
        setError(error.response.data.message); // Display the specific error from the server
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" bg-white flex flex-col  min-h-[83vh] items-center h-screen">
          <Image
            source={require("../../assets/notes.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
            className="mt-32"
          />

          <Text className="text-4xl my-4 text-red-600 font-bold">My Notes</Text>

          <Text className="text-grey-600 my-4 text-xl font-semibold">
            Sign In
          </Text>

          <View className="items-center w-full">
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              inputMode="numeric"
              className="border border-gray-700 px-4 py-3 text-lg rounded-2xl w-[85%] mb-2"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              className="border border-gray-700 px-4 py-3  text-lg rounded-2xl w-[85%] mb-2"
            />

            <View className="flex justify-end flex-row mb-2  w-[85%] py-3 content-end">
              <Text className="text-red-500">Forgot password?</Text>
            </View>

            <View className="flex justify-center flex-row mb-2  w-[85%] py-3 content-center">
              <Text className="text-red-500">{error}</Text>
            </View>

            <View className="items-center mb-36 w-full">
              {loading ? (
                <ActivityIndicator size="large" color="#FF0000" />
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-yellow-500 px-4 py-3 rounded-full w-4/5 mb-2"
                >
                  <Text className="text-white font-medium text-xl text-center">
                    Log In
                  </Text>
                </TouchableOpacity>
              )}
              <Text className="text-grey-600 text-xl font-semibold">
                Don't have an account?{" "}
                <Link href="./register" className="text-red-500">
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Login;
