import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 300,
    marginBottom: 32,
  },
  imgBox: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    marginBottom: 8,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 6,
    marginRight: 24,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  location: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
