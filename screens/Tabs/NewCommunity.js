import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function NewCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleCreate = () => {
    if (!communityName.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    navigation.navigate("Connect-chat", {
      newCommunity: {
        title: communityName.trim(),
        description: description.trim(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Create New Community</Text>

          <Image
            source={require("../../assets/male.png")}
            style={styles.image}
          />

          <TextInput
            placeholder="Community Name"
            style={styles.input}
            value={communityName}
            onChangeText={setCommunityName}
          />

          <TextInput
            placeholder="Community Description"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </ScrollView>

        <LinearGradient
          colors={["#00F996", "#00A6F9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: height * 0.15,
    textAlignVertical: "top",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 50,
  },
  buttonContainer: {
    borderRadius: 10,
    margin: 20,
  },
  button: {
    paddingVertical: height * 0.015,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
