import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { styles } from "./Item.styles";

export const Item = ({ post, navigation }) => {
  if (post) {
    return (
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <Image style={styles.photo} source={{ uri: post.url }}></Image>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.infoBox}>
          <TouchableOpacity onPress={() => navigation.navigate("Comments", { url: post.url })} style={styles.infoBox}>
            <FontAwesome name="comment" size={24} color="#BDBDBD" />
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>

          {post.likes && (
            <TouchableOpacity style={styles.infoBox}>
              <AntDesign name="like2" size={24} color="#FF6C00" />
              <Text style={styles.text}>{post.likes}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { coords: post.coords })}
            style={{ ...styles.infoBox, marginLeft: "auto" }}
          >
            <Feather name="map-pin" size={18} color="#BDBDBD" />
            <Text style={styles.location}>{post.location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
