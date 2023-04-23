import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalStyles from "../styles/GlobalStyles";
import SearchResultItem from "../components/SearchResultItem";
import Loading from "../components/Loading";
import Error from "../components/Error";

const options = {
  method: "GET",
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
  const historyProductName = route.params.historyProductName;
  const productName = route.params.productName;
  const detectedObject = route.params.detectedObject;

  useEffect(() => {
    const getProductListingsFromHistory = async () => {
      console.log("Beginning of getProductListingsFromHistory function");
      try {
        const productListingsFromHistory = await AsyncStorage.getItem(
          historyProductName
        );
        console.log("Showing old search results from Async Storage");
        setProductListings(JSON.parse(productListingsFromHistory));
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }

      console.log("End of getProductListingsFromHistory function");
    };

    const getProductListingsFromAPI = async (product) => {
      console.log("Beginning of getProductListingsFromAPI function");
      try {
        const response = await fetch(
          "https://real-time-product-search.p.rapidapi.com/search?q=" +
            product +
            "&country=uk&language=en",
          options
        );
        let productListingsFromAPI = await response.json();
        if (productListingsFromAPI.status != "OK") {
          setError(true);
          console.log("API returned error: " + productListingsFromAPI.message);
        } else {
          setProductListings(productListingsFromAPI);
          AsyncStorage.setItem(
            JSON.stringify(product),
            JSON.stringify(productListingsFromAPI)
          );
          console.log("Added " + product + " to Async Storage");
          console.log(
            "Showing new search results for " + product + " from API call"
          );
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }

      console.log("Beginning of getProductListingsFromAPI function");
    };

    if (historyProductName) {
      getProductListingsFromHistory();
    } else if (productName) {
      getProductListingsFromAPI(productName);
    } else if (detectedObject) {
      getProductListingsFromAPI(detectedObject);
    }
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
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
