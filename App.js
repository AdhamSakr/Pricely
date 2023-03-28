import { React } from "react";
import { NavigationContainer } from "@react-navigation/native";
// The React Navigation part is from https://reactnavigation.org/

import BottomNavigator from "./app/navigation/BottomNavigator";
import TopStatusBar from "./app/components/TopStatusBar";

export default function App() {
  return (
    <NavigationContainer>
      <TopStatusBar />
      <BottomNavigator />
    </NavigationContainer>
  );
}
