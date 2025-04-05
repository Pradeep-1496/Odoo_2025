import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card, TextInput, IconButton, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Get device screen width and height
const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    if (username === "") {
      setErrorMessage("Fill Email Address");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    } else {
      setErrorMessage("");
      alert("Account Created as \nuser: " + username + "\npass: " + password);
      navigation.navigate("ProfileSetUp");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{ marginBottom: 10, marginTop: height * 0.03 }}>
        <Text style={styles.header}>Create an </Text>
        <Text style={styles.header}>account</Text>
      </View>

      {/* Email */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <Icon name="email-outline" size={20} color="#000" />
          <TextInput
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            style={styles.textInput}
            mode="outlined"
            outlineColor="#fff"
            keyboardType="email-address"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Password */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#000" />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            cursorColor="#000"
            style={styles.textInput}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={passwordVisible ? "eye" : "eye-off"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Confirm Password */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#000" />
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            cursorColor="#000"
            style={styles.textInput}
            secureTextEntry={confirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={confirmPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Error Message */}
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}

      {/* Terms and Conditions */}
      <Text style={{ fontSize: RFValue(10), marginTop: 10, marginLeft: 10 }}>
        By creating an account, you agree to our Terms and Condition policy
      </Text>

      {/* Sign-Up Button */}
      <LinearGradient
        colors={["#00F996", "#00A6F9"]} // Define your gradient colors
        start={{ x: 0, y: 0 }} // Start at the left (horizontal)
        end={{ x: 1, y: 0 }} // End at the right (horizontal)
        style={styles.gradientButton}
      >
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Social Media Login */}
      <View style={styles.socialContainer}>
        <Text>- OR Continue with -</Text>
        <View style={styles.socialButtons}>
          <IconButton
            icon="google"
            size={RFValue(30)}
            onPress={() => console.log("Google login")}
            style={styles.socialIcon}
          />
          {/* <IconButton
            icon="apple"
            size={RFValue(30)}
            onPress={() => console.log("Apple login")}
            style={styles.socialIcon}
          /> */}
          <IconButton
            icon="facebook"
            size={RFValue(30)}
            onPress={() => console.log("Facebook login")}
            style={styles.socialIcon}
          />
        </View>
      </View>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already Have an Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05, // Responsive padding
    backgroundColor: "white",
  },
  header: {
    fontSize: RFPercentage(5), // Responsive font size
    fontWeight: "bold",
    textAlign: "start",
    marginLeft: width * 0.05,
  },
  inputCard: {
    marginTop: height * 0.02,
    borderRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: width * 0.03, // Dynamic padding
    backgroundColor: "#fff",
    width: width * 0.9, // Make input fields responsive
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginLeft: width * 0.03, // Adjust input text field width
    fontSize: RFValue(16),
    color: "#000",
    backgroundColor: "#fff",
  },
  gradientButton: {
    marginTop: height * 0.03,
    borderRadius: 10,
  },
  button: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    width: width * 0.9, // Make button width responsive
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: RFValue(18), // Adjust font size responsively
  },
  socialContainer: {
    alignItems: "center",
    marginVertical: height * 0.02, // Dynamic margin
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.6, // Adjust button width dynamically
    marginTop: height * 0.02,
  },
  socialIcon: {
    marginHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#00F996",
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0077b3",
    marginTop: height * 0.02,
  },
  eyeIcon: {
    position: "absolute",
    right: width * 0.05, // Adjust eye icon position
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default SignUp;
