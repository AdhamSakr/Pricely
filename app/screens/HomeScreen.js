import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../styles/Colors";
import GlobalStyles from "../styles/GlobalStyles";

function HomeScreen({ navigation }) {
  const [productName, setProductName] = useState("");

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.headerImageView}>
        <Image
          source={require("../assets/home-screen-image.png")}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.textInputView}>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            setProductName("");
            navigation.navigate("SearchResultsScreen", { productName });
          }}
        >
          <Image source={require("../assets/searchbox-search.png")} />
        </TouchableOpacity>
        <TextInput
          onChangeText={(newText) => setProductName(newText)}
          placeholder="Search..."
          style={styles.textInput}
          value={productName}
        ></TextInput>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>OR</Text>
      </View>
      <View style={styles.cameraIconView}>
        <TouchableOpacity>
          <Image
            source={require("../assets/camera.png")}
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 90,
    width: 90,
  },
  cameraIconView: {
    flex: 3,
  },
  headerImage: {
    height: 150,
    width: 300,
  },
  headerImageView: {
    flex: 3,
  },
  searchIcon: {
    padding: 10,
    position: "absolute",
    left: 5,
    zIndex: 1,
  },
  text: {
    color: Colors.white,
    fontSize: 30,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 50,
    padding: 10,
    width: "100%",
  },
  textInputView: {
    flex: 1.5,
    flexDirection: "row-reverse",
  },
  textView: {
    flex: 1.5,
  },
});

export default HomeScreen;
