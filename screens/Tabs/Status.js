import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import GifImage from "@lowkey/react-native-gif";

export class Status extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Status Page Under Development</Text>
        <GifImage
          source={require("../../assets/develop.gif")}
          style={styles.profileImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImage: {
    margin: 20,
  },
});

export default Status;
