import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/Colors";

import GlobalStyles from "../styles/GlobalStyles";
import Product from "../components/Product";
import ProductDivider from "../components/ProductDivider";

const PRODUCTS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Product 1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Product 2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Product 3",
  },
];

function HistoryScreen({ navigation }) {
  return (
    <View style={[GlobalStyles.container]}>
      <View style={GlobalStyles.headerView}>
        <Text style={GlobalStyles.header}>History</Text>
      </View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
          <Product navigation={navigation} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ProductDivider}
        contentContainerStyle={styles.contentContainer}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0.7,
    minWidth: "100%",
  },
});

export default HistoryScreen;
