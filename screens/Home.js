import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const leaders = [
    { id: "1", name: "PM Modi", image: require("../assets/pm.png") },
    { id: "2", name: "CM", image: require("../assets/cm.png") },
    { id: "3", name: "MLA 1", image: require("../assets/mla1.png") },
    { id: "4", name: "MLA 2", image: require("../assets/mla2.png") },
    { id: "5", name: "MLA 3", image: require("../assets/mla2.png") },
    { id: "6", name: "MLA 4", image: require("../assets/mla2.png") },
    { id: "7", name: "MLA 5", image: require("../assets/mla2.png") },
    { id: "8", name: "MLA 6", image: require("../assets/mla2.png") },
    { id: "9", name: "MLA 7", image: require("../assets/mla2.png") },
    { id: "10", name: "MLA 8", image: require("../assets/mla2.png") },
  ];

  const posts = [
    {
      id: "1",
      icon: require("../assets/female.png"),
      user: "Rosedale Development Association",
      image: require("../assets/post/park.jpg"), // Replace with your image
      likes: 1200,
      comments: 532,
      description:
        "Join us for a Trail Workday! March 25th, 9AM-11AM at Fisher Park.  #community #trailcleanup",
      timeAgo: "2 days ago",
    },
    // Add more post objects here
    {
      id: "2",
      user: "Charusat",
      icon: require("../assets/adaptive-icon.png"),

      image: require("../assets/post/charusat.jpg"), // Replace with your image
      likes: 1234,
      comments: 567,
      description: "Sample Post 2",
      timeAgo: "3 days ago",
    },
    {
      id: "3",
      user: "Narendra Modi",
      icon: require("../assets/pm.png"),

      image: require("../assets/post/meloni.jpg"), // Replace with your image
      likes: 987,
      comments: 321,
      description: "Sample Post 3",
      timeAgo: "1 week ago",
    },
  ];

  const handleLeaderPress = (leader) => {
    alert(`Pressed on ${leader.name}`);
    // You can navigate to a different screen or perform other actions here
  };

  const renderLeaderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.leaderItem}
      onPress={() => handleLeaderPress(item)}
    >
      <View style={styles.leaderImageWrapper}>
        <LinearGradient
          colors={["#00F996", "#00A6F9"]} // Define your gradient colors
          start={{ x: 0, y: 0 }} // Start at the left (horizontal)
          end={{ x: 1, y: 0 }} // End at the right (horizontal)
          style={styles.gradientBorder}
        >
          <Image source={item.image} style={styles.leaderImage} />
        </LinearGradient>
      </View>
      <Text style={styles.leaderName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={item.icon} style={styles.Picon} />
        <Text style={styles.postUser}>{item.user}</Text>
      </View>
      <Image source={item.image} style={styles.postImage} />
      <View style={styles.postActions}>
        <TouchableOpacity>
          <Icon name="arrow-up-bold-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-variant-outline" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.Center}>
          <LinearGradient
            colors={["#00F996", "#00A6F9"]} // Define your gradient colors
            start={{ x: 0, y: 0 }} // Start at the left (horizontal)
            end={{ x: 1, y: 0 }} // End at the right (horizontal)
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert("joined");
              }}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.postDetails}>
        <Text style={styles.postLikes}>{item.likes} Likes</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postTime}>{item.timeAgo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.menuCon}
        >
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerTitleCon}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.profileImage}
          />
          <View style={styles.divider}></View>
          <Text style={styles.headerTitle}>Next Step</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileSetUp")}>
          <Image
            source={require("../assets/male.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchBar}>
        <Icon name="magnify" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search anything"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="microphone" size={24} color="#888" />
      </View> */}

      {/* Leader Section */}
      <FlatList
        data={leaders}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderLeaderItem}
        contentContainerStyle={styles.leaderList}
        showsHorizontalScrollIndicator={false}
        style={styles.leadersCon}
      />

      {/*  Post Section */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.postList}
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.tabsC}>
          <Icon name="home" size={28} color="#00A6F9" />

          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabsC}
          onPress={() => navigation.navigate("Connect-chat")}
        >
          <Icon name="android-messages" size={28} color="#888" />
          <Text style={styles.navText}> Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabsC}
          onPress={() => navigation.navigate("Submission")}
        >
          <Icon name="camera" size={28} color="#888" />
          <Text style={styles.navText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabsC}
          onPress={() => navigation.navigate("Statustab")}
        >
          <Icon name="list-status" size={28} color="#888" />
          <Text style={styles.navText}>Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabsC}
          onPress={() => navigation.navigate("Surveytab")}
        >
          <Icon name="file-document" size={28} color="#888" />
          <Text style={styles.navText}>Surveys</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  menuCon: {
    backgroundColor: "#f0f0f0",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 25,
  },
  headerTitleCon: {
    width: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 35,
    width: 1,
    backgroundColor: "#999999",
  },
  headerTitle: {
    fontSize: 18, // Adjusted for responsiveness
    fontWeight: "bold",
    color: "#000",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  leadersCon: {
    paddingVertical: 5,
    height: 120,
  },
  leaderList: {},
  leaderItem: {
    alignItems: "center",
    marginRight: 15,
    // height:150,
  },
  leaderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    borderWidth: 2, // Set the width of the border
    borderColor: "#000",
  },
  leaderName: {
    fontSize: 12,
    color: "#000",
  },
  communityList: {
    marginTop: 10,
    paddingBottom: 70,
  },
  communityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  communityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  communityDetails: {
    flex: 1,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  communityDescription: {
    fontSize: 14,
    color: "#888",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navText: {
    fontSize: 12,
    color: "#888",
  },
  navTextActive: {
    fontSize: 12,
    color: "#00A6F9",
  },
  tabsC: {
    justifyContent: "center",
    alignItems: "center",
  },
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1, // Add border width
    borderColor: "#ddd", // Add border color
    paddingBottom: 10, // Add padding to the bottom
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  Picon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  postUser: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  postImage: {
    width: "100%",
    height: 400, // Adjust the height as needed to maintain aspect ratio
    resizeMode: "contain", // Ensures the image fits within the bounds without stretching or distorting
    backgroundColor: "#fff",
  },

  postActions: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around", // Distribute actions evenly
  },
  postDetails: {
    paddingHorizontal: 10,
  },
  postLikes: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  postDescription: {
    marginBottom: 5,
    color: "#000",
  },
  postTime: {
    fontSize: 12,
    color: "#888",
  },
  postList: {
    paddingBottom: 70, // Adjust padding as needed
  },
  gradientButton: {
    borderRadius: 10,
    width: 100,
    height: 30,
  },

  button: {
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 3,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  leaderImageWrapper: {
    width: 65, // Slightly larger than the image to accommodate the border
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35, // Match the image's borderRadius to ensure it stays circular
    overflow: "hidden", // This ensures the gradient stays within the border radius
  },
  gradientBorder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35, // Match the image's borderRadius
    padding: 2, // This ensures the gradient border is visible around the image
  },
  leaderImage: {
    width: 60, // Adjust according to the desired image size
    height: 60,
    borderRadius: 30, // Half of the image width/height for circular shape
  },
});
