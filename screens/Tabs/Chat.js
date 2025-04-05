import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Avatar, Card } from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const messages = [
  { id: '1', text: 'We make sure you get the best Services as possible', time: '7:38 am', sender: 'other' },
  { id: '2', text: 'ok', time: '7:40 am', sender: 'self' },
  { id: '3', text: 'We make sure you get the best Services as possible We make sure you get the best  Services', time: '7:41 am', sender: 'other' },
  { id: '4', text: 'We make sure you get the best Services as possible We make sure you get the best  Services', time: '7:45 am', sender: 'self' },
  { id: '5', text: 'We make sure you get the best', time: '7:41 am', sender: 'other' },
  { id: '6', text: 'We make sure you get the best Services as possible We make sure you get the best  Services', time: '7:41 am', sender: 'self' },
  { id: '7', text: 'ok', time: '7:41 am', sender: 'self' },
];

const ChatScreen = () => {
  const renderItem = ({ item }) => {
    const isSelf = item.sender === 'self';
    return (
      <View style={[styles.messageContainer, isSelf ? styles.alignRight : styles.alignLeft]}>
        {!isSelf && <Avatar.Image size={30} source={require('../assets/avatar.png')} />}
        <View style={[styles.messageBubble, { backgroundColor: isSelf ? '#f1f1f1' : '#fff' }]}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
        inverted
      />

      <View style={styles.inputContainer}>
        <Icon name="paperclip" size={24} color="#888" style={styles.icon} />
        <TextInput
          mode="flat"
          placeholder="Message or Post"
          style={styles.textInput}
          underlineColor="transparent"
        />
        <View style={styles.sendButton}>
          <Icon name="camera" size={24} color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  chatList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 6,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sendButton: {
    backgroundColor: '#00d9c0',
    borderRadius: 30,
    padding: 10,
    marginLeft: 6,
  },
});

export default ChatScreen;