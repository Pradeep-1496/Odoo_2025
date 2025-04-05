import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

export default function ChatScreen({ route, navigation }) {
  const { title, image } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, { type: "text", content: text }]);
      setText("");
    }
  };

  const attachImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { type: "image", content: result.assets[0].uri }]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageBubble}>
      {item.type === "text" ? (
        <Text style={styles.messageText}>{item.content}</Text>
      ) : (
        <Image source={{ uri: item.content }} style={styles.chatImage} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={image} style={styles.headerImage} />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messages}
      />

      {/* Chat input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inputContainer}
      >
        <TouchableOpacity onPress={attachImage}>
          <Icon name="paperclip" size={24} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={24} color="#00A6F9" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#ffffff",
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    backgroundColor: "#e0f7fa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  chatImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
});
