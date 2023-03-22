import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { Home } from "./Screens/Home/Home";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { AntDesign } from "@expo/vector-icons";
import { ButtonBack } from "./Screens/ButtonBack";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              title: "Comments",
              headerLeft: () => (
                <ButtonBack style={{ marginLeft: 16 }}>
                  <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
                </ButtonBack>
              ),
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Map",
              headerLeft: () => (
                <ButtonBack style={{ marginLeft: 16 }}>
                  <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
                </ButtonBack>
              ),
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
