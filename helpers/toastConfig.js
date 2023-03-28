import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const toastConfig = {
  ok: ({ text1 }) => (
    <View style={styles.container}>
      <AntDesign name="check" size={24} color="green" style={styles.icon} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  err: ({ text1 }) => (
    <View style={{ ...styles.container, backgroundColor: "lightcoral" }}>
      <AntDesign name="close" size={24} color="red" style={styles.icon} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 10,
    width: "94%",
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 10,
    backgroundColor: "lightgreen",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.8)",
  },
});
