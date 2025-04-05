import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Add axios for API calls
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, IconButton, TextInput } from "react-native-paper";

export default function SetupProfileScreen() {
  const [email, setEmail] = useState("user123@gmail.com");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the date picker visibility

  const navigation = useNavigation();

  // Fetch city and state based on pincode
  const fetchCityAndState = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data[0];
        if (data.Status === "Success") {
          setCity(data.PostOffice[0].District);
          setState(data.PostOffice[0].State);
        } else {
          alert("Invalid Pincode");
          setCity("");
          setState("");
        }
      } catch (error) {
        console.error("Error fetching city and state:", error);
        alert("An error occurred while fetching city and state");
      }
    }
  };

  const handleAadharChange = (text) => {
    // Restrict Aadhar to 12 digits
    if (text.length <= 12) {
      setAadhar(text);
    }
  };

  const handlePincodeChange = (text) => {
    // Restrict Pincode to 6 digits
    if (text.length <= 6 && /^[0-9]*$/.test(text)) {
      setPincode(text);
      fetchCityAndState(text); // Trigger city and state fetching
    }
  };

  const handleBirthDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios" ? true : false); // Hide picker on Android, keep for iOS
    setBirthDate(currentDate.toLocaleDateString()); // Format date for display
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Setup Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <IconButton
          icon="account-circle"
          size={100}
          style={styles.profileIcon}
          color="#c4c4c4"
        />
        <IconButton
          icon="pencil"
          size={24}
          style={styles.editIcon}
          color="#fff"
          onPress={() => alert("Edit Profile Picture")}
        />
      </View>

      {/* Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>

      {/* Email */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="email-address"
            editable={false} // user can't change
            activeOutlineColor="#fff"
          />
        </View>
      </Card>

      {/* Name */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.textInput}
            keyboardType="email-address"
            outlineColor="#fff"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Password */}
      {/* <Card style={styles.inputCard}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.textInput}
          outlineColor="#fff"
          activeOutlineColor="#fff"
          cursorColor="#000"
          secureTextEntry
        />
      </Card>
      <Text value={password}>{password}</Text>

      <TouchableOpacity>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity> */}

      {/* Address Details */}
      <Text style={styles.sectionTitle}>Address </Text>

      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="House/Flat no"
            value={flatNo}
            onChangeText={setFlatNo}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Address */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Pincode */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Pincode"
            value={pincode}
            onChangeText={handlePincodeChange} // Updated to use handlePincodeChange
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="number-pad"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* City */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={setCity}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
            editable={false} // City is auto-filled
          />
        </View>
      </Card>

      {/* State */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="State"
            value={state}
            onChangeText={setState}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
            editable={false} // State is auto-filled
          />
        </View>
      </Card>

      {/* Account Details */}
      <Text style={styles.sectionTitle}>Account Details</Text>

      {/* Aadhar Card Number */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Aadhar Card Number"
            value={aadhar}
            onChangeText={handleAadharChange}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="number-pad"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Card Holder's Name */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Card Holder's Name"
            value={cardHolder}
            onChangeText={setCardHolder}
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
            cursorColor="#000"
          />
        </View>
      </Card>

      {/* Birth Date */}
      <Card style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Birth Date"
            value={birthDate}
            onFocus={() => setShowDatePicker(true)} // Show date picker when input is focused
            mode="outlined"
            outlineColor="#fff"
            style={styles.textInput}
            keyboardType="default"
            activeOutlineColor="#fff"
          />
        </View>
      </Card>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleBirthDateChange}
        />
      )}

      {/* Save Button */}
      <LinearGradient
        colors={["#00F996", "#00A6F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert("Save");
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    // justifyContent:"center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileIcon: {
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 120,
    backgroundColor: "#00A6F9",
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  inputCard: {
    marginTop: 20,
    borderRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    width: "100%",
    elevation: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  changePasswordText: {
    color: "#0077b3",
    textAlign: "right",
    marginBottom: 10,
    marginTop: 5,
  },
  gradientButton: {
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    width: "100%",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  menuAnchor: {
    justifyContent: "center",
  },
});
