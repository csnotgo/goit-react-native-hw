import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.coords;

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{ latitude: latitude, longitude: longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </MapView>
    </View>
  );
};
