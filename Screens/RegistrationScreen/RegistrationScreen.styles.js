import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  view: {
    justifyContent: "center",
    paddingTop: 92,
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
  title: {
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,

    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  showPass: {
    position: "absolute",
    right: 32,
    top: 30,
  },
  buttonBox: {
    paddingTop: 43,
  },
  button: {
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
