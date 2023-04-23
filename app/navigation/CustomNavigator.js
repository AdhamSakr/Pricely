import { React } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CameraScreen from "../screens/CameraScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import NoInternetScreen from "../screens/NoInternetScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";

const Stack = createNativeStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
      <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} />
    </Stack.Navigator>
  );
};

export { HomeScreenNavigator };

function SearchHistoryNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
    </Stack.Navigator>
  );
}

export { SearchHistoryNavigator };
