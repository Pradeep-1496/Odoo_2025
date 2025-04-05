import "react-native-gesture-handler"; // Make sure this is at the top of your file!
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import your screens
import LoginScreen from "./screens/Login.js";
import SignUpScreen from "./screens/SignUp.js";
import ForgotPasswordScreen from "./screens/ForgotPassword.js";
import ProfileSetUp from "./screens/ProfileSetUp.js";
import HomeScreen from "./screens/Home.js";
import Submission from "./screens/Tabs/Submission";
import Connect from "./screens/Tabs/Connect.js";
import Status from "./screens/Tabs/Status.js";
import Survey from "./screens/Tabs/Survey.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSetUp"
          component={ProfileSetUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Submission"
          component={Submission}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Connect-chat"
          component={Connect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Statustab"
          component={Status}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Surveytab"
          component={Survey}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
