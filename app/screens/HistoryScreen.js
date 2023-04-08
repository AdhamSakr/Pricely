import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalStyles from "../styles/GlobalStyles";
import Product from "../components/Product";
import ProductDivider from "../components/ProductDivider";

HistoryScreen = ({ navigation }) => {
  const [productSearchHistory, setProductSearchHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((allKeys) => {
        setProductSearchHistory(allKeys);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <View style={[GlobalStyles.container]}>
      <View style={GlobalStyles.headerView}>
        <Text style={GlobalStyles.header}>History</Text>
      </View>
      <FlatList
        data={productSearchHistory}
        renderItem={({ item }) => (
          <Product navigation={navigation} title={item} />
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={ProductDivider}
        contentContainerStyle={styles.contentContainer}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0.7,
    minWidth: "100%",
  },
});

export default HistoryScreen;
