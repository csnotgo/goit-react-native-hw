import React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/config";
import { authLogout } from "../../redux/auth/auth-operations";
import { setCredentials } from "../../redux/auth/auth-slice";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { MaterialIcons, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "./Home.styles";

const Tabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  dispatch(setCredentials(user));

  const logout = () => {
    return (
      <TouchableOpacity onPress={() => dispatch(authLogout())} style={{ marginRight: 10 }}>
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    );
  };

  const backArrow = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Posts")} style={{ marginLeft: 16 }}>
        <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>
    );
  };

  const createPost = () => {
    return (
      <View style={styles.addPostView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePosts")}
          activeOpacity={0.8}
          style={styles.addPostBtn}
        >
          <AntDesign name="plus" size={13} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: "500", fontSize: 17, fontFamily: "Roboto-Medium" },
        headerTitleAlign: "center",
        headerTintColor: "#212121",
        headerStyle: { borderBottomWidth: 1, borderColor: "#E8E8E8" },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarStyle: {
          paddingHorizontal: 62,
          height: 84,
          paddingBottom: 34,
          paddingTop: 10,
        },
        tabBarHideOnKeyboard: true,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Posts",
          headerRight: logout,
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Create post",
          headerLeft: backArrow,
          tabBarButton: createPost,
          tabBarStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />, headerShown: false }}
      />
    </Tabs.Navigator>
  );
};
