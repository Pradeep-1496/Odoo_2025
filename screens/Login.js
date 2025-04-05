import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, HelperText, IconButton, TextInput } from "react-native-paper";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation(); // Get the navigation prop

  const handleLogin = () => {
    if (username == "") {
      setErrorMessage("First fill Email address");
    } else if (password == "") {
      setErrorMessage("Fill Password");
    } else if (username == "Admin" && password == "Admin") {
      setErrorMessage("");
      navigation.navigate("Home");
    } else {
      setErrorMessage("Wrong ID or Password, Try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome </Text>
        <Text style={styles.title}>Back!</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Email */}
        <Card style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Icon name="email-outline" size={20} color="#000" />
            <TextInput
              placeholder="Enter your email address"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              outlineColor="#fff"
              style={styles.textInput}
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
              secureTextEntry={secureText}
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={styles.eyeIcon}
            >
              <Icon
                name={secureText ? "eye" : "eye-off"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      {/* Error Message */}
      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")} // Use navigation prop
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <View style={styles.Center}>
        <LinearGradient
          colors={["#00F996", "#00A6F9"]} // Define your gradient colors
          start={{ x: 0, y: 0 }} // Start at the left (horizontal)
          end={{ x: 1, y: 0 }} // End at the right (horizontal)
          style={styles.gradientButton}
        >
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Text Continue with */}
      <Text style={styles.orText}>- OR Continue with -</Text>

      {/* Social Login */}
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

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>Create An Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05, // responsive padding based on screen width
    justifyContent: "center",
    backgroundColor: "white",
  },

  headerContainer: {
    marginBottom: height * 0.02,
    marginTop: height * 0.03,
  },

  title: {
    fontSize: RFPercentage(5), // responsive font size
    fontWeight: "bold",
    textAlign: "start",
    marginLeft: width * 0.05,
  },

  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.03,
  },

  inputCard: {
    marginTop: height * 0.02,
    borderRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: width * 0.03,
    backgroundColor: "#fff",
    width: width * 0.9, // Make the input fields responsive
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  textInput: {
    flex: 1,
    marginLeft: width * 0.03,
    fontSize: RFValue(16),
    color: "#000",
    backgroundColor: "#fff",
  },

  eyeIcon: {
    position: "absolute",
    right: width * 0.05,
    top: "50%",
    transform: [{ translateY: -10 }],
  },

  forgotPassword: {
    color: "#0077b3",
    textAlign: "right",
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },

  Center: {
    justifyContent: "center",
    alignItems: "center",
  },

  gradientButton: {
    borderRadius: 10,
    width: width * 0.9, // Make button width responsive
  },

  button: {
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    paddingVertical: height * 0.015,
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(18),
  },

  orText: {
    textAlign: "center",
    marginVertical: height * 0.02,
    color: "gray",
  },

  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.03,
  },

  socialIcon: {
    marginHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#00F996",
  },

  signUpText: {
    textAlign: "center",
    color: "#0077b3",
    fontWeight: "bold",
  },
});
