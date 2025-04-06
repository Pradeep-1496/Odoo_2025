import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params; // token passed via navigation

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setMessage("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://192.168.224.108:5000/api/v1/forgot-password/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password reset successfully!");
        navigation.navigate("Login");
      } else {
        setMessage(data.message || "Invalid or expired reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        label="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleResetPassword}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Reset Password
      </Button>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    padding: 6,
  },
  message: {
    textAlign: "center",
    color: "#d00",
    marginTop: 20,
  },
});

export default ResetPassword;
