import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, HelperText } from "react-native-paper"; // Use Paper components
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import { LinearGradient } from "expo-linear-gradient";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://192.168.224.108:5000/api/v1/forgot-password/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Invalid response from server");
      }
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON:", responseText);
        throw new Error("Invalid response from server");
      }
      if (response.ok) {
        const resetToken = data.resetToken; // <-- this must match the key in your backend response
        alert(`Reset link sent to ${email}`);
        navigation.navigate("ResetPassword", { token: resetToken });
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrorMessage("An error occurred. Try again later.");
    }
  };

  const handleEmail = () => {
    if (email == "") {
      setErrorMessage("Fill Email Address");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>Forgot</Text>
        <Text style={styles.title}>password?</Text>
      </View>

      {/* Email Input */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <Icon name="email-outline" size={20} color="#000" />
          <TextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            cursorColor="#000"
            style={styles.textInput}
            keyboardType="email-address"
          />
        </View>
      </Card>

      {/* Error Message */}
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}

      {/* Description */}
      <Text style={styles.description}>
        <Text style={styles.asterisk}>*</Text> We will send you a message to set
        or reset your new password
      </Text>

      {/* Submit Button */}
      <LinearGradient
        colors={["#00F996", "#00A6F9"]} // Define your gradient colors
        start={{ x: 0, y: 0 }} // Start at the left (horizontal)
        end={{ x: 1, y: 0 }} // End at the right (horizontal)
        style={styles.gradientButton}
      >
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000",
  },
  inputCard: {
    marginTop: 20,
    borderRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    color: "#6c6c6c",
  },
  asterisk: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 320,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  gradientButton: {
    marginTop: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0077b3",
  },
});

export default ForgotPassword;
