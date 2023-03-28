import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../styles/Colors";
import GlobalStyles from "../styles/GlobalStyles";

function NoInternetScreen(props) {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/no-internet.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>No Internet Connection!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    top: "10%",
    height: 450,
    width: 450,
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

export default NoInternetScreen;
