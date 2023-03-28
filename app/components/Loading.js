import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import Colors from "../styles/Colors";
import GlobalStyles from "../styles/GlobalStyles";

function LoadingScreen(props) {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={Colors.white}
        />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
  },
  spinner: {
    // https://stackoverflow.com/questions/49671048/style-activityindicator-in-react-native
    transform: [{ scaleX: 3 }, { scaleY: 3 }],
  },
  text: {
    color: Colors.white,
    fontSize: 35,
    top: "5%",
  },
});

export default LoadingScreen;
