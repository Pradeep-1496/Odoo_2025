import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, Button, TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const { width, height } = Dimensions.get("window");

const SubmissionScreen = () => {
  const [selectedOption, setSelectedOption] = useState("Post");
  const [inputText, setInputText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#000" />
          </Button>
          <Text style={styles.headerTitle}>Submission</Text>
          <View style={{ width: 80 }} />
        </View>

        {/* Image Selection */}
        <View style={styles.imageSelection}>
          <Button mode="outlined" onPress={openCamera}>
            Open Camera
          </Button>
          <Button mode="outlined" onPress={pickImages}>
            Select from Gallery
          </Button>
        </View>

        {/* Display Selected Images */}
        <View style={styles.imageRow}>
          {selectedImages.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.thumbnail} />
          ))}
        </View>

        {/* Radio Buttons */}
        <RadioButton.Group
          onValueChange={(value) => setSelectedOption(value)}
          value={selectedOption}
        >
          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <RadioButton value="Post" />
              <Text>Post</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Idea" />
              <Text>Idea</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Complain" />
              <Text>Complain</Text>
            </View>
          </View>
        </RadioButton.Group>

        {/* Text Input */}
        <TextInput
          mode="outlined"
          placeholder="Enter your Idea, Post, or Problem"
          value={inputText}
          onChangeText={setInputText}
          multiline
          style={styles.textInput}
        />
      </ScrollView>

      {/* Submit Button with Gradient */}
      <View style={styles.submitButtonContainer}>
        <LinearGradient
          colors={["#00F996", "#00A6F9"]} // Gradient Colors
          start={{ x: 0, y: 0 }} // Horizontal start
          end={{ x: 1, y: 0 }} // Horizontal end
          style={styles.gradientButton}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Submit successfully")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    left: "45%",
    transform: [{ translateX: -40 }],
  },
  imageSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: "top",
    padding: 10,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  gradientButton: {
    borderRadius: 10,
    width: width * 0.9, // Responsive width
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: height * 0.015,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SubmissionScreen;
