import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  imgBox: {
    paddingVertical: 32,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  chat: {
    flex: 1,
  },
  input: {
    height: 50,
    width: "100%",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 52,

    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,

    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  button: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
