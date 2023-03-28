import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../styles/Colors";
import GlobalStyles from "../styles/GlobalStyles";

function ErrorScreen(props) {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/error.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Oops, Something Went Wrong!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    top: "25%",
    height: 350,
    width: 350,
  },
  imageContainer: {
    flex: 6,
  },
  text: {
    color: Colors.white,
    fontSize: 30,
  },
  textContainer: {
    flex: 3,
  },
});

export default ErrorScreen;
