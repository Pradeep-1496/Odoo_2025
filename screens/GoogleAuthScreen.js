import React, { useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

const GoogleAuthScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "Y416932009988-5frdum7j4sq0ih4g559k7njqe5g1k92l.apps.googleusercontent.com", // Use the client ID from Google Cloud Console
      offlineAccess: true, // Enable for server-side token exchange
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Check if Google Play Services are available
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);

      // Send token to your backend
      const idToken = userInfo.idToken;
      await fetch("http://localhost:1004/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services not available");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});

export default GoogleAuthScreen;
