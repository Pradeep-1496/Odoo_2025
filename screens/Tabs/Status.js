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
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Status() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const renderCommunityItem = ({ item }) => (
    <TouchableOpacity style={styles.communityCard}>
      <Image source={item.image} style={styles.communityImage} />
      <View style={styles.communityDetails}>
        <Text style={styles.communityTitle}>{item.title}</Text>
        <Text
          style={[
            styles.communityDescription,
            item.description === "Pending"
              ? { color: "red" }
              : item.description === "successful"
              ? { color: "green" }
              : {},
          ]}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const communities = [
    {
      id: "1",
      title: "Education ",
      description: "Pending",
      image: require("../../assets/female.png"),
    },
    {
      id: "2",
      title: "Park Development",
      description: "successful",
      image: require("../../assets/female.png"),
    },
    {
      id: "3",
      title: "Waste Management",
      description: "successful",
      image: require("../../assets/female.png"),
    },
    {
      id: "4",
      title: "Health",
      description: "Pending",
      image: require("../../assets/female.png"),
    },
  ];

  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity
                 onPress={() => navigation.navigate("Home")}
                 style={styles.menuCon}
               >
                 <Icon name="home" size={28} color="#000" />
               </TouchableOpacity>

        <View style={styles.headerTitleCon}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.profileImage}
          />
          <View style={styles.divider}></View>
          <Text style={styles.headerTitle}>Next Step</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileSetUp")}>
          <Image
            source={require("../../assets/male.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search anything"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="microphone" size={24} color="#888" />
      </View>

      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={renderCommunityItem}
        contentContainerStyle={styles.communityList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.tabsC}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={28} color="#888" />
          <Text style={styles.navText}>Home</Text>
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
        >
          <Icon name="list-status" size={28} color="#00A6F9" />
          <Text style={styles.navTextActive}>Status</Text>
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
    fontSize: 18,
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
  gradientButton: {
    margin: 10,
    borderRadius: 10,
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
    fontSize: 20,
  },
  communityList: {
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
    // Default color will be overridden dynamically
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
});
