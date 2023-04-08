import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../styles/Colors";

function Product(props) {
  const historyProductName = props.title;

  return (
    <View style={styles.productView}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("SearchResultsScreen", {
            historyProductName,
          })
        }
      >
        <Text style={styles.productText}>{JSON.parse(historyProductName)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productText: {
    color: Colors.white,
    fontSize: 20,
  },
  productView: {
    padding: 5,
  },
});

export default Product;
