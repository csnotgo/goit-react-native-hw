import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6C00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});
