import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  photo: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#BDBDBD",
  },
  avatar: {
    position: "absolute",
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 50,
  },

  commentView: {
    maxWidth: 315,
    padding: 16,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  dateBox: {
    flexDirection: "row",
    marginTop: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
