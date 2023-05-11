import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../styles/Colors";
import { HomeScreenNavigator, SearchHistoryNavigator } from "./CustomNavigator";

const Tab = createBottomTabNavigator();
// tabButton component is passed to the tabBarButton property of the the tab screen components.
// The props has to be destructured as per https://reactnavigation.org/docs/bottom-tab-navigator/
const tabButton = (props) => <TouchableOpacity {...props} />;

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        activeTintColor: Colors.background,
        tabBarStyle: {
          height: 50,
          backgroundColor: Colors.background,
        },
        tabBarLabelStyle: {
          fontSize: 20,
          color: Colors.white,
        },
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => (
            <Image
              source={require("../assets/footer-search.png")}
              style={styles.icon}
            />
          ),
          tabBarButton: tabButton,
        }}
      />
      <Tab.Screen
        name="History"
        component={SearchHistoryNavigator}
        options={{
          tabBarLabel: "History",
          tabBarIcon: () => (
            <Image
              source={require("../assets/footer-history.png")}
              style={styles.icon}
            />
          ),
          tabBarButton: tabButton,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
});

export default BottomNavigator;
