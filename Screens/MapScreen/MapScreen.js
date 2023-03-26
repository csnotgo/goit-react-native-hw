import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.coords;

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude === 0 ? 48.383022 : latitude,
          longitude: longitude === 0 ? 31.1828699 : longitude,
          latitudeDelta: latitude === 0 ? 12 : 0.09,
          longitudeDelta: longitude === 0 ? 1 : 0.04,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};
