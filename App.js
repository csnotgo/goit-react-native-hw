import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LoginScreen } from "./Screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setIsReady(true);
      }
    };
    load();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
