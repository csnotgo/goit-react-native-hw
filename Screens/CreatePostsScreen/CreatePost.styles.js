import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    height: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  photoBox: {
    marginBottom: 32,
  },
  photo: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  icon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  editText: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  input: {
    marginBottom: 16,
    paddingVertical: 16,
    height: 50,

    // fontFamily: "Roboto-Medium",
    // fontWeight: 500,
    fontSize: 16,
    color: " #212121",

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  mapPin: {
    position: "absolute",
    top: 13,
    left: 0,
    width: 24,
    height: 24,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,

    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
  },
  delete: {
    height: 40,
    width: 70,
    paddingVertical: 8,
    paddingHorizontal: 23,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 120,

    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
