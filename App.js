import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";
import { Routing } from "./components/Routing/Routing";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
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
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Routing />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
