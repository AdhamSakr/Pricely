import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../styles/Colors";
import { HomeScreenNavigator, SearchHistoryNavigator } from "./CustomNavigator";

const Tab = createBottomTabNavigator();
const buttonOpacity = (props) => <TouchableOpacity {...props} />;

function BottomNavigator(props) {
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
          tabBarButton: buttonOpacity,
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
          tabBarButton: buttonOpacity,
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
