import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../styles/Colors";

SearchResultItem = (props) => {
  let imageURL = props.SearchItem.product_photos[0];
  let storeName = props.SearchItem.offer.store_name;
  let price = props.SearchItem.offer.price;
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: imageURL,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{storeName}</Text>
      <Text style={[styles.priceText, styles.text]}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    height: 125,
    width: 125,
  },
  itemContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  priceText: {
    fontWeight: "bold",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
  },
});

export default SearchResultItem;
