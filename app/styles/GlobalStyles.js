import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
  },
  header: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: "bold",
  },
  headerView: {
    flex: 5,
    top: "10%",
  },
  text: {
    color: Colors.white,
  },
});
