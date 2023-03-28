import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import GlobalStyles from "../styles/GlobalStyles";
import SearchResultItem from "../components/SearchResultItem";
import Loading from "../components/Loading";
import Error from "../components/Error";

const options = {
  method: "GET",
  // url: "https://real-time-product-search.p.rapidapi.com/search",
  // params: { q: "Nike shoes", country: "uk", language: "en" },
  headers: {
    "X-RapidAPI-Key": "803d2a3700mshd6950d3a60d02e5p1ea178jsn312b100485f2",
    "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
  },
};

extractPriceFromText = (text) => {
  return parseInt(text.replace(/,/g, "").match(/\d+/)[0]);
};

SearchResultsScreen = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [productListings, setProductListings] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://real-time-product-search.p.rapidapi.com/search?q=" +
        route.params.productName +
        "&country=uk&language=en",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setProductListings(response);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {isLoading ? (
        <Loading />
      ) : (productListings && productListings.status != "OK") || isError ? (
        (console.log(productListings), (<Error />))
      ) : (
        <>
          <View style={[GlobalStyles.headerView, { flex: 0.4 }]}>
            <Text style={GlobalStyles.header}>Search Results</Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={productListings.data.sort((a, b) =>
                extractPriceFromText(a.offer.price) >
                extractPriceFromText(b.offer.price)
                  ? 1
                  : -1
              )}
              keyExtractor={(item) => item.product_id}
              numColumns={2}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.offer.offer_page_url)}
                  style={styles.touchableOpacityListing}
                >
                  <SearchResultItem SearchItem={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
  itemSeparator: {
    height: 20,
  },
  touchableOpacityListing: {
    alignContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

export default SearchResultsScreen;
