import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    height: "100%",
    // paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexDirection: "row",
    paddingBottom: 32,
  },
  photo: {
    width: 60,
    height: 60,
    marginLeft: 16,

    borderRadius: 16,
    backgroundColor: "#E8E8E8",
  },
  infoBox: {
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 13,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
