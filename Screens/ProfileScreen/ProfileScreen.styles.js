import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  view: {
    paddingTop: 92,
    height: "80%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    position: "absolute",
    top: -60,
    alignSelf: "center",

    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhoto: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
});
