import React from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ProfileScreen.styles";
import posts from "../../posts.json";
import { Item } from "../../components/Item/Item";

export const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground style={styles.image} source={require("../../assets/img/photo.BG.png")}>
      <View style={styles.view}>
        <View style={styles.photoBox}>
          <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto}>
            <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logout}>
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.title}>User User</Text>
        <FlatList
          style={{ paddingHorizontal: 16, marginTop: 32 }}
          data={posts}
          renderItem={({ item }) => <Item post={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};
