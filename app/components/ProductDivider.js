import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../styles/Colors";

function ProductDivider(props) {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.white,
  },
});

export default ProductDivider;
