import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { getServerUrl } from "../../constants/api";  // Import the getServerUrl function from the api.js file
import axios from "axios"; // Import the axios library
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext from the context folder

const Register = () => {
  const { signIn } = React.useContext(AuthContext); // Get the signIn function from the AuthContext
  const router = useRouter(); // Get the router object from the expo-router
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  /**
   * Handles the form submission for user registration.
   * 
   * Validates the input fields, checks if passwords match, and sends a POST request
   * to the server to register the user. If successful, signs in the user and redirects
   * to the notes page. Otherwise, sets an error message.
   * 
   * @async
   * @function handleSubmit
   * @returns {Promise<void>} A promise that resolves when the form submission is complete.
   */
  async function handleSubmit() {
    // Validate input fields
    if (!fullName || !phoneNumber || !password || !confirmPassword) {
      setError("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    setLoading(true);
    const api = getServerUrl(); // Get the server URL using the getServerUrl function

    let data = JSON.stringify({ // Create a JSON string with the user data
      fullName: fullName,
      phone: phoneNumber,
      password: password,
    });

    let config = { // Create the axios request configuration
      method: "post",
      url: `${api}/user/register`, // Use the server URL and the /user/register endpoint
      headers: {
        "Content-Type": "application/json",
      },
      data: data, // Set the data to the JSON string
    };

    try {
      let response = await axios(config); // Send the POST request to the server

      if (response.status === 201) { // If the response status is 201 (Created)
        signIn(response.data.token); // Sign in the user with the token received from the server
        router.push("../(notes)"); // Redirect to the notes page  
      } else {
        setError(
          response.data.message || "An error occurred. Please try again later."
        );
      }
    } catch (error) {
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
    <SafeAreaView className="">
      <ScrollView>
        <View className=" bg-white flex flex-col min-h-[83vh] items-center h-screen">
          <Image
            source={require("../../assets/notes.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
            className="mt-32"
          />

          <Text className="text-4xl my-4 text-red-600 font-bold">My Notes</Text>

          <Text className="text-grey-600 my-4 text-xl font-semibold">
            Create an Account
          </Text>

          <View className="items-center w-full mt-2 h-fit justify-between">
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              className="border border-gray-700 px-4 py-3  text-lg  rounded-2xl w-[85%] mb-2"
            />

            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              inputMode="numeric"
              className="border border-gray-700 px-4 py-3  text-lg  rounded-2xl w-[85%] mb-2"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              className="border border-gray-700 px-4 py-3  text-lg  rounded-2xl w-[85%] mb-2"
            />

            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
              className="border border-gray-700 px-4 py-3 rounded-2xl w-[85%] mb-2"
            />

            <Text className="text-red-500 text-sm">{error}</Text>

            <View className="items-center mb-32 mt-2 w-full">
              {loading ? (
                <ActivityIndicator size="large" color="#FF0000" />
              ) : (
                <TouchableOpacity
                  onPress={handleSubmit}
                  className=" bg-yellow-500 px-4 py-3 rounded-full w-4/5 mb-2"
                >
                  <Text className="text-white font-medium text-xl text-center">
                    Register
                  </Text>
                </TouchableOpacity>
              )}

              <Text className="text-grey-600 text-xl font-semibold">
                Have an account?{"     "}
                <Link href="./login" className="text-red-500">
                  Sign in
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

export default Register;
