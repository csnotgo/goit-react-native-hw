import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import { RegistrationScreen } from "../../Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../../Screens/LoginScreen/LoginScreen";
import { Home } from "../../Screens/Home/Home";
import { CommentsScreen } from "../../Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../Screens/MapScreen/MapScreen";
import { ButtonBack } from "../../Screens/ButtonBack";

const Stack = createNativeStackNavigator();

export const Routing = () => {
  const [isAuth, setIsAuth] = useState(false);

  onAuthStateChanged(auth, (user) => (user ? setIsAuth(true) : setIsAuth(false)));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: "center" }}>
        {!isAuth ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
