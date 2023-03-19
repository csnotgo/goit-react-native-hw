import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { styles } from "./Item.styles";

export const Item = ({ post, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image style={styles.photo} source={{ uri: post.url }}></Image>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.infoBox}>
        <TouchableOpacity onPress={() => navigation.navigate("Comments", { id: post.id })} style={styles.infoBox}>
          <FontAwesome name="comment" size={24} color={post.comments.length === 0 ? "#BDBDBD" : "#FF6C00"} />
          <Text style={styles.text}>{post.comments.length}</Text>
        </TouchableOpacity>

        <AntDesign name="like2" size={24} color="#FF6C00" />
        <Text style={{ ...styles.text, marginRight: "auto" }}>{post.likes}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Map")} style={styles.infoBox}>
          <Feather name="map-pin" size={18} color="#BDBDBD" />
          <Text style={styles.location}>{post.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
